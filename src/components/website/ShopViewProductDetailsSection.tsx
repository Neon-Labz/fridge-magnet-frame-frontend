"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import PersonalizationSection, {
  PersonalizationState,
} from '@/components/website/PersonalizationSection';
import { useFrameStore } from '@/store/frameStore';
import { useCart } from '@/context/CartContext';

interface ShopViewProductDetailsSectionProps {
  rating?: number;
  reviews?: number;
  inStock?: boolean;
  price?: number;
  description?: string;
}

interface CartItemLocal {
  id: string;
  title: string;
  price: number;
  frameType: string;
  colorOption?: string;
  quantity: number;
  image: string;
}

function ShopViewProductDetailsSection({
  rating = 4.8,
  reviews = 124,
  inStock = true,
  price = 2000.0,
  description =
    'Preserve your most cherished memories with our artisan-crafted Heritage Oak frames. Each piece is hand-finished to ensure a museum-grade quality that complements any interior.',
}: ShopViewProductDetailsSectionProps) {
  const selectedFrame = useFrameStore((state) => state.selectedFrame);

  const { addToCart } = useCart();

  const router = useRouter();

  const [quantity, setQuantity] = useState(1);

  const getInitialPersonalization = () => {
    if (selectedFrame === 'without-frame') {
      return { option: 'without-frame' as const };
    }

    return {
      option: 'with-frame' as const,
      frameColor:
        selectedFrame === 'white-frame'
          ? ('white' as const)
          : ('black' as const),
    };
  };

  const [personalization, setPersonalization] =
    useState<PersonalizationState>(getInitialPersonalization());

  const incrementQuantity = () => setQuantity((prev) => prev + 1);

  const decrementQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const getMainImageSource = () => {
    if (personalization.option === 'with-frame') {
      return personalization.frameColor === 'white'
        ? '/white-frame-product.png'
        : '/black-frame-product.jpg';
    }

    return '/without-frame.png';
  };

  const mainImageSource = getMainImageSource();

  const getMainImageAlt = () => {
    if (personalization.option === 'with-frame') {
      return personalization.frameColor === 'white'
        ? 'Magnet picture with white frame'
        : 'Magnet picture with black frame';
    }

    return 'Magnet picture without frame';
  };

  const getDynamicTitle = () => {
    if (personalization.option === 'with-frame') {
      return personalization.frameColor === 'white'
        ? 'Magnet picture with white frame'
        : 'Magnet picture with black frame';
    }

    return 'Magnet';
  };

  const handleAddToCart = () => {
      const cartItem: CartItemLocal = {
        id: 'magnet-main',
      title: getDynamicTitle(),
      price,
      frameType: selectedFrame,
      colorOption: personalization.option === 'with-frame' ? personalization.frameColor : undefined,
      quantity,
    };

    addToCart(cartItem as any);
    alert('Item added to cart!');
  };

  const handleBuyNow = () => {
    clearCart();

    const cartItem = {
      id: selectedFrame,
      name: getDynamicTitle(),
      price,
      image: mainImageSource,
      quantity,
    };

    try {
      addToCart({
        id: cartItem.id,
        title: cartItem.title,
        image: cartItem.image,
        frameType: cartItem.frameType,
        colorOption: cartItem.colorOption,
        quantity: cartItem.quantity,
        price: cartItem.price,
      });
    } catch (err) {
      console.error('Failed to add to cart', err);
    }

    // navigate to cart page after adding
    try {
      router.push('/cart');
    } catch (err) {
      console.error('Navigation to /cart failed', err);
    }
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="flex flex-col gap-6">
          <div className="relative flex aspect-[4/5] items-center justify-center overflow-hidden rounded-sm bg-[#F4F3ED]">
            <Image
              src={mainImageSource}
              alt={getMainImageAlt()}
              width={500}
              height={625}
              className="h-full w-full object-cover transition-opacity duration-300"
              priority
            />

            <button className="absolute right-4 top-4 z-10 rounded-full bg-white p-2 shadow-sm transition-shadow hover:shadow-md">
              🔍
            </button>
          </div>

          <div className="flex gap-4">
            {personalization.option === 'with-frame' && (
              <>
                <div
                  onClick={() =>
                    setPersonalization({
                      option: 'with-frame',
                      frameColor: 'black',
                    })
                  }
                  className="aspect-[4/5] w-32 cursor-pointer overflow-hidden rounded-sm border-2 bg-[#F4F3ED] transition-all"
                  style={{
                    borderColor:
                      personalization.frameColor === 'black'
                        ? '#1A2B5E'
                        : 'transparent',
                  }}
                >
                  <Image
                    src="/black-frame-product.jpg"
                    alt="Black frame thumbnail"
                    width={128}
                    height={160}
                    className="h-full w-full object-cover hover:opacity-80"
                  />
                </div>

                <div
                  onClick={() =>
                    setPersonalization({
                      option: 'with-frame',
                      frameColor: 'white',
                    })
                  }
                  className="aspect-[4/5] w-32 cursor-pointer overflow-hidden rounded-sm border-2 bg-[#F4F3ED] transition-all"
                  style={{
                    borderColor:
                      personalization.frameColor === 'white'
                        ? '#1A2B5E'
                        : 'transparent',
                  }}
                >
                  <Image
                    src="/white-frame-product.png"
                    alt="White frame thumbnail"
                    width={128}
                    height={160}
                    className="h-full w-full object-cover hover:opacity-80"
                  />
                </div>
              </>
            )}

            {personalization.option === 'without-frame' && (
              <div className="aspect-[4/5] w-32 overflow-hidden rounded-sm border-2 border-[#1A2B5E] bg-[#F4F3ED]">
                <Image
                  src="/without-frame.png"
                  alt="Without frame product"
                  width={128}
                  height={160}
                  className="h-full w-full object-cover"
                />
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col pt-4">
          <h1 className="mb-3 text-[22px] font-medium text-slate-800">
            {getDynamicTitle()}
          </h1>

          <div className="mb-6 flex items-center gap-4">
            <div className="flex gap-1 text-[#FFB800]">★★★★★</div>

            <span className="text-sm text-slate-500">
              {rating} ({reviews} reviews)
            </span>

            <div className="mx-1 h-4 w-px bg-slate-300" />

            <span className="text-sm font-bold text-[#E62A24]">
              {inStock ? 'IN STOCK' : 'OUT OF STOCK'}
            </span>
          </div>

          <div className="mb-6 text-[32px] font-bold text-[#1A2B5E]">
            Rs{price.toFixed(2)}
          </div>

          <p className="mb-8 text-base leading-relaxed text-slate-600">
            {description}
          </p>

          <hr className="mb-8 border-slate-200" />

          <div className="mb-8">
            <PersonalizationSection
              onChange={setPersonalization}
              initialOption={personalization.option}
              initialFrameColor={personalization.frameColor}
            />
          </div>

          <div className="mb-10">
            <label className="mb-3 block text-[15px] text-slate-800">
              Quantity
            </label>

            <div className="flex w-fit items-center rounded-[4px] border border-slate-200">
              <button
                onClick={decrementQuantity}
                className="flex h-10 w-10 items-center justify-center text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-800"
              >
                −
              </button>

              <div className="flex h-10 w-10 items-center justify-center border-x border-slate-200 text-[15px] font-semibold text-slate-800">
                {quantity}
              </div>

              <button
                onClick={incrementQuantity}
                className="flex h-10 w-10 items-center justify-center text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-800"
              >
                +
              </button>
            </div>
          </div>

          <div className="flex max-w-[500px] flex-col gap-4 sm:flex-row">
            <button
              onClick={handleAddToCart}
              className="flex flex-1 items-center justify-center gap-2 rounded-[4px] border-2 border-[#1A2B5E] px-6 py-3 font-medium text-[#1A2B5E] transition-all hover:bg-slate-50"
            >
              🛒 Add to Cart
            </button>

            <button 
              onClick={handleBuyNow}
              className="flex-1 rounded-[4px] bg-[#E62A24] px-6 py-3 font-medium text-white shadow-sm transition-colors hover:bg-red-700"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ShopViewProductDetailsSection;