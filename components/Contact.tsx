"use client";
import { useState } from "react";
import { Send } from "lucide-react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import AutoList from "./AutoList";
import Turnstile, { turnstileEnabled } from "./Turnstile";
import SectionTitle from "./SectionTitle";
import { BUDGETS, PROJECT_TYPES, TELEGRAM_URL } from "@/data/site";
import { validateLead } from "@/lib/validation";
import type { FieldErrors, LeadPayload } from "@/types";

const EMPTY: LeadPayload = { name: "", contact: "", projectType: "", message: "", budget: "", website: "" };

export default function Contact() {
  const [form, setForm] = useState<LeadPayload>(EMPTY);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [serverMsg, setServerMsg] = useState("");
  const [token, setToken] = useState("");
  const [resetSignal, setResetSignal] = useState(0);
  const [formRef] = useAutoAnimate<HTMLFormElement>({ duration: 220 });

  const set = (k: keyof LeadPayload) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "sending") return;
    const { errors: clientErrors } = validateLead(form);
    setErrors(clientErrors ?? {});
    if (clientErrors) return;
    if (turnstileEnabled && !token) {
      setServerMsg("Подтвердите, что вы не робот.");
      setStatus("error");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/lead", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, turnstileToken: token }) });
      const json = await res.json().catch(() => ({}));
      if (res.ok) { setStatus("ok"); setForm(EMPTY); setToken(""); setResetSignal((n) => n + 1); return; }
      setToken("");
      setResetSignal((n) => n + 1);
      if (json.errors) setErrors(json.errors);
      setServerMsg(json.error ?? "Проверьте правильность заполнения полей.");
      setStatus("error");
    } catch {
      setServerMsg("Нет соединения с сервером. Проверьте интернет и повторите отправку.");
      setStatus("error");
    }
  }

  const err = (k: keyof LeadPayload) => (errors[k] ? <p role="alert" className="mt-1.5 text-xs text-red-400">{errors[k]}</p> : null);

  return (
    <section id="contact" className="section">
      <div className="container-x grid gap-12 lg:grid-cols-2">
        <div>
          <SectionTitle eyebrow="Контакты" title="Расскажите о задаче" subtitle="Опишите, что нужно сделать, и оставьте контакт. Заявка попадёт в Lumera Desk, и мы свяжемся с вами. Если удобнее, напишите в Telegram." />
          <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer" className="btn btn-ghost"><Send size={16} /> Открыть бота в Telegram</a>
        </div>
        <form ref={formRef} onSubmit={onSubmit} noValidate className="card space-y-4 hover:translate-y-0">
          <div className="grid gap-4 sm:grid-cols-2">
            <AutoList><input className="field" placeholder="Ваше имя" autoComplete="name" value={form.name} onChange={set("name")} aria-label="Имя" />{err("name")}</AutoList>
            <AutoList><input className="field" placeholder="Telegram, телефон или email" autoComplete="off" value={form.contact} onChange={set("contact")} aria-label="Контакт" />{err("contact")}</AutoList>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <AutoList>
              <select className="field" value={form.projectType} onChange={set("projectType")} aria-label="Тип проекта">
                <option value="">Тип проекта</option>
                {PROJECT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>{err("projectType")}
            </AutoList>
            <AutoList>
              <select className="field" value={form.budget} onChange={set("budget")} aria-label="Бюджет">
                <option value="">Бюджет (необязательно)</option>
                {BUDGETS.map((b) => <option key={b} value={b}>{b}</option>)}
              </select>{err("budget")}
            </AutoList>
          </div>
          <AutoList><textarea className="field min-h-32" placeholder="Опишите задачу" value={form.message} onChange={set("message")} aria-label="Описание задачи" />{err("message")}</AutoList>
          <Turnstile onToken={setToken} resetSignal={resetSignal} />
          <input className="hidden" tabIndex={-1} autoComplete="off" aria-hidden value={form.website} onChange={set("website")} name="website" />
          <button type="submit" disabled={status === "sending"} className="btn btn-gold w-full">
            {status === "sending" ? "Отправляем…" : status === "error" ? "Повторить отправку" : "Отправить заявку"}
          </button>
          {status === "ok" && <p role="status" className="text-sm text-gold-light">Спасибо, заявка отправлена. Мы свяжемся с вами по указанному контакту.</p>}
          {status === "error" && <p role="alert" className="text-sm text-red-400">{serverMsg}</p>}
        </form>
      </div>
    </section>
  );
}
