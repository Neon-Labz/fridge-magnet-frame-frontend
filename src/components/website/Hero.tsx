'use client';

import { useRouter } from 'next/navigation';

export default function Hero() {
  const router = useRouter();

  return (
    <section className="relative mt-[108px] md:mt-[75px] h-auto md:h-[782px] w-full overflow-hidden">
      
      {/* BACKGROUND IMAGE */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/bg-hero.png')",
        }}
      />

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-[#002B73]/20" />

      {/* CONTENT */}
      <div className="relative z-10 flex flex-col md:flex-row h-auto md:h-full items-start md:items-stretch pl-4 md:pl-[100px] pt-6 md:pt-[30px]">
        
        {/* GLASS BOX */}
        <div
          className={
            `
            relative
            h-auto md:h-[650px]
            w-full md:w-[600px]
            max-w-full
            rounded-[28px]
            border
            border-white/35
            bg-[rgba(255,255,255,0.22)]
            backdrop-blur-[4px]
            shadow-[0_10px_40px_rgba(0,0,0,0.15)]
          `
          }
        >

          {/* TEXT CONTAINER */}
          <div className="relative md:absolute px-4 md:px-[30px] md:left-[55px] md:top-[95px] md:w-[620px] py-6 md:py-0">

            {/* TITLE */}
            <h1 className="font-manrope text-[28px] md:text-[52px] font-bold leading-[1.05] md:leading-[62px] tracking-[-0.5px] md:tracking-[-1px] text-[#032d76]">
              Your Memories, <br />

              <span className="text-[#BC0000]">
                Magnified
              </span>{' '}
              
              with <br />

              Precision.
            </h1>

            {/* PARAGRAPH */}
            <p className="mt-4 md:mt-[34px] w-full md:w-[560px] font-inter text-[14px] md:text-[18px] leading-[1.5] md:leading-[36px] text-black/75">
              Transform your digital memories into museum-grade
              <br />
              physical heirlooms. Handcrafted precision for the
              <br />
              moments that define you.
            </p>

            {/* BUTTON */}
            <button onClick={() => router.push('/shop')} className="mt-6 md:mt-[42px] flex h-[48px] md:h-[68px] w-[160px] md:w-[180px] items-center justify-center rounded-[10px] bg-[#BC0000] text-[16px] md:text-[18px] font-semibold text-white shadow-[0_10px_25px_rgba(0,0,0,0.18)] transition-all hover:bg-[#a00000]">
              Shop Now
            </button>

          </div>
        </div>
      </div>
    </section>
  );
}