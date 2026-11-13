import type { Metadata, Viewport } from "next";
import { Inter, Pixelify_Sans } from "next/font/google";
import "./globals.css";

const sans = Inter({ subsets: ["latin", "cyrillic"], variable: "--font-sans", display: "swap" });
const pixel = Pixelify_Sans({ subsets: ["latin", "cyrillic"], variable: "--font-pixel", display: "swap" });

const url = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title: { default: "Lumera Development — Telegram-боты, сайты и веб-приложения", template: "%s | Lumera Development" },
  description: "Digital-студия Lumera Development: Telegram-боты, сайты, интернет-магазины, веб-приложения, API-интеграции и автоматизация.",
  openGraph: { title: "Lumera Development", description: "Цифровые решения под ключ", type: "website", locale: "ru_RU" },
};
export const viewport: Viewport = { themeColor: "#000000" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${sans.variable} ${pixel.variable}`}>
      <body>{children}</body>
    </html>
  );
}
