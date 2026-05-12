import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full border-t border-[#E2E8F0] bg-[#F8FAFC]">
      <div className="mx-auto max-w-[1800px] px-4 py-12 sm:px-6 sm:py-14 lg:px-10 lg:py-16">
        
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-[1.2fr_0.75fr_0.75fr_0.9fr] xl:gap-10">

          {/* LEFT */}
          <div className="flex w-full max-w-[360px] flex-col items-start">

            {/* LOGO */}
            <div className="relative mb-[20px] h-[75px] w-[190px]">
              <Image
                src="/logo.png"
                alt="Magnify Logo"
                fill
                priority
                className="object-contain object-left"
              />
            </div>

            {/* TEXT */}
            <p className="max-w-[320px] font-inter text-[16px] leading-[1.8] text-[#64748B]">
              © 2024 Magnify. Premium photo framing for curated memories.
              Elevating everyday moments into lasting legacies.
            </p>
          </div>

          {/* NAVIGATION */}
          <div>
            <h4 className="font-manrope text-[15px] font-bold uppercase tracking-[0.12em] text-[#1E3A8A]">
              Navigation
            </h4>

            <ul className="mt-5 space-y-4 font-inter text-[15px] text-[#64748B]">
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
              <li>Shipping Policy</li>
            </ul>
          </div>

          {/* CONNECT */}
          <div>
            <h4 className="font-manrope text-[15px] font-bold uppercase tracking-[0.12em] text-[#1E3A8A]">
              Connect
            </h4>

            <ul className="mt-5 space-y-4 font-inter text-[15px] text-[#64748B]">
              <li>Contact Us</li>
              <li>About Our Craft</li>
              <li className="font-semibold">Sustainability</li>
            </ul>
          </div>

          {/* NEWSLETTER */}
          <div>
            <h4 className="font-manrope text-[15px] font-bold uppercase tracking-[0.12em] text-[#1E3A8A]">
              Newsletter
            </h4>

            <p className="mt-5 font-inter text-[15px] leading-7 text-[#64748B]">
              Join our list for exclusive gallery updates and styling tips.
            </p>

            <div className="mt-5 flex h-[42px] w-full max-w-[260px] overflow-hidden rounded-[10px] border border-[#C3C6D4] bg-white shadow-[0_8px_18px_rgba(15,23,42,0.05)]">
              
              <input
                type="email"
                placeholder="Email address"
                className="w-full px-4 font-inter text-[14px] outline-none placeholder:text-[#94A3B8]"
              />

              <button className="w-[42px] bg-[#002B73] text-[15px] text-white transition-colors hover:bg-[#001f57]">
                →
              </button>

            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}