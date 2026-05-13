import Header from "@/components/website/Header";
import Hero from "@/components/website/Hero";
import VideoSection from "@/components/website/VideoSection";
import ProductSection from "@/components/website/ProductSection";
import PricingSection from "@/components/website/PricingSection";
import CounterSection from "@/components/website/CounterSection";
import Footer from "@/components/website/Footer";
import Testimonial from "@/components/website/Testimonial";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <VideoSection />
      <ProductSection />
      <Testimonial />
      <PricingSection />
      <CounterSection />
      <Footer />
    </main>
  );
}