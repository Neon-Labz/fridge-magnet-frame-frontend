'use client';

export default function VideoSection() {
  return (
    <section className="w-full bg-[#f9f9fe] py-16 lg:py-[100px]">
      <div className="mx-auto max-w-[1800px] px-4 md:px-24">
        <div className="flex flex-col items-start justify-between gap-10 lg:flex-row">
          
          {/* Left Content */}
          <div className="w-full pt-2 lg:w-1/2">
            <h2 className="font-manrope text-[30px] font-bold leading-[44px] tracking-[-0.35px] text-[#002B73] lg:text-[40px] lg:leading-[50px]">
              What is a Magnet Frame?
            </h2>

            <div className="mt-[16px] h-[3px] w-[90px] bg-[#BC0000]" />

            <p className="mt-6 max-w-[550px] font-inter text-[18px] md:text-[23px] font-normal leading-relaxed tracking-[0.5px] text-[#4B5563]">
              Your memories - printed,
              
              magnetised & displayed on
              premium tiles that stick straight
              to your fridge.
            </p>
          </div>

          {/* Right Video Content */}
          <div className="flex w-full justify-end lg:w-1/2">
            <div className="rounded-[24px] bg-[#f6f6fa] p-6 md:p-[40px]">
              <div className="relative aspect-[3/2] w-full md:w-[500px] max-w-full overflow-hidden rounded-[16px]">
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