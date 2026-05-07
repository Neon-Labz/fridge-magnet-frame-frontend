'use client';

import { useState } from 'react';
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
      </main>
    </div>
  );
}

function Placeholder({ title }: { title: string }) {
  return (
    <div>
      <h1 className="text-4xl font-bold capitalize text-blue-950">{title}</h1>
      <p className="mt-4 text-slate-500">{title} page content will show here.</p>
    </div>
  );
}