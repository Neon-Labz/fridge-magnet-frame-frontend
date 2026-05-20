'use client';

import { useRouter } from "next/navigation";
import { useFrameStore } from "@/store/frameStore";
import { useCartStore } from "@/store/cartStore";
import { useToastStore } from "@/store/toastStore";
import { useState, useEffect } from "react";

interface Product {
  _id: string;
  productName: string;
  description: string;
  price: number;
  primaryImage?: {
    secure_url: string;
  };
  status: string;
}

export default function ProductsSection() {
  const router = useRouter();
  const setSelectedFrame = useFrameStore((state) => state.setSelectedFrame);
  const { addToCart } = useCartStore();
  const { addToast } = useToastStore();
  const [addedProduct, setAddedProduct] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch products from database on mount
  useEffect(() => {
    async function fetchProducts() {
      const baseUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL || 'http://localhost:3000/api/v1';
      console.log('[ProductsSection] Fetching from:', baseUrl);
      try {
        const res = await fetch(`${baseUrl}/products`, { cache: 'no-store' });
        console.log('[ProductsSection] Response status:', res.status);
        if (res.ok) {
          const json = await res.json();
          console.log('[ProductsSection] Products received:', json?.data?.products);
          setProducts(json?.data?.products ?? []);
        }
      } catch (err) {
        console.error('[ProductsSection] Failed to fetch products:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const handleAddToCart = (product: Product) => {
    const cartItem = {
      id: product._id,
      title: product.productName,
      price: product.price,
      frameOption: "black-frame" as const,
      quantity: 1,
      image: product.primaryImage?.secure_url || '/product-1.png',
    };

    addToCart(cartItem);
    addToast('Product added to cart successfully!', 'success');
    setAddedProduct(product._id);
  };

  const handleImageClick = (productId: string) => {
    setSelectedFrame('black-frame');
    router.push("/shop");
  };

  if (loading) {
    return (
      <section className="w-full bg-[#F9F9FE] pt-[88px] pb-[158px]">
        <div className="mx-auto max-w-[1800px] px-[20px]">
          <p className="text-center text-slate-500">Loading products...</p>
        </div>
      </section>
    );
  }

  if (!products || products.length === 0) {
    return (
      <section className="w-full bg-[#F9F9FE] pt-[88px] pb-[158px]">
        <div className="mx-auto max-w-[1800px] px-[20px]">
          <p className="text-center text-slate-500">No products available.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full bg-[#F9F9FE] pt-[88px] pb-[158px]">
      <div className="mx-auto max-w-[1800px] px-[20px]">

        {/* HEADER */}
        <div className="mb-[52px]">
          <h2 className="font-manrope text-[35px] font-semibold leading-[44px] tracking-[-0.35px] text-[#002B73]">
            Curated Classics
          </h2>
          <p className="mt-[8px] font-inter text-[17px] leading-[26px] text-[#434652]">
            The foundation of every great gallery wall.
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-3 gap-[35px]">
          {products.map((p) => (
            <div
              key={p._id}
              className="overflow-hidden rounded-[13px] border border-[#E5E5EA] bg-white"
            >

              {/* IMAGE */}
              <div className="relative h-[600px] w-full cursor-pointer group bg-[#F4F3ED] flex items-center justify-center" onClick={() => handleImageClick(p._id)}>
                {p.primaryImage?.secure_url ? (
                  <img
                    src={p.primaryImage.secure_url}
                    alt={p.productName}
                    className="w-full h-full object-cover group-hover:opacity-90 transition-opacity"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
                    <p className="text-slate-400 text-center px-4">
                      <span className="text-sm font-medium">📷 No Image</span><br/>
                      <span className="text-xs">Add image in dashboard</span>
                    </p>
                  </div>
                )}
              </div>

              {/* CONTENT */}
              <div className="p-[26px]">
                <h3 className="font-manrope text-[26px] font-semibold leading-[35px] text-[#1A1C1F]">
                  {p.productName}
                </h3>

                <p className="mt-[8px] font-inter text-[15px] leading-[22px] text-[#434652]">
                  {p.description}
                </p>

                {/* FOOTER */}
                <div className="mt-[18px] flex items-center justify-between">
                  <span className="font-inter text-[22px] font-semibold text-[#002B73]">
                    Rs {p.price.toFixed(2)}
                  </span>

                  <button
                    onClick={() => handleAddToCart(p)}
                    className={`rounded-[8px] px-[16px] py-[12px] text-[15px] font-semibold text-white transition-all ${
                      addedProduct === p._id
                        ? 'bg-[#008000]'
                        : 'bg-[#BC0000] hover:bg-[#a00000]'
                    }`}
                  >
                    {addedProduct === p._id ? '✓ Added' : 'Add to Cart'}
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
