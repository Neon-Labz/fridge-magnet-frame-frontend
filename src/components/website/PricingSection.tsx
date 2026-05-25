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
      className={`relative flex min-h-[250px] flex-col justify-between overflow-hidden rounded-2xl border-2  bg-white p-7 shadow-sm xl:min-h-[280px] xl:p-10 ${
        isPopular ? 'border-blue-200 bg-blue-50' : 'border-yellow-100'
      }`}
    >
      {isPopular && (
        <div className="absolute right-[-34px] top-[18px] rotate-45 bg-red-600 px-10 py-1.5 text-xs font-bold text-white shadow">
          POPULAR
        </div>
      )}

      <div className="text-[11px] font-bold uppercase text-gray-500">
        {label}
      </div>

      <h3 className="mt-2 text-[21px] font-bold leading-[30px] text-gray-800">
        {title}
      </h3>

      <div className="my-4 flex items-baseline gap-2">
        <span className="text-sm text-gray-500">from</span>
        <span className="text-[25px] font-black leading-none text-red-600">
          {price}
        </span>
      </div>

      <p className="text-sm leading-6 text-gray-500">{description}</p>
    </div>
  );
}

function OccasionCard({ emoji, label }: { emoji: string; label: string }) {
  return (
    <div className="flex min-h-[130px] cursor-pointer flex-col items-center justify-center gap-4 rounded-[10px] border border-gray-100 bg-white px-4 py-6 transition hover:border-gray-200 hover:shadow-md">
      <div className="text-[32px] leading-none">{emoji}</div>
      <p className="text-center text-sm font-semibold text-gray-800">
        {label}
      </p>
    </div>
  );
}

export default function PricingSection() {
  return (
    <section className="mx-auto flex flex-col gap-[50px] bg-[#F9F9FE] px-6 py-[50px] md:gap-[60px] md:px-[120px] md:py-10 xl:flex-row xl:items-stretch xl:gap-[60px] xl:px-[120px] xl:py-[60px]">
      <div className="flex-1">
        <header className="mb-7">
          <h2 className="text-2xl font-extrabold leading-[34px] text-[#002B73] md:text-[30px] md:leading-10 xl:text-[32px] xl:leading-[44px]">
            Simple, honest pricing.
          </h2>
          <p className="mt-2.5 max-w-[440px] text-sm leading-6 text-slate-500 md:text-[15px] md:leading-[25px] xl:text-sm xl:leading-[26px]">
            No hidden costs. Cash on delivery available across the island.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
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

      <div className="flex-1">
        <header className="mb-7">
          <h2 className="text-2xl font-extrabold leading-[34px] text-[#002B73] md:text-[30px] md:leading-10 xl:text-[32px] xl:leading-[44px]">
            Perfect for every occasion.
          </h2>
          <p className="mt-2.5 max-w-[440px] text-sm leading-6 text-slate-500 md:text-[15px] md:leading-[25px] xl:text-sm xl:leading-[26px]">
            Turn life's best moments into a daily reminder.
          </p>
        </header>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-5">
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