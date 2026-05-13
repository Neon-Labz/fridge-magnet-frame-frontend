'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import PersonalizationSection, {
  PersonalizationState,
} from '@/components/website/PersonalizationSection';
import { useFrameStore } from '@/store/frameStore';

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
  const selectedFrame = useFrameStore((state) => state.selectedFrame);
  const [quantity, setQuantity] = useState(4);

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

  const getThumbnailImageSource = (
    frameType: 'black' | 'white' | 'no-frame'
  ) => {
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

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* same JSX (no change needed) */}
    </section>
  );
}