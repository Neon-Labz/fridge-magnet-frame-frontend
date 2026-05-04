'use client';

import { useState } from 'react';
import type { ReactNode } from 'react';
import { Check, ChevronDown, ChevronLeft, ChevronRight, Filter, SlidersHorizontal, Trash2 } from 'lucide-react';
import { ORDERS, ORDER_STATS } from '@/data/orders';
import type { Order, OrderStatus } from '@/types/order';
import DeleteOrderModal from '@/components/modals/DeleteOrderModal';

/* ── Status badge ── */
const STATUS_MAP: Record<OrderStatus, { label: string; bg: string; color: string }> = {
  shipped:    { label: 'SHIPPED',    bg: '#DCFCE7', color: '#166534' },
  pending:    { label: 'PENDING',    bg: '#FEF9C3', color: '#854D0E' },
  processing: { label: 'PROCESSING', bg: '#DBEAFE', color: '#1E40AF' },
  cancelled:  { label: 'CANCELLED',  bg: '#F1F5F9', color: '#1E293B' },
};

function StatusBadge({ status }: { status: OrderStatus }) {
  const { label, bg, color } = STATUS_MAP[status];
  return (
    <span
      className="inline-flex items-center font-semibold text-xs uppercase"
      style={{ background: bg, color, borderRadius: 9999, padding: '3.5px 12px', letterSpacing: '0.04em' }}
    >
      {label}
    </span>
  );
}

/* ── Pagination button ── */
function PageBtn({ children, active = false, onClick }: { children: ReactNode; active?: boolean; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center rounded-lg text-sm font-bold transition"
      style={{
        width: 36, height: 36,
        background: active ? '#002B73' : 'transparent',
        color: active ? '#fff' : '#475569',
      }}
    >
      {children}
    </button>
  );
}

type OrderFilterStatus = 'all' | OrderStatus;
type OrderSortBy = 'default' | 'id-asc' | 'id-desc' | 'name-asc' | 'name-desc' | 'qty-asc' | 'qty-desc';

const ORDER_FILTER_OPTIONS: { value: OrderFilterStatus; label: string }[] = [
  { value: 'all',        label: 'All Orders'  },
  { value: 'shipped',    label: 'Shipped'     },
  { value: 'pending',    label: 'Pending'     },
  { value: 'processing', label: 'Processing'  },
  { value: 'cancelled',  label: 'Cancelled'   },
];

const ORDER_SORT_OPTIONS: { value: OrderSortBy; label: string }[] = [
  { value: 'default',   label: 'Default'           },
  { value: 'id-asc',    label: 'Order ID (A → Z)'   },
  { value: 'id-desc',   label: 'Order ID (Z → A)'   },
  { value: 'name-asc',  label: 'Customer (A → Z)'   },
  { value: 'name-desc', label: 'Customer (Z → A)'   },
  { value: 'qty-asc',   label: 'Qty (Low → High)'   },
  { value: 'qty-desc',  label: 'Qty (High → Low)'   },
];

const PAGE_SIZE = 5;

/* ── Stat card ── */
function StatCard({
  label, value, change, changeColor,
}: { label: string; value: string; change: string; changeColor: string }) {
  return (
    <div
      className="flex flex-col justify-between p-6"
      style={{
        flex: 1, minWidth: 0,
        background: '#fff',
        border: '1px solid #C3C6D4',
        borderRadius: 12,
        boxShadow: '0px 1px 2px rgba(0,0,0,0.05)',
      }}
    >
      <p
        className="font-semibold text-sm uppercase"
        style={{ color: '#434652', letterSpacing: '0.7px' }}
      >
        {label}
      </p>
      <div className="flex items-baseline gap-2 mt-2">
        <span className="font-bold text-[30px] leading-9" style={{ color: '#002B73' }}>
          {value}
        </span>
        <span className="font-bold text-xs" style={{ color: changeColor }}>
          {change}
        </span>
      </div>
    </div>
  );
}

