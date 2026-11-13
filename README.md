# Lumera Development

```bash
npm install
npm run dev        # http://localhost:3000
npm run typecheck && npm run build && npm start
```

Настройка заявок: заполните `.env` (см. `.env.example`): `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`, `NEXT_PUBLIC_TELEGRAM_USERNAME`.
Без токена форма вернёт честное сообщение о том, что приём не настроен.
