export type OrderStatus = 'shipped' | 'pending' | 'processing' | 'cancelled';

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
}
