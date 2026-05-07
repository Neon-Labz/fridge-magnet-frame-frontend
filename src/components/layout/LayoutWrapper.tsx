'use client';

import { useState } from 'react';
<<<<<<< HEAD
import Sidebar from './Sidebar';
import TopAppBar from './TopAppBar';
import OrderStatus from './OrderStatus';

export default function LayoutWrapper() {
  const [menu, setMenu] = useState('orders');

  const sampleOrder = {
    _id: '1',
    orderId: 'ORD-001',
    status: 'PENDING',
    customerName: 'Customer Name',
    email: 'customer@gmail.com',
    customerId: 'CUS-001',
    totalValue: 120,
    qty: 1,
    shippingAddress: '4820 Memory Lane',
  };

  return (
    <div className="flex min-h-screen bg-white text-[#06327a]">
      <Sidebar menu={menu} setMenu={setMenu} />

      <main className="flex-1 bg-white">
        <TopAppBar setMenu={setMenu} />

        <div className="p-10">
          {menu === 'orders' && <OrderStatus order={sampleOrder} />}
          {menu !== 'orders' && <Placeholder title={menu} />}
        </div>
=======
import type { ReactNode } from 'react';
import TopAppBar from './TopAppBar';
import Sidebar from './Sidebar';

export default function LayoutWrapper({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen overflow-hidden bg-white">
      <TopAppBar onMenuClick={() => setSidebarOpen(v => !v)} />

      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main
        className="flex flex-col overflow-hidden lg:ml-[252px]"
        style={{ marginTop: 89, height: 'calc(100vh - 89px)', backgroundColor: '#FFFFFF' }}
      >
        {children}
>>>>>>> development
      </main>
    </div>
  );
}
<<<<<<< HEAD

function Placeholder({ title }: { title: string }) {
  return (
    <div>
      <h1 className="text-4xl font-bold capitalize text-blue-950">{title}</h1>
      <p className="mt-4 text-slate-500">{title} page content will show here.</p>
    </div>
  );
}
=======
>>>>>>> development
