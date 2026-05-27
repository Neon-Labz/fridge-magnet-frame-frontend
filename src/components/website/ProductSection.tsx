"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useFrameStore } from "@/store/frameStore";
import { useCart } from "@/context/CartContext";
import { useToastStore } from "@/store/toastStore";
import type { WebsiteProduct } from "@/lib/websiteProducts";

interface ProductsSectionProps {
  products: WebsiteProduct[];
}

export default function ProductsSection({
  products,
}: ProductsSectionProps) {
  const [showAll, setShowAll] = useState(false);

  const router = useRouter();

  const setSelectedFrame = useFrameStore(
    (state) => state.setSelectedFrame
  );

  const setSelectedProductId = useFrameStore(
    (state) => state.setSelectedProductId
  );

  const { addToCart } = useCart();
  const { addToast } = useToastStore();

  const visibleProducts = showAll
    ? products
    : products.slice(0, 3);

  const handleImageClick = (product: WebsiteProduct) => {
    setSelectedFrame(product.frameType);

    setSelectedProductId(product.id);

    router.push(
      `/shop?productId=${encodeURIComponent(
        product.id
      )}&frameType=${encodeURIComponent(product.frameType)}`
    );
  };

  const handleAddToCart = (product: WebsiteProduct) => {
    if (product.stock <= 0 || product.status === "Out of Stock") {
      addToast("This product is out of stock!", "error");
      return;
    }

    setSelectedFrame(product.frameType);

    addToCart({
      id: product.id,
      title: product.title,
      image: product.image,
      price: product.price,
      quantity: 1,
      frameType: product.frameType,
      colorOption: product.colorOption,
    });

    addToast("Product added to cart successfully!", "success");
  };

  return (
    <section className="w-full bg-[#F9F9FE] py-10 md:py-0">
      <div className="mx-auto w-full max-w-[1800px] px-4 md:px-[120px]">
        {/* HEADER */}
        <div className="mb-6 md:mb-[52px] flex items-start justify-between gap-4">
          <div>
            <h2 className="font-manrope text-[28px] md:text-[35px] font-bold leading-[1.1] tracking-[-0.35px] text-[#002B73]">
              Curated Classics
            </h2>

            <p className="mt-2 font-inter text-[14px] md:text-[17px] leading-[1.45] text-[#434652]">
              The foundation of every great gallery wall.
            </p>
          </div>

          {products.length > 3 && (
            <button
              type="button"
              onClick={() => setShowAll(!showAll)}
          className=" md:mt-10 font-inter text-[14px] md:text-[16px] font-semibold text-[#002B73] transition hover:underline"            >
              {showAll ? "Show Less 🡠" : "Show All  🡢"}
            </button>
          )}
        </div>

        {/* EMPTY */}
        {products.length === 0 ? (
          <div className="rounded-[13px] border border-dashed border-[#C3C6D4] bg-white px-6 py-10 text-center text-[#64748B]">
            No products available right now.
          </div>
        ) : (
          <div className="grid grid-cols-1 min-[380px]:grid-cols-2 gap-3 md:gap-[28px] md:grid-cols-2 xl:grid-cols-3">
            {visibleProducts.map((p) => (
              <div
                key={p.id}
                className="overflow-hidden rounded-[13px] border border-[#E5E5EA] bg-white"
              >
                {/* IMAGE */}
                <button
                  type="button"
                  onClick={() => handleImageClick(p)}
                  className="relative block h-[170px] w-full overflow-hidden sm:h-[220px] md:h-[350px]"
                  aria-label={`View ${p.title} in shop`}
                >
                  {p.image ? (
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 text-sm font-medium text-slate-400">
                      No image available
                    </div>
                  )}

                  {p.badge && (
                    <span
                      className={`absolute left-3 top-3 rounded-full px-3 py-1 text-[10px] sm:text-[12px] text-white font-semibold ${
                        p.status === "Out of Stock"
                          ? "bg-red-600"
                          : p.status === "Low Stock"
                          ? "bg-red-600"
                          : "bg-[#002B73]"
                      }`}
                    >
                      {p.badge}
                    </span>
                  )}
                  </button>

                {/* CONTENT */}
                <div className="p-3 md:p-[20px]">
                  <h3 className="font-manrope text-[16px] md:text-[22px] font-semibold leading-[1.15] text-[#1A1C1F]">
                    {p.title}
                  </h3>

                  <p className="mt-2 hidden font-inter text-[13px] leading-[1.45] text-[#434652] md:block md:text-[14px]">
                    {p.desc}
                  </p>

                  {/* PRICE + BUTTON */}
                  <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
                    <span className="font-inter text-[15px] md:text-[18px] font-semibold text-[#002B73]">
                      Rs {Number(p.price).toFixed(2)}
                    </span>

                    <button
                      onClick={() => handleAddToCart(p)}
                      disabled={
                        p.stock <= 0 ||
                        p.status === "Out of Stock"
                      }
                      className="w-full rounded-[8px] bg-[#BC0000] px-3 py-2 text-[13px] font-semibold text-white transition hover:bg-[#a00000] disabled:cursor-not-allowed disabled:bg-gray-400 md:w-auto md:px-[16px] md:py-[10px] md:text-[14px]"
                    >
                      {p.stock <= 0 ||
                      p.status === "Out of Stock"
                        ? "Out of Stock"
                        : "Add to Cart"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}