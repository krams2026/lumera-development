"use client";
import { useState } from "react";
import type { LucideIcon } from "lucide-react";
import { Bot, Globe, LayoutDashboard, ShoppingCart } from "lucide-react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import SectionTitle from "./SectionTitle";
import { CATEGORIES, PROJECTS } from "@/data/site";

const ICONS: Record<string, LucideIcon> = { Telegram: Bot, Веб: Globe, Магазины: ShoppingCart, Админки: LayoutDashboard };

export default function Portfolio() {
  const [active, setActive] = useState("Все");
  const [grid] = useAutoAnimate<HTMLDivElement>({ duration: 280 });
  const items = active === "Все" ? PROJECTS : PROJECTS.filter((p) => p.category === active);
  return (
    <section id="portfolio" className="section bg-white/[0.02]">
      <div className="container-x">
        <SectionTitle eyebrow="Проекты" title="Примеры решений" subtitle="Это демонстрационные концепты, а не работы реальных клиентов. Они показывают, как могут выглядеть и работать наши продукты." />
        <div className="mb-8 flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button key={c} onClick={() => setActive(c)} aria-pressed={active === c}
              className={`rounded-full border px-4 py-1.5 text-sm transition duration-300 ${active === c ? "border-gold bg-gold font-semibold text-black shadow-[0_0_20px_-6px_#D6B15E]" : "border-white/10 text-muted hover:border-gold/50 hover:text-gold-light"}`}>{c}</button>
          ))}
        </div>
        <div ref={grid} className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {items.map((p) => {
            const Icon = ICONS[p.category] ?? Globe;
            return (
              <article key={p.id} className="card overflow-hidden !p-0">
                <div className="relative grid h-36 place-items-center bg-[radial-gradient(circle_at_50%_120%,rgba(214,177,94,0.28),transparent_65%)]">
                  <Icon className="text-gold-light/80" size={34} strokeWidth={1.5} />
                  <span className="absolute right-3 top-3 rounded-full border border-gold/30 bg-black/60 px-2.5 py-0.5 text-[11px] text-gold">Концепт</span>
                </div>
                <div className="p-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-gold">{p.category}</p>
                  <h3 className="mt-1 text-lg">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{p.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.stack.map((t) => <span key={t} className="rounded-md bg-white/5 px-2 py-1 text-xs text-muted">{t}</span>)}
                  </div>
                  <a href="#contact" className="mt-5 inline-block text-sm font-semibold text-gold transition hover:text-gold-light">Обсудить похожий проект</a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
