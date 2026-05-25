import Link from "next/link";
import { sets } from "@/lib/mock-data";
import { ProductCard } from "@/components/products/product-card";

export function FeaturedSets() {
  const featured = sets.slice(0, 4);
  return (
    <section className="mx-auto w-full max-w-[1280px] px-4 md:px-8 py-12 md:py-20">
      <div className="flex items-end justify-between mb-8 md:mb-10 flex-wrap gap-3">
        <div>
          <div className="text-eyebrow text-muted-foreground mb-2">
            Готовые сборки
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-semibold text-ink tracking-tight leading-[1]">
            Образ на сегодня
          </h2>
        </div>
        <Link
          href="/catalog?category=set"
          className="text-[11px] uppercase tracking-[0.22em] text-ink hover:text-accent transition-colors"
        >
          Смотреть все →
        </Link>
      </div>
      <div className="grid gap-x-4 gap-y-10 grid-cols-2 lg:grid-cols-4">
        {featured.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
