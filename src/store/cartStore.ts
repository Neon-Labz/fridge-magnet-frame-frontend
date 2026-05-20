<<<<<<< HEAD
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type FrameOption = 'without-frame' | 'black-frame' | 'white-frame';

export interface CartItem {
  id: string;
  title: string;
  price: number;
  frameOption?: FrameOption | string;
  quantity: number;
  image?: string;
}

export interface CartProduct {
  id: string | number;
  name: string;
  price: number | string;
  image?: string;
}
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
}

=======
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

>>>>>>> development
export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
<<<<<<< HEAD
      addToCart: (item: CartItem) => {
        set((state) => {
          const existingItem = state.items.find((i) => i.id === item.id);
          if (existingItem) {
            return {
              items: state.items.map((i) =>
                i.id === item.id
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              ),
            };
          }
          return { items: [...state.items, item] };
        });
      },
      removeFromCart: (id: string) => {
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        }));
      },
      updateQuantity: (id: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeFromCart(id);
          return;
        }
        set((state) => ({
          items: state.items.map((i) =>
            i.id === id ? { ...i, quantity } : i
          ),
        }));
      },
      clearCart: () => {
        set({ items: [] });
      },
      getTotalItems: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },
    }),
    {
      name: 'cart-storage',
      version: 1,
    }
  )
=======
      addItem: (product, quantity = 1) =>
        set((state) => {
          const existingIndex = state.items.findIndex((item) => item.id === product.id);

          if (existingIndex >= 0) {
            interface CartState {
              items: CartItem[];
              addToCart: (item: CartItem) => void;
              addItem: (product: CartProduct, quantity?: number) => void;
              removeItem: (productId: string | number) => void;
              updateQuantity: (productId: string | number, quantity: number) => void;
              clearCart: () => void;
              getTotalQuantity: () => number;
              getSubtotal: () => number;
            }

            const normalizeProduct = (product: CartProduct, quantity = 1): CartItem => ({
              id: String(product.id),
              title: product.name,
              price: Number(product.price) || 0,
              image: product.image,
              quantity: quantity > 0 ? quantity : 1,
            });

            const storage = typeof window === 'undefined' ? undefined : createJSONStorage(() => localStorage);

            export const useCartStore = create<CartState>()(
              persist(
                (set, get) => ({
                  items: [],
                  addToCart: (item: CartItem) =>
                    set((state) => {
                      // merge by id + frameOption for uniqueness
                      const existing = state.items.find((i) => i.id === item.id && i.frameOption === item.frameOption);
                      if (existing) {
                        return {
                          items: state.items.map((i) =>
                            i.id === item.id && i.frameOption === item.frameOption
                              ? { ...i, quantity: i.quantity + item.quantity }
                              : i
                          ),
                        };
                      }
                      return { items: [...state.items, item] };
                    }),
                  addItem: (product, quantity = 1) =>
                    set((state) => {
                      const item = normalizeProduct(product, quantity);
                      const existing = state.items.find((i) => i.id === item.id);
                      if (existing) {
                        return {
                          items: state.items.map((i) =>
                            i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
                          ),
                        };
                      }
                      return { items: [...state.items, item] };
                    }),
                  removeItem: (productId) =>
                    set((state) => ({ items: state.items.filter((i) => i.id !== String(productId)) })),
                  updateQuantity: (productId, quantity) =>
                    set((state) => {
                      if (quantity <= 0) {
                        return { items: state.items.filter((i) => i.id !== String(productId)) };
                      }
                      return {
                        items: state.items.map((i) => (i.id === String(productId) ? { ...i, quantity } : i)),
                      };
                    }),
                  clearCart: () => set({ items: [] }),
                  getTotalQuantity: () => get().items.reduce((sum, item) => sum + item.quantity, 0),
                  getSubtotal: () => get().items.reduce((total, item) => total + item.price * item.quantity, 0),
                }),
                {
                  name: 'cart',
                  storage,
                }
              )
            )
