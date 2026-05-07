import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative min-h-232.5 w-full overflow-hidden">
    <div
      className="absolute inset-0 bg-size-[100%_100%] bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/bg-hero.png')" }}
    />

      <div className="absolute inset-0 bg-[#002B73]/30" />

      <div className="relative z-10 flex max-w-359.5 min-h-232.5 items-center px-21">
        <div className="max-w-149.75  min-h-172.5 rounded-[25px] bg-white/35 px-10 pt-35 pb-25 backdrop-blur-[0px]">
          <h1 className="max-w-138.5 font-manrope text-[48px] font-bold leading-14 tracking-[-0.96px] text-[#002B73]">
            Your Memories,{" "}
            <span className="text-[#BC0000]">Magnified</span> with Precision.
          </h1>

          <p className="mt-6 max-w-132.75 font-inter text-[21px] leading-7.5 text-[#434652]">
            Transform your digital memories into museum-grade physical
            heirlooms. Handcrafted precision for the moments that define you.
          </p>

          <button className="mt-10 h-17 w-45 rounded-[8.5px] bg-[#BC0000] font-inter text-[19px] font-semibold text-white shadow-lg">
            Shop Now
          </button>
        </div>
      </div>
    </section>
  );
}