"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useFrameStore } from "@/store/frameStore";
import { useCart } from "@/context/CartContext";
import { useToastStore } from "@/store/toastStore";
import type { WebsiteProduct } from "@/lib/websiteProducts";

interface ProductsSectionProps {
  products: WebsiteProduct[];
}

export default function ProductsSection({ products }: ProductsSectionProps) {
  const router = useRouter();

  const setSelectedFrame = useFrameStore((state) => state.setSelectedFrame);
  const setSelectedProductId = useFrameStore(
    (state) => state.setSelectedProductId
  );

  const { addToCart } = useCart();
  const { addToast } = useToastStore();

  const visibleProducts = products.slice(0, 3);

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
      <div className="mx-auto w-full max-w-[1700px] px-4 sm:px-6 lg:px-[120px]">
        <div className="mb-6 flex items-start justify-between gap-4 md:mb-[52px]">
          <div>
            <h2 className="font-manrope text-[28px] font-bold leading-[1.1] tracking-[-0.35px] text-[#002B73] md:text-[35px]">
              Curated Classics
            </h2>

            <p className="mt-2 font-inter text-[14px] leading-[1.45] text-[#434652] md:text-[17px]">
              The foundation of every great gallery wall.
            </p>
          </div>
        </div>

        {products.length === 0 ? (
          <div className="rounded-[13px] border border-dashed border-[#C3C6D4] bg-white px-6 py-10 text-center text-[#64748B]">
            No products available right now.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-3 lg:gap-[28px]">
            {visibleProducts.map((p) => (
              <div
                key={p.id}
                role="link"
                tabIndex={0}
                onClick={() => handleImageClick(p)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    handleImageClick(p);
                  }
                }}
                className="flex h-full cursor-pointer flex-col overflow-hidden rounded-[8px] border border-[#E5E5EA] bg-white shadow-sm transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#002B73] focus-visible:ring-offset-2"
                aria-label={`View ${p.title} in shop`}
              >
                <div className="relative h-[170px] w-full bg-[#F4F3ED] sm:h-[220px] md:h-[330px]">
                  {p.image ? (
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      className="object-contain"
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 text-sm font-medium text-slate-400">
                      No image available
                    </div>
                  )}

                  {p.badge && (
                    <span
                      className={`absolute left-3 top-3 rounded-full px-3 py-1 text-[10px] font-semibold text-white sm:text-[12px] ${
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
                </div>

                <div className="flex flex-1 flex-col p-3 md:p-[20px]">
                  <h3 className="font-manrope text-[16px] font-semibold leading-[1.15] text-[#1A1C1F] md:text-[22px]">
                    {p.title}
                  </h3>

                  <p className="mt-2 hidden h-[42px] overflow-hidden font-inter text-[13px] leading-[1.5] text-[#434652] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] md:[display:-webkit-box] md:text-[14px]">
                    {p.desc}
                  </p>

                  <div className="mt-auto flex flex-col gap-2 pt-3 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
                    <span className="whitespace-nowrap font-inter text-[15px] font-semibold text-[#002B73] md:text-[18px]">
                      Rs {Number(p.price).toFixed(2)}
                    </span>

                    <button
                      onClick={(event) => {
                        event.stopPropagation();
                        handleAddToCart(p);
                      }}
                      onKeyDown={(event) => event.stopPropagation()}
                      disabled={p.stock <= 0 || p.status === "Out of Stock"}
                      className="w-full rounded-[8px] bg-[#BC0000] px-3 py-2 text-[13px] font-semibold text-white transition hover:bg-[#a00000] disabled:cursor-not-allowed disabled:bg-gray-400 md:w-auto md:px-[16px] md:py-[10px] md:text-[14px]"
                    >
                      {p.stock <= 0 || p.status === "Out of Stock"
                        ? "Out of Stock"
                        : "Add to Cart"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {products.length > 0 && (
          <div className="mt-8 flex justify-center md:mt-12">
            <button
              type="button"
              onClick={() => router.push("/shop")}
              className="rounded-[8px] border border-[#002B73] px-8 py-3 text-[15px] font-semibold text-[#002B73] transition hover:bg-[#F1F7FF] md:px-10 md:text-[16px]"
            >
              Show More
            </button>
          </div>
        )}
      </div>
    </section>
  );
}