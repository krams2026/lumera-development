import Reveal from "./Reveal";
import SectionTitle from "./SectionTitle";
import { PRICES } from "@/data/site";

export default function Pricing() {
  return (
    <section id="pricing" className="section">
      <div className="container-x max-w-3xl">
        <SectionTitle eyebrow="Цены" title="Ориентировочная стоимость" subtitle="Указана минимальная цена. Итоговая стоимость зависит от технического задания и объёма работ." />
        <Reveal>
          <div className="card divide-y divide-white/10 !p-0 hover:translate-y-0">
            {PRICES.map((p) => (
              <div key={p.title} className="flex items-baseline justify-between gap-4 px-6 py-5">
                <h3 className="text-base font-semibold sm:text-lg">{p.title}</h3>
                <p className="shrink-0 font-display text-xl font-bold text-gold-light sm:text-2xl"><span className="mr-1.5 text-sm font-medium text-muted">от</span>${p.price}</p>
              </div>
            ))}
          </div>
          <p className="mt-5 text-sm text-muted">Не нашли подходящий вариант? <a href="#contact" className="font-semibold text-gold hover:text-gold-light">Опишите задачу</a>, и мы подскажем, что и как можно сделать.</p>
        </Reveal>
      </div>
    </section>
  );
}
