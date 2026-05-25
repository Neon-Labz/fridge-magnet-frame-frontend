"use client";

import React, { createContext, useContext, useEffect, useMemo, useReducer, useState } from "react";

export type CartItem = {
  id: string;
  title: string;
  image: string;
  frameType: string;
  colorOption?: string;
  quantity: number;
  price: number;
};

type State = {
  items: CartItem[];
};

type Action =
  | { type: "hydrate"; payload: CartItem[] }
  | { type: "add"; payload: CartItem }
  | { type: "remove"; payload: { id: string; frameType?: string; colorOption?: string } }
  | { type: "updateQuantity"; payload: { id: string; frameType?: string; colorOption?: string; quantity: number } }
  | { type: "clear" };

const CART_KEY = "cart";

const initialState: State = { items: [] };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "hydrate":
      return { items: action.payload };
    case "add": {
      const existing = state.items.find((i) => i.id === action.payload.id && i.frameType === action.payload.frameType && i.colorOption === action.payload.colorOption);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.id === action.payload.id && i.frameType === action.payload.frameType && i.colorOption === action.payload.colorOption
              ? { ...i, quantity: i.quantity + action.payload.quantity }
              : i,
          ),
        };
      }

      return { items: [...state.items, action.payload] };
    }
    case "remove":
      return {
        items: state.items.filter((i) =>
          action.payload.frameType || action.payload.colorOption
            ? !(i.id === action.payload.id && i.frameType === action.payload.frameType && i.colorOption === action.payload.colorOption)
            : i.id !== action.payload.id,
        ),
      };
    case "updateQuantity":
      return {
        items: state.items.map((i) =>
          action.payload.frameType || action.payload.colorOption
            ? i.id === action.payload.id && i.frameType === action.payload.frameType && i.colorOption === action.payload.colorOption
              ? { ...i, quantity: Math.max(1, action.payload.quantity) }
              : i
            : i.id === action.payload.id
            ? { ...i, quantity: Math.max(1, action.payload.quantity) }
            : i,
        ),
      };
    case "clear":
      return { items: [] };
    default:
      return state;
  }
}

type CartContextValue = {
  items: CartItem[];
  subtotal: number;
  totalQuantity: number;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string, frameType?: string, colorOption?: string) => void;
  updateQuantity: (id: string, frameType: string | undefined, colorOption: string | undefined, quantity: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [hasHydrated, setHasHydrated] = useState(false);

  // hydrate from localStorage once
  useEffect(() => {
    try {
      const raw = typeof window !== "undefined" ? localStorage.getItem(CART_KEY) : null;
      if (raw) {
        const parsed: CartItem[] = JSON.parse(raw);
        dispatch({ type: "hydrate", payload: parsed });
      }
    } catch (err) {
      // ignore
      console.error("Failed to hydrate cart", err);
    } finally {
      setHasHydrated(true);
    }
  }, []);

  // persist on change
  useEffect(() => {
    if (!hasHydrated) {
      return;
    }

    try {
      localStorage.setItem(CART_KEY, JSON.stringify(state.items));
      // dispatch a window event for any non-react consumers
      window.dispatchEvent(new Event("cart-updated"));
    } catch (err) {
      console.error("Failed to persist cart", err);
    }
  }, [state.items, hasHydrated]);

  const subtotal = useMemo(() => state.items.reduce((s, it) => s + it.price * it.quantity, 0), [state.items]);
  const totalQuantity = useMemo(() => state.items.reduce((s, it) => s + it.quantity, 0), [state.items]);

  const value: CartContextValue = {
    items: state.items,
    subtotal,
    totalQuantity,
    addToCart: (item) => dispatch({ type: "add", payload: item }),
    removeFromCart: (id, frameType, colorOption) => dispatch({ type: "remove", payload: { id, frameType, colorOption } }),
    updateQuantity: (id, frameType, colorOption, quantity) => dispatch({ type: "updateQuantity", payload: { id, frameType, colorOption, quantity } }),
    clearCart: () => dispatch({ type: "clear" }),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

export default CartProvider;
