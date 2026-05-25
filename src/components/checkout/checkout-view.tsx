"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { Button } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui/input";
import { formatPrice } from "@/lib/utils";
import { Star } from "@/components/decorations/star";

export function CheckoutView() {
  const items = useCartStore((s) => s.items);
  const totalPrice = useCartStore((s) => s.totalPrice());
  const clearCart = useCartStore((s) => s.clearCart);

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    city: "",
    address: "",
    comment: "",
  });

  function onChange<K extends keyof typeof form>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    clearCart();
  }

  if (!mounted) {
    return <div className="mx-auto w-full max-w-[1280px] px-4 md:px-8 py-12" />;
  }

  if (submitted) {
    return (
      <div className="mx-auto w-full max-w-[1280px] px-4 md:px-8 py-10 md:py-20">
        <div className="relative bg-surface text-center py-14 md:py-20 px-6 max-w-2xl mx-auto overflow-hidden">
          <Star
            variant="burst"
            className="absolute top-4 right-6 h-12 w-12 text-accent"
          />
          <Star
            variant="burst"
            className="absolute -bottom-8 -left-8 h-32 w-32 text-accent/15"
          />
          <div className="mx-auto h-14 w-14 bg-accent text-accent-foreground inline-flex items-center justify-center mb-5">
            <Check className="h-7 w-7" />
          </div>
          <h1 className="font-display text-3xl md:text-5xl font-semibold text-ink mb-3 leading-[1.05] tracking-tight">
            Заказ создан <br />в тестовом режиме
          </h1>
          <p className="text-foreground/80 max-w-md mx-auto mb-7 text-[15px] leading-relaxed">
            Спасибо! Это демо: настоящего платежа и доставки нет. В реальной
            версии мы бы написали тебе в Telegram и отправили посылку.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/">
              <Button size="lg">На главную</Button>
            </Link>
            <Link href="/catalog">
              <Button variant="outline" size="lg">
                В каталог
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto w-full max-w-[1280px] px-4 md:px-8 py-10 md:py-20">
        <div className="text-eyebrow text-muted-foreground mb-2">
          Оформление
        </div>
        <h1 className="font-display text-4xl md:text-6xl font-semibold text-ink mb-6 leading-[0.95] tracking-tight">
          В корзине пусто
        </h1>
        <p className="text-foreground/80 mb-6 max-w-md text-[15px] leading-relaxed">
          Нечего оформлять. Загляни в каталог или собери сумку.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/catalog">
            <Button size="lg">В каталог</Button>
          </Link>
          <Link href="/constructor">
            <Button variant="outline" size="lg">
              Собрать сумку
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-[1280px] px-4 md:px-8 py-8 md:py-16">
      <div className="text-eyebrow text-muted-foreground mb-2">Шаг 2 из 2</div>
      <h1 className="font-display text-5xl md:text-7xl font-semibold text-ink leading-[0.95] tracking-tight mb-10">
        Оформление
      </h1>

      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <form
          onSubmit={onSubmit}
          className="bg-surface p-6 md:p-8 flex flex-col gap-5"
        >
          <h2 className="text-xs uppercase tracking-[0.22em] text-ink">
            Контактные данные
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Имя</Label>
              <Input
                id="name"
                required
                value={form.name}
                onChange={(e) => onChange("name", e.target.value)}
                placeholder="Анна"
              />
            </div>
            <div>
              <Label htmlFor="phone">Телефон</Label>
              <Input
                id="phone"
                required
                value={form.phone}
                onChange={(e) => onChange("phone", e.target.value)}
                placeholder="+7 (___) ___-__-__"
              />
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                required
                value={form.email}
                onChange={(e) => onChange("email", e.target.value)}
                placeholder="you@example.com"
              />
            </div>
          </div>

          <h2 className="text-xs uppercase tracking-[0.22em] text-ink mt-2">
            Доставка
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="city">Город</Label>
              <Input
                id="city"
                required
                value={form.city}
                onChange={(e) => onChange("city", e.target.value)}
                placeholder="Город"
              />
            </div>
            <div>
              <Label htmlFor="address">Адрес</Label>
              <Input
                id="address"
                required
                value={form.address}
                onChange={(e) => onChange("address", e.target.value)}
                placeholder="ул. Звёздная, 1, кв. 13"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="comment">Комментарий</Label>
            <Textarea
              id="comment"
              value={form.comment}
              onChange={(e) => onChange("comment", e.target.value)}
              placeholder="Например: предпочтения по упаковке"
            />
          </div>

          <Button type="submit" size="lg" className="self-start">
            Отправить заказ
          </Button>
          <p className="text-xs text-muted-foreground">
            Это тестовый режим: данные никуда не уходят, оплата не списывается.
          </p>
        </form>

        <aside className="bg-surface p-6 flex flex-col gap-4 lg:sticky lg:top-32 lg:self-start">
          <h2 className="text-xs uppercase tracking-[0.22em] text-ink">
            Состав заказа
          </h2>
          <ul className="flex flex-col divide-y divide-ink/10">
            {items.map((item) => (
              <li key={item.id} className="py-3 flex items-start justify-between gap-3">
                <div>
                  <div className="text-sm font-medium">
                    {item.type === "product"
                      ? item.product?.name
                      : "Собранная сумка"}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {item.type === "product"
                      ? `${item.product?.color} · ×${item.quantity}`
                      : `Комплект из ${
                          3 + (item.setItems?.decor?.length ?? 0)
                        } элементов`}
                  </div>
                </div>
                <div className="text-sm font-medium whitespace-nowrap">
                  {item.type === "product"
                    ? formatPrice((item.product?.price ?? 0) * item.quantity)
                    : formatPrice(item.setPrice ?? 0)}
                </div>
              </li>
            ))}
          </ul>
          <div className="border-t border-ink/10 pt-3 flex items-center justify-between">
            <span className="text-sm uppercase tracking-wider">Итого</span>
            <span className="text-2xl font-semibold">{formatPrice(totalPrice)}</span>
          </div>
        </aside>
      </div>
    </div>
  );
}
