import { Metadata } from 'next';
import ShopViewProductDetailsSection from '@/components/website/ShopViewProductDetailsSection';
import ShopClientWrapper from './ShopClientWrapper';

export const metadata: Metadata = {
  title: 'Shop | Magnify',
  description: 'Browse our artisan-crafted Heritage Oak frames.',
};

export const revalidate = 0; // Always fetch fresh data from DB

/** Fetch ALL products from the backend (which connects to productDB on Atlas) */
async function fetchProducts() {
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL || 'http://localhost:3000/api/v1';
  try {
    const res = await fetch(`${baseUrl}/products`, { cache: 'no-store' });
    if (!res.ok) return [];
    const json = await res.json();
    return json?.data?.products ?? [];
  } catch (err) {
    console.error('[Shop page] Failed to fetch products from backend:', err);
    return [];
  }
}

export default async function ShopProductDetailsPage() {
  const products: any[] = await fetchProducts();
  return (
    <main>
      <ShopClientWrapper products={products} />
    </main>
  );
}
