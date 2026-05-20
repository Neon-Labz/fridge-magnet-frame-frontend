import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type FrameOption = 'without-frame' | 'black-frame' | 'white-frame';

export interface CartItem {
  id: string;
  title: string;
  price: number;
  frameOption?: FrameOption | string;
  quantity: number;
  image?: string;
}

export interface CartState {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
}

const storage = typeof window === 'undefined' ? undefined : createJSONStorage(() => localStorage);

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addToCart: (item: CartItem) =>
        set((state) => {
          const existing = state.items.find((i) => i.id === item.id && i.frameOption === item.frameOption);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === item.id && i.frameOption === item.frameOption ? { ...i, quantity: i.quantity + item.quantity } : i,
              ),
            };
          }
          return { items: [...state.items, item] };
        }),
      removeFromCart: (id: string) => set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
      updateQuantity: (id: string, quantity: number) => {
        if (quantity <= 0) {
          set((state) => ({ items: state.items.filter((i) => i.id !== id) }));
          return;
        }
        set((state) => ({ items: state.items.map((i) => (i.id === id ? { ...i, quantity } : i)) }));
      },
      clearCart: () => set({ items: [] }),
      getTotalItems: () => get().items.reduce((sum, item) => sum + item.quantity, 0),
    }),
    {
      name: 'cart-storage',
      version: 1,
      migrate: (persistedState, version) => {
        // If we add new fields in future versions, implement migration logic here.
        // For now, just return the persisted state as-is to avoid the runtime error
        // when older state is present in localStorage.
        return Promise.resolve(persistedState as any);
      },
      storage,
    },
  ),
);
