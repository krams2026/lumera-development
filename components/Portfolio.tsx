"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SectionTitle from "./SectionTitle";
import { CATEGORIES, PROJECTS } from "@/data/site";

export default function Portfolio() {
  const [active, setActive] = useState("Все");
  const items = active === "Все" ? PROJECTS : PROJECTS.filter((p) => p.category === active);
  return (
    <section id="portfolio" className="section bg-deep">
      <div className="container-x">
        <SectionTitle title="Портфолио" subtitle="Демонстрационные концепты. Это не реальные клиентские работы." />
        <div className="mb-8 flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button key={c} onClick={() => setActive(c)} aria-pressed={active === c}
              className={`rounded-full border px-4 py-1.5 text-sm transition ${active === c ? "border-gold bg-gold text-bg" : "border-white/10 text-muted hover:border-gold/50"}`}>{c}</button>
          ))}
        </div>
        <motion.div layout className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {items.map((p) => (
              <motion.article key={p.id} layout initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} className="card overflow-hidden !p-0">
                <div className="relative grid h-40 place-items-center px-grid bg-deep">
                  <span className="pixel text-4xl text-gold/80">{p.title[0]}</span>
                  <span className="absolute right-3 top-3 rounded-full border border-gold/30 bg-bg/70 px-2.5 py-0.5 text-xs text-gold">Концепт</span>
                </div>
                <div className="p-6">
                  <p className="text-xs uppercase tracking-wider text-gold">{p.category}</p>
                  <h3 className="mt-1 text-lg font-medium">{p.title}</h3>
                  <p className="mt-2 text-sm text-muted">{p.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.stack.map((t) => <span key={t} className="rounded-md bg-white/5 px-2 py-1 text-xs text-muted">{t}</span>)}
                  </div>
                  <a href="#contact" className="btn btn-ghost mt-5 !px-4 !py-2">Обсудить похожий</a>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
