import ShopClientWrapper from './ShopClientWrapper'
import { apiClient } from '@/lib/api'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Shop | Magnify',
  description: 'Browse our artisan-crafted Heritage Oak frames.',

};

export const revalidate = 0; // Always fetch fresh data from DB

/** Fetch ALL products from the backend (which connects to productDB on Atlas) */
async function fetchProducts() {
  const baseUrl =
    process.env.NEXT_PUBLIC_BACKEND_API_URL ||
    process.env.NEXT_PUBLIC_API_URL ||
    `${process.env.NEXT_BACKEND_URL || 'http://localhost:5000'}/api/v1`;
  try {
    const res = await fetch(`${baseUrl}/products`, { cache: 'no-store' });
    if (!res.ok) return [];
    const json = await res.json();
    if (Array.isArray(json?.data?.products)) return json.data.products;
    if (Array.isArray(json?.products)) return json.products;
    if (Array.isArray(json?.data)) return json.data;
    return [];
  } catch (err) {
    console.error('[Shop page] Failed to fetch products from backend:', err);
    return [];
  }

}

export default async function ShopPage() {
  const res = await apiClient.getProducts()

  let products: any[] = []

  if (res.success && res.data) {
    if (Array.isArray(res.data)) {
      products = res.data
    } else if (Array.isArray((res.data as any).data)) {
      products = (res.data as any).data
    } else if (Array.isArray((res.data as any).products)) {
      products = (res.data as any).products
    }
  }

  return (
    <main>
      <ShopClientWrapper products={products} />
    </main>
  )
}