'use client';

import { useEffect, useMemo } from 'react';
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

function toComparableId(value: unknown): string {
  if (typeof value === 'string' || typeof value === 'number') {
    return String(value).trim();
  }

  if (!value || typeof value !== 'object') {
    return '';
  }

  const record = value as Record<string, unknown>;
  const oid = record.$oid ?? record.oid ?? record.id ?? record._id;
  return typeof oid === 'string' || typeof oid === 'number' ? String(oid).trim() : '';
}

function resolveProductId(product: ShopProduct): string {
  const candidate = (product as ShopProduct & { id?: unknown; productId?: unknown });
  return toComparableId(candidate?._id ?? candidate?.id ?? candidate?.productId);
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

  const filteredProducts = useMemo(() => {
    if (!selectedProductIdFromRoute || products.length === 0) {
      return products;
    }

    const selected = products.find((p) => resolveProductId(p) === toComparableId(selectedProductIdFromRoute));
    return selected ? [selected] : [];
  }, [selectedProductIdFromRoute, products]);

  return <ShopViewProductDetailsSection products={filteredProducts} />;
}
