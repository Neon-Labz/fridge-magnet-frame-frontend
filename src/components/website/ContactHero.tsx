export default function Header() {
  return (
    <section
      className="relative flex h-[400px] items-center justify-center overflow-hidden bg-cover bg-center px-4"
      style={{
        backgroundImage:
          'linear-gradient(rgba(0, 43, 115, 0.5), rgba(0, 43, 115, 0.5)), url("/bg.jpg")',
      }}
    >
      <div className="max-w-3xl text-center text-white">
        <h1 className="text-[60px] font-bold leading-[60px] tracking-[-0.025em] text-white">
          Get in Touch
        </h1>
        <p className="mx-auto mt-2 max-w-[646px] text-[20px] leading-[28px] text-white/80">
          We&apos;re here to help you preserve your most cherished memories and answer any questions
          you may have.
        </p>
      </div>
    </section>
  );
}
