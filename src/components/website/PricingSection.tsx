'use client';

const occasionItems = [
  { id: 1, emoji: '💍', label: 'Weddings' },
  { id: 2, emoji: '🎓', label: 'Graduations' },
  { id: 3, emoji: '🎂', label: 'Birthdays' },
  { id: 4, emoji: '👨‍👩‍👧', label: 'Families' },
  { id: 5, emoji: '❤️', label: 'Couples' },
  { id: 6, emoji: '🏢', label: 'Corporate' },
];

type PriceCardProps = {
  variant?: 'default' | 'popular';
  label: string;
  title: string;
  price: string;
  description: string;
};

function PriceCard({
  variant = 'default',
  label,
  title,
  price,
  description,
}: PriceCardProps) {
  const isPopular = variant === 'popular';

  return (
    <div
      className={`relative flex h-[300px] flex-col justify-between overflow-hidden rounded-2xl border-2  p-10 shadow-sm transition ${
        isPopular
          ? 'border-blue-200 bg-blue-50'
          : 'border-yellow-200 bg-yellow-50'
      }`}
    >
      {isPopular && (
        <div className="absolute right-[-34px] top-[18px] rotate-45 bg-red-600 px-10 py-1.5 text-xs font-bold text-white shadow">
          POPULAR
        </div>
      )}

      <div className="text-[12px] font-bold uppercase tracking-wide text-gray-500">
        {label}
      </div>

      <h3 className="mt-2 text-[22px] font-bold leading-[32px] text-gray-800">
        {title}
      </h3>

      <div className="my-4 flex items-baseline gap-2">
        <span className="text-base text-gray-500">
          from
        </span>

        <span className="text-[26px] font-black leading-none text-red-600">
          {price}
        </span>
      </div>

      <p className="text-[16px] leading-8 text-gray-500">
        {description}
      </p>
    </div>
  );
}

function OccasionCard({
  emoji,
  label,
}: {
  emoji: string;
  label: string;
}) {
  return (
    <div className="flex h-[138px] cursor-pointer flex-col items-center justify-center gap-4 rounded-[14px] border border-gray-100 bg-white px-4 py-6 shadow-sm transition hover:border-gray-200 hover:shadow-md">
      
      <div className="text-[34px] leading-none">
        {emoji}
      </div>

      <p className="text-center text-[16px] font-semibold text-gray-800">
        {label}
      </p>
    </div>
  );
}

export default function PricingSection() {
  return (
    <section className="mx-auto flex flex-col gap-[60px] bg-[#F9F9FE] px-6 py-[70px] md:px-[80px] xl:flex-row xl:items-start xl:justify-between xl:gap-[80px] xl:px-[120px]">

      {/* LEFT SIDE */}
      <div className="flex w-full flex-1 flex-col">

        <header className="mb-10 min-h-[120px]">
          <h2 className="text-[32px] font-extrabold leading-[44px] text-[#002B73]">
            Simple, honest pricing.
          </h2>

          <p className="mt-3 max-w-[500px] text-[18px] leading-8 text-slate-500">
            No hidden costs. Cash on delivery available across the island.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

          <PriceCard
            label="MAGNETS ONLY"
            title="Photo Magnets"
            price="Rs. 1,500"
            description="Minimum 4 pieces • square magnetic tiles"
          />

          <PriceCard
            variant="popular"
            label="MAGNETS + FRAME"
            title="Magnet Frame Set"
            price="Rs. 2,500"
            description="Black or white frame • holds 4 tiles"
          />

        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex w-full flex-1 flex-col">

        <header className="mb-10 min-h-[120px]">
          <h2 className="text-[32px] font-extrabold leading-[44px] text-[#002B73]">
            Perfect for every occasion.
          </h2>

          <p className="mt-3 max-w-[500px] text-[18px] leading-8 text-slate-500">
            Turn life's best moments into a daily reminder.
          </p>
        </header>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-3">

          {occasionItems.map((item) => (
            <OccasionCard
              key={item.id}
              emoji={item.emoji}
              label={item.label}
            />
          ))}

        </div>
      </div>
    </section>
  );
}