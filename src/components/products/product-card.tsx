"use client";

import Link from "next/link";
import { useState } from "react";
import { Heart } from "lucide-react";
import type { Product } from "@/lib/types";
import { categoryLabels } from "@/lib/types";
import { ProductImage } from "@/components/decorations/product-image";
import { formatPrice, cn } from "@/lib/utils";

export function ProductCard({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) {
  const [fav, setFav] = useState(false);
  return (
    <article
      className={cn(
        "group flex flex-col bg-transparent text-ink",
        className,
      )}
    >
      <Link
        href={`/product/${product.slug}`}
        className="block relative overflow-hidden bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
      >
        <ProductImage product={product} decorative={false} />
        <button
          type="button"
          aria-label={fav ? "Убрать из избранного" : "В избранное"}
          aria-pressed={fav}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setFav((f) => !f);
          }}
          className={cn(
            "absolute top-3 right-3 inline-flex h-9 w-9 items-center justify-center bg-white/90 backdrop-blur-sm transition-colors",
            "hover:bg-white",
            fav ? "text-accent" : "text-ink",
          )}
        >
          <Heart className={cn("h-4 w-4", fav && "fill-current")} />
        </button>
        {!product.inStock && (
          <span className="absolute top-3 left-3 bg-ink text-white text-[11px] uppercase tracking-[0.18em] px-2 py-1">
            Нет в наличии
          </span>
        )}
      </Link>
      <div className="flex flex-col gap-1 pt-4 pb-2">
        <div className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
          {categoryLabels[product.category]}
        </div>
        <h3 className="text-[15px] font-medium leading-snug">
          <Link
            href={`/product/${product.slug}`}
            className="hover:text-accent transition-colors"
          >
            {product.name}
          </Link>
        </h3>
        <div className="text-[15px] font-semibold tracking-tight mt-1">
          {formatPrice(product.price)}
        </div>
      </div>
    </article>
  );
}
