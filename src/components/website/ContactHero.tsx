import Image from "next/image";

export default function ContactHero() {
  return (
    <div className="w-full bg-white">
      <div className="w-full pt-[92px]">
        <section className="flex flex-col lg:min-h-[300px] lg:flex-row">
          <div className="flex w-full flex-col justify-center px-4 py-4 sm:px-6 sm:py-6 lg:w-[42%] lg:py-0 lg:pr-[120px] lg:pl-[max(80px,calc(110px_+_(100vw_-_1700px)/2))]">
            <span className="text-[12px] font-bold uppercase tracking-[0.7px] text-[#D10A0A] lg:text-[14px]">
              We&apos;d love to hear from you
            </span>

            <span className="mb-4 mt-2 block h-1 w-10 bg-[#D10A0A]" />

            <h1 className="text-[40px] font-extrabold leading-tight lg:text-[60px] lg:leading-[60px] lg:whitespace-nowrap">
              <span className="text-[#001E50]">Get in</span>{" "}
              <span className="text-[#D10A0A]">Touch</span>
            </h1>

            <p className="mt-4 max-w-full text-[16px] font-normal leading-[26px] text-[#6B7280] lg:max-w-[480px] lg:text-[18px] lg:leading-[29px]">
              We&apos;re here to help you preserve your most cherished
              memories and answer any questions you may have.
            </p>
          </div>

          <div className="relative h-[250px] w-full lg:h-auto lg:flex-1">
            <Image
              src="/contact_img.png"
              alt="Get in touch with Magnify"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="object-contain object-center lg:object-right"
            />
          </div>
        </section>
      </div>
    </div>
  );
}
