'use client';

import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface CartItem {
  id: string | number;
  name: string;
  price: number;
  image?: string;
  quantity: number;
}

export interface CartProduct {
  id: string | number;
  name: string;
  price: number | string;
  image?: string;
  quantity?: number | string;
}

interface CartState {
  items: CartItem[];
  addItem: (product: CartProduct, quantity?: number) => void;
  removeItem: (productId: string | number) => void;
  updateQuantity: (productId: string | number, quantity: number) => void;
  clearCart: () => void;
  getTotalQuantity: () => number;
  getSubtotal: () => number;
}

const normalizeProduct = (product: CartProduct, quantity = 1): CartItem => ({
  id: product.id,
  name: product.name,
  price: Number(product.price) || 0,
  image: product.image,
  quantity: quantity > 0 ? quantity : 1,
});

const storage =
  typeof window === 'undefined'
    ? undefined
    : createJSONStorage(() => localStorage);

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product, quantity = 1) =>
        set((state) => {
          const existingIndex = state.items.findIndex((item) => item.id === product.id);

          if (existingIndex >= 0) {
            const items = [...state.items];
            items[existingIndex] = {
              ...items[existingIndex],
              quantity: items[existingIndex].quantity + quantity,
            };
            return { items };
          }

          return { items: [...state.items, normalizeProduct(product, quantity)] };
        }),
      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== productId),
        })),
      updateQuantity: (productId, quantity) =>
        set((state) => {
          if (quantity <= 0) {
            return { items: state.items.filter((item) => item.id !== productId) };
          }

          return {
            items: state.items.map((item) =>
              item.id === productId ? { ...item, quantity } : item,
            ),
          };
        }),
      clearCart: () => set({ items: [] }),
      getTotalQuantity: () => get().items.reduce((count, item) => count + item.quantity, 0),
      getSubtotal: () => get().items.reduce((total, item) => total + item.price * item.quantity, 0),
    }),
    {
      name: 'cart',
      storage,
    },
  ),
);
