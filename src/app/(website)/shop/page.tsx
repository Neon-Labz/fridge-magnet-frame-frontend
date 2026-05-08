import { Metadata } from 'next';
import ShopViewProductDetailsSection from '@/components/website/ShopViewProductDetailsSection';

export const metadata: Metadata = {
  title: 'Magnate picture with black frame | Magnify',
  description: 'Preserve your most cherished memories with our artisan-crafted Heritage Oak frames.',
};

export default function ShopProductDetailsPage() {
  return (
    <main>
      <ShopViewProductDetailsSection />
    </main>
  );
}
