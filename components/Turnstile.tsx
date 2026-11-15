"use client";
import { useEffect, useRef } from "react";

declare global {
  interface Window {
    turnstile?: { render: (el: HTMLElement, o: Record<string, unknown>) => string; reset: (id?: string) => void; remove: (id: string) => void };
  }
}

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY; // публичный ключ, по задумке виден в браузере
export const turnstileEnabled = Boolean(SITE_KEY);
const SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

/** Cloudflare Turnstile (бесплатная защита от ботов). Включается, только если задан NEXT_PUBLIC_TURNSTILE_SITE_KEY. */
export default function Turnstile({ onToken, resetSignal }: { onToken: (t: string) => void; resetSignal: number }) {
  const box = useRef<HTMLDivElement>(null);
  const widget = useRef<string | undefined>(undefined);

  useEffect(() => {
    if (!SITE_KEY) return;
    const mount = () => {
      if (!box.current || !window.turnstile || widget.current) return;
      widget.current = window.turnstile.render(box.current, {
        sitekey: SITE_KEY, theme: "dark", callback: onToken,
        "expired-callback": () => onToken(""), "error-callback": () => onToken(""),
      });
    };
    if (window.turnstile) mount();
    else {
      const existing = document.querySelector<HTMLScriptElement>(`script[src="${SRC}"]`);
      const script = existing ?? Object.assign(document.createElement("script"), { src: SRC, async: true });
      script.addEventListener("load", mount);
      if (!existing) document.head.appendChild(script);
    }
    return () => {
      if (widget.current && window.turnstile) window.turnstile.remove(widget.current);
      widget.current = undefined;
    };
  }, [onToken]);

  useEffect(() => {
    if (widget.current && window.turnstile) window.turnstile.reset(widget.current);
  }, [resetSignal]);

  return SITE_KEY ? <div ref={box} /> : null;
}
