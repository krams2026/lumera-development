import { Bot, Globe, ShoppingCart, Plug, Workflow, LayoutDashboard } from "lucide-react";
import type { PriceItem, Project, Service } from "@/types";

export const SITE = { name: "Lumera Development" };
export const TELEGRAM_URL = "https://t.me/lumeradeskbot";

export const RESOURCES = [
  { label: "Официальный сайт", display: "lumera-development.vercel.app", href: "https://lumera-development.vercel.app" },
  { label: "Telegram-канал", display: "t.me/lumera_dev", href: "https://t.me/lumera_dev" },
  { label: "Бот для заявок", display: "t.me/lumeradeskbot", href: "https://t.me/lumeradeskbot" },
  { label: "Владелец проекта", display: "t.me/kramsov", href: "https://t.me/kramsov" },
];

export const NAV = [
  { href: "#services", label: "Услуги" },
  { href: "#portfolio", label: "Проекты" },
  { href: "#pricing", label: "Цены" },
  { href: "#about", label: "О студии" },
  { href: "#contact", label: "Контакты" },
];

export const ADVANTAGES = [
  { title: "Под вашу задачу", text: "Не подгоняем задачу под шаблон: решение строится вокруг вашего процесса." },
  { title: "Современные технологии", text: "Next.js, TypeScript, Node.js: проект проще развивать и поддерживать." },
  { title: "Внимание к деталям", text: "Аккуратный интерфейс, понятные сценарии и чистый код." },
  { title: "Поддержка после запуска", text: "Дорабатываем и развиваем проект, когда он уже работает." },
];

export const SERVICES: Service[] = [
  { id: "telegram", title: "Telegram-разработка", icon: Bot, description: "Боты для заявок, продаж, поддержки и каналов.",
    features: ["Диалоги и меню под ваш сценарий", "Приём заявок и оплат", "Рассылки и панель управления"] },
  { id: "web", title: "Веб-разработка", icon: Globe, description: "Сайты и веб-приложения: от лендинга до сервиса с личным кабинетом.",
    features: ["Адаптивная вёрстка", "SEO-основа", "Удобное управление контентом"] },
  { id: "shop", title: "Интернет-магазины", icon: ShoppingCart, description: "Магазин на сайте или в Telegram.",
    features: ["Каталог и корзина", "Онлайн-оплата", "Учёт заказов"] },
  { id: "api", title: "API-интеграции", icon: Plug, description: "Связываем сервисы, чтобы данные не приходилось переносить вручную.",
    features: ["Платёжные системы и CRM", "Webhooks и обмен данными", "Синхронизация между системами"] },
  { id: "automation", title: "Автоматизация", icon: Workflow, description: "Передаём рутину скриптам и ботам.",
    features: ["Обработка заявок", "Уведомления и отчёты", "Скрипты под вашу задачу"] },
  { id: "admin", title: "Админ-панели", icon: LayoutDashboard, description: "Удобные панели для работы с данными и заказами.",
    features: ["Роли и права доступа", "Таблицы и фильтры", "Статистика"] },
];

export const CATEGORIES = ["Все", "Telegram", "Веб", "Магазины", "Админки"];

export const PROJECTS: Project[] = [
  { id: "p1", title: "Бот записи на услуги", category: "Telegram", description: "Запись клиентов на удобное время и автоматические напоминания.", stack: ["Node.js", "Telegram API"] },
  { id: "p2", title: "Магазин в Telegram", category: "Магазины", description: "Каталог, корзина и приём заказов прямо в боте.", stack: ["TypeScript", "Telegram API"] },
  { id: "p3", title: "Лендинг студии", category: "Веб", description: "Одностраничный сайт с формой заявок.", stack: ["Next.js", "Tailwind"] },
  { id: "p4", title: "Панель заказов", category: "Админки", description: "Таблицы, фильтры и статусы заказов в одном месте.", stack: ["Next.js", "REST API"] },
  { id: "p5", title: "Магазин одежды", category: "Магазины", description: "Витрина с каталогом и оформлением заказа.", stack: ["Next.js", "Stripe API"] },
  { id: "p6", title: "Бот с внешним API", category: "Telegram", description: "Бот, который получает и показывает данные стороннего сервиса.", stack: ["Node.js", "REST API"] },
];

export const PRICES: PriceItem[] = [
  { title: "Простой Telegram-бот", price: 20 },
  { title: "Telegram-магазин", price: 50 },
  { title: "Бот с API", price: 70 },
  { title: "Простой сайт", price: 50 },
  { title: "Административная панель", price: 50 },
];

// Списки совпадают с Lumera Desk: бот принимает только эти значения.
export const PROJECT_TYPES = ["Telegram-бот", "Сайт", "Интернет-магазин", "Веб-приложение", "API / интеграция", "Автоматизация", "Другое"];
export const BUDGETS = ["До $50", "$50–100", "$100–300", "$300–500", "$500+", "Не определён"];
