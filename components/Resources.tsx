import { ArrowUpRight, Bot, Globe, Send, User } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Reveal from "./Reveal";
import SectionTitle from "./SectionTitle";
import { RESOURCES } from "@/data/site";

const ICONS: LucideIcon[] = [Globe, Send, Bot, User];

export default function Resources() {
  return (
    <section id="resources" className="section">
      <div className="container-x">
        <SectionTitle eyebrow="Ссылки" title="Наши официальные ресурсы" subtitle="Только эти адреса принадлежат Lumera Development." />
        <div className="grid gap-4 sm:grid-cols-2">
          {RESOURCES.map((r, i) => {
            const Icon = ICONS[i] ?? Globe;
            return (
              <Reveal key={r.href} delay={(i % 2) * 0.08}>
                <a href={r.href} target="_blank" rel="noopener noreferrer" className="card group flex items-center gap-4 !p-5">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-gold/30 bg-gradient-to-br from-gold/20 to-transparent"><Icon className="text-gold-light" size={20} /></span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm text-muted">{r.label}</span>
                    <span className="block truncate font-semibold">{r.display}</span>
                  </span>
                  <ArrowUpRight size={18} className="shrink-0 text-muted transition group-hover:text-gold-light" />
                </a>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
