import Reveal from "./Reveal";

export default function SectionTitle({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) {
  return (
    <Reveal className="mb-12 max-w-2xl">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-gold">{eyebrow}</p>
      <h2 className="text-3xl leading-tight sm:text-4xl">{title}</h2>
      {subtitle && <p className="mt-4 leading-relaxed text-muted">{subtitle}</p>}
    </Reveal>
  );
}
