import Link from "next/link";
import { ArrowRight, Sparkles, ShieldCheck, Truck } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-[#f9f9fe]">
      <div className="absolute inset-x-0 top-0 -z-10 h-[420px] bg-[radial-gradient(circle_at_top_left,rgba(0,64,161,0.12),transparent_30%),radial-gradient(circle_at_top_right,rgba(230,29,17,0.1),transparent_26%)]" />

      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-20">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#C3C6D4] bg-white px-4 py-2 text-sm font-medium text-[#0040A1] shadow-sm">
            <Sparkles className="h-4 w-4" />
            Handcrafted frames for curated memories
          </div>
          <h1 className="mt-6 max-w-xl font-manrope text-5xl font-bold tracking-[-0.04em] text-[#0040A1] sm:text-6xl">
            Premium frames, built to elevate the moment.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-[#434652]">
            Discover magazine-worthy fridge magnet frames, refined finishes, and thoughtful packaging designed for gifting.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/shop"
              className="inline-flex items-center justify-center rounded-xl bg-[#0040A1] px-6 py-3 text-[15px] font-semibold text-white shadow-[0_12px_24px_rgba(0,64,161,0.18)] transition hover:bg-[#00337f]"
            >
              Shop collection
            </Link>
            <Link
              href="/checkout"
              className="inline-flex items-center justify-center rounded-xl border border-[#C3C6D4] bg-white px-6 py-3 text-[15px] font-semibold text-[#1A1C1F] transition hover:border-[#0040A1] hover:text-[#0040A1]"
            >
              Checkout preview
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              { icon: ShieldCheck, title: "Safe materials", text: "Archival quality and durable finishes" },
              { icon: Truck, title: "Fast delivery", text: "Careful packing with tracked shipping" },
              { icon: Sparkles, title: "Custom styling", text: "A visual system tuned for gifting" },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-[#C3C6D4] bg-white p-4 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
                <item.icon className="h-5 w-5 text-[#0040A1]" />
                <h3 className="mt-3 text-sm font-semibold text-[#1A1C1F]">{item.title}</h3>
                <p className="mt-1 text-sm leading-6 text-[#434652]">{item.text}</p>
              </div>
            ))}
          </div>
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
};
