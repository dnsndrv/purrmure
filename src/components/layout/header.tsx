"use client";

import Link from "next/link";
import { useState } from "react";
import { Heart, Menu, Search, User, X } from "lucide-react";
import { Logo } from "./logo";
import { CartIndicator } from "./cart-indicator";
import { Star } from "@/components/decorations/star";

const nav = [
  { href: "/catalog", label: "Сумки" },
  { href: "/constructor", label: "Конструктор" },
  { href: "/catalog?category=decor", label: "Декор" },
  { href: "/delivery", label: "Доставка" },
  { href: "/about", label: "О нас" },
  { href: "/contacts", label: "Контакты" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  function comingSoon(label: string) {
    setToast(`${label}: будет в следующей версии`);
    window.clearTimeout((comingSoon as unknown as { _t?: number })._t);
    (comingSoon as unknown as { _t?: number })._t = window.setTimeout(
      () => setToast(null),
      2000,
    );
  }

  return (
    <header className="sticky top-0 z-40 bg-ink text-white">
      {/* Top bar */}
      <div className="relative mx-auto w-full max-w-[1280px] px-4 md:px-8">
        {/* Decorative shapes: grey star, purple flame, pink star */}
        <div
          aria-hidden="true"
          className="hidden lg:block pointer-events-none absolute inset-0 overflow-hidden"
        >
          <Star
            variant="burst"
            className="absolute top-1/2 left-[38%] -translate-y-1/2 h-14 w-14 rotate-[18deg] text-white/35"
          />
          <Star
            variant="burst"
            className="absolute top-1/2 left-[58%] -translate-y-1/2 h-24 w-24 -rotate-[10deg] text-accent"
          />
        </div>

        <div className="relative flex items-center justify-between h-20 md:h-24">
          <button
            type="button"
            aria-label="Меню"
            onClick={() => setOpen((o) => !o)}
            className="md:hidden inline-flex h-11 w-11 -ml-2 items-center justify-center text-white hover:text-accent transition-colors"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          <Logo size="lg" />

          <div className="flex items-center gap-0.5 md:gap-1 -mr-2">
            <button
              type="button"
              aria-label="Поиск"
              onClick={() => comingSoon("Поиск")}
              className="hidden sm:inline-flex h-11 w-11 items-center justify-center text-white/90 hover:text-accent transition-colors"
            >
              <Search className="h-[18px] w-[18px]" />
            </button>
            <button
              type="button"
              aria-label="Профиль"
              onClick={() => comingSoon("Профиль")}
              className="hidden sm:inline-flex h-11 w-11 items-center justify-center text-white/90 hover:text-accent transition-colors"
            >
              <User className="h-[18px] w-[18px]" />
            </button>
            <button
              type="button"
              aria-label="Избранное"
              onClick={() => comingSoon("Избранное")}
              className="hidden sm:inline-flex h-11 w-11 items-center justify-center text-white/90 hover:text-accent transition-colors"
            >
              <Heart className="h-[18px] w-[18px]" />
            </button>
            <CartIndicator />
          </div>
        </div>
      </div>

      {/* Desktop nav strip — distinct grey band */}
      <nav className="hidden md:block bg-[#262626]">
        <div className="mx-auto w-full max-w-[1280px] px-2 md:px-4">
          <ul className="flex items-stretch h-12 font-display font-normal text-[18px] md:text-[19px] lg:text-[20px] uppercase tracking-[0.04em]">
            {nav.map((item, i) => (
              <li
                key={item.href}
                className="flex-1 flex items-stretch"
              >
                {i > 0 && (
                  <span
                    aria-hidden="true"
                    className="self-center text-white/35 select-none text-xl font-sans font-light"
                  >
                    |
                  </span>
                )}
                <Link
                  href={item.href}
                  className="flex-1 inline-flex items-center justify-center text-white/90 hover:text-accent transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile nav */}
      {open && (
        <nav className="md:hidden bg-ink border-t border-white/10">
          <ul className="flex flex-col">
            {nav.map((item) => (
              <li key={item.href} className="border-b border-white/10 last:border-b-0">
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block px-4 h-12 leading-[3rem] text-[13px] uppercase tracking-[0.22em] text-white/90 hover:text-accent transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="flex items-center justify-center gap-2 py-2 text-white/80">
              <button
                type="button"
                aria-label="Поиск"
                onClick={() => comingSoon("Поиск")}
                className="inline-flex h-11 w-11 items-center justify-center hover:text-accent transition-colors"
              >
                <Search className="h-5 w-5" />
              </button>
              <button
                type="button"
                aria-label="Профиль"
                onClick={() => comingSoon("Профиль")}
                className="inline-flex h-11 w-11 items-center justify-center hover:text-accent transition-colors"
              >
                <User className="h-5 w-5" />
              </button>
              <button
                type="button"
                aria-label="Избранное"
                onClick={() => comingSoon("Избранное")}
                className="inline-flex h-11 w-11 items-center justify-center hover:text-accent transition-colors"
              >
                <Heart className="h-5 w-5" />
              </button>
            </li>
          </ul>
        </nav>
      )}

      {toast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-ink text-white px-4 py-2.5 text-xs uppercase tracking-[0.18em] border border-accent/50 shadow-lg"
        >
          {toast}
        </div>
      )}
    </header>
  );
}
