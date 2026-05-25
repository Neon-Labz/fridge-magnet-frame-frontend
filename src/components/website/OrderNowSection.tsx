const features = [
  { icon: "🚚", label: "Island Wide Delivery" },
  { icon: "💵", label: "Cash on Delivery" },
  { icon: "⚡", label: "Same Day Jaffna" },
  { icon: "✨", label: "Premium Quality" },
];

export default function OrderNowSection() {
  return (
    <section>

      {/* FEATURES */}
      <div className="mx-auto max-w-[1235px] px-4 py-8 sm:px-6 border border-[#E2E8F0] bg-white shadow-sm rounded-[24px]">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          {features.map((feature) => (
            <div
              key={feature.label}
              className="flex flex-col items-center gap-3 rounded-[24px]  p-5 text-center"
            >
              <div className="text-2xl sm:text-3xl">{feature.icon}</div>

              <p className="text-xs sm:text-sm font-bold uppercase tracking-wide text-[#334155]">
                {feature.label}
              </p>
            </div>
          ))}

        </div>
      </div>

      {/* CONTACT */}
      <div className="px-4 pb-10 pt-8 sm:px-6">
        <div className="mx-auto max-w-[1235px] rounded-[36px] border border-[#E2E8F0] bg-[#F8FAFC] p-8 sm:p-12 text-center">

          <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#64748B]">
            Ready to customize? Order now via WhatsApp
          </p>

          <p className="mt-3 text-2xl sm:text-4xl md:text-4xl font-black text-[#002B73]">
            +94 75 391 2534
          </p>

          <p className="mt-2 text-sm sm:text-base md:text-lg text-[#475569] break-all">
            magnifyofficials@gmail.com
          </p>

        </div>
      </div>

    </section>
  );
}