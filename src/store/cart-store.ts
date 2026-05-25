"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem, ConstructorItems, Product } from "@/lib/types";

interface CartState {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  addSet: (items: ConstructorItems, totalPrice: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalPrice: () => number;
  itemCount: () => number;
}

function genId() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product, quantity = 1) =>
        set((state) => {
          const existing = state.items.find(
            (i) => i.type === "product" && i.product?.id === product.id,
          );
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === existing.id
                  ? { ...i, quantity: i.quantity + quantity }
                  : i,
              ),
            };
          }
          return {
            items: [
              ...state.items,
              {
                id: genId(),
                type: "product",
                product,
                quantity,
              },
            ],
          };
        }),
      addSet: (items, totalPrice) =>
        set((state) => ({
          items: [
            ...state.items,
            {
              id: genId(),
              type: "set",
              quantity: 1,
              setItems: items,
              setPrice: totalPrice,
            },
          ],
        })),
      removeItem: (id) =>
        set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
      updateQuantity: (id, quantity) =>
        set((state) => ({
          items: state.items
            .map((i) =>
              i.id === id ? { ...i, quantity: Math.max(1, quantity) } : i,
            )
            .filter((i) => i.quantity > 0),
        })),
      clearCart: () => set({ items: [] }),
      totalPrice: () => {
        const items = get().items;
        return items.reduce((sum, item) => {
          if (item.type === "set") {
            return sum + (item.setPrice ?? 0) * item.quantity;
          }
          return sum + (item.product?.price ?? 0) * item.quantity;
        }, 0);
      },
      itemCount: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },
    }),
    {
      name: "purrmure-cart",
    },
  ),
);
