import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const quickLinks = [
  { title: "Shop All Frames", href: "/shop" },
  { title: "Frame Customizer", href: "/customizer" },
  { title: "Gallery Inspiration", href: "/gallery" },
];

const supportLinks = [
  { title: "Privacy Policy", href: "/privacy" },
  { title: "Terms of Service", href: "/terms" },
  { title: "Shipping & Returns", href: "/shipping" },
  { title: "Contact Us", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="w-full border-t border-[#E2E8F0] bg-[#F8FAFC]">
      <div className="mx-auto max-w-[1800px] px-[80px] py-[70px]">
        <div className="grid items-start gap-[70px] xl:grid-cols-[380px_220px_220px_320px]">
          
          {/* LOGO + TEXT */}
          <div className="flex flex-col items-start">
            <div className="relative mb-[12px] h-[95px] w-[260px]">
              <Image
                src="/logo.png"
                alt="Magnify Logo"
                fill
                priority
                className="object-contain object-left"
                sizes="260px"
              />
            </div>

            <p className="max-w-[330px] font-inter text-[15px] leading-[28px] text-[#64748B]">
              © 2024 Magnify. Premium photo framing for curated memories.
              Elevating everyday moments into lasting legacies.
            </p>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h4 className="font-manrope text-[15px] font-bold uppercase tracking-[0.12em] text-[#1E3A8A]">
              Quick Links
            </h4>

            <ul className="mt-5 space-y-4 font-inter text-[15px] text-[#64748B]">
              {quickLinks.map((link) => (
                <li key={link.title}>
                  <Link href={link.href} className="hover:text-[#002B73]">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* SUPPORT */}
          <div>
            <h4 className="font-manrope text-[15px] font-bold uppercase tracking-[0.12em] text-[#1E3A8A]">
              Support
            </h4>

            <ul className="mt-5 space-y-4 font-inter text-[15px] text-[#64748B]">
              {supportLinks.map((link) => (
                <li key={link.title}>
                  <Link href={link.href} className="hover:text-[#002B73]">
                    {link.title}
                  </Link>
                </li>
              ))}
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

            <div className="mt-5 flex h-[44px] w-full max-w-[270px] overflow-hidden rounded-[10px] border border-[#C3C6D4] bg-white shadow-[0_8px_18px_rgba(15,23,42,0.05)]">
              <input
                type="email"
                placeholder="Email address"
                className="w-full px-4 font-inter text-[14px] outline-none placeholder:text-[#94A3B8]"
              />

              <button className="flex w-[44px] items-center justify-center bg-[#002B73] text-white hover:bg-[#001f57]">
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* SMALL FOOTER */}
        <div className="mt-[55px] border-t border-[#C3C6D4] pt-[22px]">
          <p className="text-center font-inter text-[14px] text-[#64748B]">
            © 2026 Magnify Photo Frames. Curated Memories.
          </p>
        </div>
      </div>
    </footer>
  );
}