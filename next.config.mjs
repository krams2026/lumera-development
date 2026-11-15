const turnstile = Boolean(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY);
const cf = "https://challenges.cloudflare.com";
const prod = process.env.NODE_ENV === "production";

// CSP: скрипты Next.js требуют 'unsafe-inline' без nonce; пользовательский HTML на сайте нигде не выводится.
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${prod ? "" : " 'unsafe-eval'"}${turnstile ? ` ${cf}` : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self'",
  `connect-src 'self'${turnstile ? ` ${cf}` : ""}`,
  turnstile ? `frame-src ${cf}` : "frame-src 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  ...(prod ? ["upgrade-insecure-requests"] : []),
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};
export default nextConfig;
