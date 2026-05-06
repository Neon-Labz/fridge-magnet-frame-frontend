export default function OrderHeader() {
  return (
    <div className="flex-shrink-0 flex flex-col gap-1 mb-5">
      <h1
        className="font-bold text-[26px] sm:text-[36px] lg:text-[40px] leading-tight"
        style={{
          fontFamily: 'var(--font-manrope, Manrope, sans-serif)',
          color: '#002B73', letterSpacing: '-0.75px',
        }}
      >
        Order Management
      </h1>
      <p className="text-base" style={{ color: '#434652' }}>
        Review and manage customer photo frame orders.
      </p>
    </div>
  );
}
