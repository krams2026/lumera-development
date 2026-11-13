import { Check } from "lucide-react";
import Reveal from "./Reveal";
import SectionTitle from "./SectionTitle";
import { SERVICES } from "@/data/site";

export default function Services() {
  return (
    <section id="services" className="section">
      <div className="container-x">
        <SectionTitle title="Услуги" subtitle="Направления, в которых мы работаем." />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <Reveal key={s.id} delay={(i % 3) * 0.08}>
              <article className="card flex h-full flex-col">
                <span className="grid h-11 w-11 place-items-center rounded-lg border border-gold/30 bg-gradient-to-br from-gold/20 to-transparent"><s.icon className="text-gold-light" size={22} /></span>
                <h3 className="mt-4 text-lg font-medium">{s.title}</h3>
                <p className="mt-2 text-sm text-muted">{s.description}</p>
                <ul className="mt-4 space-y-2 text-sm">
                  {s.features.map((f) => <li key={f} className="flex gap-2"><Check size={16} className="mt-0.5 shrink-0 text-gold" />{f}</li>)}
                </ul>
                <a href="#contact" className="btn btn-ghost mt-6 self-start">Заказать</a>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
