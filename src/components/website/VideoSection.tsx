'use client';

export default function VideoSection() {
  return (
    <section className="w-full bg-[#f9f9fe]  lg:py-[100px] pt-[100px]">
      <div className="mx-auto max-w-[1800px] px-[100px] ">
        <div className="flex flex-col items-start justify-between gap-[60px] lg:flex-row">
          
          {/* Left Content */}
          <div className="w-full pt-[20px] lg:w-1/2">
            <h2 className="font-manrope text-[30px] font-bold leading-[44px] tracking-[-0.35px] text-[#002B73] lg:text-[40px] lg:leading-[50px]">
              What is a Magnet Frame?
            </h2>

            <div className="mt-[16px] h-[3px] w-[90px] bg-[#BC0000]" />

            <p className="mt-[40px] max-w-[550px] font-inter text-[23px] font-normal leading-[37px] tracking-[1px] text-[#4B5563]">
              Your memories - printed,
              
              magnetised & displayed on
              premium tiles that stick straight
              to your fridge.
            </p>
          </div>

          {/* Right Video Content */}
          <div className="flex w-full justify-end lg:w-1/2">
            <div className="rounded-[24px] bg-[#f6f6fa] p-[40px]">
              <div className="relative aspect-[3/2] w-[500px] overflow-hidden rounded-[16px]">
                <img
                  src="/homepage-video.gif"
                  alt="Magnet Frame Demo"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}