"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import type { CartItem } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { ProductImage } from "@/components/decorations/product-image";
import { formatPrice, cn } from "@/lib/utils";
import { Star } from "@/components/decorations/star";

export function CartView() {
  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const totalPrice = useCartStore((s) => s.totalPrice());
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className="mx-auto w-full max-w-[1280px] px-4 md:px-8 py-10 md:py-16">
        <h1 className="font-display text-5xl md:text-7xl font-semibold text-ink leading-[0.95] tracking-tight">
          Корзина
        </h1>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto w-full max-w-[1280px] px-4 md:px-8 py-10 md:py-16">
        <div className="text-eyebrow text-muted-foreground mb-2">Корзина</div>
        <h1 className="font-display text-5xl md:text-7xl font-semibold text-ink leading-[0.95] tracking-tight mb-10">
          Пока пусто
        </h1>
        <div className="relative bg-surface text-left py-14 px-6 md:px-14 max-w-3xl overflow-hidden">
          <Star
            variant="burst"
            className="absolute top-6 right-6 h-12 w-12 text-accent"
          />
          <Star
            variant="burst"
            className="absolute -bottom-8 -left-8 h-32 w-32 text-ink/5"
          />
          <ShoppingBag className="h-10 w-10 text-ink/40 mb-4" />
          <p className="text-base md:text-lg text-ink leading-relaxed max-w-lg mb-6">
            Собери первую сумку из основы, мешка, ремня и декора. Или загляни
            в готовые сборки.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/constructor">
              <Button size="lg">Собрать сумку</Button>
            </Link>
            <Link href="/catalog?category=set">
              <Button variant="outline" size="lg">
                Готовые сборки
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-[1280px] px-4 md:px-8 py-10 md:py-16">
      <div className="text-eyebrow text-muted-foreground mb-2">Корзина</div>
      <h1 className="font-display text-5xl md:text-7xl font-semibold text-ink leading-[0.95] tracking-tight mb-10">
        Оформление
      </h1>

      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        <ul className="flex flex-col divide-y divide-ink/10 border-t border-b border-ink/10">
          {items.map((item) => (
            <li key={item.id} className="py-4 md:py-6">
              {item.type === "product" && item.product ? (
                <ProductRow
                  item={item}
                  onRemove={() => removeItem(item.id)}
                  onUpdate={(q) => updateQuantity(item.id, q)}
                />
              ) : item.type === "set" && item.setItems ? (
                <SetRow item={item} onRemove={() => removeItem(item.id)} />
              ) : null}
            </li>
          ))}
        </ul>

        <aside className="lg:sticky lg:top-32 lg:self-start bg-surface p-6 md:p-7 flex flex-col gap-4">
          <h2 className="text-eyebrow text-ink">Итого</h2>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Позиций</span>
            <span>{items.length}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Доставка</span>
            <span className="text-right">Рассчитаем на checkout</span>
          </div>
          <div className="border-t border-ink/15 pt-4 flex items-baseline justify-between">
            <span className="text-sm uppercase tracking-[0.18em]">К оплате</span>
            <span className="text-3xl font-semibold tracking-tight">
              {formatPrice(totalPrice)}
            </span>
          </div>
          <Link href="/checkout" className="block">
            <Button size="lg" className="w-full">
              Оформить заказ
            </Button>
          </Link>
          <Link
            href="/catalog"
            className="text-[11px] text-center text-muted-foreground hover:text-accent uppercase tracking-[0.22em] transition-colors"
          >
            ← Продолжить покупки
          </Link>
        </aside>
      </div>
    </div>
  );
}

function ProductRow({
  item,
  onRemove,
  onUpdate,
}: {
  item: CartItem;
  onRemove: () => void;
  onUpdate: (q: number) => void;
}) {
  if (!item.product) return null;
  const product = item.product;
  return (
    <div className="flex gap-4 md:gap-6">
      <Link
        href={`/product/${product.slug}`}
        className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0 bg-surface block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
      >
        <ProductImage product={product} decorative={false} />
      </Link>
      <div className="flex-1 flex flex-col min-w-0">
        <Link
          href={`/product/${product.slug}`}
          className="text-[15px] md:text-base font-medium hover:text-accent transition-colors leading-snug"
        >
          {product.name}
        </Link>
        <div className="text-xs text-muted-foreground mt-1">
          {product.color} · {product.material}
        </div>
        <div className="mt-auto pt-3 flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center border border-ink/20">
            <button
              type="button"
              onClick={() => onUpdate(item.quantity - 1)}
              className="h-11 w-11 inline-flex items-center justify-center hover:bg-surface-2 transition-colors"
              aria-label="Уменьшить количество"
            >
              <Minus className="h-3.5 w-3.5" />
            </button>
            <span className="w-10 text-center text-sm tabular-nums">
              {item.quantity}
            </span>
            <button
              type="button"
              onClick={() => onUpdate(item.quantity + 1)}
              className="h-11 w-11 inline-flex items-center justify-center hover:bg-surface-2 transition-colors"
              aria-label="Увеличить количество"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>
          <div className="text-base md:text-lg font-semibold tracking-tight">
            {formatPrice(product.price * item.quantity)}
          </div>
        </div>
      </div>
      <button
        type="button"
        onClick={onRemove}
        className="self-start h-11 w-11 inline-flex items-center justify-center text-muted-foreground hover:text-red-600 transition-colors"
        aria-label="Удалить из корзины"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );
}

function SetRow({
  item,
  onRemove,
}: {
  item: CartItem;
  onRemove: () => void;
}) {
  if (!item.setItems) return null;
  const { base, bag, strap, decor } = item.setItems;
  const decorCount = decor.length;
  const elementCount = 3 + decorCount;
  const elementWord =
    elementCount === 1 ? "элемента" : "элементов";
  return (
    <div className="flex gap-4 md:gap-6">
      <div className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0 bg-ink relative overflow-hidden">
        {base ? (
          <ProductImage product={base} decorative={false} />
        ) : (
          <div className="w-full h-full bg-surface-2" />
        )}
        <span className="absolute bottom-1 left-1 bg-accent text-white text-[10px] uppercase tracking-[0.18em] px-1.5 py-0.5">
          Сборка
        </span>
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[15px] md:text-base font-medium leading-snug">
          Собранная сумка
        </div>
        <div className="text-xs text-muted-foreground mt-1 mb-2">
          Комплект из {elementCount} {elementWord}
        </div>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-[12px] md:text-[13px]">
          <SetItem label="Основа" name={base?.name} />
          <SetItem label="Мешок" name={bag?.name} />
          <SetItem label="Ремень" name={strap?.name} />
          <SetItem
            label="Декор"
            name={decorCount > 0 ? decor.map((d) => d.name).join(", ") : "—"}
          />
        </ul>
      </div>
      <div className="flex flex-col items-end justify-between gap-3">
        <button
          type="button"
          onClick={onRemove}
          className="h-11 w-11 inline-flex items-center justify-center text-muted-foreground hover:text-red-600 transition-colors"
          aria-label="Удалить комплект"
        >
          <Trash2 className="h-4 w-4" />
        </button>
        <div className="text-base md:text-lg font-semibold tracking-tight whitespace-nowrap">
          {formatPrice(item.setPrice ?? 0)}
        </div>
      </div>
    </div>
  );
}

function SetItem({ label, name }: { label: string; name?: string }) {
  return (
    <div className={cn("flex gap-1.5", !name && "text-muted-foreground")}>
      <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground shrink-0 leading-[1.5]">
        {label}:
      </span>
      <span className="truncate leading-snug">{name ?? "—"}</span>
    </div>
  );
}
