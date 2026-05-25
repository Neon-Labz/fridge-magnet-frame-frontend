import type { Order, OrderStatus } from "@/types/order";
import { ORDERS } from "@/data/orders";

type ApiOrder = {
  _id?: string;
  id?: string;
  orderId: string;
  customerName: string;
  customerId: string;
  qty: number;
  status: string;
  email?: string;
  totalValue?: number;
  shippingAddress?: string;
  adminNote?: string;
};

const statusFromApi = (status: string): OrderStatus => {
  const normalized = status.toLowerCase();

  if (normalized === "cancelled") return "canceled";

  if (
    normalized === "shipped" ||
    normalized === "pending" ||
    normalized === "processing" ||
    normalized === "delivered" ||
    normalized === "canceled"
  ) {
    return normalized;
  }

  return "pending";
};

export const statusToApi = (status: OrderStatus) => status.toUpperCase();

export const mapApiOrder = (order: ApiOrder): Order => ({
  id: order._id || order.id || order.orderId,
  orderId: order.orderId,
  customerName: order.customerName,
  customerInitials: order.customerName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2),
  customerId: order.customerId,
  qty: order.qty,
  status: statusFromApi(order.status),
  email: order.email,
  totalValue: order.totalValue,
  shippingAddress: order.shippingAddress,
  adminNote: order.adminNote,
});

export const fetchOrders = async (): Promise<Order[]> => {
  try {
    const response = await fetch("/api/v1/orders", { cache: "no-store" });

    if (response.ok) {
      const backendOrders = (await response.json()) as ApiOrder[];
      return backendOrders.map(mapApiOrder);
    }
  } catch {
    console.log("Backend not available, using mock orders");
  }

  return ORDERS;
};

export const fetchOrder = async (id: string): Promise<Order> => {
  try {
    const response = await fetch(`/api/v1/orders/${id}`, {
      cache: "no-store",
    });

    if (response.ok) {
      return mapApiOrder((await response.json()) as ApiOrder);
    }
  } catch {
    console.log("Backend not available, checking mock orders");
  }

  const mockOrder = ORDERS.find((o) => o.id === id);

  if (mockOrder) return mockOrder;

  throw new Error(`Order not found: ${id}`);
};