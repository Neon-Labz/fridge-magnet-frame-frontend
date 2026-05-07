import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full border-t border-[#E2E8F0] bg-[#F8FAFC]">
      <div className="mx-auto max-w-[1800px] px-[20px] py-[80px]">
        <div className="grid gap-12 md:grid-cols-2 xl:grid-cols-[277px_276px_276px_276px] xl:justify-between">
          <div className="w-full max-w-[277px]">
            <div className="relative h-14 w-44 overflow-hidden">
              <Image
                src="/logo.png"
                alt="Magnify Logo"
                fill
                className="object-contain"
                sizes="176px"
                priority
              />
            </div>

            <p className="mt-10 font-inter text-[20px] leading-9 text-[#64748B]">
              © 2024 Magnify. Premium photo framing for curated memories.
              Elevating everyday moments into lasting legacies.
            </p>
          </div>

          <div>
            <h4 className="font-manrope text-[20px] font-bold uppercase tracking-[1px] text-[#1E3A8A]">
              Navigation
            </h4>

            <ul className="mt-[30px] space-y-[22px] font-inter text-[20px] text-[#64748B]">
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
              <li>Shipping Policy</li>
            </ul>
          </div>

          <div>
            <h4 className="font-manrope text-[20px] font-bold uppercase tracking-[1px] text-[#1E3A8A]">
              Connect
            </h4>

            <ul className="mt-[30px] space-y-[22px] font-inter text-[20px] text-[#64748B]">
              <li>Contact Us</li>
              <li>About Our Craft</li>
              <li className="font-semibold">Sustainability</li>
            </ul>
          </div>

          <div>
            <h4 className="font-manrope text-[20px] font-bold uppercase tracking-[1px] text-[#1E3A8A]">
              Newsletter
            </h4>

            <p className="mt-[28px] font-inter text-[20px] leading-[30px] text-[#64748B]">
              Join our list for exclusive gallery updates and styling tips.
            </p>

            <div className="mt-[25px] flex h-[61px] w-full max-w-[276px] overflow-hidden rounded-[15px] border border-[#C3C6D4] bg-white">
              <input
                type="email"
                placeholder="Email address"
                className="w-full px-[18px] font-inter text-[20px] outline-none"
              />
              <button className="w-[66px] bg-[#002B73] text-[20px] text-white">
                →
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}