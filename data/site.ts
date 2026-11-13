import { Bot, Globe, ShoppingCart, Plug, Workflow, LayoutDashboard } from "lucide-react";
import type { PriceItem, Project, Service } from "@/types";

export const SITE = { name: "Lumera Development", tagline: "Цифровые решения под ключ" };
export const TELEGRAM_USERNAME = process.env.NEXT_PUBLIC_TELEGRAM_USERNAME ?? "";
export const TELEGRAM_URL = TELEGRAM_USERNAME ? `https://t.me/${TELEGRAM_USERNAME}` : "#contact";

export const NAV = [
  { href: "#services", label: "Услуги" },
  { href: "#portfolio", label: "Портфолио" },
  { href: "#pricing", label: "Цены" },
  { href: "#about", label: "О студии" },
  { href: "#contact", label: "Контакты" },
];

export const ADVANTAGES = [
  { title: "Индивидуальный подход", text: "Решение строится под вашу задачу, а не из шаблона." },
  { title: "Современные технологии", text: "Актуальный стек для быстрых и надёжных продуктов." },
  { title: "Поддержка проектов", text: "Помогаем с доработками и развитием после запуска." },
];

export const SERVICES: Service[] = [
  { id: "telegram", title: "Telegram-разработка", icon: Bot, description: "Боты для бизнеса, каналов и сервисов.",
    features: ["Меню и сценарии диалогов", "Приём платежей и заявок", "Рассылки и админ-функции"] },
  { id: "web", title: "Веб-разработка", icon: Globe, description: "Сайты и веб-приложения с аккуратным дизайном.",
    features: ["Адаптивная вёрстка", "SEO-основа", "Удобное управление контентом"] },
  { id: "shop", title: "Интернет-магазины", icon: ShoppingCart, description: "Магазины на сайте и в Telegram.",
    features: ["Каталог и корзина", "Онлайн-оплата", "Учёт заказов"] },
  { id: "api", title: "API-интеграции", icon: Plug, description: "Связываем ваши сервисы между собой.",
    features: ["Платёжные системы и CRM", "Webhooks", "Синхронизация данных"] },
  { id: "automation", title: "Автоматизация", icon: Workflow, description: "Убираем рутину из бизнес-процессов.",
    features: ["Автообработка заявок", "Уведомления и отчёты", "Скрипты под задачу"] },
  { id: "admin", title: "Административные панели", icon: LayoutDashboard, description: "Панели для управления данными и процессами.",
    features: ["Роли и доступы", "Таблицы и фильтры", "Статистика"] },
];

export const CATEGORIES = ["Все", "Telegram", "Веб", "Магазины", "Админки"];

export const PROJECTS: Project[] = [
  { id: "p1", title: "Бот записи на услуги", category: "Telegram", description: "Концепт: запись клиентов и напоминания.", stack: ["Node.js", "Telegram API"] },
  { id: "p2", title: "Telegram-магазин", category: "Магазины", description: "Концепт: каталог, корзина и приём заказов в боте.", stack: ["TypeScript", "Telegram API"] },
  { id: "p3", title: "Лендинг студии", category: "Веб", description: "Концепт: одностраничный сайт с формой заявок.", stack: ["Next.js", "Tailwind"] },
  { id: "p4", title: "Панель управления заказами", category: "Админки", description: "Концепт: таблицы, фильтры и статусы.", stack: ["Next.js", "REST API"] },
  { id: "p5", title: "Интернет-магазин одежды", category: "Магазины", description: "Концепт: витрина с каталогом и оформлением заказа.", stack: ["Next.js", "Stripe API"] },
  { id: "p6", title: "Бот с интеграцией API", category: "Telegram", description: "Концепт: бот, получающий данные внешнего сервиса.", stack: ["Node.js", "REST API"] },
];

export const PRICES: PriceItem[] = [
  { title: "Простой Telegram-бот", price: 20 },
  { title: "Telegram-магазин", price: 50 },
  { title: "Бот с API", price: 70 },
  { title: "Простой сайт", price: 50 },
  { title: "Административная панель", price: 50 },
];

export const PROJECT_TYPES = ["Telegram-бот", "Сайт", "Интернет-магазин", "Веб-приложение", "API-интеграция", "Автоматизация", "Админ-панель", "Другое"];
