export interface ShopProductImage {
  secure_url?: string;
}

export interface ShopProductPersonalization {
  label?: string;
  price?: number | string;
  note?: string;
  image?: ShopProductImage | null;
}

export interface ShopProduct {
  _id?: string;
  id?: string;
  productId?: string;
  productName?: string;
  price?: number | string;
  description?: string;
  status?: string;
  stock?: number | string;
  primaryImage?: ShopProductImage | null;
  personalizationInstructions?: string[] | string | null;
  personalization?: (string | ShopProductPersonalization)[] | string | null;
  galleryImages?: ShopProductImage[] | null;
  personalizationEnabled?: boolean;
}
