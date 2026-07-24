"use client";

export default function VideoSection() {
  return (
    <section className="w-full bg-[#f9f9fe] py-16 lg:py-[60px]">
      <div className="mx-auto max-w-[1800px] px-4 sm:px-6 lg:px-[120px]">

        <div className="flex flex-col lg:flex-row md:flex-row items-stretch gap-10 lg:gap-[60px]">

          <div className="w-full lg:w-1/2 flex flex-col justify-center text-center lg:text-left">

            <h2 className="font-manrope text-[30px] sm:text-[34px] lg:text-[40px] font-bold leading-[44px] lg:leading-[50px] text-[#002B73]">
              Turn Moments Into Lasting Memories
            </h2>

            <div className="mt-[14px] mx-auto lg:mx-0 h-[3px] w-[90px] bg-[#BC0000]" />

            <p className="mt-4 md:mt-[34px] text-[14px] md:text-[20px] leading-[1.5] md:leading-[36px] text-black/80">
              Transform your favorite photos into premium custom fridge magnets. Beautifully crafted with vibrant printing and lasting quality, they're the perfect way to preserve and display your cherished memories every day.

            </p>

          </div>

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