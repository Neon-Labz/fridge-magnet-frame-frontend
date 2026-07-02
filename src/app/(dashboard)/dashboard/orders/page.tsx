'use client';

import { useEffect, useState } from 'react';
import DeleteOrderModal from '@/components/dashboard/orders/DeleteOrderModal';
import OrderFilters, {
  type OrderFilterStatus,
  type OrderSortBy,
} from '@/components/dashboard/orders/OrderFilters';
import OrderHeader from '@/components/dashboard/orders/OrderHeader';
import OrderPagination from '@/components/dashboard/orders/OrderPagination';
import OrderStats from '@/components/dashboard/orders/OrderStats';
import OrderTable from '@/components/dashboard/orders/OrderTable';
import { fetchOrders } from '@/lib/orders';
import { apiV1Url } from '@/lib/backendUrl';
import type { Order } from '@/types/order';

const PAGE_SIZE = 5;

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [deleteTarget, setDeleteTarget] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState<OrderFilterStatus>('all');
  const [sortBy, setSortBy] = useState<OrderSortBy>('default');
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

  const loadOrders = async () => {
    setLoading(true);
    setError(null);

    try {
      setOrders(await fetchOrders());
    } catch (err) {
      setOrders([]);
      setError(err instanceof Error ? err.message : 'Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void loadOrders();
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  const filteredOrders =
    filterStatus === 'all'
      ? orders
      : orders.filter((order) => order.status === filterStatus);

  const tableOrders = [...filteredOrders].sort((a, b) => {
    if (sortBy === 'id-asc') return a.orderId.localeCompare(b.orderId);
    if (sortBy === 'id-desc') return b.orderId.localeCompare(a.orderId);
    if (sortBy === 'name-asc') return a.customerName.localeCompare(b.customerName);
    if (sortBy === 'name-desc') return b.customerName.localeCompare(a.customerName);
    if (sortBy === 'qty-asc') return a.qty - b.qty;
    if (sortBy === 'qty-desc') return b.qty - a.qty;
    return 0;
  });

  const totalPages = Math.max(1, Math.ceil(tableOrders.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pagedOrders = tableOrders.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const startItem = tableOrders.length === 0 ? 0 : (safePage - 1) * PAGE_SIZE + 1;
  const endItem = Math.min(safePage * PAGE_SIZE, tableOrders.length);

  const handleFilterSelect = (nextFilter: OrderFilterStatus) => {
    setFilterStatus(nextFilter);
    setPage(1);
    setFilterOpen(false);
  };

  const handleSortSelect = (nextSort: OrderSortBy) => {
    setSortBy(nextSort);
    setPage(1);
    setSortOpen(false);
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;

    try {
      const response = await fetch(apiV1Url(`/orders/${deleteTarget.id}`), {
        method: 'DELETE',
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data?.message || `Delete failed: ${response.status}`);
      }

      setOrders((prevOrders) => {
        const nextOrders = prevOrders.filter(
          (order) => order.id !== deleteTarget.id
        );

        if (page > Math.ceil(nextOrders.length / PAGE_SIZE)) {
          setPage((currentPage) => Math.max(1, currentPage - 1));
        }

        return nextOrders;
      });
      setDeleteTarget(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete order');
    }
  };

  return (
    <>
      <DeleteOrderModal
        isOpen={Boolean(deleteTarget)}
        order={deleteTarget}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
      />

<div className="flex h-full flex-col px-6 pb-0 pt-6 sm:px-10 sm:pt-8 lg:px-12">
          <OrderHeader />
        <OrderStats orders={tableOrders} />

        <div
          className="flex flex-1 flex-col overflow-hidden"
          style={{
            background: '#fff',
            border: '1px solid #C3C6D4',
            borderRadius: 12,
            boxShadow:
              '0px 4px 6px -1px rgba(0,0,0,0.1), 0px 2px 4px -2px rgba(0,0,0,0.1)',
          }}
        >
          {(filterOpen || sortOpen) && (
            <div
              className="fixed inset-0 z-10"
              onClick={() => {
                setFilterOpen(false);
                setSortOpen(false);
              }}
            />
          )}

          <OrderFilters
            filterStatus={filterStatus}
            sortBy={sortBy}
            filterOpen={filterOpen}
            sortOpen={sortOpen}
            onFilterToggle={() => {
              setFilterOpen((current) => !current);
              setSortOpen(false);
            }}
            onSortToggle={() => {
              setSortOpen((current) => !current);
              setFilterOpen(false);
            }}
            onFilterSelect={handleFilterSelect}
            onSortSelect={handleSortSelect}
            startItem={startItem}
            endItem={endItem}
            totalItems={tableOrders.length}
          />

          {loading || error ? (
            <div className="flex flex-1 items-center justify-center p-10 text-sm font-medium" style={{ color: error ? '#BC0000' : '#434652' }}>
              {error || 'Loading orders...'}
            </div>
          ) : (
            <OrderTable orders={pagedOrders} onDelete={setDeleteTarget} />
          )}

          <OrderPagination
            currentPage={safePage}
            totalPages={totalPages}
            startItem={startItem}
            endItem={endItem}
            totalItems={tableOrders.length}
            onPageChange={setPage}
          />
        </div>
      </div>
    </>
  );
}
