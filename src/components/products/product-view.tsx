"use client";

import Link from "next/link";
import { useState } from "react";
import { Check, Heart, ShoppingBag, Sparkles } from "lucide-react";
import type { Product } from "@/lib/types";
import { categoryLabels } from "@/lib/types";
import { allProducts } from "@/lib/mock-data";
import { ProductImage } from "@/components/decorations/product-image";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/products/product-card";
import { useCartStore } from "@/store/cart-store";
import { useConstructorStore } from "@/store/constructor-store";
import { useRouter } from "next/navigation";
import { formatPrice, cn } from "@/lib/utils";

export function ProductView({ product }: { product: Product }) {
  const [added, setAdded] = useState(false);
  const [fav, setFav] = useState(false);
  const [thumb, setThumb] = useState(0);
  const addItem = useCartStore((s) => s.addItem);
  const selectBase = useConstructorStore((s) => s.selectBase);
  const router = useRouter();

  function handleAdd() {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  function handleStartConstructor() {
    selectBase(product);
    router.push("/constructor");
  }

  const related = allProducts
    .filter((p) => p.id !== product.id && p.category !== "set")
    .slice(0, 4);

  return (
    <div className="mx-auto w-full max-w-[1280px] px-4 md:px-8 py-6 md:py-12">
      <nav
        aria-label="Хлебные крошки"
        className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-6"
      >
        <Link href="/" className="hover:text-accent transition-colors">
          Главная
        </Link>
        <span className="mx-2 text-muted-foreground/50">/</span>
        <Link href="/catalog" className="hover:text-accent transition-colors">
          Каталог
        </Link>
        <span className="mx-2 text-muted-foreground/50">/</span>
        <span className="text-ink">{product.name}</span>
      </nav>

      <div className="grid gap-6 md:gap-10 lg:grid-cols-[1.2fr_1fr]">
        {/* Gallery */}
        <div className="flex flex-col gap-3">
          <div className="bg-surface relative">
            <ProductImage product={product} />
            {!product.inStock && (
              <span className="absolute top-4 left-4 bg-ink text-white text-[11px] uppercase tracking-[0.22em] px-2.5 py-1.5">
                Нет в наличии
              </span>
            )}
          </div>
          <div className="grid grid-cols-4 gap-2">
            {[0, 1, 2, 3].map((i) => (
              <button
                key={i}
                type="button"
                onClick={() => setThumb(i)}
                className={cn(
                  "aspect-square bg-surface transition-all",
                  thumb === i
                    ? "outline outline-2 outline-accent"
                    : "opacity-60 hover:opacity-100",
                )}
                aria-label={`Изображение ${i + 1}`}
                aria-current={thumb === i}
              >
                <ProductImage product={product} decorative={false} />
              </button>
            ))}
          </div>
        </div>

        {/* Details */}
        <div className="flex flex-col gap-5 lg:pl-4">
          <div className="text-eyebrow text-muted-foreground">
            {categoryLabels[product.category]}
          </div>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-ink leading-[0.95] tracking-tight">
            {product.name}
          </h1>
          <div className="text-2xl md:text-3xl font-semibold tracking-tight text-ink">
            {formatPrice(product.price)}
          </div>

          <p className="text-[15px] md:text-base text-foreground/80 leading-relaxed max-w-prose">
            {product.description}
          </p>

          <dl className="grid grid-cols-2 gap-x-6 gap-y-4 border-t border-b border-ink/10 py-5 text-sm">
            <div>
              <dt className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                Категория
              </dt>
              <dd className="text-ink mt-1">{categoryLabels[product.category]}</dd>
            </div>
            <div>
              <dt className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                Цвет
              </dt>
              <dd className="text-ink mt-1">{product.color}</dd>
            </div>
            <div>
              <dt className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                Материал
              </dt>
              <dd className="text-ink mt-1">{product.material}</dd>
            </div>
            <div>
              <dt className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                Наличие
              </dt>
              <dd
                className={cn(
                  "mt-1 inline-flex items-center gap-1.5",
                  product.inStock ? "text-ink" : "text-muted-foreground",
                )}
              >
                <span
                  className={cn(
                    "inline-block h-2 w-2 rounded-full",
                    product.inStock ? "bg-emerald-600" : "bg-red-500",
                  )}
                />
                {product.inStock ? "В наличии" : "Нет в наличии"}
              </dd>
            </div>
          </dl>

          <div className="flex gap-2">
            <Button
              onClick={handleAdd}
              disabled={!product.inStock}
              size="lg"
              className="flex-1"
            >
              {added ? (
                <>
                  <Check className="h-4 w-4" /> Добавлено
                </>
              ) : (
                <>
                  <ShoppingBag className="h-4 w-4" /> В корзину
                </>
              )}
            </Button>
            <Button
              variant="outline"
              size="lg"
              aria-label={fav ? "Убрать из избранного" : "В избранное"}
              aria-pressed={fav}
              onClick={() => setFav((f) => !f)}
              className={cn(
                "w-12 px-0 shrink-0",
                fav && "bg-accent text-accent-foreground border-accent",
              )}
            >
              <Heart className={cn("h-4 w-4", fav && "fill-current")} />
            </Button>
          </div>

          {product.category === "base" && (
            <Button
              variant="secondary"
              size="lg"
              onClick={handleStartConstructor}
              className="w-full"
            >
              <Sparkles className="h-4 w-4" /> Начать сборку с этой основы
            </Button>
          )}

          <details className="bg-surface px-5 py-4 group">
            <summary className="cursor-pointer text-[11px] uppercase tracking-[0.22em] text-ink list-none flex items-center justify-between">
              Доставка
              <span className="transition-transform group-open:rotate-45 text-xl leading-none">
                +
              </span>
            </summary>
            <div className="mt-3 text-sm text-foreground/80 space-y-2 leading-relaxed">
              <p>
                Отправляем по России и СНГ. Курьер и СДЭК — 1–7 дней в
                зависимости от региона. Самовывоз — по записи в Telegram.
              </p>
            </div>
          </details>
        </div>
      </div>

      <section className="mt-16 md:mt-20">
        <div className="text-eyebrow text-muted-foreground mb-2">
          Похожее
        </div>
        <h2 className="font-display text-3xl md:text-5xl font-semibold text-ink tracking-tight leading-[1] mb-8 md:mb-10">
          Подходит к образу
        </h2>
        <div className="grid gap-x-4 gap-y-10 grid-cols-2 lg:grid-cols-4">
          {related.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
