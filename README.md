# COGNERA — Enterprise Skeleton

Это **скелет** под твой ТЗ: тарифы/лимиты, баланс, RLS, прайсинг, рефералы, тикеты, API-заглушки.

## Что тут есть
- `supabase/schema.sql` — все таблицы из твоего ТЗ + включён RLS (политики донастроить в Studio).
- `supabase/seed.sql` — стартовые сервисы и цены 1:1 как ты просил.
- `config/plans.ts` — лимиты/тиеры.
- `lib/access.ts` — функции canUseService/priceFor/... (пока skeleton, подключи Supabase).
- `.env.example` — все ключи.

## Как применить
1. Создай проект в Supabase → SQL Editor → выполни `schema.sql`, затем `seed.sql`.
2. Скопируй `.env.example` как `.env` и заполни ключи.
3. Подключи эти файлы в своё Next.js-приложение (роуты /api/* вызывают lib/access.ts).
4. Stripe/ЮKassa и админку добавляй поверх этого каркаса.

Если хочешь — я добавлю готовые `/app/api/*` файлы, auth по Telegram initData, Stripe/ЮKassa create-session/webhook и базовую админку.
