"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { NAV, SITE } from "@/data/site";

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur">
      <div className="container-x flex h-16 items-center justify-between">
        <a href="#top" className="flex items-center gap-2 pixel tracking-wide">
          <span className="pixel grid h-8 w-8 place-items-center bg-gold text-base text-black">L</span>
          {SITE.name}
        </a>
        <nav className="hidden gap-8 text-sm text-muted md:flex" aria-label="Основная навигация">
          {NAV.map((n) => <a key={n.href} href={n.href} className="transition hover:text-gold">{n.label}</a>)}
        </nav>
        <button className="md:hidden" onClick={() => setOpen((v) => !v)} aria-label={open ? "Закрыть меню" : "Открыть меню"} aria-expanded={open}>
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav className="container-x flex flex-col gap-4 border-t border-gold/10 py-5 md:hidden" aria-label="Мобильная навигация">
          {NAV.map((n) => <a key={n.href} href={n.href} onClick={() => setOpen(false)} className="text-muted hover:text-gold">{n.label}</a>)}
        </nav>
      )}
    </header>
  );
}
