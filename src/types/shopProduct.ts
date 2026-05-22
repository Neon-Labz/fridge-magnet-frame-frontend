export interface ShopProductImage {
  secure_url?: string;
}

export interface ShopProduct {
  _id?: string;
  id?: string;
  productId?: string;
  productName?: string;
  price?: number | string;
  description?: string;
  status?: string;
  primaryImage?: ShopProductImage | null;
  personalizationInstructions?: string[] | string | null;
  personalization?: string[] | string | null;
}
