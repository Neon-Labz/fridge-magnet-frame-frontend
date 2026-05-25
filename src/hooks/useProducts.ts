'use client';

import { useState, useEffect } from 'react';
import type { Product } from '@/types/product';

type ApiImage = {
  secure_url?: string;
};

type ApiProduct = {
  _id?: string;
  id?: string;
  productId?: string;
  productName?: string;
  category?: string;
  price?: number;
  stock?: number;
  status?: string;
  primaryImage?: ApiImage | null;
  galleryImages?: ApiImage[];
  description?: string;
  updatedAt?: string;
};

const API_BASE_URL = (
  process.env.NEXT_PUBLIC_BACKEND_API_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  'http://localhost:5000'
).replace(/\/$/, '');

const toStockStatus = (status?: string, stock = 0): Product['stockStatus'] => {
  if (status === 'Out of Stock' || stock <= 0) return 'out-of-stock';
  if (status === 'Low Stock' || stock <= 10) return 'low-stock';
  return 'in-stock';
};

const mapProduct = (product: ApiProduct): Product => {
  const stockCount = Number(product.stock ?? 0);

  return {
    id: product._id || product.id || product.productId || '',
    sku: product.productId || '',
    name: product.productName || 'Untitled product',
    series: product.category || 'Uncategorized',
    price: Number(product.price ?? 0),
    stockCount,
    stockStatus: toStockStatus(product.status, stockCount),
    gradient: 'from-slate-100 to-slate-300',
    primaryImageUrl: product.primaryImage?.secure_url,
    galleryImageUrls:
      product.galleryImages?.map((image) => image.secure_url || '').filter(Boolean) || [],
    description: product.description,
    lastUpdatedDate: product.updatedAt,
  };
};

const getProductsFromResponse = (data: any): ApiProduct[] => {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.products)) return data.products;
  if (Array.isArray(data?.data)) return data.data;
  if (Array.isArray(data?.data?.products)) return data.data.products;
  return [];
};

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/api/products`);

      const data = await res.json();

      setProducts(getProductsFromResponse(data).map(mapProduct));
    } catch (error) {
      console.error('Failed to fetch products', error);
    } finally {
      setIsLoaded(true);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    isLoaded,
    refreshProducts: fetchProducts,
  };
};
