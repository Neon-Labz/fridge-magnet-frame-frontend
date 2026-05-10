import PriceMagnetFrameSection from '@/components/website/PriceMagnetFrameSection';
import OrderNowSection from '@/components/website/OrderNowSection';

export const metadata = {
  title: 'Pricing | Magnify Creations',
  description: 'Fridge Magnet Frames pricing - Magnets only and bundle options',
};

export default function PricePage() {
  return (
    <>
      <PriceMagnetFrameSection />
      <OrderNowSection />
    </>
  );
}
