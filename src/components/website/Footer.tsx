import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full border-t border-[#E2E8F0] bg-[#F8FAFC]">
      <div className="mx-auto max-w-[1800px] px-[40px] py-[80px]">
        <div className="grid items-start gap-12 md:grid-cols-2 xl:grid-cols-[360px_276px_276px_320px] xl:justify-between">
          <div className="w-full max-w-[360px]">
            <div className="relative mt-[-50px] h-[180px] w-[300px]">
              <Image
                src="/logo.png"
                alt="Magnify Logo"
                fill
                priority
                className="object-contain object-left"
                sizes="340px"
              />
            </div>

            <p className="mt-[-35px] font-inter text-[20px] leading-[42px] text-[#64748B]">
              © 2024 Magnify. Premium
              <br />
              photo framing for curated
              <br />
              memories. Elevating everyday
              <br />
              moments into lasting
              <br />
              legacies.
            </p>
          </div>

          <div className="pt-[32px]">
            <h4 className="font-manrope text-[20px] font-bold uppercase tracking-[1px] text-[#1E3A8A]">
              Navigation
            </h4>

            <ul className="mt-[30px] space-y-[22px] font-inter text-[20px] text-[#64748B]">
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
              <li>Shipping Policy</li>
            </ul>
          </div>

          <div className="pt-[32px]">
            <h4 className="font-manrope text-[20px] font-bold uppercase tracking-[1px] text-[#1E3A8A]">
              Connect
            </h4>

            <ul className="mt-[30px] space-y-[22px] font-inter text-[20px] text-[#64748B]">
              <li>Contact Us</li>
              <li>About Our Craft</li>
              <li>Sustainability</li>
            </ul>
          </div>

          <div className="pt-[32px]">
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