import { ArrowRight } from "lucide-react";
import Reveal from "./Reveal";

export default function Hero() {
  return (
    <section id="top" className="relative flex min-h-[88vh] items-center overflow-hidden pt-16">
      <div aria-hidden className="glow-drift pointer-events-none absolute -left-24 top-1/4 h-72 w-72 rounded-full bg-gold/10 blur-[110px]" />
      <div aria-hidden className="px-grid pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 opacity-60 [mask-image:radial-gradient(circle_at_70%_50%,#000,transparent_70%)] md:block" />
      <div aria-hidden className="pointer-events-none absolute right-[14%] top-1/3 hidden gap-2 md:grid md:grid-cols-3">
        {[1, 0, 1, 0, 1, 1, 1, 0, 0].map((on, i) => <span key={i} className={`h-4 w-4 ${on ? "bg-gold shadow-[0_0_18px_#D6B15E80]" : "border border-gold/30"}`} />)}
      </div>
      <div className="container-x relative">
        <Reveal>
          <p className="pixel mb-4 text-sm text-gold">Lumera Development</p>
          <h1 className="max-w-2xl text-3xl leading-tight sm:text-5xl">Telegram-боты, сайты и веб-приложения <span className="text-gold-grad">под ключ</span></h1>
          <p className="mt-5 max-w-md leading-relaxed text-muted">Цифровая студия: разрабатываем, интегрируем и автоматизируем.</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a href="#services" className="btn btn-gold">Наши услуги <ArrowRight size={16} /></a>
            <a href="#contact" className="btn btn-ghost">Обсудить проект</a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
