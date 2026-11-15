import { ArrowRight } from "lucide-react";
import Reveal from "./Reveal";

const TAGS = ["Telegram-боты", "Сайты", "Интернет-магазины", "API-интеграции", "Автоматизация"];

export default function Hero() {
  return (
    <section id="top" className="relative flex min-h-[92vh] items-center overflow-hidden pt-16">
      <div aria-hidden className="grid-bg pointer-events-none absolute inset-0 opacity-70 [mask-image:radial-gradient(ellipse_at_65%_40%,#000,transparent_70%)]" />
      <div aria-hidden className="glow-drift pointer-events-none absolute -right-20 top-1/4 h-96 w-96 rounded-full bg-gold/15 blur-[130px]" />
      <div aria-hidden className="pointer-events-none absolute -left-32 bottom-0 h-72 w-72 rounded-full bg-gold-dark/10 blur-[120px]" />
      <div className="container-x relative">
        <Reveal>
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.3em] text-gold">Digital-студия</p>
          <h1 className="max-w-3xl text-4xl font-extrabold leading-[1.1] sm:text-6xl">
            Telegram-боты, сайты и сервисы, которые <span className="text-gold-grad">работают на бизнес</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            Lumera Development берёт проект целиком: обсуждает задачу, проектирует, разрабатывает, запускает и поддерживает.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a href="#contact" className="btn btn-gold">Обсудить проект <ArrowRight size={16} /></a>
            <a href="#services" className="btn btn-ghost">Наши услуги</a>
          </div>
          <ul className="mt-14 flex flex-wrap gap-2 text-xs text-muted">
            {TAGS.map((t) => <li key={t} className="rounded-full border border-white/10 px-3 py-1">{t}</li>)}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
