import { BUDGETS, PROJECT_TYPES } from "@/data/site";
import type { FieldErrors, LeadPayload } from "@/types";

const CONTACT_RE = /^(@[A-Za-z][A-Za-z0-9_]{4,31}|\+?[0-9\s()-]{7,20}|[^\s@]+@[^\s@]+\.[^\s@]+)$/;

export function validateLead(input: Partial<Record<keyof LeadPayload, unknown>>): { data?: LeadPayload; errors?: FieldErrors } {
  const s = (v: unknown) => (typeof v === "string" ? v.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F\u200B-\u200F\u2028\u2029\uFEFF]/g, "").trim() : "");
  const data: LeadPayload = { name: s(input.name), contact: s(input.contact), projectType: s(input.projectType), message: s(input.message), budget: s(input.budget), website: s(input.website) };
  const errors: FieldErrors = {};
  if (data.name.length < 2 || data.name.length > 60 || /[<>]/.test(data.name)) errors.name = "Укажите имя (от 2 до 60 символов, без символов < >)";
  if (!CONTACT_RE.test(data.contact)) errors.contact = "Укажите Telegram (@username), телефон или email";
  if (!PROJECT_TYPES.includes(data.projectType)) errors.projectType = "Выберите тип проекта";
  if (data.budget && !BUDGETS.includes(data.budget)) errors.budget = "Выберите бюджет из списка";
  if (data.message.length < 10) errors.message = "Опишите задачу подробнее (минимум 10 символов)";
  else if (data.message.length > 2000) errors.message = "Не более 2000 символов";
  return Object.keys(errors).length ? { errors } : { data };
}
