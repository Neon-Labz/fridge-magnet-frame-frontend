export type OrderStatus = 'shipped' | 'pending' | 'processing' | 'delivered' | 'canceled';

export interface Order {
  id: string;
  _id?: string;
  orderId: string;
  customerName: string;
  customerInitials: string;
  customerId: string;
  qty: number;
  status: OrderStatus;
  email?: string;
  phone?: string;
  totalValue?: number;
  shippingAddress?: string;
  adminNote?: string;
  createdAt?: string;
  items?: OrderItem[];
}

export interface OrderItem {
  productId?: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  frameType?: string;
  colorOption?: string;
}
