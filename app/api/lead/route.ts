import { NextResponse } from "next/server";
import { validateLead } from "@/lib/validation";

export const runtime = "nodejs";

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Некорректный запрос" }, { status: 400 });
  }
  const { data, errors } = validateLead(body);
  if (!data) return NextResponse.json({ errors }, { status: 422 });
  if (data.website) return NextResponse.json({ ok: true }); // honeypot

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    return NextResponse.json({ error: "Приём заявок ещё не настроен. Напишите нам в Telegram." }, { status: 503 });
  }

  const text = `Новая заявка Lumera\nИмя: ${data.name}\nКонтакт: ${data.contact}\nТип: ${data.projectType}\n\n${data.message}`;
  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text }),
    });
    if (!res.ok) throw new Error(`Telegram ${res.status}`);
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("Lead delivery failed:", e);
    return NextResponse.json({ error: "Не удалось отправить заявку. Попробуйте позже." }, { status: 502 });
  }
}
