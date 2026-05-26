import Header from "@/components/website/Header";
import Hero from "@/components/website/Hero";
import VideoSection from "@/components/website/VideoSection";
import ProductSection from "@/components/website/ProductSection";
import PricingSection from "@/components/website/PricingSection";
import FooterH from "@/components/website/FooterH";
import CounterSection from "@/components/website/CounterSection";
import Testimonial from "@/components/website/Testimonial";
import HowItWorksSection from "@/components/website/HowItWorksSection";
import { fetchWebsiteProductsFromBackend } from "@/lib/websiteProducts";

export default async function Home() {
  const products = await fetchWebsiteProductsFromBackend();
  return (
    <main className="overflow-x-hidden">
      <Header />
      <Hero />
      <VideoSection />
      <ProductSection products={products} />   
     <HowItWorksSection />
      <PricingSection />
      <CounterSection />
      <Testimonial />
      <FooterH />
    </main>
  );
}