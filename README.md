# green-api-chat

Чат для Telegram-инстанса [GREEN-API](https://green-api.com/telegram/docs/). Вход по `idInstance` и `apiTokenInstance`, новый чат по номеру телефона, текстовые сообщения в обе стороны.

Номер при создании чата проверяется через `checkAccount`. Исходящие сообщения уходят через `sendMessage`. Входящие забираются циклом `receiveNotification` -> обработка -> `deleteNotification`. В списке только чаты, созданные в этом приложении. Из входящих сохраняются `textMessage` и `extendedTextMessage`.

Переписка хранится в браузере, журнал GREEN-API не используется. Сессия лежит в sessionStorage и пропадает вместе с вкладкой. Чаты и сообщения лежат в localStorage и остаются после закрытия: у каждого инстанса свой список, в чате последние 200 сообщений.

## Запуск

Нужны Node.js и pnpm.

```bash
cp .env.example .env
pnpm install
pnpm dev
```

В `.env` задаётся только адрес API, `VITE_GREEN_API_URL`. Учётные данные инстанса вводятся на экране входа.

Сборка и проверка собранного приложения:

```bash
pnpm build
pnpm preview
```

## Стек

React, TypeScript, Vite, Material UI, React Router, Axios, React Hook Form, Zod, Zustand, FSD.
