'use client';

import { useState, useEffect } from 'react';
import { getStorage, setStorage } from '@/utils/localStorage';
import { PRODUCTS } from '@/data/products';
import type { Product } from '@/types/product';

const STORAGE_KEY = 'dashboard_products';

export const useProducts = () => {
  const [products, setProductsState] = useState<Product[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize products from localStorage or default data
  useEffect(() => {
    const storedProducts = getStorage(STORAGE_KEY) as Product[] | null;
    
    if (storedProducts && Array.isArray(storedProducts) && storedProducts.length > 0) {
      setProductsState(storedProducts);
    } else {
      setProductsState(PRODUCTS);
      setStorage(STORAGE_KEY, PRODUCTS);
    }
    
    setIsLoaded(true);
  }, []);

  // Save to localStorage whenever products change
  const setProducts = (updater: Product[] | ((prev: Product[]) => Product[])) => {
    setProductsState((prev) => {
      const newProducts = typeof updater === 'function' ? updater(prev) : updater;
      setStorage(STORAGE_KEY, newProducts);
      return newProducts;
    });
  };

  const addProduct = (product: Product) => {
    setProducts((prev) => [...prev, product]);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id ? { ...product, ...updates } : product
      )
    );
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((product) => product.id !== id));
  };

  const clearAllProducts = () => {
    setProducts([]);
  };

  return {
    products,
    isLoaded,
    setProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    clearAllProducts,
  };
};
