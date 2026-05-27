export default function HowItWorksSection() {
  return (
<section className="w-full bg-[#F9F9FE] px-4 py-[30px] sm:px-6 lg:px-[120px] lg:py-[55px]">
      <div className="mx-auto w-full max-w-[1800px] rounded-[22px] bg-[#07357E] px-5 py-8 text-white sm:px-8 sm:py-10 lg:px-[30px] lg:py-[42px]">

        {/* TITLE */}
        <h2 className="text-center font-manrope text-[24px] font-bold leading-[34px] sm:text-left lg:text-[28px]">
          How it works{" "}
          <span className="text-[#FFD600]">— 3 simple steps</span>
        </h2>

        {/* STEPS */}
        <div className="mt-[35px] flex flex-col gap-[28px] lg:mt-[42px] lg:flex-row lg:items-center lg:justify-between">

          {/* STEP 1 */}
          <div className="flex items-start gap-[18px] sm:gap-[24px]">

            <div className="flex h-[42px] min-h-[42px] w-[42px] min-w-[42px] items-center justify-center rounded-full bg-[#EF233C] text-[15px] font-bold">
              1
            </div>

            <div>
              <h3 className="font-inter text-[15px] font-bold sm:text-[16px]">
                Send your photos
              </h3>

              <p className="mt-[6px] max-w-[260px] font-inter text-[13px] leading-[22px] text-white/70 sm:text-[14px]">
                Share your favorite memories with us via WhatsApp.
              </p>
            </div>

          </div>

          {/* ARROW */}
          <span className="hidden text-[28px] text-white lg:block">
              →
          </span>

          {/* STEP 2 */}
          <div className="flex items-start gap-[18px] sm:gap-[24px]">

            <div className="flex h-[42px] min-h-[42px] w-[42px] min-w-[42px] items-center justify-center rounded-full bg-[#3B82F6] text-[15px] font-bold">
              2
            </div>

            <div>
              <h3 className="font-inter text-[15px] font-bold sm:text-[16px]">
                We print & magnetise
              </h3>

              <p className="mt-[6px] max-w-[280px] font-inter text-[13px] leading-[22px] text-white/70 sm:text-[14px]">
                Premium-quality printing on durable magnetic tiles.
              </p>
            </div>

          </div>

          {/* ARROW */}
          <span className="hidden text-[28px] text-white lg:block">
            →
          </span>

          {/* STEP 3 */}
          <div className="flex items-start gap-[18px] sm:gap-[24px]">

            <div className="flex h-[42px] min-h-[42px] w-[42px] min-w-[42px] items-center justify-center rounded-full bg-[#22C55E] text-[15px] font-bold">
              3
            </div>

            <div>
              <h3 className="font-inter text-[15px] font-bold sm:text-[16px]">
                Delivered to your door
              </h3>

              <p className="mt-[6px] max-w-[300px] font-inter text-[13px] leading-[22px] text-white/70 sm:text-[14px]">
                Receive at home, stick straight on your fridge.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}