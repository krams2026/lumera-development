import Reveal from "./Reveal";
import SectionTitle from "./SectionTitle";
import { PRICES } from "@/data/site";

export default function Pricing() {
  return (
    <section id="pricing" className="section">
      <div className="container-x">
        <SectionTitle title="Цены" subtitle="Ориентировочная стоимость. Итоговая цена зависит от технического задания." />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PRICES.map((p, i) => (
            <Reveal key={p.title} delay={(i % 3) * 0.08}>
              <div className="card h-full">
                <h3 className="font-medium">{p.title}</h3>
                <p className="mt-4 text-3xl font-semibold text-gold"><span className="text-sm font-normal text-muted">от </span>${p.price}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
