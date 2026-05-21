import ShopClientWrapper from './ShopClientWrapper'
import { apiClient } from '@/lib/api'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Shop | Magnify',
  description: 'Browse our artisan-crafted Heritage Oak frames.',
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