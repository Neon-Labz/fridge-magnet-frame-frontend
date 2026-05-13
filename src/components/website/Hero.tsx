'use client';

import { useRouter } from 'next/navigation';

export default function Hero() {
  const router = useRouter();

  return (
    <section className="relative mt-[90px] h-[782px] w-full overflow-hidden">
      
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
      <div className="relative z-10 flex h-full items-start pl-[100px] pt-[30px]">
        
        {/* GLASS BOX */}
        <div
          className="
            relative
            h-[650px]
            w-[600px]
            rounded-[28px]
            border
            border-white/35
            bg-[rgba(255,255,255,0.22)]
            backdrop-blur-[4px]
            shadow-[0_10px_40px_rgba(0,0,0,0.15)]
          "
        >

          {/* TEXT CONTAINER */}
          <div className="absolute left-[55px] top-[95px] w-[620px]">

            {/* TITLE */}
            <h1
              className="
                font-manrope
                text-[52px]
                font-bold
                leading-[62px]
                tracking-[-1px]
                text-[#002B73]
              "
            >
              Your Memories, <br />

              <span className="text-[#BC0000]">
                Magnified
              </span>{' '}
              
              with <br />

              Precision.
            </h1>

            {/* PARAGRAPH */}
            <p
              className="
                mt-[34px]
                w-[560px]
                font-inter
                text-[18px]
                leading-[36px]
                text-black/75
              "
            >
              Transform your digital memories into museum-grade
              <br />
              physical heirlooms. Handcrafted precision for the
              <br />
              moments that define you.
            </p>

            {/* BUTTON */}
            <button
              onClick={() => router.push('/shop')}
              className="
                mt-[42px]
                flex
                h-[68px]
                w-[180px]
                items-center
                justify-center
                rounded-[10px]
                bg-[#BC0000]
                text-[18px]
                font-semibold
                text-white
                shadow-[0_10px_25px_rgba(0,0,0,0.18)]
                transition-all
                hover:bg-[#a00000]
              "
            >
              Shop Now
            </button>

          </div>
        </div>
      </div>
    </section>
  );
}