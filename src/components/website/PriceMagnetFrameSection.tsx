"use client";

export default function PriceMagnetFrameSection() {
  const magnetsPricing = [
    { quantity: "4 pieces", price: "Rs. 1,500" },
    { quantity: "6 pieces", price: "Rs. 1,990", isPopular: true },
    { quantity: "9 pieces", price: "Rs. 2,590" },
    { quantity: "12 pieces", price: "Rs. 2,990" },
    { quantity: "18 pieces", price: "Rs. 3,990" },
  ];

  const bundlePricing = [
    { quantity: "4 pieces + Frame", price: "Rs. 2,500" },
    { quantity: "6 pieces + Frame", price: "Rs. 2,990" },
    { quantity: "9 pieces + Frame", price: "Rs. 3,590" },
    { quantity: "12 pieces + Frame", price: "Rs. 3,990" },
  ];

  return (
<section className="bg-white pt-20 pb-8 md:pt-24 md:pb-10">
      <div className="mx-auto max-w-[1328px] px-3 py-6 sm:px-6 lg:px-7">
        <div className="mb-10 flex flex-col items-center text-center">
          <h1 className="font-manrope text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-[#0F172A]">
            MAGNIFY CREATIONS
          </h1>

          <h2 className="mt-2 text-xs sm:text-sm md:text-base font-bold uppercase tracking-[3px] text-[#002B73]">
            FRIDGE MAGNET FRAMES
          </h2>

          <p className="mt-3 max-w-[700px] text-sm sm:text-base md:text-lg font-medium text-[#475569]">
            Send your photos - we print, magnetize & deliver!
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-[32px] border border-[#E2E8F0] border-t-[6px] border-t-[#E41A0F] bg-white shadow-sm">
            <div className="p-5 sm:p-7 md:p-10">
              <div className="mb-6 flex items-center gap-2">
                <span className="text-xl">📍</span>
                <h3 className="text-lg sm:text-xl font-bold uppercase text-[#0F172A]">
                  Magnets Only
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {magnetsPricing.slice(0, 4).map((item, index) => (
                  <div
                    key={index}
                    className={`relative rounded-[20px] border px-5 py-6 flex flex-col justify-center min-h-[120px]
      ${
        item.isPopular
          ? "border-[#93C5FD] bg-[#EFF6FF]"
          : "border-[#E2E8F0] bg-[#F8FAFC]"
      }`}
                  >
                    {item.isPopular && (
                      <span className="absolute top-3 right-3 rounded-full bg-[#002B73] px-3 py-1 text-[10px] font-bold uppercase text-white">
                        Popular
                      </span>
                    )}

                    <span className="text-xs sm:text-sm font-bold uppercase tracking-wide text-[#64748B]">
                      {item.quantity}
                    </span>

                    <span className="mt-2 text-2xl sm:text-3xl font-black text-[#0F172A]">
                      {item.price}
                    </span>
                  </div>
                ))}

                {magnetsPricing.slice(4, 5).map((item, index) => (
                  <div
                    key={index}
                    className="sm:col-span-2 relative rounded-[20px] border border-[#E2E8F0] bg-[#F8FAFC] px-5 py-6 flex flex-col justify-center min-h-[120px]"
                  >
                    <span className="text-xs sm:text-sm font-bold uppercase tracking-wide text-[#64748B]">
                      {item.quantity}
                    </span>

                    <span className="mt-2 text-2xl sm:text-3xl font-black text-[#0F172A]">
                      {item.price}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-[32px] border border-[#E2E8F0] border-t-[6px] border-t-[#002B73] bg-white shadow-sm">
            <div className="p-5 sm:p-7 md:p-10">
              <div className="mb-6">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🖼️</span>
                  <h3 className="text-lg sm:text-xl font-bold uppercase text-[#0F172A]">
                    Magnets + Frame Bundle
                  </h3>
                </div>

                <p className="mt-2 text-sm sm:text-base text-[#64748B]">
                  Black or white 4-in-1 frame included
                </p>
              </div>

              <div className="space-y-4">
                {bundlePricing.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-[24px] border border-[#E2E8F0] bg-[#EFF6FF] px-5 py-4"
                  >
                    <span className="text-sm sm:text-base font-bold text-[#1E293B]">
                      {item.quantity}
                    </span>

                    <span className="text-xl sm:text-2xl font-black text-[#002B73]">
                      {item.price}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
