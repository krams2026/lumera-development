import Reveal from "./Reveal";
import SectionTitle from "./SectionTitle";

const POINTS = [
  ["Индивидуальная разработка", "Каждый проект проектируется под конкретные задачи заказчика."],
  ["Современные технологии", "Используем актуальные и проверенные инструменты."],
  ["Внимание к деталям", "Аккуратный интерфейс и чистый код."],
  ["Поддержка проектов", "Остаёмся на связи после запуска."],
  ["Ориентация на результат", "Делаем то, что решает вашу задачу."],
];

export default function About() {
  return (
    <section id="about" className="section bg-deep">
      <div className="container-x">
        <SectionTitle title="О студии" subtitle="Lumera Development — студия универсальной цифровой разработки." />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {POINTS.map(([t, d], i) => (
            <Reveal key={t} delay={(i % 3) * 0.08}><div className="card h-full"><h3 className="font-medium text-gold">{t}</h3><p className="mt-2 text-sm text-muted">{d}</p></div></Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
