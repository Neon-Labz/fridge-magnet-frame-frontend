export type StockStatus = 'in-stock' | 'low-stock' | 'out-of-stock';

export interface Product {
  id: string;
  sku: string;
  name: string;
  series: string;
  price: number;
  stockCount: number;
  stockStatus: StockStatus;
  gradient: string;
  description?: string;
  size?: string;
  finish?: string;
  warehouseLocation?: string;
  warehouseCenter?: string;
  lastUpdatedBy?: string;
  lastUpdatedDate?: string;
}

export interface ProductFormData {
  name: string;
  productId: string;
  category: string;
  stock: number;
  price: number;
  description: string;
  personalization: boolean;
  primaryImage: File | null;
  galleryImages: File[];
}
