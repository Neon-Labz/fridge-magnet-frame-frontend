import PriceMagnetFrameSection from "@/components/website/PriceMagnetFrameSection";
import OrderNowSection from "@/components/website/OrderNowSection";
import SpecialPackages from "@/components/website/PricingSpecialPackages";

export const metadata = {
  title: "Pricing | Magnify Creations",
  description:
    "Fridge Magnet Frames pricing - Magnets only and bundle options",
};

export default function PricePage() {
  return (
    <main>
      <PriceMagnetFrameSection />
      <SpecialPackages />
      <OrderNowSection />
    </main>
  );
}