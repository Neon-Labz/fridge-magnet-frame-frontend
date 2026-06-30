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
    <section className="bg-white md:py-10 px-3 sm:px-6 lg:px-7">
      <div className="mx-auto max-w-[1275px] rounded-[32px] border border-[#E5E7EB] bg-white px-5 pb-10 py-6 shadow-sm sm:px-6 sm:py-8 md:px-10 md:py-10">
        {/* TITLE */}
        <div className="mb-6 flex items-center gap-2">
          <span className="text-xl sm:text-2xl">👑</span>

          <h2 className="text-lg sm:text-xl md:text-2xl font-extrabold uppercase tracking-wide text-[#0F172A]">
            Special Packages
          </h2>
        </div>

        {/* GRID 2 + 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {packages.map((item, index) => (
            <div
              key={index}
              className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 rounded-[24px] border border-[#F1D87A] bg-[#FFFCF5] p-5"
            >
              <div>
                <h3 className="text-base sm:text-lg font-bold text-[#172033] flex items-center gap-2">
                  <span>{item.icon}</span>
                  {item.title}
                </h3>

                <p className="text-sm sm:text-base text-[#66758F] mt-1">
                  {item.subtitle}
                </p>
              </div>

              <h4 className="text-xl sm:text-2xl font-black text-[#B85A00] whitespace-nowrap">
                {item.price}
              </h4>
            </div>
          ))}
        </div>

        {/* CORPORATE FULL WIDTH */}
        <div className="mt-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4 rounded-[24px] border border-[#F1D87A] bg-[#FFFCF5] px-5 py-5 sm:px-7 sm:py-6">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-[#172033] flex items-center gap-2">
              <span>🏢</span>
              Corporate — 50 magnets
            </h3>

            <p className="mt-1 text-sm sm:text-base text-[#66758F] font-medium">
              Branded bulk order
            </p>
          </div>

          <h4 className="text-lg sm:text-xl md:text-2xl font-black text-[#B85A00] whitespace-nowrap">
            Rs. 11,000
          </h4>
        </div>
      </div>
    </section>
  );
}
