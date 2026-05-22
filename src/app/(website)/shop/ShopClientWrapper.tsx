'use client';

import { useMemo } from 'react';
import ShopViewProductDetailsSection from '@/components/website/ShopViewProductDetailsSection';
import type { ShopProduct } from '@/types/shopProduct';
import { useFrameStore } from '../../../store/frameStore';

interface ShopClientWrapperProps {
  products: ShopProduct[];
}

export default function ShopClientWrapper({ products }: ShopClientWrapperProps) {
  const selectedProductId = useFrameStore((state) => state.selectedProductId);

  const filteredProducts = useMemo(() => {
    if (!selectedProductId || products.length === 0) {
      return products;
    }

    const selected = products.find((p) => p?._id === selectedProductId);
    return selected ? [selected] : products;
  }, [selectedProductId, products]);

  return <ShopViewProductDetailsSection products={filteredProducts} />;
}
