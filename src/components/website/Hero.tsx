"use client";

import { useRouter } from "next/navigation";
import { ArrowRight, ImageIcon, Magnet } from "lucide-react";

export default function Hero() {
  const router = useRouter();

  return (
    <section className="relative mt-[70px] w-full overflow-hidden bg-white md:mt-[75px]">
      <div className="relative min-h-[540px] w-full min-[390px]:min-h-[565px] min-[430px]:min-h-[590px] md:min-h-[560px] lg:min-h-[485px] xl:min-h-[680px]">
        <div
          aria-hidden="true"
          className="
            absolute
            inset-0
            bg-cover
            bg-[63%_center]
            bg-no-repeat
            min-[390px]:bg-[64%_center]
            min-[430px]:bg-[65%_center]
            md:bg-[68%_center]
            lg:bg-[69%_center]
            xl:bg-center
          "
          style={{
            backgroundImage: "url('https://pub-57b44696f3e243acb6e5fdb88145606e.r2.dev/images/public/bg-hero.png')",
          }}
        />

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-0
            z-[1]
            bg-[linear-gradient(90deg,#FFFFFF_0%,#FFFFFF_43%,rgba(255,255,255,0.88)_52%,rgba(255,255,255,0.44)_64%,rgba(255,255,255,0)_78%)]
            min-[390px]:bg-[linear-gradient(90deg,#FFFFFF_0%,#FFFFFF_42%,rgba(255,255,255,0.86)_51%,rgba(255,255,255,0.38)_63%,rgba(255,255,255,0)_78%)]
            md:bg-[linear-gradient(90deg,#FFFFFF_0%,#FFFFFF_43%,rgba(255,255,255,0.88)_51%,rgba(255,255,255,0.36)_61%,rgba(255,255,255,0)_73%)]
            lg:bg-[linear-gradient(90deg,#FFFFFF_0%,#FFFFFF_40%,rgba(255,255,255,0.82)_48%,rgba(255,255,255,0.30)_58%,rgba(255,255,255,0)_70%)]
            xl:bg-[linear-gradient(90.54deg,#FFFFFF_0%,#FFFFFF_37.5%,rgba(255,255,255,0.74)_45%,rgba(255,255,255,0)_51%)]
          "
        />

        <div
          className="
            relative
            z-10
            mx-auto
            flex
            min-h-[540px]
            w-full
            max-w-[1700px]
            items-center
            px-6
            py-7
            min-[390px]:min-h-[565px]
            min-[430px]:min-h-[590px]
            md:min-h-[560px]
            md:px-10
            md:py-6
            lg:min-h-[485px]
            lg:px-12
            xl:min-h-[680px]
            xl:px-[80px]
            xl:py-9
          "
        >
          <div className="w-[62%] max-w-[268px] min-[390px]:max-w-[286px] min-[430px]:max-w-[300px] md:w-[44%] md:max-w-[355px] lg:max-w-[420px] xl:max-w-[560px]">
            <p className="font-inter text-[8px] font-bold uppercase tracking-[1.3px] text-[#BC0000] md:text-[9px] xl:text-[11px]">
              Custom Fridge Magnets
            </p>

            <h1
              className="
                mt-3
                max-w-[260px]
                font-manrope
                text-[24px]
                font-bold
                leading-[1.08]
                text-[#002B73]
                min-[390px]:max-w-[278px]
                min-[390px]:text-[25px]
                min-[430px]:max-w-[292px]
                min-[430px]:text-[27px]
                md:max-w-[350px]
                md:text-[31px]
                lg:max-w-[390px]
                lg:text-[32px]
                xl:mt-4
                xl:max-w-[560px]
                xl:text-[48px]
                2xl:text-[52px]
              "
            >
              Personalized Fridge{" "}
              <span className="text-[#BC0000]">Magnets</span>{" "}You&apos;ll
              Love.
            </h1>

            <p
              className="
                mt-5
                max-w-[255px]
                font-inter
                text-[11px]
                leading-[18px]
                text-[#434652]
                min-[390px]:max-w-[272px]
                min-[390px]:text-[12px]
                min-[390px]:leading-[20px]
                min-[430px]:max-w-[286px]
                md:max-w-[340px]
                md:text-[12px]
                md:leading-[20px]
                lg:max-w-[365px]
                xl:mt-6
                xl:max-w-[500px]
                xl:text-[17px]
                xl:leading-[27px]
              "
            >
              Print your favorite photos on premium magnetic tiles and create a
              gallery of memories in your home.
            </p>

            <button
              type="button"
              aria-label="Shop custom fridge magnets"
              onClick={() => router.push("/shop")}
              className="
                mt-6
                inline-flex
                h-[46px]
                items-center
                justify-center
                gap-2
                rounded-[7px]
                bg-[#002B73]
                px-5
                font-inter
                text-[12px]
                font-bold
                text-white
                shadow-[0_8px_18px_rgba(0,43,115,0.16)]
                transition
                duration-300
                hover:bg-[#001F52]
                md:h-[48px]
                md:px-6
                md:text-[13px]
                xl:mt-7
                xl:h-[60px]
                xl:w-[170px]
                xl:px-0
                xl:text-[17px]
              "
            >
              Shop Now
              <ArrowRight size={17} strokeWidth={2} aria-hidden="true" />
            </button>

            <div className="mt-7 h-px w-full max-w-[268px] bg-[#E2E2E7] min-[390px]:max-w-[286px] min-[430px]:max-w-[300px] md:mt-6 md:max-w-[350px] lg:max-w-[380px] xl:mt-9 xl:max-w-[520px]" />

            <div className="mt-5 grid w-full max-w-[268px] grid-cols-1 gap-4 min-[390px]:max-w-[286px] min-[430px]:max-w-[300px] md:max-w-[350px] md:grid-cols-2 md:gap-x-8 md:gap-y-4 lg:max-w-[390px] lg:gap-x-10 xl:mt-6 xl:max-w-[520px] xl:gap-x-14">
              <div className="flex min-w-0 items-center gap-4 xl:gap-5">
                <div className="flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-full bg-[#F0F2F8] text-[#002B73] shadow-[0_8px_18px_rgba(0,43,115,0.06)] md:h-[38px] md:w-[38px] xl:h-[48px] xl:w-[48px]">
                  <Magnet size={16} strokeWidth={2} aria-hidden="true" />
                </div>

                <div className="min-w-0">
                  <p className="font-inter text-[12px] font-extrabold leading-[15px] text-[#002B73] md:text-[12px] xl:text-[16px]">
                    Strong
                  </p>

                  <p className="mt-1 whitespace-nowrap font-inter text-[8px] uppercase leading-[12px] tracking-[0.5px] text-[#434652] md:text-[8px] xl:mt-1.5 xl:text-[11px]">
                    Magnetic Hold
                  </p>
                </div>
              </div>

              <div className="flex min-w-0 items-center gap-4 xl:gap-5">
                <div className="flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-full bg-[#F0F2F8] text-[#002B73] shadow-[0_8px_18px_rgba(0,43,115,0.06)] md:h-[38px] md:w-[38px] xl:h-[48px] xl:w-[48px]">
                  <ImageIcon size={16} strokeWidth={2} aria-hidden="true" />
                </div>

                <div className="min-w-0">
                  <p className="font-inter text-[12px] font-extrabold leading-[15px] text-[#002B73] md:text-[12px] xl:text-[16px]">
                    Vibrant
                  </p>

                  <p className="mt-1 whitespace-nowrap font-inter text-[8px] uppercase leading-[12px] tracking-[0.5px] text-[#434652] md:text-[8px] xl:mt-1.5 xl:text-[11px]">
                    Print Quality
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
