import Link from "next/link";
import { Star } from "@/components/decorations/star";

const categories = [
  { slug: "base", title: "Основы", color: "#171717", accent: "#cf5fa3" },
  { slug: "bag", title: "Мешки", color: "#7a2030", accent: "#ffffff" },
  { slug: "strap", title: "Ремни", color: "#2a2a2a", accent: "#bdbdbd" },
  { slug: "decor", title: "Декор", color: "#3a1850", accent: "#cf5fa3" },
];

export function Categories() {
  return (
    <section className="mx-auto w-full max-w-[1280px] px-4 md:px-8 py-12 md:py-20">
      <div className="flex items-end justify-between mb-8 md:mb-10 flex-wrap gap-3">
        <div>
          <div className="text-eyebrow text-muted-foreground mb-2">
            Категории
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-semibold text-ink tracking-tight leading-[1]">
            Найди свой элемент
          </h2>
        </div>
        <Link
          href="/catalog"
          className="text-[11px] uppercase tracking-[0.22em] text-ink hover:text-accent transition-colors"
        >
          Весь каталог →
        </Link>
      </div>
      <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
        {categories.map((c, i) => (
          <Link
            key={c.slug}
            href={`/catalog?category=${c.slug}`}
            className="group relative aspect-[4/5] overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            style={{ backgroundColor: c.color }}
            aria-label={`Категория: ${c.title}`}
          >
            <Star
              variant="burst"
              className="absolute -top-8 -right-8 h-32 w-32 opacity-25 transition-transform duration-500 group-hover:rotate-12"
              color={c.accent}
            />
            <div className="absolute top-4 left-4 text-[11px] uppercase tracking-[0.22em] text-white/70">
              0{i + 1}
            </div>
            <div className="absolute inset-x-4 bottom-4">
              <div className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-white">
                {c.title}
              </div>
              <div className="mt-1.5 text-[11px] uppercase tracking-[0.22em] text-white/70 group-hover:text-accent transition-colors">
                Смотреть →
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
