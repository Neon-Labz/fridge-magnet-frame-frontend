export default function SpecialPackages() {
  const packages = [
    {
      title: "Wedding — 20 magnets",
      subtitle: "Perfect guest gift",
      price: "Rs. 5,900",
      icon: "💍",
    },
    {
      title: "Wedding — 20 + 2 Frames",
      subtitle: "Premium wedding package",
      price: "Rs. 7,900",
      icon: "💍",
    },
    {
      title: "Graduation — 6 + Frame",
      subtitle: "Celebrate your big day",
      price: "Rs. 2,990",
      icon: "🎓",
    },
    {
      title: "Birthday — 6 magnets",
      subtitle: "Memorable gift idea",
      price: "Rs. 1,990",
      icon: "🎂",
    },
  ];

  return (
    <section className="w-full bg-white py-[40px]">
      <div className="mx-auto max-w-[1800px] rounded-[30px] border border-[#E5E7EB] bg-white px-[20px] py-[38px] shadow-sm">

        {/* TITLE */}
        <div className="mb-[30px] flex items-center gap-[10px]">
          <span className="text-[32px]">👑</span>

          <h2 className="font-inter text-[36px] font-extrabold uppercase tracking-[3px] text-[#0F172A]">
            Special Packages
          </h2>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 gap-[24px] md:grid-cols-2">

          {packages.map((item, index) => (
            <div
              key={index}
              className="flex min-h-[160px] items-center justify-between rounded-[24px] border border-[#F1D87A] bg-[#FFFCF5] px-[38px] py-[28px]"
            >
              {/* LEFT */}
              <div>
                <h3 className="max-w-[340px] font-inter text-[24px] font-extrabold leading-[36px] text-[#172033]">
                  <span className="mr-[6px]">{item.icon}</span>
                  {item.title}
                </h3>

                <p className="mt-[10px] font-inter text-[16px] italic font-semibold text-[#66758F]">
                  {item.subtitle}
                </p>
              </div>

              {/* RIGHT */}
              <h4 className="whitespace-nowrap font-inter text-[34px] font-extrabold text-[#B85A00]">
                {item.price}
              </h4>
            </div>
          ))}
        </div>

        {/* CORPORATE */}
        <div className="mt-[24px] flex min-h-[160px] items-center justify-between rounded-[24px] border border-[#F1D87A] bg-[#FFFCF5] px-[38px] py-[28px]">

          {/* LEFT */}
          <div>
            <h3 className="font-inter text-[24px] font-extrabold leading-[36px] text-[#172033]">
              <span className="mr-[6px]">🏢</span>
              Corporate — 50 magnets
            </h3>

            <p className="mt-[10px] font-inter text-[16px] italic font-semibold text-[#66758F]">
              Branded bulk order
            </p>
          </div>

          {/* RIGHT */}
          <h4 className="whitespace-nowrap font-inter text-[42px] font-extrabold text-[#B85A00]">
            Rs. 11,000
          </h4>
        </div>
      </div>
    </section>
  );
}