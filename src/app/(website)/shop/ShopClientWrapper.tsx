'use client';

import { useEffect } from 'react';
import ShopProductGrid from '@/components/website/ShopProductGrid';
import ShopViewProductDetailsSection from '@/components/website/ShopViewProductDetailsSection';
import type { ShopProduct } from '@/types/shopProduct';
import { useFrameStore } from '../../../store/frameStore';
import type { FrameOption } from '../../../store/frameStore';

interface ShopClientWrapperProps {
  products: ShopProduct[];
  selectedProductIdFromRoute?: string;
  selectedFrameType?: string;
}

function isFrameOption(value?: string): value is FrameOption {
  return value === 'without-frame' || value === 'black-frame' || value === 'white-frame';
}

export default function ShopClientWrapper({ products, selectedProductIdFromRoute, selectedFrameType }: ShopClientWrapperProps) {
  const setSelectedProductId = useFrameStore((state) => state.setSelectedProductId);
  const setSelectedFrame = useFrameStore((state) => state.setSelectedFrame);

  useEffect(() => {
    if (selectedProductIdFromRoute) {
      setSelectedProductId(selectedProductIdFromRoute);
    }

    if (isFrameOption(selectedFrameType)) {
      setSelectedFrame(selectedFrameType);
    }
  }, [selectedFrameType, selectedProductIdFromRoute, setSelectedFrame, setSelectedProductId]);

  const selectedProductIndex = selectedProductIdFromRoute
    ? products.findIndex((product) => {
        const productId = String(product._id ?? product.id ?? '').trim();
        return productId === selectedProductIdFromRoute.trim();
      })
    : -1;

  const orderedProducts =
    selectedProductIndex > 0
      ? [
          products[selectedProductIndex],
          ...products.filter((_, index) => index !== selectedProductIndex),
        ]
      : products;

  if (!selectedProductIdFromRoute) {
    return <ShopProductGrid products={products} />;
  }

  return (
    <ShopViewProductDetailsSection
      key={`${selectedProductIdFromRoute || 'default'}-${selectedFrameType || 'without-frame'}`}
      products={orderedProducts}
      initialProductId={selectedProductIdFromRoute}
      initialFrameType={selectedFrameType}
    />
  );
}
