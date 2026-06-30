import Image from "next/image";

export default function CustomerSection() {
  return (
    <section className="w-full overflow-hidden bg-[#F9F9FE] py-[60px] md:py-[80px] lg:py-[30px] lg:pb-[60px]">
      <div className="mx-auto w-full max-w-[1700px] px-4 sm:px-6 lg:px-[120px]">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-[580px]">
            <h2 className="font-manrope text-[28px] font-bold leading-[38px] text-[#002B73] sm:text-[32px] sm:leading-[44px] lg:text-[35px] lg:leading-[52px]">
              Our Customer Say
            </h2>

            <p className="mt-[12px] font-inter text-[15px] leading-[26px] text-[#64748B] sm:text-[16px] lg:text-[18px] lg:leading-[28px]">
              Join over 50,000 customers who have transformed their homes with
              Magnify.
            </p>
          </div>

          <div className="flex items-center gap-[12px] md:justify-end">
            <button className="flex h-[42px] w-[42px] items-center justify-center rounded-full border-[2px] border-[#002B73] text-[22px] font-bold text-[#002B73] transition hover:bg-[#002B73] hover:text-white">
              🡠
            </button>

            <button className="flex h-[42px] w-[42px] items-center justify-center rounded-full border-[2px] border-[#002B73] text-[22px] font-bold text-[#002B73] transition hover:bg-[#002B73] hover:text-white">
              🡢
            </button>
          </div>
        </div>

        <div className="mt-[35px] grid grid-cols-1 gap-[20px] lg:grid-cols-3">
          <div className="flex min-h-[280px] w-full flex-col justify-between rounded-[18px] bg-white p-[20px] shadow-[0_4px_16px_rgba(0,0,0,0.04)] sm:p-[24px] lg:min-h-[320px]">
            <div>
              <div className="flex flex-wrap gap-[3px] text-[24px] text-[#E11D48] sm:text-[28px]">
                ★ ★ ★ ★ ★
              </div>

              <p className="mt-[24px] font-inter text-[15px] italic leading-[26px] text-[#475569] sm:text-[16px] sm:leading-[28px] lg:mt-[35px] lg:text-[18px]">
                “The quality of the wood and the precision of the matting
                exceeded my expectations. It feels like a piece from a high-end
                gallery.”
              </p>
            </div>

            <div className="mt-[30px] flex items-center gap-[12px]">
              <Image
                src="/c1.png"
                alt="Sarah Jenkins"
                width={48}
                height={48}
                className="shrink-0 rounded-full object-cover"
              />

              <div className="min-w-0">
                <h4 className="font-inter text-[16px] font-semibold text-[#002B73] sm:text-[18px]">
                  Sarah Jenkins
                </h4>

                <p className="font-inter text-[14px] text-[#64748B] sm:text-[15px]">
                  Interior Designer
                </p>
              </div>
            </div>
          </div>

          <div className="flex min-h-[280px] w-full flex-col justify-between rounded-[18px] bg-white p-[20px] shadow-[0_4px_16px_rgba(0,0,0,0.04)] sm:p-[24px] lg:min-h-[320px]">
            <div>
              <div className="flex flex-wrap gap-[3px] text-[24px] text-[#E11D48] sm:text-[28px]">
                ★ ★ ★ ★ ★
              </div>

              <p className="mt-[24px] font-inter text-[15px] italic leading-[26px] text-[#475569] sm:text-[16px] sm:leading-[28px] lg:mt-[35px] lg:text-[18px]">
                “Finally a service that treats personal photography with the
                same respect as fine art. The shipping was incredibly secure.”
              </p>
            </div>

            <div className="mt-[30px] flex items-center gap-[12px]">
              <Image
                src="/c2.png"
                alt="David Chen"
                width={48}
                height={48}
                className="shrink-0 rounded-full object-cover"
              />

              <div className="min-w-0">
                <h4 className="font-inter text-[16px] font-semibold text-[#002B73] sm:text-[18px]">
                  David Chen
                </h4>

                <p className="font-inter text-[14px] text-[#64748B] sm:text-[15px]">
                  Fine Art Photographer
                </p>
              </div>
            </div>
          </div>

          <div className="relative min-h-[280px] w-full overflow-hidden rounded-[18px] lg:min-h-[320px]">
            <Image
              src="/test.jpg"
              alt="Gallery"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 33vw"
              className="object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#002B73]/80 to-transparent" />

            <p className="absolute bottom-[18px] left-[18px] font-inter text-[14px] font-medium text-white sm:text-[16px]">
              @MagnifyHome Gallery
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
