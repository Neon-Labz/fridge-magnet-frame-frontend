export type WebsiteProduct = {
  id: string;
  title: string;
  desc: string;
  price: number;
  image: string;
  badge?: string;
  frameType: 'without-frame' | 'black-frame' | 'white-frame';
  colorOption?: string;
};

function extractProducts(payload: unknown): any[] {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (!payload || typeof payload !== 'object') {
    return [];
  }

  const data = payload as Record<string, any>;

  if (Array.isArray(data.data?.products)) {
    return data.data.products;
  }

  if (Array.isArray(data.products)) {
    return data.products;
  }

  if (Array.isArray(data.data)) {
    return data.data;
  }

  return [];
}

export function mapBackendProductsToWebsiteProducts(payload: unknown): WebsiteProduct[] {
  return extractProducts(payload).flatMap((item) => {
    const id = String(item?._id ?? item?.id ?? item?.productId ?? '').trim();
    const title = String(item?.productName ?? item?.name ?? '').trim();
    const desc = String(item?.description ?? '').trim();
    const price = Number(item?.price ?? 0);
    const image = String(item?.primaryImage?.secure_url ?? item?.primaryImageUrl ?? item?.image ?? '').trim();

    if (!id || !title) {
      return [];
    }

    return [
      {
        id,
        title,
        desc,
        price,
        image,
        badge: String(item?.status ?? '').trim(),
        frameType: 'without-frame',
        colorOption: undefined,
      },
    ];
  });
}
