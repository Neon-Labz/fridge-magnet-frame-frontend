import { Eye, Mail, Trash2 } from 'lucide-react';
import type { Order } from '@/types/order';
import StatusBadge from './StatusBadge';
import Link from "next/link";

interface OrderTableProps {
  orders: Order[];
  onDelete: (order: Order) => void;
}

export default function OrderTable({ orders, onDelete }: OrderTableProps) {
  return (
    <div className="flex-1 overflow-auto">
      <table className="w-full border-collapse text-left">
        <thead>
          <tr style={{ background: '#F3F3F8', borderBottom: '1px solid #C3C6D4' }}>
            {['Order ID', 'Customer Name', 'QTY', 'Customer ID', 'Status', 'Actions'].map((h, i) => (
              <th
                key={h}
                className="font-semibold text-sm uppercase"
                style={{
                  padding: '16px 24px',
                  color: '#002B73',
                  letterSpacing: '0.7px',
                  textAlign: i === 2 ? 'center' : i === 5 ? 'right' : 'left',
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {orders.map((order, idx) => (
            <tr
              key={order.id}
              className="transition hover:bg-slate-50/60"
              style={{ borderTop: idx === 0 ? 'none' : '1px solid #C3C6D4' }}
            >
              <td className="py-[26.5px] px-6">
                <span
                  className="text-sm"
                  style={{ fontFamily: 'monospace', color: '#002B73' }}
                >
                  {order.orderId}
                </span>
              </td>

              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div
                    className="flex items-center justify-center flex-shrink-0 font-bold text-xs"
                    style={{ width: 32, height: 32, background: '#DAE2FF', borderRadius: 9999, color: '#002B73' }}
                  >
                    {order.customerInitials}
                  </div>
                  <span className="font-semibold text-base" style={{ color: '#1A1C1F' }}>
                    {order.customerName}
                  </span>
                </div>
              </td>

              <td className="px-6 py-[26.5px] text-center">
                <span className="font-medium text-base" style={{ color: '#1A1C1F' }}>
                  {order.qty}
                </span>
              </td>

              <td className="px-6 py-[26px]">
                <span className="text-sm" style={{ color: '#434652' }}>
                  {order.customerId}
                </span>
              </td>

              <td className="px-6 py-[24.5px]">
                <Link
                    href={`/dashboard/orders/${order.id}`}
                    className="inline-flex"
                  >
                    <StatusBadge status={order.status} />
                  </Link>            
              </td>

              <td className="px-6 py-[16.5px] text-right">
                <div className="inline-flex items-center gap-1">
                  <Link
                    href={`/dashboard/orders/${order.id}`}
                    className="inline-flex items-center justify-center rounded-lg transition hover:bg-blue-50"
                    style={{ width: 32, height: 34 }}
                    aria-label="View order"
                  >
                    <Eye size={16} color="#002B73" />
                  </Link>

                  <a
                    href={order.email ? `mailto:${order.email}?subject=Regarding your Magnify order %23${order.orderId}` : undefined}
                    onClick={!order.email ? (e) => e.preventDefault() : undefined}
                    className="inline-flex items-center justify-center rounded-lg transition hover:bg-blue-50"
                    style={{
                      width: 32,
                      height: 34,
                      opacity: order.email ? 1 : 0.35,
                      cursor: order.email ? 'pointer' : 'not-allowed',
                    }}
                    aria-label="Message customer"
                    aria-disabled={!order.email}
                  >
                    <Mail size={16} color="#002B73" />
                  </a>

                  <button
                    onClick={() => onDelete(order)}
                    className="inline-flex items-center justify-center rounded-lg transition hover:bg-red-50"
                    style={{ width: 32, height: 34 }}
                    aria-label="Delete order"
                  >
                    <Trash2 size={16} color="#BC0000" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
