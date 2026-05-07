'use client';

import { useState } from 'react';

export default function OrderStatus({ order }: any) {
  const [status, setStatus] = useState(order.status);

  const statuses = ['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELED'];

  const handleUpdate = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/${order._id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });

    alert('Order status updated');
  };

  return (
    <div className="h-screen overflow-y-auto pb-10">
      <div className="flex max-w-7xl gap-8">
        <section className="flex-1 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="p-8">
            <p className="text-sm text-blue-900">
              Orders › <b>Update Status</b>
            </p>

            <div className="mt-8 flex items-start justify-between">
              <div>
                <h1 className="text-4xl font-bold text-blue-950">
                  Order #{order.orderId}
                </h1>
                <p className="mt-2 text-slate-500">
                  Modify the current stage of this order fulfillment.
                </p>
              </div>

              <div className="rounded-full bg-blue-50 px-7 py-4 text-sm font-bold text-blue-900">
                Status:
                <br />
                {status}
              </div>
            </div>
          </div>

          <div className="border-t border-slate-100 p-8">
            <h2 className="font-bold text-slate-900">Change Status</h2>

            <div className="mt-6 flex flex-wrap gap-6">
              {statuses.map((item) => (
                <button
                  key={item}
                  onClick={() => setStatus(item)}
                  className={`h-20 w-24 rounded-xl border text-xs font-bold ${
                    status === item
                      ? 'border-blue-800 bg-blue-50 text-blue-900 shadow'
                      : 'border-slate-200 text-slate-500'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="mt-10">
              <p className="mb-3 font-bold text-slate-900">≋ Internal Admin Note</p>
              <textarea
                className="h-40 w-full rounded-2xl border border-slate-200 p-6 text-slate-700 outline-none"
                placeholder="Describe the reason for this status change or add fulfillment notes..."
              />
            </div>
          </div>

          <div className="flex justify-end gap-6 border-t bg-slate-50 p-8">
            <button className="w-64 rounded-xl border border-slate-300 py-4 font-bold text-slate-600">
              Discard Changes
            </button>

            <button
              onClick={handleUpdate}
              className="w-72 rounded-xl bg-red-700 py-4 font-bold text-white shadow-md hover:bg-red-800"
            >
              Update Order Status
            </button>
          </div>
        </section>

        <aside className="w-80 space-y-8">
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <h3 className="mb-8 text-sm font-bold tracking-widest text-blue-900">
              • ORDER DETAILS
            </h3>

            <Detail label="Customer" value={order.customerName} />
            <Detail label="Email Address" value={order.email} />
            <Detail label="Customer ID" value={order.customerId} />

            <div className="mt-6 flex justify-between font-bold text-slate-900">
              <span>TOTAL VALUE</span>
              <span className="text-2xl text-blue-900">${order.totalValue}</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Detail({ label, value }: any) {
  return (
    <div className="border-b border-slate-200 py-5 text-sm">
      <p className="text-slate-500">{label}</p>
      <p className="mt-1 font-bold text-black">{value || '-'}</p>
    </div>
  );
}