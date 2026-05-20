export default function HowItWorksSection() {
  return (
    <section className="w-full bg-[#F9F9FE] px-[100px]  pt-[100px]">
      <div className="mx-auto w-full max-w-[1800px] rounded-[22px] bg-[#07357E] px-[30px] py-[42px] text-white">
        
        <h2 className="font-manrope text-[24px] font-bold">
          How it works{" "}
          <span className="text-[#FFD600]">— 3 simple steps</span>
        </h2>

        <div className="mt-[42px] flex items-center justify-between">
          
          {/* STEP 1 */}
          <div className="flex items-center gap-[28px]">
            <div className="flex h-[42px] w-[42px] items-center justify-center rounded-full bg-[#EF233C] font-bold">
              1
            </div>

            <div>
              <h3 className="font-inter text-[16px] font-bold">
                Send your photos
              </h3>
              <p className="mt-[4px] max-w-[210px] font-inter text-[13px] leading-[20px] text-white/65">
                Share your favorite memories with us via WhatsApp.
              </p>
            </div>
          </div>

          <span className="text-[28px] text-white">---›</span>

          {/* STEP 2 */}
          <div className="flex items-center gap-[28px]">
            <div className="flex h-[42px] w-[42px] items-center justify-center rounded-full bg-[#3B82F6] font-bold">
              2
            </div>

            <div>
              <h3 className="font-inter text-[16px] font-bold">
                We print & magnetise
              </h3>
              <p className="mt-[4px] max-w-[230px] font-inter text-[13px] leading-[20px] text-white/65">
                Premium-quality printing on durable magnetic tiles.
              </p>
            </div>
          </div>

          <span className="text-[28px] text-white">---›</span>

          {/* STEP 3 */}
          <div className="flex items-center gap-[28px]">
            <div className="flex h-[42px] w-[42px] items-center justify-center rounded-full bg-[#22C55E] font-bold">
              3
            </div>

            <div>
              <h3 className="font-inter text-[16px] font-bold">
                Delivered to your door
              </h3>
              <p className="mt-[4px] max-w-[260px] font-inter text-[13px] leading-[20px] text-white/65">
                Receive at home, stick straight on your fridge.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}