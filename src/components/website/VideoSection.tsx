'use client';

export default function VideoSection() {
  return (
    <section className="w-full bg-white py-[80px] lg:py-[120px]">
      <div className="mx-auto flex max-w-[1800px] flex-col items-center justify-between gap-[60px] px-[20px] lg:flex-row lg:gap-[40px]">
        
        {/* Left Content */}
        <div className="w-full lg:w-1/2 lg:pr-[40px]">
          <h2 className="font-manrope text-[35px] font-bold leading-[44px] tracking-[-0.35px] text-[#002B73] lg:text-[40px] lg:leading-[50px]">
            What is a Magnet Frame?
          </h2>
          <div className="mt-[16px] h-[3px] w-[90px] bg-[#BC0000]"></div>
          
          <p className="mt-[40px] max-w-[550px] font-inter text-[30px] font-normal leading-[37px] tracking-[1px] text-[#4B5563]">
            Your memories - printed, magnetised & displayed on premium tiles that stick straight to your fridge.
          </p>
        </div>

        {/* Right Video Content */}
        <div className="flex w-full justify-center lg:w-1/2 lg:justify-end">
          <div className="w-full max-w-[680px] rounded-[24px] bg-[#F9F9FE] p-[16px] lg:p-[20px]">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[16px]">
              <video
                src="/homepage-video.mp4.mp4"
                className="h-full w-full object-cover"
                autoPlay
                loop
                muted
                playsInline
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
