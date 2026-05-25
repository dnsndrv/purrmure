# PURRMURE — конструктор модульных сумок (MVP)

Кликабельная демо-версия e-commerce сайта бренда модульных сумок Purrmure.
Цель — проверить идею: пользователь собирает сумку из основы, мешка, ремня и
декора, видит цену и состав, кладёт комплект в корзину и проходит checkout.

> Это **тестовая** версия. Без реального бэкенда, базы, оплаты и авторизации.
> Все данные — mock в TypeScript-файлах.

## Стек

- **Next.js 15** (App Router, статика + SSG)
- **TypeScript** (strict)
- **Tailwind CSS v4**
- **Zustand** — состояние корзины и конструктора (с persist для корзины)
- **lucide-react** — иконки
- **shadcn/ui-style** — собственные минимальные UI-примитивы под стиль бренда (`Button`, `Badge`, `Input`, `Label`, `Textarea`)
- **next/font** — Inter (body) + локальный Angst (заголовки, hero, логотип)

## Установка и запуск

```bash
npm install
npm run dev
```

Открыть [http://localhost:3000](http://localhost:3000).

```bash
npm run build && npm start   # production-сборка
```

## Страницы

| Путь                  | Что внутри |
| --------------------- | ---------- |
| `/`                   | Главная: hero, готовые сборки, как это работает, категории, о бренде |
| `/catalog`            | Каталог с фильтром по категории и сортировкой |
| `/constructor`        | Конструктор сумок (4 шага + sticky preview) |
| `/product/[slug]`     | Карточка товара |
| `/cart`               | Корзина (товары + сборки с раскрытым составом) |
| `/checkout`           | Форма-заглушка + success state |
| `/delivery`           | Доставка и возврат |
| `/about`              | О бренде |
| `/contacts`           | Контакты |

## Структура

```
src/
  app/                     # роуты App Router
  components/
    layout/                # header, footer, logo, section
    home/                  # блоки главной
    catalog/               # фильтр + сетка
    constructor/           # шаги + preview
    products/              # карточка и detail-view
    cart/                  # список + sticky summary
    checkout/              # форма + success
    decorations/           # SVG-звёзды, пламя, заглушки изображений
    ui/                    # button, badge, input
  lib/
    types.ts               # ProductCategory, Product, CartItem, ConstructorItems
    mock-data.ts           # 10×5 = 50 сущностей + isCompatible()
    utils.ts               # cn(), formatPrice()
  store/
    cart-store.ts          # Zustand + persist
    constructor-store.ts   # Zustand (in-memory)
```

## Данные

Mock data в `src/lib/mock-data.ts` — 10 основ, 10 мешков, 10 ремней,
10 декора и 10 готовых сборок. Каждый товар имеет `id`, `slug`, `category`,
`name`, `price`, `description`, `image`, `color`, `material`, `inStock`,
опционально `compatibleWith` и `tags`. Сборки дополнительно содержат
`setItems` со ссылками на составляющие.

## Совместимость

`isCompatible(product, selectedBaseId)`:

- если `compatibleWith` отсутствует или пустой — товар совместим со всем;
- иначе товар доступен только когда выбранная основа есть в списке.

В конструкторе несовместимые карточки серые и `disabled`.

## Шрифты

- **Body / UI** — Inter (Google Fonts, кириллица).
- **Display / заголовки / логотип** — Angst (Misha Ivanov), три начертания:
  Thin / Normal / Bold, подключены локально из `src/app/fonts/*.woff2`
  через `next/font/local`. Класс `.font-display`.
- **Editorial accent** — Angst Bold Serif (высококонтрастный didone-стиль),
  используется в hero для слова «сумок». Класс `.font-display-serif`.

## Состояние

### `useCartStore`
- `items: CartItem[]`
- `addItem(product, quantity?)`
- `addSet(items, totalPrice)`
- `removeItem(id)`, `updateQuantity(id, quantity)`, `clearCart()`
- `totalPrice()`, `itemCount()`
- Сохраняется в `localStorage` через middleware `persist`.

### `useConstructorStore`
- `selectedBase`, `selectedBag`, `selectedStrap`, `selectedDecor[]`
- `selectBase`, `selectBag`, `selectStrap`, `toggleDecor`
- `resetConstructor()`, `totalPrice()`, `isComplete()`
- При смене основы автоматически сбрасывает несовместимые элементы.

## Адаптив

- Max content width: 1280 px.
- Сетки: 4 колонки → 2 → 1.
- Header: бургер-меню на мобиле.
- Конструктор: preview сверху на мобиле, sticky справа на десктопе.

## Что НЕ сделано (намеренно)

- Реальный backend, оплата, авторизация.
- CMS и админка.
- Поиск, избранное на бэке (только локальный toggle в UI).
- Чекаут хранение заказа — просто success state и очистка корзины.

Всё остальное — рабочее: переходы, конструктор, корзина, checkout-заглушка
с success-экраном.
