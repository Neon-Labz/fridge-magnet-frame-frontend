'use client';

import React, { useState } from 'react';
import PersonalizationSection from '@/components/website/PersonalizationSection';
import { useCartStore, FrameOption } from '@/store/cartStore';
import { useToastStore } from '@/store/toastStore';
import { useFrameStore } from '@/store/frameStore';
import { useCartStore } from '@/store/cartStore';

interface ShopViewProductDetailsSectionProps {
<<<<<<< HEAD
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
=======
  rating?: number;
  reviews?: number;
  inStock?: boolean;
  price?: number;
  description?: string;
}

interface CartItem {
  id: string;
  title: string;
  price: number;
  frameOption: string;
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

  const cartStore = useCartStore() as unknown as {
    addToCart?: (item: CartItem) => void;
    addItem?: (item: CartItem) => void;
  };

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
    const cartItem: CartItem = {
      id: selectedFrame,
      title: getDynamicTitle(),
      price,
      frameOption: selectedFrame,
      quantity,
      image: mainImageSource,
    };

    if (cartStore.addToCart) {
      cartStore.addToCart(cartItem);
    } else if (cartStore.addItem) {
      cartStore.addItem(cartItem);
    } else {
      console.error('No add cart function found in cartStore');
    }
>>>>>>> development
  };

  /* ── Render ─────────────────────────────────────────────────────── */
  return (
<<<<<<< HEAD
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

        {/* ── Left: Image ─────────────────────────────────────────── */}
        *** End Patch
              <button
<<<<<<< HEAD
                onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                className="w-10 h-10 flex items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-colors"
                aria-label="Decrease quantity"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                  <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                </svg>
=======
                onClick={decrementQuantity}
                className="flex h-10 w-10 items-center justify-center text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-800"
              >
                −
>>>>>>> development
              </button>

              <div className="flex h-10 w-10 items-center justify-center border-x border-slate-200 text-[15px] font-semibold text-slate-800">
                {quantity}
              </div>

              <button
<<<<<<< HEAD
                onClick={() => setQuantity(prev => prev + 1)}
                className="w-10 h-10 flex items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-colors"
                aria-label="Increase quantity"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                  <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                </svg>
=======
                onClick={incrementQuantity}
                className="flex h-10 w-10 items-center justify-center text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-800"
              >
                +
>>>>>>> development
              </button>
            </div>
          </div>

<<<<<<< HEAD
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 max-w-[500px]">
            <button
              onClick={handleAddToCart}
              className="flex-1 flex items-center justify-center gap-2 py-3 px-6 border-2 border-[#1A2B5E] text-[#1A2B5E] font-medium rounded-[4px] hover:bg-slate-50 transition-all"
            >
              'use client';

              import React, { useState } from 'react';
              import PersonalizationSection, { PersonalizationState } from '@/components/website/PersonalizationSection';
              import { useCartStore } from '@/store/cartStore';
              import { useToastStore } from '@/store/toastStore';
              import { useFrameStore } from '@/store/frameStore';

              interface ShopViewProductDetailsSectionProps {
                products: any[];
              }

              export default function ShopViewProductDetailsSection({ products }: ShopViewProductDetailsSectionProps) {
                const selectedFrame = useFrameStore((s) => s.selectedFrame);
                const { addToCart } = useCartStore();
                const { addToast } = useToastStore();
                const [quantity, setQuantity] = useState(1);

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

                const rawOptions: string[] = (product.personalizationInstructions?.length
                  ? product.personalizationInstructions
                  : product.personalization) ?? [];
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
                      <div className="flex flex-col gap-6">
                        <div className="bg-[#F4F3ED] aspect-[4/5] rounded-sm flex items-center justify-center relative overflow-hidden">
                          {mainImage ? (
                            <img src={mainImage} alt={title || 'Product image'} className="w-full h-full object-cover transition-opacity duration-300" />
                          ) : (
                            <div className="flex flex-col items-center justify-center text-center">
                              <p className="text-slate-400 text-sm font-medium">No image available</p>
                              <p className="text-slate-300 text-xs mt-1">Upload image to product in dashboard</p>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col pt-4">
                        <h1 className="text-[22px] text-slate-800 font-medium mb-3">{title}</h1>

                        <div className="flex items-center gap-4 mb-6">
                          <div className="flex gap-1 text-[#FFB800]">★★★★★</div>
                          <div className="mx-1 h-4 w-px bg-slate-300" />
                          <span className="text-sm font-bold text-[#E62A24]">{inStock ? 'IN STOCK' : 'OUT OF STOCK'}</span>
                        </div>

                        <div className="text-[32px] font-bold text-[#1A2B5E] mb-6">Rs{price.toFixed(2)}</div>

                        <p className="text-slate-600 text-base leading-relaxed mb-8">{description}</p>

                        <hr className="mb-8 border-slate-200" />

                        {personalizationOptions.length > 0 && (
                          <div className="mb-8">
                            <PersonalizationSection availableOptions={personalizationOptions} onChange={() => {}} />
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