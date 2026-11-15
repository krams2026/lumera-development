import Reveal from "./Reveal";
import SectionTitle from "./SectionTitle";
import { ADVANTAGES } from "@/data/site";

export default function About() {
  return (
    <section id="about" className="section bg-white/[0.02]">
      <div className="container-x">
        <SectionTitle eyebrow="О студии" title="Делаем то, что решает задачу" subtitle="Lumera Development разрабатывает цифровые продукты для бизнеса: от Telegram-бота до веб-сервиса. Каждый проект начинаем с цели и строим под неё." />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {ADVANTAGES.map((a, i) => (
            <Reveal key={a.title} delay={i * 0.08}>
              <div className="card h-full">
                <p className="font-display text-sm font-bold text-gold">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-3 text-lg">{a.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{a.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
