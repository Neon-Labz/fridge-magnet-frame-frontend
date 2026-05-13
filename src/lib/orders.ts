import type { Order, OrderStatus } from '@/types/order';

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
  if (normalized === 'cancelled') return 'canceled';
  if (
    normalized === 'shipped' ||
    normalized === 'pending' ||
    normalized === 'processing' ||
    normalized === 'delivered' ||
    normalized === 'canceled'
  ) {
    return normalized;
  }

  return 'pending';
};

export const statusToApi = (status: OrderStatus) => status.toUpperCase();

export const mapApiOrder = (order: ApiOrder): Order => ({
  id: order._id || order.id || order.orderId,
  orderId: order.orderId,
  customerName: order.customerName,
  customerInitials: order.customerName
    .split(' ')
    .map((part) => part[0])
    .join('')
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

export const fetchOrders = async () => {
  const response = await fetch('/api/v1/orders', { cache: 'no-store' });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data?.message || `Failed to load orders: ${response.status}`);
  }

  const orders = (await response.json()) as ApiOrder[];
  return orders.map(mapApiOrder);
};

export const fetchOrder = async (id: string) => {
  const response = await fetch(`/api/v1/orders/${id}`, { cache: 'no-store' });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data?.message || `Failed to load order: ${response.status}`);
  }

  return mapApiOrder((await response.json()) as ApiOrder);
};
