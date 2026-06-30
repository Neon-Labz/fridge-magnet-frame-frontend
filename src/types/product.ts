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
  primaryImageUrl?: string;
  galleryImageUrls?: string[];
  previewVariant?: 'updated-1' | 'updated-2' | 'gradient';
  description?: string;
  size?: string;
  finish?: string;
  warehouseLocation?: string;
  warehouseCenter?: string;
  lastUpdatedBy?: string;
  lastUpdatedDate?: string;
  isPopular?: boolean;
}

export interface ProductFormData {
  name: string;
  productId: string;
  category: string;
  stock: number;
  price: number;
  description: string;
  personalization: boolean;
  personalizationEnabled?: boolean;
  personalizationOptions?: PersonalizationFormOption[];
  primaryImage: File | null;
  galleryImages: File[];
}

export interface PersonalizationFormOption {
  label: string;
  price: number;
  note?: string;
  imageFile?: File | null;
}
