'use client';

import Image from "next/image";
import { useFrameStore } from "@/store/frameStore";
import { useCartStore } from "@/store/cartStore";
import { useToastStore } from "@/store/toastStore";
import { useState } from "react";

const products = [
  {
    title: "Magnate Frame",
    desc: "Sustainably sourced solid oak with museum-grade acrylic.",
    price: 500,
    img: "/product-1.png",
    badge: "New Arrival",
    frameOption: "without-frame" as const,
  },
  {
    title: "Magnate With Black Frame",
    desc: "Deep matte black finish for a bold, contemporary statement.",
    price: 1000,
    img: "/product-2.png",
    frameOption: "black-frame" as const,
  },
  {
    title: "Magnate With White Frame",
    desc: "Brushed gold aluminum that brings warmth to any room.",
    price: 1000,
    img: "/product-3.png",
    frameOption: "white-frame" as const,
  },
];

export default function ProductsSection() {
  const setSelectedFrame = useFrameStore((state) => state.setSelectedFrame);
  const { addToCart } = useCartStore();
  const { addToast } = useToastStore();
  const [addedProduct, setAddedProduct] = useState<string | null>(null);

  const handleAddToCart = (product: typeof products[0]) => {
    const cartItem = {
      id: product.frameOption,
      title: product.title,
      price: product.price,
      frameOption: product.frameOption,
      quantity: 1,
      image: product.img,
    };

    addToCart(cartItem);
    addToast('Product added to cart successfully!', 'success');
    setAddedProduct(product.frameOption);
  };

  const handleImageClick = (frameOption: typeof products[0]['frameOption']) => {
    setSelectedFrame(frameOption);
  };

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
              key={p.frameOption}
              className="overflow-hidden rounded-[13px] border border-[#E5E5EA] bg-white"
            >

              {/* IMAGE */}
              <div className="relative h-[600px] w-full cursor-pointer group" onClick={() => handleImageClick(p.frameOption)}>
                <Image
                  src={p.img}
                  alt={p.title}
                  fill
                  className="object-cover group-hover:opacity-90 transition-opacity"
                />

                {p.badge && (
                  <span className="absolute left-[18px] top-[18px] rounded-full bg-[#002B73] px-[12px] py-[4px] text-[13px] font-semibold text-white">
                    {p.badge}
                  </span>
                )}
              </div>

              {/* CONTENT */}
              <div className="p-[26px]">
                <h3 className="font-manrope text-[26px] font-semibold leading-[35px] text-[#1A1C1F]">
                  {p.title}
                </h3>

                <p className="mt-[8px] font-inter text-[15px] leading-[22px] text-[#434652]">
                  {p.desc}
                </p>

                {/* FOOTER */}
                <div className="mt-[18px] flex items-center justify-between">
                  <span className="font-inter text-[22px] font-semibold text-[#002B73]">
                    Rs {p.price.toFixed(2)}
                  </span>

                  <button
                    onClick={() => handleAddToCart(p)}
                    className={`rounded-[8px] px-[16px] py-[12px] text-[15px] font-semibold text-white transition-all ${
                      addedProduct === p.frameOption
                        ? 'bg-[#008000]'
                        : 'bg-[#BC0000] hover:bg-[#a00000]'
                    }`}
                  >
                    {addedProduct === p.frameOption ? '✓ Added' : 'Add to Cart'}
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
