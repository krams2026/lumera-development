# Lumera Development

```bash
npm install
npm run dev        # http://localhost:3000
npm run typecheck && npm run build && npm start
```

Заявки отправляются в Lumera Desk. В `.env` (или Variables на Vercel) задайте `LUMERA_DESK_URL` (домен сервиса Lumera Desk на Railway) и `LUMERA_DESK_API_SECRET` (тот же секрет, что `LEADS_API_SECRET` в боте). Токен бота сайту не нужен.

## Безопасность
- Заголовки (next.config.mjs): CSP, HSTS, X-Frame-Options, nosniff, Referrer-Policy, Permissions-Policy, COOP.
- `/api/lead`: проверка Origin и Sec-Fetch-Site (защита от CSRF), только `application/json`, тело ≤ 8 КБ, лимит 5 запросов за 10 минут с IP (в памяти экземпляра), honeypot, строгая валидация, необязательный Cloudflare Turnstile, повторная попытка к Desk, ответы без внутренних деталей.
- Адрес Lumera Desk берётся только из `LUMERA_DESK_URL`: https, без IP-адресов и localhost в production, редиректы не выполняются. Пользовательский ввод в URL не попадает.
- GET `/api/lead` без `DIAGNOSTICS_TOKEN` отвечает `{"ok":true}`. Диагностику с названиями недостающих переменных видит только владелец токена: `curl -H "Authorization: Bearer <DIAGNOSTICS_TOKEN>" https://<сайт>/api/lead`.
- Дополнительно в панели Vercel: Firewall → Rate Limit для пути `/api/lead` и Bot Protection.
