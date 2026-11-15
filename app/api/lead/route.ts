import crypto from "node:crypto";
import net from "node:net";
import { NextResponse } from "next/server";
import { allow } from "@/lib/rateLimit";
import { validateLead } from "@/lib/validation";
import type { LeadPayload } from "@/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BODY = 8_000;
const env = (name: string) => process.env[name]?.trim() ?? "";
const json = (body: unknown, status = 200) => NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });

/** Адрес Lumera Desk берётся только из переменной окружения (не из пользовательского ввода) и проверяется. */
function deskBase(): string | null {
  try {
    const u = new URL(env("LUMERA_DESK_URL"));
    const prod = process.env.NODE_ENV === "production";
    if (u.username || u.password || (u.protocol !== "https:" && u.protocol !== "http:")) return null;
    if (prod) {
      const h = u.hostname.toLowerCase().replace(/^\[|\]$/g, "");
      if (u.protocol !== "https:" || h === "localhost" || h.endsWith(".local") || h.endsWith(".internal") || net.isIP(h)) return null;
    }
    return u.origin;
  } catch {
    return null;
  }
}
const deskConfigured = () => Boolean(deskBase() && env("LUMERA_DESK_API_SECRET"));
const telegramConfigured = () => Boolean(env("TELEGRAM_BOT_TOKEN") && env("TELEGRAM_CHAT_ID"));

const safeEqual = (a: string, b: string) => crypto.timingSafeEqual(crypto.createHash("sha256").update(a).digest(), crypto.createHash("sha256").update(b).digest());

/** Без DIAGNOSTICS_TOKEN отвечает только {ok:true}. С токеном показывает режим доставки и НАЗВАНИЯ недостающих переменных. */
export async function GET(req: Request) {
  const token = env("DIAGNOSTICS_TOKEN");
  if (!token || !safeEqual(req.headers.get("authorization") ?? "", `Bearer ${token}`)) return json({ ok: true });
  const missing = (names: string[]) => names.filter((n) => !env(n));
  return json({
    version: "lead-api-3",
    deliveryMode: deskConfigured() ? "lumera-desk" : telegramConfigured() ? "telegram" : "none",
    desk: { configured: deskConfigured(), missing: missing(["LUMERA_DESK_URL", "LUMERA_DESK_API_SECRET"]) },
    telegram: { configured: telegramConfigured(), missing: missing(["TELEGRAM_BOT_TOKEN", "TELEGRAM_CHAT_ID"]) },
    turnstile: { enabled: Boolean(env("TURNSTILE_SECRET_KEY")) },
  });
}

/** Защита от CSRF и чужих сайтов: запрос должен прийти из браузера с этого же адреса. */
function sameOrigin(req: Request): boolean {
  const site = req.headers.get("sec-fetch-site");
  if (site && site !== "same-origin") return false;
  const origin = req.headers.get("origin");
  if (!origin) return false;
  try {
    return new URL(origin).host === req.headers.get("host");
  } catch {
    return false;
  }
}

function clientIp(req: Request): string {
  const ip = (req.headers.get("x-real-ip") ?? req.headers.get("x-forwarded-for")?.split(",")[0] ?? "").trim();
  return net.isIP(ip) ? ip : "unknown";
}

async function verifyTurnstile(token: unknown, ip: string): Promise<boolean> {
  const secret = env("TURNSTILE_SECRET_KEY");
  if (!secret) return true;
  if (typeof token !== "string" || !token || token.length > 2048) return false;
  try {
    const body = new URLSearchParams({ secret, response: token });
    if (ip !== "unknown") body.set("remoteip", ip);
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", { method: "POST", body, signal: AbortSignal.timeout(5000), cache: "no-store" });
    return Boolean(((await res.json().catch(() => null)) as { success?: boolean } | null)?.success);
  } catch {
    return false;
  }
}

type DeskResult = { kind: "ok" } | { kind: "invalid"; errors: unknown } | { kind: "limited" } | { kind: "failed" };

