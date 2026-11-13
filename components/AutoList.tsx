"use client";
import { useAutoAnimate } from "@formkit/auto-animate/react";

export default function AutoList({ children, className }: { children: React.ReactNode; className?: string }) {
  const [ref] = useAutoAnimate<HTMLDivElement>({ duration: 220 });
  return <div ref={ref} className={className}>{children}</div>;
}
