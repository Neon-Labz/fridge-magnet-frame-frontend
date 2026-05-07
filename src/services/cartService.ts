'use client';

import { getStorage, setStorage, removeStorage } from '../utils/localStorage';

const CART_KEY = 'cart';

interface Product {
  id: string | number;
  name: string;
  price: number | string;
  image?: string;
  quantity?: number | string;
}

interface CartItem {
  id: string | number;
  name: string;
  price: number;
  image?: string;
  quantity: number;
}

const normalizeCartItem = (product: Product): CartItem => ({
  id: product.id,
  name: product.name,
  price: Number(product.price) || 0,
  image: product.image,
  quantity: Number(product.quantity) > 0 ? Number(product.quantity) : 1,
});

const saveCartItems = (items: CartItem[]): void => {
  setStorage(CART_KEY, items);
};

export const getCartItems = (): CartItem[] => {
  const items = getStorage(CART_KEY);
  return Array.isArray(items) ? items : [];
};

export const addToCart = (product: Product): CartItem[] => {
  if (!product || product.id === undefined || product.id === null) {
    return getCartItems();
  }

  const cartItems = getCartItems();
  const existingIndex = cartItems.findIndex((item) => item.id === product.id);

  if (existingIndex >= 0) {
    cartItems[existingIndex] = {
      ...cartItems[existingIndex],
      quantity: cartItems[existingIndex].quantity + 1,
    };
  } else {
    cartItems.push(normalizeCartItem(product));
  }

  saveCartItems(cartItems);
  return cartItems;
};

export const removeFromCart = (productId: string | number): CartItem[] => {
  const cartItems = getCartItems().filter((item) => item.id !== productId);
  saveCartItems(cartItems);
  return cartItems;
};

export const updateQuantity = (productId: string | number, quantity: number): CartItem[] => {
  const parsedQty = Number(quantity);

  if (parsedQty <= 0) {
    return removeFromCart(productId);
  }

  const cartItems = getCartItems().map((item) =>
    item.id === productId ? { ...item, quantity: parsedQty } : item
  );

  saveCartItems(cartItems);
  return cartItems;
};

export const clearCart = (): CartItem[] => {
  removeStorage(CART_KEY);
  return [];
};

export const getCartTotal = (): number => {
  return getCartItems().reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);
};

export const getCartCount = (): number => {
  return getCartItems().reduce((count, item) => count + item.quantity, 0);
};
