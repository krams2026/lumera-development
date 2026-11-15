"use client";
import { useEffect, useRef } from "react";

type Particle = { x: number; y: number; r: number; v: number; a: number; ph: number; sw: number };

/** Мягкие падающие частицы. Небольшое число, пауза на скрытой вкладке, отключено при prefers-reduced-motion. */
export default function Snow() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let w = 0, h = 0, raf = 0, last = 0, running = false;
    let parts: Particle[] = [];

    const make = (initial: boolean): Particle => {
      const r = 0.6 + Math.random() * 1.6; // размер задаёт «глубину»: крупнее = ближе, быстрее и ярче
      return { x: Math.random() * w, y: initial ? Math.random() * h : -10, r, v: 6 + r * 7, a: 0.15 + (r / 2.2) * 0.35, ph: Math.random() * 6.28, sw: 6 + Math.random() * 14 };
    };

    const resize = () => {
      const nw = window.innerWidth, nh = window.innerHeight;
      if (parts.length && Math.abs(nw - w) < 1 && Math.abs(nh - h) < 120) return; // адресная строка на мобильных
      w = nw; h = nh;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(Math.min(48, Math.max(18, (w * h) / 40000)));
      parts = Array.from({ length: count }, () => make(true));
    };

    const draw = (t: number) => {
      const dt = Math.min((t - last) / 1000, 0.05);
      last = t;
      ctx.clearRect(0, 0, w, h);
      for (const p of parts) {
        p.y += p.v * dt;
        p.ph += dt * 0.6;
        if (p.y > h + 10) Object.assign(p, make(false));
        const x = p.x + Math.sin(p.ph) * p.sw;
        ctx.beginPath();
        ctx.fillStyle = `rgba(240,209,138,${p.a * 0.18})`;
        ctx.arc(x, p.y, p.r * 3, 0, 6.283);
        ctx.fill();
        ctx.beginPath();
        ctx.fillStyle = `rgba(255,236,190,${p.a})`;
        ctx.arc(x, p.y, p.r, 0, 6.283);
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };

    const start = () => {
      if (running || motion.matches || document.hidden) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(draw);
    };
    const stop = () => { running = false; cancelAnimationFrame(raf); };
    const onVisibility = () => (document.hidden ? stop() : start());
    const onMotion = () => { if (motion.matches) { stop(); ctx.clearRect(0, 0, w, h); } else start(); };

    resize();
    start();
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibility);
    motion.addEventListener("change", onMotion);
    return () => {
      stop();
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
      motion.removeEventListener("change", onMotion);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className="pointer-events-none fixed inset-0 z-0 h-full w-full" />;
}
