'use client';

import { getStorage, setStorage, removeStorage } from '../utils/localStorage';

const CART_KEY = 'cart';
const ORDER_KEY = 'latest-order';
const SAVED_ORDERS_KEY = 'saved-orders';

export interface Product {
  id: string | number;
  name: string;
  price: number | string;
  image?: string;
  quantity?: number | string;
}

export interface CartItem {
  id: string | number;
  name: string;
  price: number;
  image?: string;
  quantity: number;
}

export interface OrderRecord {
  items: CartItem[];
  subtotal: number;
  shipping: number;
  orderNumber: string;
  createdAt: string;
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
  window.dispatchEvent(new Event('cart-updated'));
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
  window.dispatchEvent(new Event('cart-updated'));
  return [];
};

export const saveOrder = (order: OrderRecord): OrderRecord => {
  // Save the latest order
  setStorage(ORDER_KEY, order);
  
  // Also save to orders collection
  const totalQuantity = order.items.reduce((sum, item) => sum + item.quantity, 0);
  const savedOrders = getStorage(SAVED_ORDERS_KEY);
  const ordersList = Array.isArray(savedOrders) ? savedOrders : [];
  
  // Generate unique ID using timestamp (starts at 1000+) to avoid conflicts with mock data
  const newOrderId = String(1000 + ordersList.length);
  
  const newOrder = {
    id: newOrderId,
    orderId: order.orderNumber,
    customerName: `${(order as any).customerDetails?.firstName || ''} ${(order as any).customerDetails?.lastName || ''}`.trim(),
    customerInitials: `${((order as any).customerDetails?.firstName || '')[0]}${((order as any).customerDetails?.lastName || '')[0]}`.toUpperCase(),
    customerId: `CUST-${Date.now()}`,
    qty: totalQuantity,
    status: 'pending' as const,
    email: (order as any).customerDetails?.email,
    totalValue: order.subtotal + order.shipping,
    shippingAddress: `${(order as any).customerDetails?.street || ''}, ${(order as any).customerDetails?.city || ''}, ${(order as any).customerDetails?.state || ''} ${(order as any).customerDetails?.zip || ''}`,
    adminNote: (order as any).customerDetails?.notes || '',
  };
  
  ordersList.push(newOrder);
  setStorage(SAVED_ORDERS_KEY, ordersList);
  
  return order;
};

export const getSavedOrder = (): OrderRecord | null => {
  const order = getStorage(ORDER_KEY);
  return order && typeof order === 'object' ? (order as OrderRecord) : null;
};

export const clearSavedOrder = (): boolean => removeStorage(ORDER_KEY);

export const getCartTotal = (): number => {
  return getCartItems().reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);
};

export const getCartCount = (): number => {
  return getCartItems().reduce((count, item) => count + item.quantity, 0);
};
