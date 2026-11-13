"use client";
import { useState } from "react";
import { Send } from "lucide-react";
import SectionTitle from "./SectionTitle";
import { PROJECT_TYPES, TELEGRAM_URL } from "@/data/site";
import { validateLead } from "@/lib/validation";
import type { FieldErrors, LeadPayload } from "@/types";

const EMPTY: LeadPayload = { name: "", contact: "", projectType: "", message: "", website: "" };

export default function Contact() {
  const [form, setForm] = useState<LeadPayload>(EMPTY);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [serverMsg, setServerMsg] = useState("");

  const set = (k: keyof LeadPayload) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const { errors: clientErrors } = validateLead(form);
    setErrors(clientErrors ?? {});
    if (clientErrors) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/lead", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      const json = await res.json().catch(() => ({}));
      if (res.ok) { setStatus("ok"); setForm(EMPTY); return; }
      if (json.errors) setErrors(json.errors);
      setServerMsg(json.error ?? "Проверьте правильность заполнения полей.");
      setStatus("error");
    } catch {
      setServerMsg("Нет соединения. Попробуйте ещё раз.");
      setStatus("error");
    }
  }

  const Err = ({ k }: { k: keyof LeadPayload }) => (errors[k] ? <p role="alert" className="mt-1 text-xs text-red-400">{errors[k]}</p> : null);

  return (
    <section id="contact" className="section">
      <div className="container-x grid gap-12 lg:grid-cols-2">
        <div>
          <SectionTitle title="Обсудить проект" subtitle="Расскажите о задаче, и мы вернёмся с предложением. Или напишите напрямую в Telegram." />
          <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer" className="btn btn-ghost"><Send size={16} /> Написать в Telegram</a>
        </div>
        <form onSubmit={onSubmit} noValidate className="card space-y-4 hover:translate-y-0">
          <div><input className="field" placeholder="Ваше имя" value={form.name} onChange={set("name")} aria-label="Имя" /><Err k="name" /></div>
          <div><input className="field" placeholder="Telegram (@username), телефон или email" value={form.contact} onChange={set("contact")} aria-label="Контакт" /><Err k="contact" /></div>
          <div>
            <select className="field" value={form.projectType} onChange={set("projectType")} aria-label="Тип проекта">
              <option value="">Тип проекта</option>
              {PROJECT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
            </select><Err k="projectType" />
          </div>
          <div><textarea className="field min-h-32" placeholder="Опишите задачу" value={form.message} onChange={set("message")} aria-label="Описание задачи" /><Err k="message" /></div>
          <input className="hidden" tabIndex={-1} autoComplete="off" aria-hidden value={form.website} onChange={set("website")} name="website" />
          <button type="submit" disabled={status === "sending"} className="btn btn-gold w-full">{status === "sending" ? "Отправка…" : "Отправить заявку"}</button>
          {status === "ok" && <p role="status" className="text-sm text-gold">Спасибо! Заявка отправлена, мы скоро свяжемся с вами.</p>}
          {status === "error" && <p role="alert" className="text-sm text-red-400">{serverMsg}</p>}
        </form>
      </div>
    </section>
  );
}