/* ── Page ── */
export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>(ORDERS);
  const [deleteTarget, setDeleteTarget] = useState<Order | null>(null);
  const [page, setPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState<OrderFilterStatus>('all');
  const [sortBy, setSortBy] = useState<OrderSortBy>('default');
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOpen, setSortOpen]     = useState(false);

  const filtered = filterStatus === 'all' ? orders : orders.filter(o => o.status === filterStatus);
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'id-asc')    return a.orderId.localeCompare(b.orderId);
    if (sortBy === 'id-desc')   return b.orderId.localeCompare(a.orderId);
    if (sortBy === 'name-asc')  return a.customerName.localeCompare(b.customerName);
    if (sortBy === 'name-desc') return b.customerName.localeCompare(a.customerName);
    if (sortBy === 'qty-asc')   return a.qty - b.qty;
    if (sortBy === 'qty-desc')  return b.qty - a.qty;
    return 0;
  });

  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const safePage   = Math.min(page, totalPages);
  const paged      = sorted.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);
  const startItem  = sorted.length === 0 ? 0 : (safePage - 1) * PAGE_SIZE + 1;
  const endItem    = Math.min(safePage * PAGE_SIZE, sorted.length);

  const applyFilter = (f: OrderFilterStatus) => { setFilterStatus(f); setPage(1); setFilterOpen(false); };
  const applySort   = (s: OrderSortBy)       => { setSortBy(s);       setPage(1); setSortOpen(false);  };

  const confirmDelete = () => {
    if (deleteTarget) {
      setOrders(prev => {
        const next = prev.filter(o => o.id !== deleteTarget.id);
        if (page > Math.ceil(next.length / PAGE_SIZE)) setPage(p => Math.max(1, p - 1));
        return next;
      });
      setDeleteTarget(null);
    }
  };

  return (
    <>
      <DeleteOrderModal
        isOpen={!!deleteTarget}
        order={deleteTarget}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
      />

      <div className="flex flex-col h-full w-full px-4 sm:px-8 pt-6 sm:pt-8 pb-0">

        {/* ── Header ── */}
        <div className="flex-shrink-0 flex flex-col gap-1 mb-5">
          <h1
            className="font-bold text-[26px] sm:text-[36px] lg:text-[40px] leading-tight"
            style={{
              fontFamily: 'var(--font-manrope, Manrope, sans-serif)',
              color: '#002B73', letterSpacing: '-0.75px',
            }}
          >
            Order Management
          </h1>
          <p className="text-base" style={{ color: '#434652' }}>
            Review and manage customer photo frame orders.
          </p>
        </div>

        {/* ── Stat cards ── */}
        <div className="flex-shrink-0 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-5">
          <StatCard
            label="Total Orders"
            value={ORDER_STATS.totalOrders.value}
            change={ORDER_STATS.totalOrders.change}
            changeColor={ORDER_STATS.totalOrders.changeColor}
          />
          <StatCard
            label="Pending"
            value={ORDER_STATS.pending.value}
            change={ORDER_STATS.pending.change}
            changeColor={ORDER_STATS.pending.changeColor}
          />
          <StatCard
            label="Revenue (MoM)"
            value={ORDER_STATS.revenue.value}
            change={ORDER_STATS.revenue.change}
            changeColor={ORDER_STATS.revenue.changeColor}
          />
        </div>

        {/* ── Table ── */}
        <div
          className="flex flex-col flex-1 overflow-hidden"
          style={{
            background: '#fff',
            border: '1px solid #C3C6D4',
            borderRadius: 12,
            boxShadow: '0px 4px 6px -1px rgba(0,0,0,0.1), 0px 2px 4px -2px rgba(0,0,0,0.1)',
          }}
        >
          {/* Toolbar */}
          {(filterOpen || sortOpen) && (
            <div className="fixed inset-0 z-10" onClick={() => { setFilterOpen(false); setSortOpen(false); }} />
          )}
          <div className="flex-shrink-0 flex items-center justify-between px-6" style={{ height: 53, borderBottom: '1px solid #C3C6D4', background: 'rgba(248,250,252,0.5)', position: 'relative', zIndex: 20 }}>
            <div className="flex items-center gap-4">
              <div className="relative">
                <button onClick={() => { setFilterOpen(v => !v); setSortOpen(false); }}
                  className="flex items-center gap-2 text-sm font-bold transition hover:opacity-80 px-3 py-1.5 rounded-lg"
                  style={{ color: filterStatus !== 'all' ? '#002B73' : '#475569', background: filterStatus !== 'all' ? '#EFF6FF' : 'transparent', border: filterStatus !== 'all' ? '1px solid #BFDBFE' : '1px solid transparent' }}
                >
                  <Filter size={14} />
                  {filterStatus === 'all' ? 'Filter' : ORDER_FILTER_OPTIONS.find(o => o.value === filterStatus)?.label}
                  <ChevronDown size={13} style={{ transform: filterOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s' }} />
                </button>
                {filterOpen && (
                  <div className="absolute left-0 top-full mt-1 w-44 overflow-hidden z-30" style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 10, boxShadow: '0px 8px 16px rgba(0,0,0,0.1)' }}>
                    {ORDER_FILTER_OPTIONS.map(o => (
                      <button key={o.value} onClick={() => applyFilter(o.value)}
                        className="flex items-center justify-between w-full px-4 py-2.5 text-sm font-medium text-left transition hover:bg-slate-50"
                        style={{ color: filterStatus === o.value ? '#002B73' : '#475569' }}
                      >
                        {o.label}
                        {filterStatus === o.value && <Check size={14} color="#002B73" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div className="relative">
                <button onClick={() => { setSortOpen(v => !v); setFilterOpen(false); }}
                  className="flex items-center gap-2 text-sm font-bold transition hover:opacity-80 px-3 py-1.5 rounded-lg"
                  style={{ color: sortBy !== 'default' ? '#002B73' : '#475569', background: sortBy !== 'default' ? '#EFF6FF' : 'transparent', border: sortBy !== 'default' ? '1px solid #BFDBFE' : '1px solid transparent' }}
                >
                  <SlidersHorizontal size={14} />
                  {sortBy === 'default' ? 'Sort' : ORDER_SORT_OPTIONS.find(o => o.value === sortBy)?.label}
                  <ChevronDown size={13} style={{ transform: sortOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s' }} />
                </button>
                {sortOpen && (
                  <div className="absolute left-0 top-full mt-1 w-52 overflow-hidden z-30" style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 10, boxShadow: '0px 8px 16px rgba(0,0,0,0.1)' }}>
                    {ORDER_SORT_OPTIONS.map(o => (
                      <button key={o.value} onClick={() => applySort(o.value)}
                        className="flex items-center justify-between w-full px-4 py-2.5 text-sm font-medium text-left transition hover:bg-slate-50"
                        style={{ color: sortBy === o.value ? '#002B73' : '#475569' }}
                      >
                        {o.label}
                        {sortBy === o.value && <Check size={14} color="#002B73" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <p className="text-sm font-medium" style={{ color: '#434652' }}>Showing {startItem}–{endItem} of {sorted.length} orders</p>
          </div>

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
              {paged.map((order, idx) => (
                <tr
                  key={order.id}
                  className="transition hover:bg-slate-50/60"
                  style={{ borderTop: idx === 0 ? 'none' : '1px solid #C3C6D4' }}
                >
                  {/* Order ID */}
                  <td className="py-[26.5px] px-6">
                    <span
                      className="text-sm"
                      style={{ fontFamily: 'monospace', color: '#002B73' }}
                    >
                      {order.orderId}
                    </span>
                  </td>

                  {/* Customer Name */}
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

                  {/* QTY */}
                  <td className="px-6 py-[26.5px] text-center">
                    <span className="font-medium text-base" style={{ color: '#1A1C1F' }}>
                      {order.qty}
                    </span>
                  </td>

                  {/* Customer ID */}
                  <td className="px-6 py-[26px]">
                    <span className="text-sm" style={{ color: '#434652' }}>
                      {order.customerId}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-[24.5px]">
                    <StatusBadge status={order.status} />
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-[16.5px] text-right">
                    <button
                      onClick={() => setDeleteTarget(order)}
                      className="inline-flex items-center justify-center rounded-lg transition hover:bg-red-50"
                      style={{ width: 32, height: 34 }}
                      aria-label="Delete order"
                    >
                      <Trash2 size={16} color="#BC0000" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>

          {/* ── Pagination row ── */}
          <div
            className="flex-shrink-0 flex items-center justify-between px-6"
            style={{ height: 53, borderTop: '1px solid #C3C6D4' }}
          >
            <p className="text-sm font-medium" style={{ color: '#434652' }}>
              Showing {startItem}–{endItem} of {sorted.length} orders
            </p>
            <div className="flex items-center gap-1">
              <PageBtn onClick={() => setPage(p => Math.max(1, p - 1))}><ChevronLeft size={14} /></PageBtn>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
                <PageBtn key={n} active={n === page} onClick={() => setPage(n)}>{n}</PageBtn>
              ))}
              <PageBtn onClick={() => setPage(p => Math.min(totalPages, p + 1))}><ChevronRight size={14} /></PageBtn>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}
