import Header from "@/components/website/Header";
import Hero from "@/components/website/Hero";
import VideoSection from "@/components/website/VideoSection";
import ProductSection from "@/components/website/ProductSection";
import PricingSection from "@/components/website/PricingSection";
import FooterH from "@/components/website/FooterH";
import { fetchWebsiteProductsFromBackend } from "@/lib/websiteProducts";
import CounterSection from "@/components/website/CounterSection";
import Testimonial from "@/components/website/Testimonial";
import HowItWorksSection from "@/components/website/HowItWorksSection";

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <Header />
      <Hero />
      <VideoSection />
      <ProductSection products={[]} />
      <HowItWorksSection />
      <PricingSection />
      <CounterSection />
      <Testimonial />
      <FooterH />
    </main>
  );
}