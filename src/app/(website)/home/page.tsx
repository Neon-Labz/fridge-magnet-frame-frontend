import Header from "@/components/website/Header";
import Hero from "@/components/website/Hero";
import ProductSection from "@/components/website/ProductSection";
import VideoSection from "@/components/website/VideoSection";
import PricingSection from "@/components/website/PricingSection";
import Footer from "@/components/website/Footer";
import { apiClient } from "@/lib/api";
import { mapBackendProductsToWebsiteProducts } from "@/lib/websiteProducts";

export default async function Home() {
  const res = await apiClient.getProducts();
  const products = res.success ? mapBackendProductsToWebsiteProducts(res.data) : [];

  return (
    <main>
      <Header />
      <Hero />
      <VideoSection />
      <ProductSection products={products} />
      <PricingSection />
      <Footer />
    </main>
  );
}
