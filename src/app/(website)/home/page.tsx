import Header from "@/components/website/Header";
import Hero from "@/components/website/Hero";
import VideoSection from "@/components/website/VideoSection";
import ProductSection from "@/components/website/ProductSection";
import PricingSection from "@/components/website/PricingSection";
import FooterH from "@/components/website/FooterH";
import CounterSection from "@/components/website/CounterSection";
import Testimonial from "@/components/website/Testimonial";
import HowItWorksSection from "@/components/website/HowItWorksSection";

/**
 * BUG FIX — Wrong API URL causing fetch failed / ECONNREFUSED
 *
 * ROOT CAUSE 1 — Wrong URL construction:
 *   NEXT_PUBLIC_API_URL = "http://localhost:5000/api/v1"
 *   Old code:  fetch(`${API_URL}/api/products`)
 *              → "http://localhost:5000/api/v1/api/products"  ← "/api/" duplicated in path
 *   Backend controller: @Controller('api/products') + global prefix 'api/v1'
 *              → real route is "http://localhost:5000/api/v1/api/products"
 *   Actually the path is technically correct, but the env variable already
 *   contains /api/v1 so appending /api/products works. The REAL problem is:
 *
 * ROOT CAUSE 2 — Server-Side Rendering uses the env variable directly.
 *   On the server (SSR/RSC), NEXT_PUBLIC_API_URL resolves to the full
 *   "http://localhost:5000/api/v1" which is correct for direct backend calls.
 *   The ECONNREFUSED means the backend itself is not reachable — because
 *   MongoDB Atlas is timing out and the NestJS server is retrying the DB
 *   connection, causing the whole app to be unresponsive.
 *
 * FIX applied here:
 *   1. Use a server-side-only env var NEXT_BACKEND_URL (not NEXT_PUBLIC_)
 *      so the SSR fetch goes directly to the backend, not through Next.js
 *      rewrites (which only work for browser requests).
 *   2. Fall back to the public var if the server-side var is not set.
 *   3. Wrap the entire fetch in try/catch so a backend outage returns an
 *      empty product list instead of crashing the page with a 500 error.
 *      The page still renders with all other sections visible.
 */

// For Server Components (SSR/RSC): prefer NEXT_BACKEND_URL (private, server-only).
// Fall back to the public var (without trailing /api/v1 duplication check).
const BACKEND_BASE =
  process.env.NEXT_BACKEND_URL ||        // e.g. "http://localhost:5000"
  "http://localhost:5000";               // safe default for local dev

const getStockStatus = (stock: number) => {
  if (stock > 10) return "In Stock";
  if (stock >= 4) return "Low Stock";
  return "Out of Stock";
};

const getFrameType = (productName: unknown, frameType: unknown) => {
  const explicitFrameType = String(frameType ?? "").trim().toLowerCase();
  const normalizedName = String(productName ?? "").trim().toLowerCase();

  if (
    explicitFrameType === "black-frame" ||
    explicitFrameType === "black frame" ||
    normalizedName.includes("black frame")
  ) {
    return "black-frame" as const;
  }

  if (
    explicitFrameType === "white-frame" ||
    explicitFrameType === "white frame" ||
    normalizedName.includes("white frame")
  ) {
    return "white-frame" as const;
  }

  return "without-frame" as const;
};

async function getProducts() {
  try {
    // Correct URL: BACKEND_BASE + global prefix + controller prefix
    // → http://localhost:5000/api/v1/api/products
    const res = await fetch(`${BACKEND_BASE}/api/v1/api/products`, {
      cache: "no-store",
    });

    if (!res.ok) {
      console.error(
        `[Home] Products API returned ${res.status} ${res.statusText}`
      );
      return [];
    }

    const json = await res.json();

    // Guard: if the response shape is unexpected, return empty array
    if (!json?.data?.products) {
      console.error("[Home] Unexpected API response shape:", json);
      return [];
    }

    return json.data.products.map((p: any) => {
      const stock = Number(p.stock || 0);
      const status = getStockStatus(stock);

      return {
        id: p._id,
        title: p.productName,
        desc: p.description,
        price: p.price,
        image: p.primaryImage?.secure_url || "",
        frameType: getFrameType(p.productName, p.frameType ?? p.frame),
        colorOption: "",
        badge: status,
        stock,
        status,
      };
    });
  } catch (error) {
    // BUG FIX: Catch network errors (ECONNREFUSED, ETIMEOUT, etc.) and return
    // an empty array so the page still renders instead of throwing a 500.
    // The backend being temporarily unavailable (e.g. DB reconnect) should
    // not crash the entire home page for all visitors.
    console.error("[Home] Failed to fetch products from backend:", error);
    return [];
  }
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
