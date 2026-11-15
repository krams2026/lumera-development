// Ограничитель в памяти. На Vercel каждый экземпляр функции держит свой счётчик, поэтому это лишь дополнительный слой:
// основной лимит стоит в Lumera Desk (один процесс) и в Vercel Firewall.
const hits = new Map<string, number[]>();

export function allow(key: string, max: number, windowMs: number): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  if (recent.length >= max) {
    hits.set(key, recent);
    return false;
  }
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) for (const [k, v] of hits) if (now - v[v.length - 1] > windowMs) hits.delete(k);
  return true;
}
