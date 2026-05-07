'use client';

import { Trash2, X } from 'lucide-react';
import type { Order } from '@/types/order';

interface DeleteOrderModalProps {
  isOpen: boolean;
  order: Order | null;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function DeleteOrderModal({ isOpen, order, onCancel, onConfirm }: DeleteOrderModalProps) {
  if (!isOpen || !order) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(2px)' }}
      onClick={onCancel}
    >
      <div
        className="relative flex flex-col bg-white"
        style={{ width: 480, borderRadius: 16, boxShadow: '0px 20px 40px rgba(0,0,0,0.18)', padding: '40px 40px 32px' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onCancel}
          className="absolute flex items-center justify-center transition hover:bg-slate-100 rounded-lg"
          style={{ top: 20, right: 20, width: 32, height: 32 }}
        >
          <X size={18} color="#64748B" />
        </button>

        {/* Icon */}
        <div
          className="flex items-center justify-center flex-shrink-0 mb-6"
          style={{ width: 64, height: 64, background: '#FEF2F2', borderRadius: 16 }}
        >
          <Trash2 size={28} color="#BC0000" />
        </div>

        {/* Heading */}
        <h2
          className="font-bold mb-2"
          style={{ fontFamily: 'var(--font-manrope, Manrope, sans-serif)', fontSize: 24, color: '#002B73', lineHeight: '32px' }}
        >
          Delete Order
        </h2>
        <p className="text-base mb-6" style={{ color: '#434652', lineHeight: '24px' }}>
          Are you sure you want to delete order{' '}
          <span className="font-semibold" style={{ color: '#002B73' }}>{order.orderId}</span>?
          This action cannot be undone.
        </p>

        {/* Order preview card */}
        <div
          className="flex items-center gap-4 mb-8 p-4"
          style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 12 }}
        >
          <div
            className="flex items-center justify-center flex-shrink-0 font-bold text-sm"
            style={{ width: 40, height: 40, background: '#DAE2FF', borderRadius: 9999, color: '#002B73' }}
          >
            {order.customerInitials}
          </div>
          <div className="flex flex-col min-w-0">
            <p className="font-semibold text-base" style={{ color: '#1A1C1F' }}>{order.customerName}</p>
            <p className="text-sm" style={{ color: '#64748B' }}>
              {order.orderId} &nbsp;·&nbsp; Qty: {order.qty} &nbsp;·&nbsp; {order.customerId}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 flex items-center justify-center font-semibold text-base transition hover:bg-slate-50"
            style={{ height: 48, border: '1.5px solid #C3C6D4', borderRadius: 10, color: '#434652' }}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 flex items-center justify-center font-semibold text-base text-white transition hover:opacity-90"
            style={{ height: 48, background: '#BC0000', borderRadius: 10, boxShadow: '0px 4px 8px rgba(188,0,0,0.24)' }}
          >
            Delete Order
          </button>
        </div>
      </div>
    </div>
  );
}
