/** Фирменный знак Lumera: золотая «L» и искра света. Совпадает с app/icon.svg. */
export default function Logo({ size = 32, id = "lg" }: { size?: number; id?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true" className="shrink-0">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#F0D18A" /><stop offset=".55" stopColor="#D6B15E" /><stop offset="1" stopColor="#B58A3A" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="15" fill="#080808" />
      <rect x="2" y="2" width="60" height="60" rx="13" fill="none" stroke={`url(#${id})`} strokeWidth="2" opacity=".55" />
      <path d="M23 15v31h20" fill="none" stroke={`url(#${id})`} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M45 13l1.9 4.6L51.5 19.5l-4.6 1.9L45 26l-1.9-4.6L38.5 19.5l4.6-1.9z" fill="#F0D18A" />
    </svg>
  );
}
