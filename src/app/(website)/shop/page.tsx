import ShopClientWrapper from './ShopClientWrapper';
import { Metadata } from 'next';
import { fetchBackendProductRecords } from '@/lib/websiteProducts';

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

type RawProduct = Record<string, unknown>;

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
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

  return typeof oid === 'string' || typeof oid === 'number'
    ? String(oid).trim()
    : '';
}

function resolveProductId(product: RawProduct): string {
  return toComparableId(product._id ?? product.id ?? product.productId);
}

function normalizeProduct(rawProduct: RawProduct): RawProduct {
  const resolvedId = resolveProductId(rawProduct);
  const primaryImage = isRecord(rawProduct.primaryImage)
    ? rawProduct.primaryImage
    : null;

  const imageUrl = String(
    primaryImage?.secure_url ??
      rawProduct.primaryImageUrl ??
      rawProduct.image ??
      ''
  ).trim();

  return {
    ...rawProduct,
    _id: resolvedId || rawProduct._id,
    productId: toComparableId(rawProduct.productId) || resolvedId,
    productName: String(
      rawProduct.productName ?? rawProduct.name ?? ''
    ).trim(),
    description: String(rawProduct.description ?? '').trim(),
    price: Number(rawProduct.price ?? 0),
    status: String(rawProduct.status ?? 'In Stock').trim() || 'In Stock',
    stock: Number(rawProduct.stock ?? 0),
    category: rawProduct.category ?? '',
    primaryImage: imageUrl
      ? { secure_url: imageUrl }
      : rawProduct.primaryImage ?? null,
    personalizationInstructions:
      rawProduct.personalizationInstructions ?? [],
    personalization: rawProduct.personalization ?? [],
    galleryImages: Array.isArray(rawProduct.galleryImages) ? rawProduct.galleryImages : [],
    personalizationEnabled: rawProduct.personalizationEnabled ?? false,
  };
}

async function fetchProductsForShop(): Promise<RawProduct[]> {
  const products = await fetchBackendProductRecords();
  return products.map(normalizeProduct);
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const resolvedSearchParams = (await searchParams) ?? {};

  const requestedProductId = Array.isArray(resolvedSearchParams.productId)
    ? resolvedSearchParams.productId[0]
    : resolvedSearchParams.productId;

  const requestedFrameType = Array.isArray(resolvedSearchParams.frameType)
    ? resolvedSearchParams.frameType[0]
    : resolvedSearchParams.frameType;

  const products = await fetchProductsForShop();

  

  return (
    <main>
      <ShopClientWrapper
        products={products}
        selectedProductIdFromRoute={requestedProductId}
        selectedFrameType={requestedFrameType}
      />
    </main>
  );
}
