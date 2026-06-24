import ShopClientWrapper from './ShopClientWrapper';
import { Metadata } from 'next';
import { productCatalog } from '@/lib/productCatalog';

export const metadata: Metadata = {
  title: 'Shop | Magnify',
  description: 'Browse our artisan-crafted Heritage Oak frames.',
};

export const revalidate = 0;

type ShopPageProps = {
  searchParams?: Promise<{
    productId?: string | string[];
    frameType?: string | string[];
  }>;
};

type RawProduct = Record<string, any>;

function toComparableId(value: unknown): string {
  if (typeof value === 'string' || typeof value === 'number') {
    return String(value).trim();
  }

  if (!value || typeof value !== 'object') {
    return '';
  }

  const record = value as Record<string, unknown>;
  const oid = record.$oid ?? record.oid ?? record.id ?? record._id;

  return typeof oid === 'string' || typeof oid === 'number'
    ? String(oid).trim()
    : '';
}

function resolveProductId(product: any): string {
  return toComparableId(product?._id ?? product?.id ?? product?.productId);
}

function extractProducts(payload: unknown): RawProduct[] {
  if (Array.isArray(payload)) return payload;

  if (!payload || typeof payload !== 'object') return [];

  const data = payload as Record<string, any>;

  if (Array.isArray(data.data?.products)) return data.data.products;
  if (Array.isArray(data.products)) return data.products;
  if (Array.isArray(data.data)) return data.data;

  return [];
}

function normalizeProduct(rawProduct: RawProduct): RawProduct {
  const resolvedId = resolveProductId(rawProduct);

  const imageUrl = String(
    rawProduct?.primaryImage?.secure_url ??
      rawProduct?.primaryImageUrl ??
      rawProduct?.image ??
      ''
  ).trim();

  return {
    ...rawProduct,
    _id: resolvedId || rawProduct?._id,
    productId: toComparableId(rawProduct?.productId) || resolvedId,
    productName: String(
      rawProduct?.productName ?? rawProduct?.name ?? ''
    ).trim(),
    description: String(rawProduct?.description ?? '').trim(),
    price: Number(rawProduct?.price ?? 0),
    status: String(rawProduct?.status ?? 'In Stock').trim() || 'In Stock',
    stock: Number(rawProduct?.stock ?? 0),
    category: rawProduct?.category ?? '',
    primaryImage: imageUrl
      ? { secure_url: imageUrl }
      : rawProduct?.primaryImage ?? null,
    personalizationInstructions:
      rawProduct?.personalizationInstructions ?? [],
    personalization: rawProduct?.personalization ?? [],
    galleryImages: Array.isArray(rawProduct?.galleryImages) ? rawProduct.galleryImages : [],
    personalizationEnabled: rawProduct?.personalizationEnabled ?? false,
  };
}

async function fetchProductsForShop(): Promise<RawProduct[]> {
  const backendBase = process.env.NEXT_BACKEND_URL || 'http://localhost:5000';

  try {
    const response = await fetch(`${backendBase}/api/v1/api/products`, {
      cache: 'no-store',
    });

    if (!response.ok) return [];

    const payload = await response.json();

    return extractProducts(payload).map(normalizeProduct);
  } catch {
    return [];
  }
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const resolvedSearchParams = (await searchParams) ?? {};

  const requestedProductId = Array.isArray(resolvedSearchParams.productId)
    ? resolvedSearchParams.productId[0]
    : resolvedSearchParams.productId;

  const requestedFrameType = Array.isArray(resolvedSearchParams.frameType)
    ? resolvedSearchParams.frameType[0]
    : resolvedSearchParams.frameType;

  let products = await fetchProductsForShop();

  

  const filteredProducts = requestedProductId
    ? products.filter(
        (product) =>
          resolveProductId(product) === toComparableId(requestedProductId)
      )
    : products;

  return (
    <main>
      <ShopClientWrapper
        products={
          requestedProductId && filteredProducts.length > 0
            ? filteredProducts
            : products
        }
        selectedProductIdFromRoute={requestedProductId}
        selectedFrameType={requestedFrameType}
      />
    </main>
  );
}