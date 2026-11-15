import { ArrowRight, Check } from "lucide-react";
import Reveal from "./Reveal";
import SectionTitle from "./SectionTitle";
import { SERVICES } from "@/data/site";

export default function Services() {
  return (
    <section id="services" className="section">
      <div className="container-x">
        <SectionTitle eyebrow="Услуги" title="Что мы разрабатываем" subtitle="Шесть направлений, которые закрывают большинство задач малого бизнеса и частных проектов." />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <Reveal key={s.id} delay={(i % 3) * 0.08}>
              <article className="card flex h-full flex-col">
                <span className="grid h-11 w-11 place-items-center rounded-xl border border-gold/30 bg-gradient-to-br from-gold/20 to-transparent"><s.icon className="text-gold-light" size={22} /></span>
                <h3 className="mt-5 text-lg">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{s.description}</p>
                <ul className="mt-5 space-y-2 text-sm text-ink/90">
                  {s.features.map((f) => <li key={f} className="flex gap-2.5"><Check size={16} className="mt-0.5 shrink-0 text-gold" />{f}</li>)}
                </ul>
                <a href="#contact" className="mt-6 inline-flex items-center gap-1.5 self-start text-sm font-semibold text-gold transition hover:gap-2.5 hover:text-gold-light">Заказать <ArrowRight size={15} /></a>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
