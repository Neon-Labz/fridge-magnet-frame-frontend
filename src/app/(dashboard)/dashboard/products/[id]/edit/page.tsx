'use client';

import { use, useState } from 'react';
import { ChevronDown, MapPin, Package, History } from 'lucide-react';
import Link from 'next/link';
import { PRODUCTS } from '@/data/products';

const STOCK_OPTIONS = ['In Stock', 'Low Stock', 'Out of Stock'] as const;

export default function ManageStockPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const product = PRODUCTS.find(p => p.sku === id) ?? PRODUCTS[0];

  const currentLabel =
    product.stockStatus === 'in-stock' ? 'In Stock' :
    product.stockStatus === 'low-stock' ? 'Low Stock' : 'Out of Stock';

  const [selected, setSelected] = useState<string>(currentLabel);
  const [open, setOpen] = useState(false);

  const cardRadius = 16;

  return (
    <div className="px-4 sm:px-10 lg:px-[63px] py-8 lg:py-[50px] overflow-y-auto h-full max-w-[1400px]">

      {/* ── Header ── */}
      <div className="flex flex-col gap-2 mb-10">
        <h1
          className="font-bold text-[32px] sm:text-[38px] lg:text-[44px] leading-tight"
          style={{ fontFamily: 'var(--font-manrope, Manrope, sans-serif)', color: '#002B73', letterSpacing: '-1px' }}
        >
          Manage Stock Level
        </h1>
        <p className="text-[20px] leading-relaxed font-medium" style={{ color: '#434652' }}>
          Review and adjust the availability for individual gallery products.
        </p>
      </div>

      {/* ── Bento grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Row 1 — left: Product Overview */}
        <div
          className="flex flex-col md:flex-row items-center gap-8 p-8 md:p-10"
          style={{ border: '1.2px solid #E2E4ED', borderRadius: cardRadius, background: '#fff' }}
        >
          {/* Product image container */}
          <div
            className="flex-shrink-0 flex items-center justify-center bg-[#F8F8FB] rounded-2xl p-4"
            style={{ width: 220, height: 220, border: '1px solid #EDEDF2' }}
          >
            <div className="w-full h-full bg-white border-[12px] border-[#A67C52] shadow-md flex items-center justify-center relative overflow-hidden">
               <div className="absolute inset-0 border-[1px] border-black/10" />
               <div className="w-[70%] h-[70%] bg-[#FDFDFD] border border-gray-100 flex items-center justify-center text-[10px] text-gray-400 font-bold text-center p-2 uppercase tracking-wider">
                 {product.name}
               </div>
            </div>
          </div>

          {/* Product info */}
          <div className="flex flex-col gap-3 min-w-0">
            <p
              className="text-xs font-bold uppercase tracking-[0.15em]"
              style={{ color: '#0040A1' }}
            >
              SKU: {product.sku}
            </p>
            <h2
              className="font-bold leading-tight"
              style={{ fontFamily: 'var(--font-manrope, Manrope, sans-serif)', fontSize: 32, color: '#002B73' }}
            >
              {product.name}
            </h2>
            <p className="text-base leading-relaxed font-medium" style={{ color: '#5C5F6C' }}>
              {product.description}
            </p>
            <div className="flex items-center gap-2 mt-2">
              {[product.size, product.finish].filter(Boolean).map(tag => (
                <span
                  key={tag}
                  className="text-sm font-semibold px-4 py-1.5"
                  style={{ background: '#F1F1F5', borderRadius: 9999, color: '#1A1C1F' }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Row 1 — right: Update Stock Status (dark blue card) */}
        <div
          className="flex flex-col justify-between p-8 md:p-10"
          style={{ background: '#002B73', borderRadius: cardRadius, boxShadow: '0px 10px 25px -5px rgba(0, 43, 115, 0.2)' }}
        >
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <Package size={28} color="#DAE2FF" strokeWidth={2.5} />
              <span className="text-2xl font-bold text-white tracking-tight">Update Stock Status</span>
            </div>
            <p className="text-lg font-medium" style={{ color: '#98B3FF' }}>
              Current Availability: <span className="font-bold text-white uppercase ml-1">{currentLabel}</span>
            </p>
          </div>

          <div className="flex flex-col gap-3 mt-8 lg:mt-0">
            <label className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: '#98B3FF' }}>
              New Availability Status
            </label>
            <div className="relative">
              <button
                onClick={() => setOpen((v: boolean) => !v)}
                className="flex items-center justify-between w-full px-6 text-white font-bold text-lg"
                style={{ height: 60, background: '#0040A1', borderRadius: 12 }}
              >
                <span>{selected}</span>
                <ChevronDown
                  size={20}
                  className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
                />
              </button>
              {open && (
                <div
                  className="absolute left-0 right-0 mt-2 z-20 overflow-hidden shadow-xl"
                  style={{ background: '#0040A1', borderRadius: 12, border: '1px solid rgba(255,255,255,0.1)' }}
                >
                  {STOCK_OPTIONS.map(opt => (
                    <button
                      key={opt}
                      onClick={() => { setSelected(opt); setOpen(false); }}
                      className="flex items-center w-full px-6 py-4 text-white font-bold text-base text-left transition hover:bg-[#003585]"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Row 2 — left: Warehouse Location */}
        <div
          className="flex flex-col justify-center gap-4 px-8 py-8"
          style={{ background: '#F8F8FB', border: '1px solid #EDEDF2', borderRadius: cardRadius }}
        >
          <h4 className="text-lg font-bold" style={{ color: '#002B73' }}>Warehouse Location</h4>
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0 w-11 h-11 flex items-center justify-center bg-white rounded-full shadow-sm">
              <MapPin size={22} color="#0040A1" strokeWidth={2.5} />
            </div>
            <div>
              <p className="text-[19px] font-bold leading-tight" style={{ color: '#1A1C1F' }}>{product.warehouseLocation}</p>
              <p className="text-sm font-medium mt-0.5" style={{ color: '#5C5F6C' }}>{product.warehouseCenter}</p>
            </div>
          </div>
        </div>

        {/* Row 2 — right: Last Updated */}
        <div
          className="flex items-center justify-between px-8 py-8"
          style={{ background: '#F8F8FB', border: '1px solid #EDEDF2', borderRadius: cardRadius }}
        >
          <div className="flex flex-col gap-1.5">
            <h4 className="text-lg font-bold" style={{ color: '#002B73' }}>Last Updated</h4>
            <p className="text-lg font-medium" style={{ color: '#5C5F6C' }}>
              Adjusted by <span className="font-bold text-[#1A1C1F]">{product.lastUpdatedBy}</span> on {product.lastUpdatedDate}
            </p>
          </div>
          <button className="flex items-center gap-2 text-base font-bold transition hover:text-[#0040A1] flex-shrink-0" style={{ color: '#002B73' }}>
            View Log
            <div className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-sm ml-1">
              <History size={16} />
            </div>
          </button>
        </div>
      </div>

      {/* ── Footer actions ── */}
      <div className="flex items-center justify-end gap-4 mt-12 pb-10">
        <Link
          href="/products"
          className="flex items-center justify-center font-bold text-lg transition hover:bg-gray-50"
          style={{ width: 140, height: 60, border: '2px solid #002B73', borderRadius: 12, color: '#002B73' }}
        >
          Cancel
        </Link>
        <button
          className="flex items-center justify-center font-bold text-lg text-white transition hover:opacity-90"
          style={{ width: 280, height: 60, background: '#BC0000', borderRadius: 12, boxShadow: '0px 4px 12px rgba(188, 0, 0, 0.2)' }}
        >
          Confirm Status Update
        </button>
      </div>
    </div>
  );
}