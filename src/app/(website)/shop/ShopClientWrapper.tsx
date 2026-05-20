'use client';

import { useEffect, useState } from 'react';
import ShopViewProductDetailsSection from '@/components/website/ShopViewProductDetailsSection';
import { useFrameStore } from '../../../store/frameStore';

interface ShopClientWrapperProps {
  products: any[];
}

export default function ShopClientWrapper({ products }: ShopClientWrapperProps) {
  const selectedProductId = useFrameStore((state) => state.selectedProductId);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);

  useEffect(() => {
    if (selectedProductId && products.length > 0) {
      // Find and show the selected product
      const selected = products.find((p) => p._id === selectedProductId);
      setFilteredProducts(selected ? [selected] : products);
    } else {
      // Default to all products if no selection
      setFilteredProducts(products);
    }
  }, [selectedProductId, products]);

  return <ShopViewProductDetailsSection products={filteredProducts} />;
}
