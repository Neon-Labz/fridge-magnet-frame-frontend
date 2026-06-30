export type WebsiteProduct = {
  id: string;
  title: string;
  desc: string;
  price: number;
  image: string;
  badge?: string;
  frameType: 'without-frame' | 'black-frame' | 'white-frame';
  colorOption?: string;
  stock: number;
  status: string;
};

export type BackendProductRecord = Record<string, unknown>;

const PRODUCT_LIST_LIMIT = 1000;

function normalizeBackendBase(value: string): string {
  const trimmed = value.trim().replace(/\/+$/, '');

  return trimmed
    .replace(/\/api\/v1\/api$/i, '')
    .replace(/\/api\/v1$/i, '');
}

function getBackendBase(): string {
  return normalizeBackendBase(
    process.env.NEXT_BACKEND_URL ||
      process.env.NEXT_PUBLIC_BACKEND_API_URL ||
      process.env.NEXT_PUBLIC_API_URL ||
      'http://localhost:5000',
  );
}

function getProductsApiUrl(): string {
  const params = new URLSearchParams({
    page: '1',
    limit: String(PRODUCT_LIST_LIMIT),
  });

  return `${getBackendBase()}/api/v1/api/products?${params.toString()}`;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function normalizeFrameType(value: unknown): WebsiteProduct['frameType'] | null {
  const normalized = String(value ?? '').trim().toLowerCase();

  if (!normalized) return null;

  if (
    normalized === 'without-frame' ||
    normalized === 'without frame' ||
    normalized === 'frameless' ||
    normalized === 'no-frame' ||
    normalized === 'no frame' ||
    normalized === 'none' ||
    normalized === 'frame 1' ||
    normalized === 'frame1' ||
    normalized === '1'
  ) {
    return 'without-frame';
  }

  if (
    normalized === 'black-frame' ||
    normalized === 'black frame' ||
    normalized === 'frame 2' ||
    normalized === 'frame2' ||
    normalized === '2'
  ) {
    return 'black-frame';
  }

  if (
    normalized === 'white-frame' ||
    normalized === 'white frame' ||
    normalized === 'frame 3' ||
    normalized === 'frame3' ||
    normalized === '3'
  ) {
    return 'white-frame';
  }

  return null;
}

function inferFrameTypeFromTitle(
  title: string,
): WebsiteProduct['frameType'] | null {
  const normalizedTitle = title.trim().toLowerCase();

  if (normalizedTitle.includes('white frame')) return 'white-frame';
  if (normalizedTitle.includes('black frame')) return 'black-frame';
  if (
    normalizedTitle.includes('without frame') ||
    normalizedTitle.includes('frameless')
  ) {
    return 'without-frame';
  }

  return null;
}

export function extractProducts(payload: unknown): BackendProductRecord[] {
  if (Array.isArray(payload)) return payload;

  if (!isRecord(payload)) return [];

  const data = isRecord(payload.data) ? payload.data : null;

  if (data && Array.isArray(data.products)) return data.products;
  if (Array.isArray(payload.products)) return payload.products;
  if (Array.isArray(payload.data)) return payload.data;

  return [];
}

function toProductId(value: unknown): string {
  if (typeof value === 'string' || typeof value === 'number') {
    return String(value).trim();
  }

  if (!value || typeof value !== 'object') return '';

  const record = value as Record<string, unknown>;
  const oid = record.$oid ?? record.oid ?? record.id ?? record._id;

  if (typeof oid === 'string' || typeof oid === 'number') {
    return String(oid).trim();
  }

  return '';
}

export function mapBackendProductsToWebsiteProducts(
  payload: unknown,
): WebsiteProduct[] {
  return extractProducts(payload).reduce<WebsiteProduct[]>(
    (mappedProducts, item) => {
      const id =
        toProductId(item._id) ||
        toProductId(item.id) ||
        toProductId(item.productId);

      const title = String(item.productName ?? item.name ?? '').trim();

      if (!id || !title) {
        return mappedProducts;
      }

      const desc = String(item.description ?? '').trim();
      const price = Number(item.price ?? 0);
      const primaryImage = isRecord(item.primaryImage)
        ? item.primaryImage
        : null;
      const image = String(
        primaryImage?.secure_url ??
          item.primaryImageUrl ??
          item.image ??
          '',
      ).trim();

      const normalizedFrameType = normalizeFrameType(
        item.frameType ?? item.frame,
      );

      const inferredFrameType = inferFrameTypeFromTitle(title);

      const fallbackFrameType: WebsiteProduct['frameType'] = 'without-frame';

      const stock = Number(item.stock ?? 0);
      const status = String(item.status ?? 'Out of Stock').trim();

      mappedProducts.push({
        id,
        title,
        desc,
        price,
        image,
        badge: status,
        frameType: normalizedFrameType ?? inferredFrameType ?? fallbackFrameType,
        colorOption: undefined,
        stock,
        status,
      });

      return mappedProducts;
    },
    [],
  );
}

export async function fetchBackendProductRecords(): Promise<
  BackendProductRecord[]
> {
  try {
    const response = await fetch(getProductsApiUrl(), {
      cache: 'no-store',
    });

    if (!response.ok) {
      return [];
    }

    const payload = await response.json();
    return extractProducts(payload);
  } catch {
    return [];
  }
}

export async function fetchWebsiteProductsFromBackend(): Promise<
  WebsiteProduct[]
> {
  const products = await fetchBackendProductRecords();
  return mapBackendProductsToWebsiteProducts(products);
}
