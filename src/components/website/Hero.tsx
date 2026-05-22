"use client";

import { useRouter } from "next/navigation";

export default function Hero() {
  const router = useRouter();

  return (
    <section className="relative mt-[75px] w-full overflow-hidden">
      {/* BACKGROUND */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/bg-hero.png')",
        }}
      />

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-[#002B73]/20" />

      {/* CONTENT WRAPPER */}
      <div className="relative z-10 flex items-start justify-start px-4 sm:px-6 lg:px-[100px] py-10">
        {/* GLASS BOX */}
        <div
          className="
        relative
        w-full
        max-w-[600px]
        min-h-[500px]
        sm:min-h-[650px]
        rounded-[28px]
        border
        border-white/35
        bg-[rgba(255,255,255,0.22)]
        backdrop-blur-[4px]
        shadow-[0_10px_40px_rgba(0,0,0,0.15)]
        p-6
        sm:p-[60px]
        flex
        flex-col
        justify-center
      "
        >
          {/* TEXT CONTAINER */}
          <div className="w-full">
            {/* TITLE */}
            <h1 className="font-manrope text-[28px] sm:text-[52px] font-bold leading-[38px] sm:leading-[62px] tracking-[-1px] text-[#032d76]">
              Your Memories, <br />
              <span className="text-[#BC0000]">Magnified</span> <br />
              with Precision.
            </h1>

            {/* PARAGRAPH */}
            <p className="mt-[18px] sm:mt-[24px] text-[14px] sm:text-[18px] leading-[24px] sm:leading-[32px] text-black/75">
              Transform your digital memories into museum-grade physical
              heirlooms. Handcrafted precision for the moments that define you.
            </p>

            {/* BUTTON */}
            <button
              onClick={() => router.push("/shop")}
              className="
            mt-[24px] sm:mt-[36px]
            h-[52px] sm:h-[68px]
            w-[160px] sm:w-[180px]
            rounded-[10px]
            bg-[#BC0000]
            text-white
            font-semibold
            text-[15px] sm:text-[18px]
            shadow-[0_10px_25px_rgba(0,0,0,0.18)]
            hover:bg-[#a00000]
            transition-all
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
