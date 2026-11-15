import Logo from "./Logo";
import { NAV, SITE, TELEGRAM_URL } from "@/data/site";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-10">
      <div className="container-x flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="flex items-center gap-2.5 font-display font-bold"><Logo size={26} id="lg-footer" />{SITE.name}</p>
          <p className="mt-1 text-sm text-muted">Разработка Telegram-ботов, сайтов и интеграций.</p>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted" aria-label="Нижняя навигация">
          {NAV.map((n) => <a key={n.href} href={n.href} className="transition hover:text-ink">{n.label}</a>)}
          <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer" className="text-gold transition hover:text-gold-light">Telegram</a>
        </nav>
      </div>
      <p className="container-x mt-8 text-xs text-muted">© {new Date().getFullYear()} {SITE.name}</p>
    </footer>
  );
}
