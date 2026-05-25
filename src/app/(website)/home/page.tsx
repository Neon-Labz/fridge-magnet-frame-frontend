import Header from "@/components/website/Header";
import Hero from "@/components/website/Hero";
import ProductSection from "@/components/website/ProductSection";
import VideoSection from "@/components/website/VideoSection";
import PricingSection from "@/components/website/PricingSection";
import FooterH from "@/components/website/FooterH";
import { fetchWebsiteProductsFromBackend } from "@/lib/websiteProducts";

export default async function Home() {
  const products = await fetchWebsiteProductsFromBackend();

  return (
    <main>
      <Header />
      <Hero />
      <VideoSection />
      <ProductSection products={products} />
      <PricingSection />
      <FooterH />
    </main>
  );
}