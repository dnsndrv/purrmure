"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import { useCartStore } from "@/store/cart-store";

export function CartIndicator() {
  const itemCount = useCartStore((s) => s.itemCount());
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const count = mounted ? itemCount : 0;
  return (
    <Link
      href="/cart"
      aria-label={
        count > 0 ? `Корзина: ${count} позиций` : "Корзина: пусто"
      }
      className="relative inline-flex items-center justify-center h-11 w-11 text-white hover:text-accent transition-colors"
    >
      <ShoppingBag className="h-[18px] w-[18px]" />
      {count > 0 && (
        <span
          aria-hidden="true"
          className="absolute top-1.5 right-1.5 bg-accent text-accent-foreground text-[10px] font-semibold min-w-[18px] h-[18px] px-1 rounded-full inline-flex items-center justify-center"
        >
          {count}
        </span>
      )}
    </Link>
  );
}
