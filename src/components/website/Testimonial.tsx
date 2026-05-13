import Image from "next/image";

export default function CustomerSection() {
  return (
<section className="w-full bg-[#F9F9FE] pt-[0px] pb-[40px]">
          <div className="mx-auto max-w-[1800px] px-[25px]">

        {/* TOP */}
        <div className="flex items-end justify-between">
          <div>
            <h2 className="font-manrope text-[42px] font-bold leading-[52px] text-[#002B73]">
              Our Customer Say
            </h2>

            <p className="mt-[12px] max-w-[480px] font-inter text-[18px] leading-[25px] text-[#64748B]">
              Join over 50,000 customers who have transformed their homes with
              Magnify.
            </p>
          </div>

          {/* ARROWS */}
          <div className="mt-[6px] flex items-center gap-[14px]">
            <button className="flex h-[45px] w-[45px] items-center justify-center rounded-full border border-[#002B73] text-[18px] text-[#002B73] transition hover:bg-[#002B73] hover:text-white">
              ←
            </button>

            <button className="flex h-[45px] w-[45px] items-center justify-center rounded-full border border-[#002B73] text-[18px] text-[#002B73] transition hover:bg-[#002B73] hover:text-white">
              →
            </button>
          </div>
        </div>

        {/* CARDS */}
      <div className="mt-[35px] grid grid-cols-1 gap-[18px] lg:grid-cols-3">

  {/* CARD 1 */}
  <div className="h-[520px] w-[540px] rounded-[18px] bg-white p-[20px] shadow-[0_4px_16px_rgba(0,0,0,0.04)]">

    {/* STARS */}
    <div className="flex gap-[3px] text-[35px] text-[#E11D48]">
      ★ ★ ★ ★ ★
    </div>

    {/* REVIEW */}
    <p className="mt-[50px] font-inter text-[22px] italic leading-[28px] text-[#475569]">
      “The quality of the wood and the precision of the matting exceeded
      my expectations. It feels like a piece from a high-end gallery.”
    </p>

    {/* USER */}
    <div className="mt-[50px] flex items-center gap-[12px]">
      <Image
        src="/c1.png"
        alt="Sarah Jenkins"
        width={50}
        height={50}
        className="rounded-full object-cover"
      />

      <div>
        <h4 className="font-inter text-[20px] font-semibold text-[#002B73]">
          Sarah Jenkins
        </h4>

        <p className="font-inter text-[18px] text-[#64748B]">
          Interior Designer
        </p>
      </div>
    </div>
  </div>

  {/* CARD 2 */}
  <div className="h-[520px] w-[540px] rounded-[18px] bg-white p-[20px] shadow-[0_4px_16px_rgba(0,0,0,0.04)]">

    {/* STARS */}
    <div className="flex gap-[3px] text-[35px] text-[#E11D48]">
      ★ ★ ★ ★ ★
    </div>

    {/* REVIEW */}
    <p className="mt-[50px] font-inter text-[22px] italic leading-[28px] text-[#475569]">
      “Finally a service that treats personal photography with the same
      respect as fine art. The shipping was incredibly secure.”
    </p>

    {/* USER */}
    <div className="mt-[50px] flex items-center gap-[12px]">
      <Image
        src="/c2.png"
        alt="David Chen"
        width={50}
        height={50}
        className="rounded-full object-cover"
      />

      <div>
        <h4 className="font-inter text-[20px] font-semibold text-[#002B73]">
          David Chen
        </h4>

        <p className="font-inter text-[18px] text-[#64748B]">
          Fine Art Photographer
        </p>
      </div>
    </div>
  </div>

  {/* IMAGE CARD */}
  <div className="relative h-[520px] w-full overflow-hidden rounded-[18px]">
    <Image
      src="/test.jpg"
      alt="Gallery"
      fill
      className="object-cover"
    />

    <div className="absolute inset-0 bg-gradient-to-t from-[#002B73]/80 to-transparent" />

    <p className="absolute bottom-[16px] left-[16px] font-inter text-[18px] font-medium text-white">
      @MagnifyHome Gallery
    </p>
  </div>

</div>
      </div>
    </section>
  );
}