import Image from "next/image";

const products = [
  {
    title: "Magnate Frame",
    desc: "Sustainably sourced solid oak with museum-grade acrylic.",
    price: "Rs 500.00",
    img: "/product-1.png",
    badge: "New Arrival",
  },
  {
    title: "Magnate With Black Frame",
    desc: "Deep matte black finish for a bold, contemporary statement.",
    price: "Rs 1000.00",
    img: "/product-2.png",
  },
  {
    title: "Magnate With White Frame",
    desc: "Brushed gold aluminum that brings warmth to any room.",
    price: "Rs 1000.00",
    img: "/product-3.png",
  },
];

export default function ProductsSection() {
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
          {products.map((p, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-[13px] border border-[#E5E5EA] bg-white"
            >
              
              {/* IMAGE */}
              <div className="relative h-[600px] w-full">
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
                    {p.price}
                  </span>

                  <button className="rounded-[8px] bg-[#BC0000] px-[16px] py-[12px] text-[15px] font-semibold text-white hover:bg-[#a00000]">
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