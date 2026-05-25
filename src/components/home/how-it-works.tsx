import Link from "next/link";
import { Star } from "@/components/decorations/star";

const steps = [
  {
    n: "01",
    slug: "base",
    title: "Основа",
    text: "Форма и характер сумки — крой, цвет, фактура.",
    color: "#171717",
    accent: "#cf5fa3",
  },
  {
    n: "02",
    slug: "bag",
    title: "Мешок",
    text: "Внутренний акцент. Цвет и материал, который выглядывает наружу.",
    color: "#7a2030",
    accent: "#ffffff",
  },
  {
    n: "03",
    slug: "strap",
    title: "Ремень",
    text: "Цепь, кожа, шёлк или паракорд. Меняет настроение целиком.",
    color: "#2a2a2a",
    accent: "#bdbdbd",
  },
  {
    n: "04",
    slug: "decor",
    title: "Декор",
    text: "Брелоки, звёзды, шипы. То, что делает сумку только твоей.",
    color: "#3a1850",
    accent: "#cf5fa3",
  },
];

export function HowItWorks() {
  return (
    <section className="mx-auto w-full max-w-[1280px] px-4 md:px-8 py-12 md:py-20">
      <div className="grid lg:grid-cols-[1fr_auto] gap-6 lg:gap-12 items-end mb-10 md:mb-14">
        <div>
          <div className="text-eyebrow text-muted-foreground mb-3">
            Как это работает
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-semibold text-ink tracking-tight leading-[1] max-w-xl">
            Четыре шага до своей сумки
          </h2>
        </div>
        <p className="text-sm md:text-base text-muted-foreground max-w-sm leading-relaxed">
          Каждый элемент шьём вручную, маленькими тиражами. После сборки
          упакуем твой комплект и отправим.
        </p>
      </div>

      <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
        {steps.map((s) => (
          <Link
            key={s.n}
            href={`/catalog?category=${s.slug}`}
            className="group relative aspect-[4/5] overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            style={{ backgroundColor: s.color }}
          >
            <Star
              variant="burst"
              className="absolute -top-8 -right-8 h-32 w-32 opacity-25 transition-transform duration-500 group-hover:rotate-12"
              color={s.accent}
            />
            <div className="absolute top-4 left-4 text-[11px] uppercase tracking-[0.22em] text-white/70">
              {s.n}
            </div>
            <div className="absolute inset-x-4 bottom-4 right-4">
              <div className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-white leading-[1]">
                {s.title}
              </div>
              <p className="mt-2 text-[13px] md:text-sm text-white/75 leading-relaxed line-clamp-3">
                {s.text}
              </p>
              <div className="mt-3 text-[11px] uppercase tracking-[0.22em] text-white/70 group-hover:text-accent transition-colors">
                Смотреть →
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
