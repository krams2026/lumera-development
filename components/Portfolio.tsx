"use client";
import { useState } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import SectionTitle from "./SectionTitle";
import { CATEGORIES, PROJECTS } from "@/data/site";

export default function Portfolio() {
  const [active, setActive] = useState("Все");
  const [grid] = useAutoAnimate<HTMLDivElement>({ duration: 280 });
  const items = active === "Все" ? PROJECTS : PROJECTS.filter((p) => p.category === active);
  return (
    <section id="portfolio" className="section bg-deep">
      <div className="container-x">
        <SectionTitle title="Портфолио" subtitle="Демонстрационные концепты. Это не реальные клиентские работы." />
        <div className="mb-8 flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button key={c} onClick={() => setActive(c)} aria-pressed={active === c}
              className={`rounded-full border px-4 py-1.5 text-sm transition duration-300 ${active === c ? "border-gold bg-gold text-black shadow-[0_0_20px_-6px_#D6B15E]" : "border-white/10 text-muted hover:border-gold/50 hover:text-gold-light"}`}>{c}</button>
          ))}
        </div>
        <div ref={grid} className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {items.map((p) => (
            <article key={p.id} className="card overflow-hidden !p-0">
              <div className="px-grid relative grid h-40 place-items-center bg-deep">
                <span className="pixel text-4xl text-gold/80">{p.title[0]}</span>
                <span className="absolute right-3 top-3 rounded-full border border-gold/30 bg-black/70 px-2.5 py-0.5 text-xs text-gold">Концепт</span>
              </div>
              <div className="p-6">
                <p className="text-xs uppercase tracking-wider text-gold">{p.category}</p>
                <h3 className="mt-1 text-lg">{p.title}</h3>
                <p className="mt-2 text-sm text-muted">{p.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.stack.map((t) => <span key={t} className="rounded-md bg-white/5 px-2 py-1 text-xs text-muted">{t}</span>)}
                </div>
                <a href="#contact" className="btn btn-ghost mt-5 !px-4 !py-2">Обсудить похожий</a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
