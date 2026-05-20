import Header from "@/components/website/Header";
import Hero from "@/components/website/Hero";
import VideoSection from "@/components/website/VideoSection";
import ProductsSection from "@/components/website/ProductsSection";
import PricingSection from "@/components/website/PricingSection";
import CounterSection from "@/components/website/CounterSection";
import Testimonial from "@/components/website/Testimonial";
import FooterH from "@/components/website/FooterH";
import HowItWorksSection from "@/components/website/HowItWorksSection";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <VideoSection />
      <ProductsSection />
      <HowItWorksSection />
      <PricingSection />
      <CounterSection />
      <Testimonial />
      <FooterH />
    </main>
  );
}