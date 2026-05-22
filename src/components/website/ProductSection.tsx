"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useFrameStore } from "@/store/frameStore";
import { ShoppingCart } from "lucide-react";

const products = [
  {
    title: "Magnet",
    desc: "Sustainably sourced solid oak with museum-grade acrylic.",
    price: "Rs 1500.00",
    img: "/product-1.png",
    badge: "New Arrival",
    frameOption: "without-frame" as const,
  },
  {
    title: "Magnet Black Frame",
    desc: "Deep matte black finish for a bold, contemporary statement.",
    price: "Rs 2500.00",
    img: "/product-2.png",
    badge: "",
    frameOption: "black-frame" as const,
  },
  {
    title: "Magnet White Frame",
    desc: "Clean white frame for a soft premium aesthetic.",
    price: "Rs 2500.00",
    img: "/product-3.png",
    badge: "",
    frameOption: "white-frame" as const,
  },
];

export default function ProductsSection() {
  const router = useRouter();
  const setSelectedFrame = useFrameStore((state) => state.setSelectedFrame);

  const handleAddToCart = (frameOption: any) => {
    setSelectedFrame(frameOption);
    router.push("/shop");
  };

  return (
    <section className="w-full bg-[#F9F9FE] py-[30px] lg:py-[10px]">
      <div className="mx-auto w-full max-w-[1800px] px-4 sm:px-6 lg:px-[100px]">
        {/* HEADER */}
        <div className="mb-[16px] lg:mb-[30px] text-center lg:text-left">
          <h2 className="font-manrope text-[22px] sm:text-[28px] lg:text-[35px] font-bold text-[#002B73]">
            Curated Classics
          </h2>

          <p className="mt-[6px] text-[13px] sm:text-[15px] lg:text-[17px] text-[#434652]">
            The foundation of every great gallery wall.
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {products.map((p, i) => (
            <div
              key={i}
              className="rounded-[12px] border border-[#E5E5EA] bg-white overflow-hidden shadow-sm"
            >
              {/* IMAGE */}
              <div className="relative w-full h-[220px] sm:h-[260px] lg:h-[350px]">
                <Image
                  src={p.img}
                  alt={p.title}
                  fill
                  className="object-cover"
                />

                {p.badge && (
                  <span className="absolute left-3 top-3 rounded-full bg-[#002B73] px-2 py-1 text-[10px] sm:text-[12px] text-white">
                    {p.badge}
                  </span>
                )}
              </div>

              {/* CONTENT */}
              <div className="p-3 sm:p-4 lg:p-5">
                <h3 className="text-[16px] sm:text-[18px] lg:text-[22px] font-semibold text-[#1A1C1F]">
                  {p.title}
                </h3>

                <p className="mt-1 text-[12px] sm:text-[13px] lg:text-[14px] text-[#434652] leading-[18px] sm:leading-[20px]">
                  {p.desc}
                </p>

                {/* FOOTER */}
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-[14px] sm:text-[16px] lg:text-[18px] font-semibold text-[#002B73]">
                    {p.price}
                  </span>

                  <button
                    onClick={() => handleAddToCart(p.frameOption)}
                    className="flex items-center gap-2 bg-[#BC0000] text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-[6px] text-[11px] sm:text-[13px] font-semibold hover:bg-[#a00000] transition"
                  >
                    <ShoppingCart size={16} />
                    Add to Cart
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
