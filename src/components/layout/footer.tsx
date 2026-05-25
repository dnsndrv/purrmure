import Link from "next/link";
import { Logo } from "./logo";
import { Star } from "@/components/decorations/star";

export function Footer() {
  return (
    <footer className="bg-ink text-white/85 mt-12 md:mt-20 relative overflow-hidden">
      <Star
        variant="burst"
        className="absolute -top-8 -right-8 h-32 w-32 text-accent/15 rotate-12 pointer-events-none"
      />
      <div className="mx-auto w-full max-w-[1280px] px-4 md:px-8 py-12 md:py-16 grid gap-10 md:grid-cols-4 relative">
        <div className="md:col-span-1">
          <Logo />
          <p className="mt-4 text-[14px] md:text-sm leading-relaxed text-white/70 max-w-xs">
            Мини-бренд сумок-конструкторов. Шьём вручную, вдвоём с мамой.
          </p>
        </div>
        <div>
          <div className="text-[11px] uppercase tracking-[0.22em] text-white/55 mb-4">
            Магазин
          </div>
          <ul className="space-y-2.5 text-[14px]">
            <li><Link href="/catalog" className="hover:text-accent transition-colors">Каталог</Link></li>
            <li><Link href="/constructor" className="hover:text-accent transition-colors">Конструктор</Link></li>
            <li><Link href="/catalog?category=set" className="hover:text-accent transition-colors">Готовые сборки</Link></li>
            <li><Link href="/catalog?category=decor" className="hover:text-accent transition-colors">Декор</Link></li>
          </ul>
        </div>
        <div>
          <div className="text-[11px] uppercase tracking-[0.22em] text-white/55 mb-4">
            Сервис
          </div>
          <ul className="space-y-2.5 text-[14px]">
            <li><Link href="/delivery" className="hover:text-accent transition-colors">Доставка</Link></li>
            <li><Link href="/about" className="hover:text-accent transition-colors">О бренде</Link></li>
            <li><Link href="/contacts" className="hover:text-accent transition-colors">Контакты</Link></li>
          </ul>
        </div>
        <div>
          <div className="text-[11px] uppercase tracking-[0.22em] text-white/55 mb-4">
            Связь
          </div>
          <ul className="space-y-2.5 text-[14px] text-white/80">
            <li>hello@purrmure.test</li>
            <li>@purrmure</li>
            <li>Hand-made</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto w-full max-w-[1280px] px-4 md:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] uppercase tracking-[0.22em] text-white/55">
          <span>© {new Date().getFullYear()} PURRMURE · сделано вручную</span>
          <span>Алиса и мама</span>
        </div>
      </div>
    </footer>
  );
}
