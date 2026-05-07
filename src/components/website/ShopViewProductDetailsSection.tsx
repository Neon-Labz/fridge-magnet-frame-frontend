'use client';

import React, { useState } from 'react';
import PersonalizationSection, {
  PersonalizationState,
} from '@/components/website/PersonalizationSection';

interface ShopViewProductDetailsSectionProps {
  title?: string;
  rating?: number;
  reviews?: number;
  inStock?: boolean;
  price?: number;
  description?: string;
}

export default function ShopViewProductDetailsSection({
  title = 'Magnate picture with black frame',
  rating = 4.8,
  reviews = 124,
  inStock = true,
  price = 2000.0,
  description =
    'Preserve your most cherished memories with our artisan-crafted Heritage Oak frames. Each piece is hand-finished to ensure a museum-grade quality that complements any interior.',
}: ShopViewProductDetailsSectionProps) {
  const [quantity, setQuantity] = useState(4);
  const [personalization, setPersonalization] = useState<PersonalizationState>({
    option: 'with-frame',
    frameColor: 'black',
  });

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  /* ── Frame visual helpers ─────────────────────────────────────── */
  const showFrame = personalization.option === 'with-frame';
  const frameColor = personalization.frameColor ?? 'black';

  const frameOuterClass = showFrame
    ? frameColor === 'black'
      ? 'bg-black'
      : 'bg-white border-4 border-slate-200 shadow-md'
    : 'bg-transparent';

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

        {/* ── Left Column: Image Gallery ──────────────────────────── */}
        <div className="flex flex-col gap-6">

          {/* Main Image */}
          <div className="bg-[#F4F3ED] aspect-[4/5] rounded-sm flex items-center justify-center relative overflow-hidden">

            {showFrame && frameColor === 'black' ? (
              /* Real product photo — With Frame + Black */
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src="/black-frame-product.jpg"
                alt="Magnate picture with black frame"
                className="w-full h-full object-cover transition-opacity duration-300"
              />
            ) : (
              /* Mockup panels for White Frame / Without Frame */
              <div
                className={[
                  'absolute transition-all duration-300',
                  showFrame ? 'inset-10 p-4' : 'inset-6 p-0',
                  frameOuterClass,
                ].join(' ')}
              >
                <div className="w-full h-full flex flex-wrap gap-2">
                  <div className="w-[calc(50%-4px)] h-[calc(50%-4px)] bg-slate-200" />
                  <div className="w-[calc(50%-4px)] h-[calc(50%-4px)] bg-slate-300" />
                  <div className="w-[calc(50%-4px)] h-[calc(50%-4px)] bg-slate-400" />
                  <div className="w-[calc(50%-4px)] h-[calc(50%-4px)] bg-slate-500" />
                </div>
              </div>
            )}

            {/* Frame label badge (only for white frame mockup) */}
            {showFrame && frameColor === 'white' && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide bg-white text-slate-700 border border-slate-200">
                White Frame
              </div>
            )}

            {/* Zoom icon */}
            <button className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-sm hover:shadow-md transition-shadow z-10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="#1A2B5E"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6"
                />
              </svg>
            </button>
          </div>

          {/* Thumbnails */}
          <div className="flex gap-4">
            {/* Black frame thumbnail — real photo */}
            <div className="bg-[#F4F3ED] aspect-[4/5] w-32 rounded-sm overflow-hidden border-2 border-transparent hover:border-[#1A2B5E] cursor-pointer transition-colors">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/black-frame-product.jpg"
                alt="Black frame thumbnail"
                className="w-full h-full object-cover"
              />
            </div>
            {/* White frame thumbnail */}
            <div className="bg-[#F4F3ED] aspect-[4/5] w-32 rounded-sm flex items-center justify-center p-3 border-2 border-transparent hover:border-slate-300 cursor-pointer transition-colors opacity-70 hover:opacity-100">
              <div className="w-full h-full bg-white border border-slate-200 shadow-sm p-1 flex flex-wrap gap-1">
                <div className="w-[calc(50%-2px)] h-[calc(50%-2px)] bg-slate-200" />
                <div className="w-[calc(50%-2px)] h-[calc(50%-2px)] bg-slate-300" />
                <div className="w-[calc(50%-2px)] h-[calc(50%-2px)] bg-slate-400" />
                <div className="w-[calc(50%-2px)] h-[calc(50%-2px)] bg-slate-500" />
              </div>
            </div>
          </div>
        </div>

        {/* ── Right Column: Details ────────────────────────────────── */}
        <div className="flex flex-col pt-4">
          <h1 className="text-[22px] text-slate-800 font-medium mb-3">{title}</h1>

          {/* Rating */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex gap-1 text-[#FFB800]">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005z"
                    clipRule="evenodd"
                  />
                </svg>
              ))}
            </div>
            <span className="text-sm text-slate-500">
              {rating} ({reviews} reviews)
            </span>
            <div className="h-4 w-px bg-slate-300 mx-1" />
            <span className="text-sm font-bold text-[#E62A24]">
              {inStock ? 'IN STOCK' : 'OUT OF STOCK'}
            </span>
          </div>

          {/* Price */}
          <div className="text-[32px] font-bold text-[#1A2B5E] mb-6">
            Rs{price.toFixed(2)}
          </div>

          {/* Description */}
          <p className="text-slate-600 text-base leading-relaxed mb-8">{description}</p>

          <hr className="border-slate-200 mb-8" />

          {/* ── Personalization Section ─────────────────────────── */}
          <div className="mb-8">
            <PersonalizationSection onChange={setPersonalization} />
          </div>


          <div className="mb-10">
            <label className="block text-[15px] text-slate-800 mb-3">Quantity</label>
            <div className="flex items-center border border-slate-200 rounded-[4px] w-fit">
              <button
                onClick={decrementQuantity}
                className="w-10 h-10 flex items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-colors"
                aria-label="Decrease quantity"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H3.75A.75.75 0 013 10z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <div className="w-10 h-10 flex items-center justify-center font-semibold text-[15px] text-slate-800 border-x border-slate-200">
                {quantity}
              </div>
              <button
                onClick={incrementQuantity}
                className="w-10 h-10 flex items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-colors"
                aria-label="Increase quantity"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-4 h-4"
                >
                  <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 max-w-[500px]">
            <button className="flex-1 flex items-center justify-center gap-2 py-3 px-6 border-2 border-[#1A2B5E] text-[#1A2B5E] font-medium rounded-[4px] hover:bg-slate-50 transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                />
              </svg>
              Add to Cart
            </button>
            <button className="flex-1 py-3 px-6 bg-[#E62A24] text-white font-medium rounded-[4px] hover:bg-red-700 transition-colors shadow-sm">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
