const features = [
  { icon: "🚚", label: "Island Wide Delivery" },
  { icon: "💵", label: "Cash on Delivery" },
  { icon: "⚡", label: "Same Day Jaffna" },
  { icon: "✨", label: "Premium Quality" },
];

export default function OrderNowSection() {
  return (
    <section className="px-3 pb-8 sm:px-6">

      <div className="mx-auto mt-6 max-w-[1270px] rounded-[20px] border border-[#E2E8F0] bg-white px-3 py-5 shadow-sm sm:px-6 sm:py-8">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-4">

          {features.map((feature) => (
            <div
              key={feature.label}
              className="flex flex-col items-center gap-2 rounded-[18px] bg-[#F8FAFC] px-3 py-4 text-center"
            >
              <div className="text-[24px] sm:text-3xl">
                {feature.icon}
              </div>

              <p className="text-[11px] font-bold uppercase leading-4 tracking-wide text-[#334155] sm:text-sm">
                {feature.label}
              </p>
            </div>
          ))}

        </div>
      </div>

      <div className="pt-6">
        <div className="mx-auto max-w-[1280px] rounded-[24px] border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-8 text-center sm:rounded-[36px] sm:p-12">

          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#64748B] sm:text-sm">
            Ready to customize? Order now via WhatsApp
          </p>

          <p className="mt-3 text-[28px] font-black leading-tight text-[#002B73] sm:text-4xl md:text-5xl">
            +94 75 391 2534
          </p>

          <p className="mt-2 break-all text-sm text-[#475569] sm:text-base md:text-lg">
            magnifyofficials@gmail.com
          </p>

        </div>
      </div>

    </section>
  );
}