"use client";

import { useMemo, useState, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { allProducts } from "@/lib/mock-data";
import { ProductCard } from "@/components/products/product-card";
import { categoryLabels, type ProductCategory } from "@/lib/types";
import { cn } from "@/lib/utils";

type SortMode = "default" | "asc" | "desc";

const cardCategories: { value: ProductCategory; label: string }[] = [
  { value: "base", label: "Основы" },
  { value: "bag", label: "Мешки" },
  { value: "strap", label: "Ремни" },
  { value: "decor", label: "Декор" },
];

const sideCategories: { value: ProductCategory | "all"; label: string }[] = [
  { value: "all", label: "Все позиции" },
  { value: "set", label: "Готовые сборки" },
];

const sorts: { value: SortMode; label: string }[] = [
  { value: "default", label: "По умолчанию" },
  { value: "asc", label: "Сначала дешевле" },
  { value: "desc", label: "Сначала дороже" },
];

export function CatalogView() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const urlCategory = (searchParams.get("category") ?? "all") as
    | ProductCategory
    | "all";

  const [category, setCategory] = useState<ProductCategory | "all">(urlCategory);
  const [sort, setSort] = useState<SortMode>("default");

  useEffect(() => {
    setCategory(urlCategory);
  }, [urlCategory]);

  const products = useMemo(() => {
    let list =
      category === "all"
        ? allProducts.filter((p) => p.category !== "set")
        : allProducts.filter((p) => p.category === category);
    if (sort === "asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "desc") list = [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [category, sort]);

  function changeCategory(c: ProductCategory | "all") {
    setCategory(c);
    const params = new URLSearchParams(searchParams.toString());
    if (c === "all") params.delete("category");
    else params.set("category", c);
    const qs = params.toString();
    router.replace(`${pathname}${qs ? `?${qs}` : ""}` as never, {
      scroll: false,
    });
  }

  const heading =
    category === "all" ? "Сумки" : categoryLabels[category as ProductCategory];

  return (
    <div className="mx-auto w-full max-w-[1280px] px-4 md:px-8 py-8 md:py-14">
      <div className="flex flex-col gap-2 mb-8 md:mb-12">
        <div className="text-eyebrow text-muted-foreground">Каталог</div>
        <h1 className="font-display text-5xl md:text-7xl font-semibold text-ink leading-[0.95] tracking-tight">
          {heading}
        </h1>
      </div>

      {/* Big category cards */}
      <div
        role="tablist"
        aria-label="Категории"
        className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4 mb-4 md:mb-6"
      >
        {cardCategories.map((c) => {
          const active = category === c.value;
          return (
            <button
              key={c.value}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => changeCategory(active ? "all" : c.value)}
              className={cn(
                "group relative h-20 md:h-24 lg:h-28 flex items-center justify-center",
                "font-display font-bold text-white text-2xl md:text-3xl lg:text-[40px] leading-none",
                "transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
                active
                  ? "bg-accent hover:bg-accent/90"
                  : "bg-[#a8a8a8] hover:bg-[#9a9a9a]",
              )}
            >
              <span className="px-3 text-center">{c.label}</span>
            </button>
          );
        })}
      </div>

      {/* Secondary filters + sort */}
      <div className="flex flex-col gap-3 mb-8 md:mb-10 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-x-5 gap-y-2 items-center text-[11px] uppercase tracking-[0.22em]">
          {sideCategories.map((c) => {
            const active = category === c.value;
            return (
              <button
                key={c.value}
                type="button"
                onClick={() => changeCategory(c.value)}
                className={cn(
                  "transition-colors",
                  active ? "text-accent" : "text-muted-foreground hover:text-ink",
                )}
              >
                {c.label}
              </button>
            );
          })}
          <span className="text-muted-foreground/60 normal-case tracking-normal">
            · {products.length} {pluralize(products.length)}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <label
            htmlFor="sort"
            className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground shrink-0"
          >
            Сортировка
          </label>
          <select
            id="sort"
            value={sort}
            onChange={(e) => setSort(e.target.value as SortMode)}
            className="h-10 bg-transparent border border-ink/25 hover:border-ink px-3 text-sm focus:outline-none focus:border-accent transition-colors"
          >
            {sorts.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {products.length === 0 ? (
        <div className="py-20 text-center text-muted-foreground">
          В этой категории пока пусто.
        </div>
      ) : (
        <div className="grid gap-x-4 gap-y-10 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}

function pluralize(n: number) {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return "позиция";
  if ([2, 3, 4].includes(mod10) && ![12, 13, 14].includes(mod100))
    return "позиции";
  return "позиций";
}
