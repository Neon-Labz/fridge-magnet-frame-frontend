'use client';

interface PricingItem {
  quantity: string;
  price: string;
  isPopular?: boolean;
}

interface BundleItem {
  quantity: string;
  price: string;
}

export default function PriceMagnetFrameSection() {
  const magnetsPricing: PricingItem[] = [
    { quantity: '4 pieces', price: 'Rs. 1,500' },
    { quantity: '6 pieces', price: 'Rs. 1,990', isPopular: true },
    { quantity: '9 pieces', price: 'Rs. 2,590' },
    { quantity: '12 pieces', price: 'Rs. 2,990' },
    { quantity: '18 pieces', price: 'Rs. 3,990' },
  ];

  const bundlePricing: BundleItem[] = [
    { quantity: '4 pieces + Frame', price: 'Rs. 2,500' },
    { quantity: '6 pieces + Frame', price: 'Rs. 2,990' },
    { quantity: '9 pieces + Frame', price: 'Rs. 3,590' },
    { quantity: '12 pieces + Frame', price: 'Rs. 3,990' },
  ];

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Page Heading */}
        <div className="mb-16 flex flex-col items-center pt-4 md:mb-20">
          <div className="flex w-full max-w-[1200px] flex-col items-center gap-4">
            <div className="flex w-full flex-col items-start gap-4">
              <h1 className="font-manrope w-full text-center text-[44px] font-extrabold uppercase leading-[1] tracking-[-1.8px] text-[#0F172A] md:whitespace-nowrap md:text-[72px] md:leading-[72px]">
                MAGNIFY CREATIONS
              </h1>
              <div className="flex w-full justify-center">
                <h2 className="text-center text-[14px] font-black uppercase leading-7 tracking-[4px] text-[#002B73] md:text-[18px] md:tracking-[7.2px]">
                  FRIDGE MAGNET FRAMES
                </h2>
              </div>
            </div>

            <div className="flex w-full max-w-[672px] flex-col items-center pt-3 md:pt-4">
              <p className="w-full text-center text-[20px] font-medium leading-8 text-[#475569] md:text-[24px]">
                Send your photos - we print, magnetize & deliver!
              </p>
            </div>
          </div>
        </div>

        {/* Pricing Grid */}
        <div className="grid gap-8 md:grid-cols-2 md:gap-8">
          {/* Left Card - Magnets Only */}
          <div className="overflow-hidden rounded-[40px] border border-[#E2E8F0] border-t-[6px] border-t-[#E41A0F] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.1)]">
            <div className="p-6 pb-10 md:p-12 md:pb-[104px]">
              {/* Card Title */}
              <div className="mb-10 flex items-center gap-4">
                <span className="text-[30px] leading-9 text-[#0F172A]">📍</span>
                <h3 className="font-manrope text-[30px] font-black uppercase leading-9 tracking-[1.5px] text-[#0F172A]">
                  Magnets Only
                </h3>
              </div>

              {/* Pricing Items */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {magnetsPricing.map((item, index) => {
                  const isFullWidth = item.quantity === '18 pieces';
                  const isTallCard = item.quantity === '4 pieces' || item.quantity === '6 pieces';

                  return (
                    <div
                      key={index}
                      className={`rounded-3xl border px-8 ${
                        isFullWidth
                          ? 'col-span-1 flex h-[106px] items-center justify-between py-8 sm:col-span-2'
                          : isTallCard
                            ? 'relative flex h-[172px] flex-col gap-3 py-8'
                            : 'relative flex h-[142px] flex-col gap-3 py-8'
                      } ${
                        item.isPopular
                          ? 'border-2 border-[rgba(0,43,115,0.3)] bg-[#EFF6FF]'
                          : 'border-[#E2E8F0] bg-[#F8FAFC]'
                      }`}
                    >
                      {isFullWidth ? (
                        <>
                          <span className="text-[20px] font-bold uppercase leading-7 tracking-[0.5px] text-[#475569]">
                            {item.quantity}
                          </span>
                          <span className="text-[36px] font-black leading-10 text-[#0F172A]">{item.price}</span>
                        </>
                      ) : (
                        <>
                          <div className="flex w-full items-start">
                            <span className="whitespace-nowrap text-[18px] font-bold uppercase leading-7 tracking-[0.45px] text-[#64748B]">
                              {item.quantity}
                            </span>
                            {item.isPopular && (
                              <span className="absolute right-3 top-3 whitespace-nowrap rounded-full bg-[#002B73] px-3 py-1 text-xs font-black uppercase leading-4 text-white shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
                                Popular
                              </span>
                            )}
                          </div>
                          <span
                            className={`mt-auto text-[30px] font-black leading-9 ${
                              item.isPopular ? 'text-[#002B73]' : 'text-[#0F172A]'
                            }`}
                          >
                            {item.price}
                          </span>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Card - Magnets + Frame Bundle */}
          <div className="overflow-hidden rounded-[40px] border border-[#E2E8F0] border-t-[6px] border-t-[#002B73] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.1)]">
            <div className="p-6 md:p-12">
              {/* Card Title and Subtitle */}
              <div className="mb-10">
                <div className="mb-3 flex items-center gap-4">
                  <span className="text-[30px] leading-9 text-[#0F172A]">🖼️</span>
                  <h3 className="font-manrope text-[30px] font-black uppercase leading-9 tracking-[1.5px] text-[#0F172A]">
                    Magnets + Frame Bundle
                  </h3>
                </div>
                <p className="text-[18px] font-medium leading-7 text-[#64748B]">
                  Black or white 4-in-1 frame included
                </p>
              </div>

              {/* Bundle Items */}
              <div className="space-y-6">
                {bundlePricing.map((item, index) => (
                  <div
                    key={index}
                    className="flex min-h-[94px] items-center justify-between rounded-3xl border border-[rgba(0,43,115,0.1)] bg-[#EFF6FF] px-8 py-7"
                  >
                    <span className="text-[20px] font-bold leading-7 text-[#1E293B]">{item.quantity}</span>
                    <span className="text-[30px] font-black leading-9 text-[#002B73]">{item.price}</span>
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
