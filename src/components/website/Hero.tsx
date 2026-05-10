'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Hero() {
  const router = useRouter();

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

          <button
            onClick={() => router.push('/shop')}
            className="mt-10 h-17 w-45 rounded-[8.5px] bg-[#BC0000] font-inter text-[19px] font-semibold text-white shadow-lg"
          >
            Shop Now
          </button>
        </div>

        <div className="relative">
          <div className="absolute left-6 top-6 h-full w-full rounded-[28px] bg-[rgba(217,217,217,0.24)]" />
          <div className="relative rounded-[28px] border border-[#C3C6D4] bg-white p-6 shadow-[0_8px_30px_rgba(15,23,42,0.08)]">
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { label: "Personalized frames", value: "320+ styles" },
                { label: "Average rating", value: "4.9 / 5" },
                { label: "Ships in", value: "2-3 days" },
                { label: "Gift-ready", value: "Yes" },
              ].map((stat) => (
                <div key={stat.label} className="rounded-2xl bg-[#F8FAFC] p-4">
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#64748B]">{stat.label}</p>
                  <p className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-[#1A1C1F]">{stat.value}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-[#E5E5EA] bg-gradient-to-br from-[#F9FAFF] to-white p-5">
              <p className="text-sm font-semibold text-[#0040A1]">Designed to match the checkout experience</p>
              <p className="mt-2 text-sm leading-6 text-[#434652]">
                The public-facing storefront uses the same visual system as the Figma reference: soft borders, measured spacing, and strong brand blue accents.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
          </div>
=======
'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Hero() {
  const router = useRouter();

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

          <button
            onClick={() => router.push('/shop')}
            className="mt-10 h-17 w-45 rounded-[8.5px] bg-[#BC0000] font-inter text-[19px] font-semibold text-white shadow-lg"
          >
            Shop Now
          </button>
>>>>>>> development
        </div>

        <div className="relative">
          <div className="absolute left-6 top-6 h-full w-full rounded-[28px] bg-[rgba(217,217,217,0.24)]" />
          <div className="relative rounded-[28px] border border-[#C3C6D4] bg-white p-6 shadow-[0_8px_30px_rgba(15,23,42,0.08)]">
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { label: "Personalized frames", value: "320+ styles" },
                { label: "Average rating", value: "4.9 / 5" },
                { label: "Ships in", value: "2-3 days" },
                { label: "Gift-ready", value: "Yes" },
              ].map((stat) => (
                <div key={stat.label} className="rounded-2xl bg-[#F8FAFC] p-4">
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#64748B]">{stat.label}</p>
                  <p className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-[#1A1C1F]">{stat.value}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-[#E5E5EA] bg-gradient-to-br from-[#F9FAFF] to-white p-5">
              <p className="text-sm font-semibold text-[#0040A1]">Designed to match the checkout experience</p>
              <p className="mt-2 text-sm leading-6 text-[#434652]">
                The public-facing storefront uses the same visual system as the Figma reference: soft borders, measured spacing, and strong brand blue accents.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
