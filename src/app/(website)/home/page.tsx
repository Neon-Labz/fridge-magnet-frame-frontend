import Header from "@/components/website/Header";
import Hero from "@/components/website/Hero";
import VideoSection from "@/components/website/VideoSection";
import ProductSection from "@/components/website/ProductSection";
import PricingSection from "@/components/website/PricingSection";
import FooterH from "@/components/website/FooterH";
import CounterSection from "@/components/website/CounterSection";
import Testimonial from "@/components/website/Testimonial";
import HowItWorksSection from "@/components/website/HowItWorksSection";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const getStockStatus = (stock: number) => {
  if (stock > 10) return "In Stock";
  if (stock >= 4) return "Low Stock";
  return "Out of Stock";
};

async function getProducts() {
  const res = await fetch(`${API_URL}/api/products`, {
    cache: "no-store",
  });

  const json = await res.json();

  
  return json.data.products.map((p: any) => {
    const stock = Number(p.stock || 0);
    const status = getStockStatus(stock);

    return {
      id: p._id,
      title: p.productName,
      desc: p.description,
      price: p.price,
      image: p.primaryImage?.secure_url || "",
      frameType: p.category,
      colorOption: "",
      badge: status,
      stock,
      status,
    };
  });
}

export default async function Home() {
  const products = await getProducts();

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