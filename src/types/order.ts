export type OrderStatus = 'shipped' | 'pending' | 'processing' | 'delivered' | 'canceled';

export interface Order {
  id: string;
  orderId: string;
  customerName: string;
  customerInitials: string;
  customerId: string;
  qty: number;
  status: OrderStatus;
  email?: string;
  totalValue?: number;
  shippingAddress?: string;
  adminNote?: string;
}
