export default function OrderHeader() {
  return (
    <div className="flex-shrink-0 mb-4">
      <h1
        className="font-bold text-[30px] sm:text-[30px] lg:text-[30px] leading-tight"
        style={{
          fontFamily: "var(--font-manrope, Manrope, sans-serif)",
          color: "#002B73",
          letterSpacing: "-0.75px",
        }}
      >
        Order Management
      </h1>
    </div>
  );
}
