"use client";

import { useRouter } from "next/navigation";
import { useFrameStore } from "@/store/frameStore";
import { useCart } from "@/context/CartContext";
import { useToastStore } from "@/store/toastStore";
import { useState, useEffect } from "react";

interface Product {
  _id: string;
  productName: string;
  description: string;
  price: number;
  primaryImage?: { secure_url: string } | null;
  status?: string;
}

export default function ProductsSection() {
  const router = useRouter();
  const setSelectedFrame = useFrameStore((state) => state.setSelectedFrame);
  const setSelectedProductId = useFrameStore((state) => state.setSelectedProductId);
  const { addToCart } = useCart();
  const { addToast } = useToastStore();
  const [addedProduct, setAddedProduct] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      const baseUrl =
        process.env.NEXT_PUBLIC_BACKEND_API_URL ||
        process.env.NEXT_PUBLIC_API_URL ||
        '/api/v1';
      try {
        const res = await fetch(`${baseUrl}/products`, { cache: 'no-store' });
        if (res.ok) {
          const json = await res.json();
          const extractedProducts = Array.isArray(json?.data?.products)
            ? json.data.products
            : Array.isArray(json?.products)
              ? json.products
              : Array.isArray(json?.data)
                ? json.data
                : [];

          setProducts(extractedProducts);
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
      frameType: 'black-frame' as const,
      quantity: 1,
      image: product.primaryImage?.secure_url || '/product-1.png',
    };

    addToCart(cartItem);
    addToast('Product added to cart successfully!', 'success');
    setAddedProduct(product._id);
  };

  const handleImageClick = (productId: string) => {
    setSelectedFrame('black-frame');
    setSelectedProductId(productId);
    router.push('/shop');
  };

  if (loading) {
    return (
      <section className="w-full bg-[#F9F9FE] pt-12 pb-16">
        <div className="mx-auto max-w-[1800px] px-4 md:px-6">
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
    <section className="w-full bg-[#F9F9FE]">
      <div className="mx-auto w-full max-w-[1800px] px-4 md:px-24">
        <div className="mb-6">
          <h2 className="font-manrope text-[26px] md:text-[35px] font-bold leading-[1.1] text-[#002B73]">Curated Classics</h2>
          <p className="mt-2 font-inter text-[14px] md:text-[17px] leading-[1.4] text-[#434652]">The foundation of every great gallery wall.</p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {products.map((p) => (
            <div key={p._id} className="overflow-hidden rounded-[13px] border border-[#E5E5EA] bg-white">

              <div className="relative h-[280px] md:h-[450px] w-full cursor-pointer group bg-[#F4F3ED] flex items-center justify-center" onClick={() => handleImageClick(p._id)}>
                {p.primaryImage?.secure_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={p.primaryImage.secure_url} alt={p.productName} className="w-full h-full object-cover group-hover:opacity-90 transition-opacity" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
                    <p className="text-slate-400 text-center px-4">
                      <span className="text-sm font-medium">📷 No Image</span>
                      <br />
                      <span className="text-xs">Add image in dashboard</span>
                    </p>
                  </div>
                )}
              </div>

              <div className="p-4 md:p-[26px]">
                <h3 className="font-manrope text-[18px] md:text-[26px] font-semibold leading-[1.2] text-[#1A1C1F]">{p.productName}</h3>
                <p className="mt-2 font-inter text-[13px] md:text-[15px] leading-[1.4] text-[#434652]">{p.description}</p>

                <div className="mt-4 flex items-center justify-between">
                  <span className="font-inter text-[18px] md:text-[22px] font-semibold text-[#002B73]">Rs {p.price.toFixed(2)}</span>

                  <button
                    onClick={() => handleAddToCart(p)}
                    className={`rounded-[8px] px-3 md:px-[16px] py-2 md:py-[12px] text-[14px] md:text-[15px] font-semibold text-white transition-all ${
                      addedProduct === p._id ? 'bg-[#008000]' : 'bg-[#BC0000] hover:bg-[#a00000]'
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
