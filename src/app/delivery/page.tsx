import { Star } from "@/components/decorations/star";

export const metadata = { title: "Доставка — PURRMURE" };

const blocks = [
  {
    n: "01",
    title: "Самовывоз",
    text: "Можно забрать по записи — напиши в Telegram, договоримся об удобном времени.",
  },
  {
    n: "02",
    title: "Курьер и почта",
    text: "Отправляем СДЭКом и Boxberry. Сроки 1–7 дней в зависимости от региона. Стоимость считается на checkout.",
  },
  {
    n: "03",
    title: "Под заказ",
    text: "Если хочется кастом — цвет, материал, размер — напиши в Telegram. Мы маленькие, делаем гибко.",
  },
  {
    n: "04",
    title: "Упаковка",
    text: "Упаковываем сами, с любовью. Проверяем каждую вещь руками перед отправкой.",
  },
];

export default function DeliveryPage() {
  return (
    <div className="mx-auto w-full max-w-[1280px] px-4 md:px-8 py-8 md:py-16">
      <div className="relative bg-surface px-6 py-10 md:p-14 mb-8 md:mb-12 overflow-hidden">
        <Star
          variant="burst"
          className="absolute -top-4 right-6 md:right-10 h-20 w-20 md:h-24 md:w-24 text-accent"
        />
        <Star
          variant="burst"
          className="absolute -bottom-6 -left-6 h-32 w-32 text-ink/[0.06]"
        />
        <div className="text-eyebrow text-muted-foreground mb-3">
          Доставка
        </div>
        <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-semibold text-ink leading-[0.95] tracking-tight max-w-xl">
          Привозим бережно.
        </h1>
        <p className="mt-5 text-foreground/80 max-w-xl text-[15px] md:text-base leading-relaxed">
          Мы маленький бренд: упаковываем сами, проверяем каждую вещь руками
          перед отправкой.
        </p>
      </div>

      <div className="grid gap-3 md:gap-4 md:grid-cols-2 mb-8 md:mb-12">
        {blocks.map((b) => (
          <article key={b.title} className="bg-surface p-6 md:p-8">
            <div className="flex items-baseline gap-3 mb-2">
              <span className="text-eyebrow text-muted-foreground">
                {b.n}
              </span>
              <h2 className="font-display text-2xl md:text-3xl font-semibold text-ink leading-[1.1]">
                {b.title}
              </h2>
            </div>
            <p className="text-[15px] md:text-base text-foreground/80 leading-relaxed">
              {b.text}
            </p>
          </article>
        ))}
      </div>

      <div className="bg-ink text-white px-6 py-10 md:p-14 relative overflow-hidden">
        <Star
          variant="burst"
          className="absolute -top-6 -right-6 h-32 w-32 text-accent/15"
        />
        <h2 className="font-display text-3xl md:text-5xl font-semibold mb-4 leading-[1.05] tracking-tight">
          Если что-то не так — напиши
        </h2>
        <p className="text-white/80 max-w-2xl text-[15px] md:text-base leading-relaxed">
          Конструктор сумки — штука гибкая. Если деталь не подошла,
          разберёмся и подберём замену.
        </p>
      </div>
    </div>
  );
}
