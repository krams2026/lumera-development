import Reveal from "./Reveal";

export default function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <Reveal className="mb-10 max-w-xl">
      <h2 className="flex items-center gap-3 text-2xl text-ink sm:text-3xl"><span className="px-dot" aria-hidden />{title}</h2>
      {subtitle && <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">{subtitle}</p>}
    </Reveal>
  );
}
