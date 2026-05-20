"use client";

import React, { useState } from 'react';
import PersonalizationSection, { PersonalizationState } from './PersonalizationSection';
import { useCartStore } from '../../store/cartStore';
import { useToastStore } from '../../store/toastStore';
import { useFrameStore } from '../../store/frameStore';

interface ShopViewProductDetailsSectionProps {
  products: any[];
}

export default function ShopViewProductDetailsSection({ products }: ShopViewProductDetailsSectionProps) {
  const selectedFrame = useFrameStore((s) => s.selectedFrame);
  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useCartStore();
  const { addToast } = useToastStore();

  if (!products || products.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <p className="text-xl text-slate-500 font-medium">No products found in database.</p>
      </div>
    );
  }

  const product = products[0];
  const title = product.productName ?? '';
  const price = product.price ?? 0;
  const description = product.description ?? '';
  const inStock = product.status === 'In Stock';

  const rawOptions: string[] = (product.personalizationInstructions?.length ? product.personalizationInstructions : product.personalization) ?? [];
  const personalizationOptions = rawOptions.filter(Boolean);

  const mainImage = product.primaryImage?.secure_url ?? null;

  const handleAddToCart = () => {
    addToCart({
      id: product._id,
      title,
      price,
      frameOption: selectedFrame,
      quantity,
      image: mainImage,
    });
    addToast('Product added to cart successfully!', 'success');
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

        {/* Left: Image */}
        <div className="flex flex-col gap-6">
          <div className="bg-[#F4F3ED] aspect-[4/5] rounded-sm flex items-center justify-center relative overflow-hidden">
            {mainImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={mainImage} alt={title || 'Product image'} className="w-full h-full object-cover transition-opacity duration-300" />
            ) : (
              <div className="flex flex-col items-center justify-center text-center">
                <p className="text-slate-400 text-sm font-medium">No image available</p>
                <p className="text-slate-300 text-xs mt-1">Upload image to product in dashboard</p>
              </div>
            )}
          </div>
        </div>

        {/* Right: Details */}
        <div className="flex flex-col pt-4">
          <h1 className="text-[22px] text-slate-800 font-medium mb-3">{title}</h1>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex gap-1 text-[#FFB800]">★★★★★</div>
            <div className="mx-1 h-4 w-px bg-slate-300" />
            <span className="text-sm font-bold text-[#E62A24]">{inStock ? 'IN STOCK' : 'OUT OF STOCK'}</span>
          </div>

          <div className="text-[32px] font-bold text-[#1A2B5E] mb-6">Rs{Number(price).toFixed(2)}</div>

          <p className="text-slate-600 text-base leading-relaxed mb-8">{description}</p>

          <hr className="mb-8 border-slate-200" />

          {personalizationOptions.length > 0 && (
            <div className="mb-8">
              <PersonalizationSection 
                availableOptions={personalizationOptions} 
                availableColors={[]}
                onChange={() => {}} 
              />
            </div>
          )}

          <div className="mb-10">
            <label className="mb-3 block text-[15px] text-slate-800">Quantity</label>
            <div className="flex w-fit items-center rounded-[4px] border border-slate-200">
              <button onClick={() => setQuantity((p) => Math.max(1, p - 1))} className="w-10 h-10 flex items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-colors">−</button>
              <div className="flex h-10 w-10 items-center justify-center border-x border-slate-200 text-[15px] font-semibold text-slate-800">{quantity}</div>
              <button onClick={() => setQuantity((p) => p + 1)} className="w-10 h-10 flex items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-colors">+</button>
            </div>
          </div>

          <div className="flex max-w-[500px] flex-col gap-4 sm:flex-row">
            <button onClick={handleAddToCart} className="flex flex-1 items-center justify-center gap-2 rounded-[4px] border-2 border-[#1A2B5E] px-6 py-3 font-medium text-[#1A2B5E] transition-all hover:bg-slate-50">🛒 Add to Cart</button>
            <button className="flex-1 rounded-[4px] bg-[#E62A24] px-6 py-3 font-medium text-white shadow-sm transition-colors hover:bg-red-700">Buy Now</button>
          </div>
        </div>
      </div>
    </section>
  );
}