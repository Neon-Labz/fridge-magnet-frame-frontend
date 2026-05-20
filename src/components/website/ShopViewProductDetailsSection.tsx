'use client';

import React, { useState } from 'react';
import PersonalizationSection from '@/components/website/PersonalizationSection';
import { useCartStore, FrameOption } from '@/store/cartStore';
import { useToastStore } from '@/store/toastStore';
import { useFrameStore } from '@/store/frameStore';

interface ShopViewProductDetailsSectionProps {
  products: any[];
}

export default function ShopViewProductDetailsSection({ products }: ShopViewProductDetailsSectionProps) {
  const selectedFrameFromStore = useFrameStore((state) => state.selectedFrame);
  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useCartStore();
  const { addToast } = useToastStore();

  /* ── Guard: nothing in DB ───────────────────────────────────────── */
  if (!products || products.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <p className="text-xl text-slate-500 font-medium">No products found in database.</p>
      </div>
    );
  }

  /* ── All data comes directly from the first DB document ─────────── */
  const product     = products[0];
  const title       = product.productName ?? '';
  const price       = product.price       ?? 0;
  const description = product.description ?? '';
  const inStock     = product.status === 'In Stock';

  // Personalization options from DB
  // Older records use 'personalization', newer ones use 'personalizationInstructions'
  const rawOptions: string[] =
    (product.personalizationInstructions?.length
      ? product.personalizationInstructions
      : product.personalization) ?? [];
  const personalizationOptions = rawOptions.filter(Boolean);

  /* ── Get image from database ─────────────────────────────────────── */
  const mainImage = product.primaryImage?.secure_url ?? null;
  const imageAltText = product.productName || 'Product image';

  /* ── Add to cart ────────────────────────────────────────────────── */
  const handleAddToCart = () => {
    const frameOption: FrameOption = selectedFrameFromStore;
    addToCart({
      id: product._id,
      title,
      price,
      frameOption,
      quantity,
      image: mainImage,
    });
    addToast('Product added to cart successfully!', 'success');
  };

  /* ── Render ─────────────────────────────────────────────────────── */
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

        {/* ── Left: Image ─────────────────────────────────────────── */}
        <div className="flex flex-col gap-6">

          {/* Main Image */}
          <div className="bg-[#F4F3ED] aspect-[4/5] rounded-sm flex items-center justify-center relative overflow-hidden">
            {mainImage ? (
              <img
                src={mainImage}
                alt={imageAltText}
                className="w-full h-full object-cover transition-opacity duration-300"
              />
            ) : (
              <div className="flex flex-col items-center justify-center text-center">
                <p className="text-slate-400 text-sm font-medium">No image available</p>
                <p className="text-slate-300 text-xs mt-1">Upload image to product in dashboard</p>
              </div>
            )}
            <button className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-sm hover:shadow-md transition-shadow z-10">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                strokeWidth={2} stroke="#1A2B5E" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
              </svg>
            </button>
          </div>

        </div>

        {/* ── Right: Product Details (all from DB) ─────────────────── */}
        <div className="flex flex-col pt-4">

          {/* Title from DB */}
          <h1 className="text-[22px] text-slate-800 font-medium mb-3">{title}</h1>

          {/* Stock status from DB */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex gap-1 text-[#FFB800]">
              {[1,2,3,4,5].map(s => (
                <svg key={s} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path fillRule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005z"
                    clipRule="evenodd" />
                </svg>
              ))}
            </div>
            <div className="h-4 w-px bg-slate-300 mx-1" />
            <span className="text-sm font-bold text-[#E62A24]">
              {inStock ? 'IN STOCK' : 'OUT OF STOCK'}
            </span>
          </div>

          {/* Price from DB */}
          <div className="text-[32px] font-bold text-[#1A2B5E] mb-6">
            Rs{price.toFixed(2)}
          </div>

          {/* Description from DB */}
          <p className="text-slate-600 text-base leading-relaxed mb-8">{description}</p>

          <hr className="border-slate-200 mb-8" />

          {/* Personalization options from DB — only shown if the product has any */}
          {personalizationOptions.length > 0 && (
            <div className="mb-8">
              <PersonalizationSection availableOptions={personalizationOptions} />
            </div>
          )}

          {/* Quantity */}
          <div className="mb-10">
            <label className="block text-[15px] text-slate-800 mb-3">Quantity</label>
            <div className="flex items-center border border-slate-200 rounded-[4px] w-fit">
              <button
                onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                className="w-10 h-10 flex items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-colors"
                aria-label="Decrease quantity"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                  <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                </svg>
              </button>
              <div className="w-10 h-10 flex items-center justify-center font-semibold text-[15px] text-slate-800 border-x border-slate-200">
                {quantity}
              </div>
              <button
                onClick={() => setQuantity(prev => prev + 1)}
                className="w-10 h-10 flex items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-colors"
                aria-label="Increase quantity"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                  <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 max-w-[500px]">
            <button
              onClick={handleAddToCart}
              className="flex-1 flex items-center justify-center gap-2 py-3 px-6 border-2 border-[#1A2B5E] text-[#1A2B5E] font-medium rounded-[4px] hover:bg-slate-50 transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
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
