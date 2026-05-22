"use client";

export default function VideoSection() {
  return (
    <section className="w-full bg-[#f9f9fe] py-16 lg:py-[100px]">
      <div className="mx-auto max-w-[1800px] px-4 sm:px-6 lg:px-[100px]">

        <div className="flex flex-col lg:flex-row md:flex-row items-stretch gap-10 lg:gap-[60px]">

          {/* LEFT TEXT BOX */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center text-center lg:text-left">

            <h2 className="font-manrope text-[30px] sm:text-[34px] lg:text-[40px] font-bold leading-[44px] lg:leading-[50px] text-[#002B73]">
              What is a Magnet Frame?
            </h2>

            <div className="mt-[14px] mx-auto lg:mx-0 h-[3px] w-[90px] bg-[#BC0000]" />

            <p className="mt-[24px] sm:mt-[30px] lg:mt-[40px] font-inter text-[16px] sm:text-[18px] lg:text-[23px] leading-[28px] sm:leading-[32px] lg:leading-[37px] text-[#4B5563] max-w-[600px] mx-auto lg:mx-0">
              Your memories - printed, magnetised & displayed on premium tiles
              that stick straight to your fridge. Turn every moment into a
              lasting fridge-worthy memory.
            </p>

          </div>

          {/* RIGHT VIDEO BOX */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">

            <div className="w-full max-w-[500px] aspect-[3/2] flex items-center justify-center">

              <img
                src="/homepage-video.gif"
                alt="Magnet Frame Demo"
                className="h-full w-full object-cover rounded-[16px]"
              />

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}