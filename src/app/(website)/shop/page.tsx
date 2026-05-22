import ShopClientWrapper from './ShopClientWrapper'
import { apiClient } from '@/lib/api'
import { Metadata } from 'next'
import { productCatalog } from '@/lib/productCatalog'

export const metadata: Metadata = {
  title: 'Shop | Magnify',
  description: 'Browse our artisan-crafted Heritage Oak frames.',

};

export const revalidate = 0; // Always fetch fresh data from DB
type ShopPageProps = {
  searchParams?: { productId?: string | string[] };
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const requestedProductId = Array.isArray(searchParams?.productId)
    ? searchParams?.productId[0]
    : searchParams?.productId;

  const res = await apiClient.getProducts()

  let products: any[] = []

  if (res.success && res.data) {
    const payload = res.data as any;

    if (Array.isArray(payload)) {
      products = payload;
    } else if (Array.isArray(payload?.data?.products)) {
      products = payload.data.products;
    } else if (Array.isArray(payload?.products)) {
      products = payload.products;
    } else if (Array.isArray(payload?.data)) {
      products = payload.data;
    }
  }

  if (products.length === 0) {
    products = productCatalog.map((product) => ({
      _id: product.id,
      productName: product.title,
      description: product.desc,
      price: product.price,
      status: 'In Stock',
      primaryImage: { secure_url: product.img },
      personalizationInstructions: [],
      personalization: [],
    }))
  }

  const filteredProducts = requestedProductId
    ? products.filter((product) => product?._id === requestedProductId)
    : products;

  return (
    <main>
      <ShopClientWrapper products={filteredProducts.length > 0 ? filteredProducts : products} />
    </main>
  )
}