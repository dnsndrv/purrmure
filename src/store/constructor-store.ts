"use client";

import { create } from "zustand";
import type { Product } from "@/lib/types";

interface ConstructorState {
  selectedBase: Product | null;
  selectedBag: Product | null;
  selectedStrap: Product | null;
  selectedDecor: Product[];
  selectBase: (product: Product | null) => void;
  selectBag: (product: Product | null) => void;
  selectStrap: (product: Product | null) => void;
  toggleDecor: (product: Product) => void;
  resetConstructor: () => void;
  totalPrice: () => number;
  isComplete: () => boolean;
}

export const useConstructorStore = create<ConstructorState>((set, get) => ({
  selectedBase: null,
  selectedBag: null,
  selectedStrap: null,
  selectedDecor: [],
  selectBase: (product) =>
    set((state) => ({
      selectedBase: product,
      selectedBag:
        state.selectedBag && product
          ? checkProductCompat(state.selectedBag, product.id)
            ? state.selectedBag
            : null
          : state.selectedBag,
      selectedStrap:
        state.selectedStrap && product
          ? checkProductCompat(state.selectedStrap, product.id)
            ? state.selectedStrap
            : null
          : state.selectedStrap,
      selectedDecor: product
        ? state.selectedDecor.filter((d) => checkProductCompat(d, product.id))
        : state.selectedDecor,
    })),
  selectBag: (product) => set({ selectedBag: product }),
  selectStrap: (product) => set({ selectedStrap: product }),
  toggleDecor: (product) =>
    set((state) => {
      const exists = state.selectedDecor.find((d) => d.id === product.id);
      if (exists) {
        return {
          selectedDecor: state.selectedDecor.filter((d) => d.id !== product.id),
        };
      }
      return { selectedDecor: [...state.selectedDecor, product] };
    }),
  resetConstructor: () =>
    set({
      selectedBase: null,
      selectedBag: null,
      selectedStrap: null,
      selectedDecor: [],
    }),
  totalPrice: () => {
    const s = get();
    let sum = 0;
    if (s.selectedBase) sum += s.selectedBase.price;
    if (s.selectedBag) sum += s.selectedBag.price;
    if (s.selectedStrap) sum += s.selectedStrap.price;
    sum += s.selectedDecor.reduce((acc, d) => acc + d.price, 0);
    return sum;
  },
  isComplete: () => {
    const s = get();
    return !!(s.selectedBase && s.selectedBag && s.selectedStrap);
  },
}));

function checkProductCompat(product: Product, baseId: string): boolean {
  if (!product.compatibleWith || product.compatibleWith.length === 0)
    return true;
  return product.compatibleWith.includes(baseId);
}
