import { ORDERS } from '@/data/orders';
import OrderStatus from '@/components/dashboard/orders/OrderStatus';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function OrderStatusPage({ params }: Props) {
  const { id } = await params;
  const order = ORDERS.find((o) => o.id === id || o.orderId === id);

  if (!order) {
    return <div>Order not found</div>;
  }

  return <OrderStatus order={order} />;
}