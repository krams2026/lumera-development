import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const sans = Inter({ subsets: ["latin", "cyrillic"], variable: "--font-sans", display: "swap" });

const url = process.env.NEXT_PUBLIC_SITE_URL ?? "https://lumera-development.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title: { default: "Lumera Development — Telegram-боты, сайты и веб-сервисы", template: "%s | Lumera Development" },
  description: "Lumera Development разрабатывает Telegram-ботов, сайты, интернет-магазины, веб-приложения, API-интеграции и автоматизацию.",
  openGraph: { title: "Lumera Development", description: "Telegram-боты, сайты и веб-сервисы", type: "website", locale: "ru_RU" },
};
export const viewport: Viewport = { themeColor: "#000000" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={sans.variable}>
      <body>{children}</body>
    </html>
  );
}
