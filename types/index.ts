import type { LucideIcon } from "lucide-react";

export type Service = { id: string; title: string; description: string; features: string[]; icon: LucideIcon };
export type Project = { id: string; title: string; category: string; description: string; stack: string[] };
export type PriceItem = { title: string; price: number };
export type LeadPayload = { name: string; contact: string; projectType: string; message: string; budget?: string; website?: string; turnstileToken?: string };
export type FieldErrors = Partial<Record<keyof LeadPayload, string>>;
