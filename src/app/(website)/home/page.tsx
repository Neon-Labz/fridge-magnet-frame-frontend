import Header from "@/components/website/Header";
import Hero from "@/components/website/Hero";
import ProductSection from "@/components/website/ProductSection";
import PricingSection from "@/components/website/PricingSection";
import Footer from "@/components/website/Footer";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <ProductSection />
      <PricingSection />
      <Footer />
    </main>
  );
}
