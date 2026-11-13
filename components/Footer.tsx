import { SITE } from "@/data/site";

export default function Footer() {
  return (
    <footer className="border-t border-gold/10 py-8 text-center text-sm text-muted">
      © {new Date().getFullYear()} {SITE.name}. Все права защищены.
    </footer>
  );
}
