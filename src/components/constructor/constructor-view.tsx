"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Check, RotateCcw, ShoppingBag } from "lucide-react";
import { bases, bags, straps, decors, isCompatible } from "@/lib/mock-data";
import type { Product, ProductCategory } from "@/lib/types";
import { useConstructorStore } from "@/store/constructor-store";
import { useCartStore } from "@/store/cart-store";
import { ProductImage } from "@/components/decorations/product-image";
import { Button } from "@/components/ui/button";
import { Star } from "@/components/decorations/star";
import { formatPrice, cn } from "@/lib/utils";

type StepKey = "base" | "bag" | "strap" | "decor";

const steps: { key: StepKey; label: string; n: string; required: boolean }[] = [
  { key: "base", label: "Основа", n: "01", required: true },
  { key: "bag", label: "Мешок", n: "02", required: true },
  { key: "strap", label: "Ремень", n: "03", required: true },
  { key: "decor", label: "Декор", n: "04", required: false },
];

const stepProducts: Record<StepKey, Product[]> = {
  base: bases,
  bag: bags,
  strap: straps,
  decor: decors,
};

export function ConstructorView() {
  const [step, setStep] = useState<StepKey>("base");
  const [added, setAdded] = useState(false);
  const [mounted, setMounted] = useState(false);

  const selectedBase = useConstructorStore((s) => s.selectedBase);
  const selectedBag = useConstructorStore((s) => s.selectedBag);
  const selectedStrap = useConstructorStore((s) => s.selectedStrap);
  const selectedDecor = useConstructorStore((s) => s.selectedDecor);
  const selectBase = useConstructorStore((s) => s.selectBase);
  const selectBag = useConstructorStore((s) => s.selectBag);
  const selectStrap = useConstructorStore((s) => s.selectStrap);
  const toggleDecor = useConstructorStore((s) => s.toggleDecor);
  const resetConstructor = useConstructorStore((s) => s.resetConstructor);
  const addSet = useCartStore((s) => s.addSet);

  useEffect(() => {
    setMounted(true);
  }, []);

  const baseId = selectedBase?.id ?? null;
  const totalPrice =
    (selectedBase?.price ?? 0) +
    (selectedBag?.price ?? 0) +
    (selectedStrap?.price ?? 0) +
    selectedDecor.reduce((acc, d) => acc + d.price, 0);
  const isComplete = !!(selectedBase && selectedBag && selectedStrap);

  function isSelected(p: Product): boolean {
    if (p.category === "base") return selectedBase?.id === p.id;
    if (p.category === "bag") return selectedBag?.id === p.id;
    if (p.category === "strap") return selectedStrap?.id === p.id;
    if (p.category === "decor") return selectedDecor.some((d) => d.id === p.id);
    return false;
  }

  function handlePick(p: Product) {
    if (!p.inStock) return;
    if (!isCompatible(p, baseId) && p.category !== "base") return;
    switch (p.category as ProductCategory) {
      case "base":
        selectBase(selectedBase?.id === p.id ? null : p);
        break;
      case "bag":
        selectBag(selectedBag?.id === p.id ? null : p);
        break;
      case "strap":
        selectStrap(selectedStrap?.id === p.id ? null : p);
        break;
      case "decor":
        toggleDecor(p);
        break;
    }
  }

  function handleAddSet() {
    if (!isComplete) return;
    addSet(
      {
        base: selectedBase,
        bag: selectedBag,
        strap: selectedStrap,
        decor: selectedDecor,
      },
      totalPrice,
    );
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      resetConstructor();
      setStep("base");
    }, 2500);
  }

  function handlePickAndMaybeAdvance(p: Product) {
    handlePick(p);
    if (p.category === "decor") return;
    if (!p.inStock) return;
    if (p.category !== "base" && !isCompatible(p, baseId)) return;
    const isDeselect =
      (p.category === "base" && selectedBase?.id === p.id) ||
      (p.category === "bag" && selectedBag?.id === p.id) ||
      (p.category === "strap" && selectedStrap?.id === p.id);
    if (isDeselect) return;
    const idx = steps.findIndex((s) => s.key === step);
    const next = steps[idx + 1];
    if (next) {
      setTimeout(() => setStep(next.key), 250);
    }
  }

  const products = stepProducts[step];

  if (!mounted) {
    return (
      <div className="mx-auto w-full max-w-[1280px] px-4 md:px-8 py-8 md:py-14">
        <h1 className="font-display text-5xl md:text-7xl font-semibold text-ink leading-[0.95] tracking-tight">
          Конструктор
        </h1>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-[1280px] px-4 md:px-8 py-8 md:py-14">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8 md:mb-12">
        <div>
          <div className="text-eyebrow text-muted-foreground mb-2">
            Конструктор
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-semibold text-ink leading-[0.92] tracking-tight">
            Собери <br className="hidden sm:block" />
            свою сумку
          </h1>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={resetConstructor}
          className="self-start md:self-end"
        >
          <RotateCcw className="h-3.5 w-3.5" /> Сбросить
        </Button>
      </div>

      {/* Mobile preview on top */}
      <div className="lg:hidden mb-6">
        <Preview
          base={selectedBase}
          bag={selectedBag}
          strap={selectedStrap}
          decor={selectedDecor}
          totalPrice={totalPrice}
          isComplete={isComplete}
          added={added}
          onAdd={handleAddSet}
        />
      </div>

      <div className="grid gap-8 lg:gap-12 lg:grid-cols-[1fr_380px]">
        <div>
          {/* Step tabs */}
          <div
            role="tablist"
            aria-label="Шаги конструктора"
            className="grid grid-cols-4 gap-1 mb-6"
          >
            {steps.map((s) => {
              const active = step === s.key;
              const stepFilled =
                (s.key === "base" && !!selectedBase) ||
                (s.key === "bag" && !!selectedBag) ||
                (s.key === "strap" && !!selectedStrap) ||
                (s.key === "decor" && selectedDecor.length > 0);
              return (
                <button
                  key={s.key}
                  role="tab"
                  aria-selected={active}
                  type="button"
                  onClick={() => setStep(s.key)}
                  className={cn(
                    "flex flex-col items-start px-3 py-3 md:px-4 md:py-4 text-left transition-colors border-t-2 min-h-[64px]",
                    active
                      ? "bg-ink text-white border-accent"
                      : "bg-surface text-ink border-transparent hover:bg-muted/40",
                  )}
                >
                  <span
                    className={cn(
                      "text-[10px] tracking-[0.22em] mb-1 leading-none",
                      active ? "text-accent" : "text-muted-foreground",
                    )}
                  >
                    {s.n}
                    {!s.required && " · опц."}
                  </span>
                  <span className="text-[12px] md:text-[13px] font-medium uppercase tracking-[0.18em] leading-tight">
                    {s.label}
                  </span>
                  {stepFilled && (
                    <span
                      className={cn(
                        "mt-1 text-[10px] inline-flex items-center gap-1",
                        active ? "text-white/90" : "text-accent",
                      )}
                    >
                      <Check className="h-3 w-3" /> выбрано
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Hints */}
          {step === "base" && !selectedBase && (
            <div className="mb-5 px-4 py-3 bg-accent/10 border-l-2 border-accent text-sm leading-snug">
              Начни с основы — она задаёт характер сумки и совместимость
              остальных элементов.
            </div>
          )}
          {step !== "base" && !selectedBase && (
            <div className="mb-5 px-4 py-3 bg-surface text-sm text-muted-foreground leading-snug">
              Сначала выбери основу — она задаёт совместимость остальных
              элементов.
            </div>
          )}

          <div className="grid gap-x-3 gap-y-6 grid-cols-2 sm:grid-cols-3 xl:grid-cols-4">
            {products.map((p) => {
              const compatible = isCompatible(p, baseId);
              const selected = isSelected(p);
              const disabled =
                !p.inStock || (!compatible && p.category !== "base");
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => handlePickAndMaybeAdvance(p)}
                  disabled={disabled}
                  className={cn(
                    "group relative flex flex-col text-left bg-transparent text-ink transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
                    disabled && "opacity-40 cursor-not-allowed grayscale",
                  )}
                  aria-pressed={selected}
                >
                  <div
                    className={cn(
                      "relative bg-surface transition-shadow",
                      selected &&
                        "outline outline-2 outline-accent shadow-[0_0_0_4px_rgba(207,95,163,0.18)]",
                    )}
                  >
                    <ProductImage product={p} decorative={false} />
                    {selected && (
                      <span className="absolute top-2 right-2 bg-accent text-accent-foreground h-7 w-7 inline-flex items-center justify-center">
                        <Check className="h-4 w-4" />
                      </span>
                    )}
                    {!p.inStock && (
                      <span className="absolute top-2 left-2 bg-ink text-white text-[10px] uppercase tracking-[0.18em] px-1.5 py-0.5">
                        Нет
                      </span>
                    )}
                  </div>
                  <div className="pt-3">
                    <div className="text-[13px] font-medium leading-snug">
                      {p.name}
                    </div>
                    <div className="text-[11px] text-muted-foreground mt-0.5">
                      {p.color}
                    </div>
                    <div className="text-[13px] font-semibold mt-1 tracking-tight">
                      {formatPrice(p.price)}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-8 flex flex-wrap gap-3 justify-between">
            <Button
              variant="ghost"
              onClick={() => {
                const idx = steps.findIndex((s) => s.key === step);
                if (idx > 0) setStep(steps[idx - 1].key);
              }}
              disabled={step === "base"}
            >
              ← Назад
            </Button>
            <Button
              variant="secondary"
              onClick={() => {
                const idx = steps.findIndex((s) => s.key === step);
                if (idx < steps.length - 1) setStep(steps[idx + 1].key);
              }}
              disabled={step === "decor"}
            >
              Дальше →
            </Button>
          </div>
        </div>

        {/* Desktop sticky preview */}
        <aside className="hidden lg:block">
          <div className="sticky top-36">
            <Preview
              base={selectedBase}
              bag={selectedBag}
              strap={selectedStrap}
              decor={selectedDecor}
              totalPrice={totalPrice}
              isComplete={isComplete}
              added={added}
              onAdd={handleAddSet}
            />
          </div>
        </aside>
      </div>

      {/* After-add hint */}
      {added && (
        <Link
          href="/cart"
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-accent text-accent-foreground px-5 py-3 text-xs uppercase tracking-[0.18em] shadow-lg hover:bg-accent/90 transition-colors inline-flex items-center gap-2"
        >
          <Check className="h-4 w-4" /> Комплект в корзине · посмотреть →
        </Link>
      )}
    </div>
  );
}

function Preview({
  base,
  bag,
  strap,
  decor,
  totalPrice,
  isComplete,
  added,
  onAdd,
}: {
  base: Product | null;
  bag: Product | null;
  strap: Product | null;
  decor: Product[];
  totalPrice: number;
  isComplete: boolean;
  added: boolean;
  onAdd: () => void;
}) {
  return (
    <div className="bg-surface overflow-hidden">
      <div className="bg-ink text-white px-5 py-3 flex items-center justify-between">
        <span className="text-eyebrow">Твоя сборка</span>
        {isComplete ? (
          <span className="text-[10px] uppercase tracking-[0.18em] text-accent">
            готово
          </span>
        ) : (
          <span className="text-[10px] uppercase tracking-[0.18em] text-white/55">
            черновик
          </span>
        )}
      </div>

      <div className="relative aspect-square bg-[#262626] overflow-hidden">
        {base ? (
          <ProductImage
            product={base}
            decorative={false}
            className="aspect-square"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-white/55 text-xs uppercase tracking-[0.22em] text-center px-6">
            Выбери основу <br />
            чтобы начать
          </div>
        )}
        <Star
          variant="burst"
          className="absolute top-3 left-3 h-9 w-9 text-accent z-10"
        />
        {bag && (
          <div className="absolute bottom-3 left-3 w-16 h-16 ring-2 ring-white/70 z-20">
            <ProductImage product={bag} decorative={false} />
          </div>
        )}
        {strap && (
          <div className="absolute bottom-3 right-3 w-14 h-14 ring-2 ring-white/70 z-20">
            <ProductImage product={strap} decorative={false} />
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col gap-3">
        <Row label="Основа" product={base} required />
        <Row label="Мешок" product={bag} required />
        <Row label="Ремень" product={strap} required />
        <div>
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              Декор
            </span>
            <span className="text-[10px] text-muted-foreground">
              {decor.length} шт.
            </span>
          </div>
          {decor.length > 0 ? (
            <ul className="mt-1.5 space-y-0.5">
              {decor.map((d) => (
                <li key={d.id} className="text-[13px] flex justify-between gap-2">
                  <span className="truncate">{d.name}</span>
                  <span className="ml-2 text-muted-foreground whitespace-nowrap">
                    {formatPrice(d.price)}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-[13px] text-muted-foreground mt-1.5">
              Не выбран
            </p>
          )}
        </div>

        <div className="border-t border-ink/15 pt-3 flex items-baseline justify-between">
          <span className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            Итого
          </span>
          <span className="text-2xl font-semibold tracking-tight text-ink">
            {formatPrice(totalPrice)}
          </span>
        </div>

        <Button
          onClick={onAdd}
          disabled={!isComplete}
          className="w-full"
          size="lg"
        >
          {added ? (
            <>
              <Check className="h-4 w-4" /> Добавлено
            </>
          ) : (
            <>
              <ShoppingBag className="h-4 w-4" /> Добавить комплект
            </>
          )}
        </Button>
        {!isComplete && (
          <p className="text-[11px] text-muted-foreground text-center">
            Нужно выбрать основу, мешок и ремень
          </p>
        )}
      </div>
    </div>
  );
}

function Row({
  label,
  product,
  required,
}: {
  label: string;
  product: Product | null;
  required?: boolean;
}) {
  return (
    <div className="flex items-start justify-between gap-3">
      <div className="min-w-0">
        <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
          {label} {required && <span className="text-accent">*</span>}
        </div>
        <div
          className={cn(
            "text-[13px] mt-0.5 truncate",
            product ? "text-ink font-medium" : "text-muted-foreground",
          )}
        >
          {product ? product.name : "Не выбрано"}
        </div>
      </div>
      <div className="text-[13px] text-ink whitespace-nowrap">
        {product ? formatPrice(product.price) : "—"}
      </div>
    </div>
  );
}
