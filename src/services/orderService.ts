"use client";

import { apiV1Url } from "@/lib/backendUrl";
import { saveOrder, OrderRecord } from "./cartService";

const PENDING_ORDER_KEY = "pending-order";

export type PaymentMethod = "card" | "cod";

export interface BackendOrderItem {
  productId: string | number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  frameType?: string;
  colorOption?: string;
}

export interface BackendOrderPayload {
  orderId: string;
  customerName: string;
  customerId: string;
  email: string;
  phone: string;
  qty: number;
  totalValue: number;
  shippingAddress: string;
  adminNote?: string;
  items: BackendOrderItem[];
}

/**
 * A fully-built order that is ready to be submitted to the backend.
 * It is stored in sessionStorage while the user completes payment on the
 * payment gateway page, so the order can be finalized after payment succeeds.
 */
export interface PendingOrder {
  paymentMethod: PaymentMethod;
  amount: number;
  backendPayload: BackendOrderPayload;
  orderRecord: OrderRecord;
}

export const savePendingOrder = (order: PendingOrder): void => {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(PENDING_ORDER_KEY, JSON.stringify(order));
};

export const getPendingOrder = (): PendingOrder | null => {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(PENDING_ORDER_KEY);
    return raw ? (JSON.parse(raw) as PendingOrder) : null;
  } catch {
    return null;
  }
};

export const clearPendingOrder = (): void => {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(PENDING_ORDER_KEY);
};

/**
 * Submits the order to the backend and persists it locally for the
 * confirmation page. Throws when the backend rejects the order.
 */
export const submitOrder = async (order: PendingOrder): Promise<void> => {
  const response = await fetch(apiV1Url("/orders"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(order.backendPayload),
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data?.message || `Order failed: ${response.status}`);
  }

  saveOrder(order.orderRecord);
};
