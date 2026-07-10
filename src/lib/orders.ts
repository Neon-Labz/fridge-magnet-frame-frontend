import type { Order, OrderStatus } from "@/types/order";
import { ORDERS } from "@/data/orders";
import { apiV1Url } from "@/lib/backendUrl";

type ApiOrder = {
  _id?: string;
  id?: string;
  orderId: string;
  customerName: string;
  customerId: string;
  qty: number;
  status: string;
  email?: string;
  phone?: string;
  totalValue?: number;
  shippingAddress?: string;
  adminNote?: string;
  createdAt?: string;
  items?: {
    productId?: string;
    name?: string;
    price?: number;
    quantity?: number;
    image?: string;
    frameType?: string;
    colorOption?: string;
  }[];
};

type ApiOrdersResponse =
  | ApiOrder[]
  | {
      orders?: ApiOrder[];
      data?: ApiOrder[];
    };

const statusFromApi = (status?: string): OrderStatus => {
  const normalized = status?.trim().toLowerCase();

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

  return "processing";
};

export const statusToApi = (status: OrderStatus) => status.toUpperCase();

export const mapApiOrder = (order: ApiOrder): Order => ({
  id: order._id || order.id || order.orderId,
  _id: order._id,
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
  phone: order.phone,
  totalValue: order.totalValue,
  shippingAddress: order.shippingAddress,
  adminNote: order.adminNote,
  createdAt: order.createdAt,
  items: order.items?.map((item) => ({
    productId: item.productId,
    name: item.name || "Product",
    price: Number(item.price ?? 0),
    quantity: Number(item.quantity ?? 1),
    image: item.image,
    frameType: item.frameType,
    colorOption: item.colorOption,
  })),
});

export const fetchOrders = async (): Promise<Order[]> => {
  try {
    const response = await fetch(apiV1Url("/orders"), { cache: "no-store" });

    if (response.ok) {
      const data = (await response.json()) as ApiOrdersResponse;
      const backendOrders = Array.isArray(data) ? data : data.orders || data.data || [];

      return backendOrders.map(mapApiOrder);
    }
  } catch {
    console.log("Backend not available, using mock orders");
  }

  return ORDERS;
};

export const fetchOrder = async (id: string): Promise<Order> => {
  try {
    const response = await fetch(apiV1Url(`/orders/${id}`), {
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
