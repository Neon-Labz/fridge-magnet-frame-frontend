'use client';

const features = [
  {
    icon: '🚚',
    label: 'Island Wide Delivery',
  },
  {
    icon: '💵',
    label: 'Cash on Delivery',
  },
  {
    icon: '⚡',
    label: 'Same Day Jaffna',
  },
  {
    icon: '✨',
    label: 'Premium Quality',
  },
];

export default function OrderNowSection() {
  return (
    <section className="border-y border-[#F1F5F9] bg-white">
      <div className="mx-auto max-w-[1274px] px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.label}
              className="flex flex-col items-center justify-center gap-4 rounded-[24px] border border-[#E2E8F0] bg-white px-6 py-6 text-center shadow-none"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#F8FAFC] text-[32px]">
                {feature.icon}
              </div>
              <p className="max-w-[128px] text-[13px] font-black uppercase tracking-[2.8px] text-[#334155] sm:text-[14px]">
                {feature.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-[#F8FAFC] px-4 pb-16 pt-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1267px] rounded-[48px] border border-[#E2E8F0] bg-[#F8FAFC] px-8 py-14 shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)] sm:px-12">
          <div className="flex flex-col items-center gap-4 text-center">
            <p className="text-[16px] font-bold uppercase tracking-[3.6px] text-[#64748B] sm:text-[18px]">
              Ready to customize? Order now via WhatsApp
            </p>
            <p className="text-[58px] font-black leading-[66px] text-[#002B73] sm:text-[72px]">
              +94 753 912 534
            </p>
            <p className="text-[16px] font-medium leading-[24px] text-[#64748B]">
              magnifyofficials@gmail.com
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
