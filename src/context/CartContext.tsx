"use client";

import React, { createContext, useContext, useEffect, useMemo, useReducer, useState } from "react";
import { apiV1Url } from "@/lib/backendUrl";

export type CartItem = {
  id: string;
  title: string;
  image: string;
  frameType: string;
  colorOption?: string;
  quantity: number;
  price: number;
  stock?: number;
};

type State = { items: CartItem[] };

type Action =
  | { type: "hydrate"; payload: CartItem[] }
  | { type: "add"; payload: CartItem }
  | { type: "remove"; payload: { id: string; frameType?: string; colorOption?: string } }
  | { type: "updateQuantity"; payload: { id: string; frameType?: string; colorOption?: string; quantity: number } }
  | { type: "clear" };

const CART_KEY_PREFIX = "cart";
const GUEST_CART_KEY = `${CART_KEY_PREFIX}:guest`;
const AUTH_EVENT_NAME = "auth-changed";
const initialState: State = { items: [] };

function getCartOwnerKey(): string {
  if (typeof window === "undefined") return "guest";

  try {
    const rawUser = localStorage.getItem("user");
    const user = rawUser ? JSON.parse(rawUser) : null;
    const userId =
      user?._id ??
      user?.id ??
      user?.userId ??
      user?.email ??
      user?.phone ??
      user?.username;

    return userId ? `user:${String(userId).trim()}` : "guest";
  } catch {
    return "guest";
  }
}

function getCartStorageKey(): string {
  const ownerKey = getCartOwnerKey();
  return ownerKey === "guest" ? GUEST_CART_KEY : `${CART_KEY_PREFIX}:${ownerKey}`;
}

function readCartItems(storageKey: string): CartItem[] {
  if (typeof window === "undefined") return [];

  const raw = localStorage.getItem(storageKey);
  if (!raw) return [];

  const parsed = JSON.parse(raw);
  return Array.isArray(parsed)
    ? parsed
    : Array.isArray(parsed?.items)
    ? parsed.items
    : [];
}

function getSafeItems(items: unknown): CartItem[] {
  return Array.isArray(items) ? items : [];
}

function clampQuantity(quantity: number, stock?: number): number {
  const requested = Math.max(1, Number(quantity) || 1);
  const available = Number(stock);
  return Number.isFinite(available) && available >= 0
    ? Math.min(requested, available)
    : requested;
}

function reducer(state: State, action: Action): State {
  const currentItems = getSafeItems(state.items);

  switch (action.type) {
    case "hydrate":
      return { items: getSafeItems(action.payload) };

    case "add": {
      const existing = currentItems.find(
        (i) =>
          i.id === action.payload.id &&
          i.frameType === action.payload.frameType &&
          i.colorOption === action.payload.colorOption
      );

      if (existing) {
        return {
          items: currentItems.map((i) =>
            i.id === action.payload.id &&
            i.frameType === action.payload.frameType &&
            i.colorOption === action.payload.colorOption
              ? {
                  ...i,
                  stock: action.payload.stock ?? i.stock,
                  quantity: clampQuantity(
                    i.quantity + action.payload.quantity,
                    action.payload.stock ?? i.stock,
                  ),
                }
              : i
          ),
        };
      }

      return {
        items: [
          ...currentItems,
          {
            ...action.payload,
            quantity: clampQuantity(action.payload.quantity, action.payload.stock),
          },
        ],
      };
    }

    case "remove":
      return {
        items: currentItems.filter((i) =>
          action.payload.frameType || action.payload.colorOption
            ? !(
                i.id === action.payload.id &&
                i.frameType === action.payload.frameType &&
                i.colorOption === action.payload.colorOption
              )
            : i.id !== action.payload.id
        ),
      };

    case "updateQuantity":
      return {
        items: currentItems.map((i) =>
          action.payload.frameType || action.payload.colorOption
            ? i.id === action.payload.id &&
              i.frameType === action.payload.frameType &&
              i.colorOption === action.payload.colorOption
              ? { ...i, quantity: clampQuantity(action.payload.quantity, i.stock) }
              : i
            : i.id === action.payload.id
            ? { ...i, quantity: clampQuantity(action.payload.quantity, i.stock) }
            : i
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
  const [cartStorageKey, setCartStorageKey] = useState(GUEST_CART_KEY);

  useEffect(() => {
    const refreshCart = () => {
      const nextStorageKey = getCartStorageKey();
      setCartStorageKey(nextStorageKey);

      try {
        const safeItems = readCartItems(nextStorageKey);
        dispatch({ type: "hydrate", payload: safeItems });

        if (typeof window !== "undefined") {
          window.dispatchEvent(new Event("cart-updated"));
        }

        void Promise.all(
          safeItems.map(async (item: CartItem) => {
            try {
              const response = await fetch(apiV1Url(`/api/products/${item.id}`));
              if (!response.ok) return item;

              const product = await response.json();
              const stock = Number(product?.stock ?? product?.data?.stock);
              if (!Number.isFinite(stock)) return item;

              return {
                ...item,
                stock,
                quantity: clampQuantity(item.quantity, stock),
              };
            } catch {
              return item;
            }
          }),
        ).then((items) => dispatch({ type: "hydrate", payload: items }));
      } catch (err) {
        console.error("Failed to hydrate cart", err);
        localStorage.removeItem(nextStorageKey);
        dispatch({ type: "hydrate", payload: [] });
      } finally {
        setHasHydrated(true);
      }
    };

    const handleStorage = (event: StorageEvent) => {
      if (!event.key || event.key === "user" || event.key.startsWith(`${CART_KEY_PREFIX}:`)) {
        refreshCart();
      }
    };

    refreshCart();
    window.addEventListener(AUTH_EVENT_NAME, refreshCart);
    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener(AUTH_EVENT_NAME, refreshCart);
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  useEffect(() => {
    if (!hasHydrated) return;

    try {
      localStorage.setItem(cartStorageKey, JSON.stringify(state.items));
      window.dispatchEvent(new Event("cart-updated"));
    } catch (err) {
      console.error("Failed to persist cart", err);
    }
  }, [state.items, hasHydrated, cartStorageKey]);

  const safeItems = Array.isArray(state.items) ? state.items : [];

  const subtotal = useMemo(
    () => safeItems.reduce((s, it) => s + Number(it.price || 0) * Number(it.quantity || 0), 0),
    [safeItems]
  );

  const totalQuantity = useMemo(
    () => safeItems.reduce((s, it) => s + Number(it.quantity || 0), 0),
    [safeItems]
  );

  const value: CartContextValue = {
    items: safeItems,
    subtotal,
    totalQuantity,
    addToCart: (item) => dispatch({ type: "add", payload: item }),
    removeFromCart: (id, frameType, colorOption) =>
      dispatch({ type: "remove", payload: { id, frameType, colorOption } }),
    updateQuantity: (id, frameType, colorOption, quantity) =>
      dispatch({ type: "updateQuantity", payload: { id, frameType, colorOption, quantity } }),
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
