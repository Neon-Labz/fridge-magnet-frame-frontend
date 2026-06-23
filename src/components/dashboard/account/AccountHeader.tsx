export default function AccountHeader() {
  return (
    <section className="mb-7">
      <h1
        className="text-[32px] font-bold leading-none sm:text-[40px]"
        style={{
          fontFamily: 'var(--font-manrope, Manrope, sans-serif)',
          color: '#002B73',
          letterSpacing: '-0.8px',
        }}
      >
        Account Settings
      </h1>
    </section>
  );
}
