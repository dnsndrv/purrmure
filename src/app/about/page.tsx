import Link from "next/link";
import { Star, Flame } from "@/components/decorations/star";
import { Button } from "@/components/ui/button";

export const metadata = { title: "О бренде — PURRMURE" };

const values = [
  {
    n: "01",
    title: "Семейная мастерская",
    text: "PURRMURE делаем вдвоём с мамой. Каждую сумку шьём вручную — никакой фабрики, никакого конвейера.",
  },
  {
    n: "02",
    title: "Модульность",
    text: "Можно собрать свою сумку: основа, мешок, ремень, декор. А ещё у нас есть авоськи и кошельки — для тех, кто хочет что-то одно.",
  },
  {
    n: "03",
    title: "Растём вместе",
    text: "Мы только начинаем. Осваиваем новые материалы, пробуем формы, слушаем тех, кто нас поддерживает. Если откликается — будь рядом.",
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-[1280px] px-4 md:px-8 py-8 md:py-16">
      {/* Hero */}
      <div className="relative bg-ink text-white px-6 py-10 md:p-14 mb-8 md:mb-12 overflow-hidden">
        <Star
          variant="burst"
          className="absolute top-6 left-6 md:top-10 md:left-12 h-14 w-14 md:h-20 md:w-20 text-accent"
        />
        <Star
          variant="burst"
          className="absolute -bottom-10 right-6 md:right-10 h-32 w-32 md:h-40 md:w-40 text-accent/15"
        />
        <Flame className="absolute top-1/2 right-10 md:right-20 -translate-y-1/2 h-24 w-16 md:h-32 md:w-20 opacity-70 hidden sm:block" />
        <div className="relative max-w-2xl">
          <div className="text-eyebrow text-white/55 mb-4">Привет!</div>
          <h1 className="font-display font-bold text-4xl md:text-6xl lg:text-7xl leading-[0.92] tracking-tight">
            Меня зовут <span className="text-accent">Алиса</span>. <br />
            Это наш с мамой мини-бренд сумок-конструкторов.
          </h1>
        </div>
      </div>

      {/* Story */}
      <section className="bg-surface px-6 py-10 md:p-14 mb-8 md:mb-12 grid md:grid-cols-2 gap-8 md:gap-12 items-start">
        <div>
          <div className="text-eyebrow text-muted-foreground mb-3">
            Как всё началось
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-semibold text-ink leading-[1] tracking-tight">
            Сначала это была подработка для мамы на пенсии.
          </h2>
        </div>
        <div className="flex flex-col gap-4 text-foreground/85 text-[15px] md:text-base leading-relaxed">
          <p>
            Идея была простая: шить кастомные мешочки для других брендов. Но
            довольно быстро захотелось придумать что-то своё — и вот мы уже с
            мамой осваиваем новые материалы, формы и приёмы.
          </p>
          <p>
            Сейчас можем предложить свои дизайны{" "}
            <strong className="text-ink">основ, авосек, мешков, ремней</strong>{" "}
            и даже <strong className="text-ink">кошельков</strong>. Каждая
            вещь — ручная работа, маленьким тиражом.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="grid gap-4 md:gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-8 md:mb-12">
        {values.map((v) => (
          <article key={v.title} className="bg-surface p-6 md:p-8">
            <div className="text-eyebrow text-muted-foreground mb-2">
              {v.n}
            </div>
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-ink mb-3 leading-[1.1]">
              {v.title}
            </h2>
            <p className="text-[14px] md:text-[15px] text-foreground/80 leading-relaxed">
              {v.text}
            </p>
          </article>
        ))}
      </section>

      {/* CTA dark */}
      <section className="relative bg-ink text-white px-6 py-10 md:p-14 mb-8 md:mb-12 overflow-hidden">
        <Star
          variant="burst"
          className="absolute -top-6 -right-6 h-32 w-32 text-accent/15"
        />
        <Star
          variant="burst"
          className="absolute bottom-6 left-6 md:left-10 h-10 w-10 text-accent"
        />
        <div className="grid md:grid-cols-[1fr_auto] gap-6 md:gap-12 items-center">
          <div>
            <div className="text-eyebrow text-white/55 mb-3">
              И ещё немного честности
            </div>
            <h2 className="font-display text-3xl md:text-5xl font-semibold leading-[1.05] tracking-tight mb-5">
              Мы много трудились. Если откликнулось — приходи наблюдать, как я
              пытаюсь сделать нас с мамой богатыми и успешными леди.
            </h2>
            <p className="text-white/75 max-w-2xl text-[15px] md:text-base">
              Если интересно — напиши нам в Telegram. Там новые модели,
              закулисье мастерской и истории про каждую вещь.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/contacts">
              <Button variant="primary" size="lg">
                Написать в Telegram
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-surface px-6 py-10 md:p-14 grid md:grid-cols-2 gap-6 md:gap-12 items-center">
        <div>
          <div className="text-eyebrow text-muted-foreground mb-3">
            Спасибо за внимание
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-semibold text-ink mb-4 leading-[1.05] tracking-tight">
            Хочешь собрать свою?
          </h2>
          <p className="text-foreground/80 leading-relaxed text-[15px] md:text-base">
            В конструкторе можно собрать сумку из наших основ, мешков и ремней
            и докрутить деталями.
          </p>
        </div>
        <div className="flex flex-wrap justify-start md:justify-end gap-3">
          <Link href="/constructor">
            <Button size="lg">Собрать сумку</Button>
          </Link>
          <Link href="/catalog">
            <Button variant="outline" size="lg">
              В каталог
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
