'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import PersonalizationSection, {
  PersonalizationState,
} from '@/components/website/PersonalizationSection';
import { useFrameStore } from '@/store/frameStore';
import { useCartStore } from '@/store/cartStore';
import { useToastStore } from '@/store/toastStore';

interface ShopViewProductDetailsSectionProps {
  title?: string;
  rating?: number;
  reviews?: number;
  inStock?: boolean;
  price?: number;
  description?: string;
}

function ShopViewProductDetailsSection({
  title = 'Magnate picture with black frame',
  rating = 4.8,
  reviews = 124,
  inStock = true,
  price = 2000.0,
  description =
    'Preserve your most cherished memories with our artisan-crafted Heritage Oak frames. Each piece is hand-finished to ensure a museum-grade quality that complements any interior.',
}: ShopViewProductDetailsSectionProps) {
  const router = useRouter();
  const selectedFrame = useFrameStore((state) => state.selectedFrame);
  const { addToCart } = useCartStore();
  const { addToast } = useToastStore();
  const [quantity, setQuantity] = useState(1);

  const getInitialPersonalization = () => {
    if (selectedFrame === 'without-frame') {
      return { option: 'without-frame' as const };
    }
    return {
      option: 'with-frame' as const,
      frameColor: selectedFrame === 'white-frame' ? ('white' as const) : ('black' as const),
    };
  };

  const [personalization, setPersonalization] = useState<PersonalizationState>(
    getInitialPersonalization()
  );

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  /* ── Image selection based on personalization ─────────────────── */
  const getMainImageSource = () => {
    if (personalization.option === 'with-frame') {
      return personalization.frameColor === 'white'
        ? '/white-frame-product.png'
        : '/black-frame-product.jpg';
    }
    return '/without-frame.png';
  };

  const getThumbnailImageSource = (frameType: 'black' | 'white' | 'no-frame') => {
    if (frameType === 'white') return '/white-frame-product.png';
    if (frameType === 'no-frame') return '/without-frame.png';
    return '/black-frame-product.jpg';
  };

  const mainImageSource = getMainImageSource();
  const getMainImageAlt = () => {
    if (personalization.option === 'with-frame') {
      return personalization.frameColor === 'white'
        ? 'Magnate picture with white frame'
        : 'Magnate picture with black frame';
    }
    return 'Magnate picture without frame';
  };

  const getDynamicTitle = () => {
    if (personalization.option === 'with-frame') {
      return personalization.frameColor === 'white'
        ? 'Magnate picture with white frame'
        : 'Magnate picture with black frame';
    }
    return 'Magnate frame';
  };

  const handleAddToCart = () => {
    const cartItem = {
      id: selectedFrame,
      title: getDynamicTitle(),
      price: price,
      frameOption: selectedFrame,
      quantity: quantity,
      image: mainImageSource,
    };

    addToCart(cartItem);
    addToast('Product added to cart successfully!', 'success');
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

        {/* ── Left Column: Image Gallery ──────────────────────────── */}
        <div className="flex flex-col gap-6">

          {/* Main Image */}
          <div className="bg-[#F4F3ED] aspect-[4/5] rounded-sm flex items-center justify-center relative overflow-hidden">
            <Image
              src={mainImageSource}
              alt={getMainImageAlt()}
              width={500}
              height={625}
              className="w-full h-full object-cover transition-opacity duration-300"
              priority
            />

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
            {personalization.option === 'with-frame' && (
              <>
                {/* Black frame thumbnail */}
                <div
                  onClick={() => setPersonalization({ option: 'with-frame' as const, frameColor: 'black' as const })}
                  className="bg-[#F4F3ED] aspect-[4/5] w-32 rounded-sm overflow-hidden border-2 cursor-pointer transition-all"
                  style={{
                    borderColor: personalization.frameColor === 'black' ? '#1A2B5E' : 'transparent'
                  }}
                >
                  <Image
                    src="/black-frame-product.jpg"
                    alt="Black frame thumbnail"
                    width={128}
                    height={160}
                    className="w-full h-full object-cover hover:opacity-80"
                  />
                </div>

                {/* White frame thumbnail */}
                <div
                  onClick={() => setPersonalization({ option: 'with-frame' as const, frameColor: 'white' as const })}
                  className="bg-[#F4F3ED] aspect-[4/5] w-32 rounded-sm overflow-hidden border-2 cursor-pointer transition-all"
                  style={{
                    borderColor: personalization.frameColor === 'white' ? '#1A2B5E' : 'transparent'
                  }}
                >
                  <Image
                    src="/white-frame-product.png"
                    alt="White frame thumbnail"
                    width={128}
                    height={160}
                    className="w-full h-full object-cover hover:opacity-80"
                  />
                </div>
              </>
            )}

            {personalization.option === 'without-frame' && (
              <div
                className="bg-[#F4F3ED] aspect-[4/5] w-32 rounded-sm overflow-hidden border-2"
                style={{
                  borderColor: '#1A2B5E'
                }}
              >
                <Image
                  src="/without-frame.png"
                  alt="Without frame product"
                  width={128}
                  height={160}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        </div>

        {/* ── Right Column: Details ────────────────────────────────── */}
        <div className="flex flex-col pt-4">
          <h1 className="text-[22px] text-slate-800 font-medium mb-3">{getDynamicTitle()}</h1>

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
            <PersonalizationSection
              onChange={setPersonalization}
              initialOption={personalization.option}
              initialFrameColor={personalization.frameColor}
            />
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
            <button
              onClick={handleAddToCart}
              className="flex-1 flex items-center justify-center gap-2 py-3 px-6 border-2 border-[#1A2B5E] text-[#1A2B5E] font-medium rounded-[4px] hover:bg-slate-50 transition-all"
            >
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

export default ShopViewProductDetailsSection;
