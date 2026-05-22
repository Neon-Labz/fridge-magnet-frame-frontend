import type { Order, OrderStatus } from '@/types/order';
import { ORDERS } from '@/data/orders';

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
  let allOrders: Order[] = [];

  // Always include mock orders as base
  allOrders = [...ORDERS];

  // Try to fetch from backend first
  try {
    const response = await fetch('/api/v1/orders', { cache: 'no-store' });

    if (response.ok) {
      const backendOrders = (await response.json()) as ApiOrder[];
      const mappedOrders = backendOrders.map(mapApiOrder);
      return [...allOrders, ...mappedOrders];
    }
  } catch (error) {
    console.log('Backend not available, using localStorage');
  }

  // Fall back to localStorage if backend is unavailable
  try {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('saved-orders');
      if (stored) {
        const savedOrders = JSON.parse(stored) as Order[];
        allOrders = [...allOrders, ...savedOrders];
      }
    }
  } catch (error) {
    console.error('Error reading from localStorage:', error);
  }

  return allOrders;
};

export const fetchOrder = async (id: string) => {
  // Check mock orders first
  const mockOrder = ORDERS.find((o) => o.id === id);
  if (mockOrder) return mockOrder;

  // Try backend
  try {
    const response = await fetch(`/api/v1/orders/${id}`, { cache: 'no-store' });

    if (response.ok) {
      return mapApiOrder((await response.json()) as ApiOrder);
    }
  } catch (error) {
    console.log('Backend not available, checking localStorage');
  }

  // Check localStorage
  try {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('saved-orders');
      if (stored) {
        const orders = JSON.parse(stored) as Order[];
        const found = orders.find((o) => o.id === id);
        if (found) return found;
      }
    }
  } catch (error) {
    console.error('Error reading from localStorage:', error);
  }

  throw new Error(`Order not found: ${id}`);
};
