import Image from "next/image";

export default function CustomerSection() {
  return (
    <section className="w-full bg-[#F9F9FE] pt-[0px] pb-[40px]">
      
      <div className="mx-auto max-w-[1800px] px-[100px] pt-[100px]">

        {/* TOP */}
        <div className="flex items-end justify-between">
          
          <div>
            <h2 className="font-manrope text-[35px] font-bold leading-[52px] text-[#002B73]">
              Our Customer Say
            </h2>

            <p className="mt-[12px] max-w-[480px] font-inter text-[18px] leading-[25px] text-[#64748B]">
              Join over 50,000 customers who have transformed their homes with
              Magnify.
            </p>
          </div>

          {/* ARROWS */}
         <div className="mt-[6px] flex items-center gap-[14px]">
  
            <button className="flex h-[45px] w-[45px] items-center justify-center rounded-full border-[2px] border-[#002B73] text-[24px] font-bold text-[#002B73] transition hover:bg-[#002B73] hover:text-white">
              ←
            </button>

            <button className="flex h-[45px] w-[45px] items-center justify-center rounded-full border-[2px] border-[#002B73] text-[24px] font-bold text-[#002B73] transition hover:bg-[#002B73] hover:text-white">
              →
            </button>

          </div>
        </div>

        {/* CARDS */}
        <div className="mt-[35px] grid grid-cols-1 gap-[20px] lg:grid-cols-3">

          {/* CARD 1 */}
          <div className="h-[430px] w-full rounded-[18px] bg-white p-[20px] shadow-[0_4px_16px_rgba(0,0,0,0.04)]">

            {/* STARS */}
            <div className="flex gap-[3px] text-[28px] text-[#E11D48]">
              ★ ★ ★ ★ ★
            </div>

            {/* REVIEW */}
            <p className="mt-[35px] font-inter text-[18px] italic leading-[28px] text-[#475569]">
              “The quality of the wood and the precision of the matting exceeded
              my expectations. It feels like a piece from a high-end gallery.”
            </p>

            {/* USER */}
            <div className="mt-[40px] flex items-center gap-[12px]">
              
              <Image
                src="/c1.png"
                alt="Sarah Jenkins"
                width={48}
                height={48}
                className="rounded-full object-cover"
              />

              <div>
                <h4 className="font-inter text-[18px] font-semibold text-[#002B73]">
                  Sarah Jenkins
                </h4>

                <p className="font-inter text-[15px] text-[#64748B]">
                  Interior Designer
                </p>
              </div>

            </div>
          </div>

          {/* CARD 2 */}
          <div className="h-[430px] w-full rounded-[18px] bg-white p-[20px] shadow-[0_4px_16px_rgba(0,0,0,0.04)]">

            {/* STARS */}
            <div className="flex gap-[3px] text-[28px] text-[#E11D48]">
              ★ ★ ★ ★ ★
            </div>

            {/* REVIEW */}
            <p className="mt-[35px] font-inter text-[18px] italic leading-[28px] text-[#475569]">
              “Finally a service that treats personal photography with the same
              respect as fine art. The shipping was incredibly secure.”
            </p>

            {/* USER */}
            <div className="mt-[40px] flex items-center gap-[12px]">
              
              <Image
                src="/c2.png"
                alt="David Chen"
                width={48}
                height={48}
                className="rounded-full object-cover"
              />

              <div>
                <h4 className="font-inter text-[18px] font-semibold text-[#002B73]">
                  David Chen
                </h4>

                <p className="font-inter text-[15px] text-[#64748B]">
                  Fine Art Photographer
                </p>
              </div>

            </div>
          </div>

          {/* IMAGE CARD */}
          <div className="relative h-[430px] w-full overflow-hidden rounded-[18px]">
            
            <Image
              src="/test.jpg"
              alt="Gallery"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#002B73]/80 to-transparent" />

            <p className="absolute bottom-[16px] left-[16px] font-inter text-[16px] font-medium text-white">
              @MagnifyHome Gallery
            </p>

          </div>

        </div>
      </div>
    </section>
  );
}