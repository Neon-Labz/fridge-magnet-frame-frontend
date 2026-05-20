'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useFrameStore } from "@/store/frameStore";
import { useCart } from '@/context/CartContext';

const products = [
  {
    id: 'magnet-1',
    title: "Magnet",
    desc: "Sustainably sourced solid oak with museum-grade acrylic.",
    price: 500,
    priceLabel: "Rs 500.00",
    img: "/product-1.png",
    badge: "New Arrival",
    frameOption: "without-frame" as const,
    colorOption: undefined,
  },
  {
    id: 'magnet-2',
    title: "Magnet Black Frame",
    desc: "Deep matte black finish for a bold, contemporary statement.",
    price: 1000,
    priceLabel: "Rs 1000.00",
    img: "/product-2.png",
    badge: "",
    frameOption: "black-frame" as const,
    colorOption: "black",
  },
  {
    id: 'magnet-3',
    title: "Magnet White Frame",
    desc: "Clean white frame for a soft premium aesthetic.",
    price: 1000,
    priceLabel: "Rs 1000.00",
    img: "/product-3.png",
    badge: "",
    frameOption: "white-frame" as const,
    colorOption: "white",
  },
];

export default function ProductsSection() {
  const router = useRouter();
  const setSelectedFrame = useFrameStore((state) => state.setSelectedFrame);
  const { addToCart } = useCart();

  const handleAddToCart = (
    product: typeof products[number]
  ) => {
    // set frame selection for product details flow
    setSelectedFrame(product.frameOption);

    // add to cart: if same id + frameOption exists, quantity will be increased by context
    addToCart({
      id: product.id,
      title: product.title,
      image: product.img,
      price: product.price,
      quantity: 1,
      frameType: product.frameOption,
      colorOption: product.colorOption,
    });

    router.push("/cart");
  };

  return (
    <section className="w-full bg-[#F9F9FE]  ">
      
      {/* SAME LEFT & RIGHT MARGIN */}
      <div className="mx-auto w-full max-w-[1800px] px-[100px] ">

        {/* HEADER */}
        <div className="mb-[52px]">
          <h2 className="font-manrope text-[35px] font-bold leading-[44px] tracking-[-0.35px] text-[#002B73]">
            Curated Classics
          </h2>

          <p className="mt-[8px] font-inter text-[17px] leading-[26px] text-[#434652]">
            The foundation of every great gallery wall.
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 gap-[28px] md:grid-cols-2 xl:grid-cols-3">
          {products.map((p, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-[13px] border border-[#E5E5EA] bg-white"
            >

              {/* IMAGE */}
              <div className="relative h-[350px] w-full">
                <Image
                  src={p.img}
                  alt={p.title}
                  fill
                  className="object-cover"
                />

                {p.badge && (
                  <span className="absolute left-[18px] top-[18px] rounded-full bg-[#002B73] px-[12px] py-[4px] text-[13px] font-semibold text-white">
                    {p.badge}
                  </span>
                )}
              </div>

              {/* CONTENT */}
              <div className="p-[20px]">
                <h3 className="font-manrope text-[22px] font-semibold leading-[30px] text-[#1A1C1F]">
                  {p.title}
                </h3>

                <p className="mt-[8px] font-inter text-[14px] leading-[22px] text-[#434652]">
                  {p.desc}
                </p>

                {/* FOOTER */}
                <div className="mt-[18px] flex items-center justify-between">
                  <span className="font-inter text-[18px] font-semibold text-[#002B73]">
                    {p.price}
                  </span>

                  <button
                    onClick={() => handleAddToCart(p)}
                    className="rounded-[8px] bg-[#BC0000] px-[16px] py-[10px] text-[14px] font-semibold text-white transition hover:bg-[#a00000]"
                  >
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