/** Основной путь: HTTP-вход Lumera Desk. Две попытки при сетевой ошибке или 5xx (Desk не создаёт дубликаты). */
async function sendToDesk(data: LeadPayload, ip: string): Promise<DeskResult> {
  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      const res = await fetch(`${deskBase()}/api/leads`, {
        method: "POST",
        redirect: "manual",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${env("LUMERA_DESK_API_SECRET")}`, ...(ip !== "unknown" ? { "X-Client-IP": ip } : {}) },
        body: JSON.stringify({ name: data.name, contact: data.contact, projectType: data.projectType, message: data.message, budget: data.budget }),
        signal: AbortSignal.timeout(8000),
        cache: "no-store",
      });
      if (res.ok) return { kind: "ok" };
      if (res.status === 422) return { kind: "invalid", errors: ((await res.json().catch(() => ({}))) as { errors?: unknown }).errors };
      if (res.status === 429) return { kind: "limited" };
      console.error("Lumera Desk responded with status", res.status);
      if (res.status < 500) break;
    } catch (e) {
      console.error("Lumera Desk request failed:", e instanceof Error ? e.name : "unknown");
    }
    if (attempt < 2) await new Promise((r) => setTimeout(r, 600));
  }
  return { kind: "failed" };
}

/** Запасной путь: прямое сообщение владельцу через Telegram Bot API (без записи в базу бота). Обычный текст, без разметки. */
async function sendToTelegram(data: LeadPayload): Promise<boolean> {
  const text = ["НОВАЯ ЗАЯВКА — LUMERA DEVELOPMENT", "", `Имя: ${data.name}`, `Контакт: ${data.contact}`, `Тип проекта: ${data.projectType}`, ...(data.budget ? [`Бюджет: ${data.budget}`] : []), "", "Описание:", data.message, "", "Источник: сайт"].join("\n");
  try {
    const res = await fetch(`https://api.telegram.org/bot${env("TELEGRAM_BOT_TOKEN")}/sendMessage`, {
      method: "POST",
      redirect: "manual",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: env("TELEGRAM_CHAT_ID"), text }),
      signal: AbortSignal.timeout(8000),
      cache: "no-store",
    });
    const j = (await res.json().catch(() => null)) as { ok?: boolean; error_code?: number; description?: string } | null;
    if (res.ok && j?.ok) return true;
    console.error("Telegram sendMessage failed:", j?.error_code, j?.description); // без токена и URL
  } catch (e) {
    console.error("Telegram request failed:", e instanceof Error ? e.name : "unknown");
  }
  return false;
}

export async function POST(req: Request) {
  if (!sameOrigin(req)) return json({ error: "Запрос отклонён." }, 403);
  if (!(req.headers.get("content-type") ?? "").toLowerCase().startsWith("application/json")) return json({ error: "Некорректный запрос" }, 415);

  const ip = clientIp(req);
  if (!allow(`ip:${ip}`, 5, 10 * 60_000)) return json({ error: "Слишком много попыток. Попробуйте через несколько минут." }, 429);

  let body: Record<string, unknown>;
  try {
    const raw = await req.text();
    if (raw.length > MAX_BODY) return json({ error: "Слишком большой запрос" }, 413);
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("shape");
    body = parsed as Record<string, unknown>;
  } catch {
    return json({ error: "Некорректный запрос" }, 400);
  }

  const { data, errors } = validateLead(body);
  if (!data) return json({ errors }, 422);
  if (data.website) return json({ ok: true }); // honeypot: боты получают «успех» и ничего не доставляется
  if (!(await verifyTurnstile(body.turnstileToken, ip))) return json({ error: "Не удалось подтвердить, что вы не робот. Обновите страницу и попробуйте снова." }, 400);

  if (!deskConfigured() && !telegramConfigured()) {
    console.error("Lead delivery is not configured: set LUMERA_DESK_URL + LUMERA_DESK_API_SECRET, or TELEGRAM_BOT_TOKEN + TELEGRAM_CHAT_ID");
    return json({ error: "Приём заявок временно недоступен. Напишите нам в Telegram: @lumeradeskbot." }, 503);
  }

  if (deskConfigured()) {
    const r = await sendToDesk(data, ip);
    if (r.kind === "ok") return json({ ok: true });
    if (r.kind === "invalid") return json({ errors: r.errors }, 422);
    if (r.kind === "limited") return json({ error: "Слишком много заявок с этого контакта или адреса. Попробуйте позже." }, 429);
  }
  if (telegramConfigured() && (await sendToTelegram(data))) return json({ ok: true });

  return json({ error: "Не удалось отправить заявку. Попробуйте ещё раз или напишите нам в Telegram." }, 502);
}
