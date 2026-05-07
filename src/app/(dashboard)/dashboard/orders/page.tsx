'use client';

import { useState } from 'react';
import DeleteOrderModal from '@/components/dashboard/orders/DeleteOrderModal';
import OrderFilters, { type OrderFilterStatus, type OrderSortBy } from '@/components/dashboard/orders/OrderFilters';
import OrderHeader from '@/components/dashboard/orders/OrderHeader';
import OrderPagination from '@/components/dashboard/orders/OrderPagination';
import OrderStats from '@/components/dashboard/orders/OrderStats';
import OrderTable from '@/components/dashboard/orders/OrderTable';
import { ORDERS } from '@/data/orders';
import type { Order } from '@/types/order';

const PAGE_SIZE = 5;

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>(ORDERS);
  const [deleteTarget, setDeleteTarget] = useState<Order | null>(null);
  const [page, setPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState<OrderFilterStatus>('all');
  const [sortBy, setSortBy] = useState<OrderSortBy>('default');
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

  const filtered = filterStatus === 'all' ? orders : orders.filter(order => order.status === filterStatus);
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'id-asc') return a.orderId.localeCompare(b.orderId);
    if (sortBy === 'id-desc') return b.orderId.localeCompare(a.orderId);
    if (sortBy === 'name-asc') return a.customerName.localeCompare(b.customerName);
    if (sortBy === 'name-desc') return b.customerName.localeCompare(a.customerName);
    if (sortBy === 'qty-asc') return a.qty - b.qty;
    if (sortBy === 'qty-desc') return b.qty - a.qty;
    return 0;
  });

  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const paged = sorted.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);
  const startItem = sorted.length === 0 ? 0 : (safePage - 1) * PAGE_SIZE + 1;
  const endItem = Math.min(safePage * PAGE_SIZE, sorted.length);

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

  const confirmDelete = () => {
    if (!deleteTarget) return;

    setOrders(prevOrders => {
      const nextOrders = prevOrders.filter(order => order.id !== deleteTarget.id);
      if (page > Math.ceil(nextOrders.length / PAGE_SIZE)) {
        setPage(currentPage => Math.max(1, currentPage - 1));
      }
      return nextOrders;
    });

    setDeleteTarget(null);
  };

  return (
    <>
      <DeleteOrderModal
        isOpen={Boolean(deleteTarget)}
        order={deleteTarget}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
      />

      <div className="flex h-full w-full flex-col px-4 pb-0 pt-6 sm:px-8 sm:pt-8">
        <OrderHeader />
        <OrderStats />

        <div
          className="flex flex-1 flex-col overflow-hidden"
          style={{
            background: '#fff',
            border: '1px solid #C3C6D4',
            borderRadius: 12,
            boxShadow: '0px 4px 6px -1px rgba(0,0,0,0.1), 0px 2px 4px -2px rgba(0,0,0,0.1)',
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
              setFilterOpen(current => !current);
              setSortOpen(false);
            }}
            onSortToggle={() => {
              setSortOpen(current => !current);
              setFilterOpen(false);
            }}
            onFilterSelect={handleFilterSelect}
            onSortSelect={handleSortSelect}
            startItem={startItem}
            endItem={endItem}
            totalItems={sorted.length}
          />

          <OrderTable orders={paged} onDelete={setDeleteTarget} />

          <OrderPagination
            currentPage={safePage}
            totalPages={totalPages}
            startItem={startItem}
            endItem={endItem}
            totalItems={sorted.length}
            onPageChange={setPage}
          />
        </div>
      </div>
    </>
  );
}
