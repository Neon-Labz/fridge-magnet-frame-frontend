'use client';

import { useEffect } from 'react';
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

  return (
    <ShopViewProductDetailsSection
      key={selectedFrameType || 'without-frame'}
      products={products}
      initialFrameType={selectedFrameType}
    />
  );
}
