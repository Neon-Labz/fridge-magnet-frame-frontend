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
      <div className="mx-auto max-w-[1800px] px-4 py-12 sm:px-6 sm:py-14 lg:px-10 lg:py-16">
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-[1.2fr_0.75fr_0.75fr_0.9fr] xl:gap-10">
          
          {/* LEFT */}
          <div className="flex w-full max-w-[360px] flex-col items-start">
            <div className="relative mb-[20px] h-[75px] w-[190px]">
              <Image
                src="/logo.png"
                alt="Magnify Logo"
                fill
                priority
                className="object-contain object-left"
                sizes="190px"
              />
            </div>

            <p className="max-w-[320px] font-inter text-[16px] leading-[1.8] text-[#64748B]">
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
              <li>Contact Us</li>
              <li>About Our Craft</li>
              <li>Sustainability</li>

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

            <div className="mt-5 flex h-[42px] w-full max-w-[260px] overflow-hidden rounded-[10px] border border-[#C3C6D4] bg-white shadow-[0_8px_18px_rgba(15,23,42,0.05)]">
              <input
                type="email"
                placeholder="Email address"
                className="w-full px-4 font-inter text-[14px] outline-none placeholder:text-[#94A3B8]"
              />

              <button className="flex items-center justify-center w-[42px] bg-[#002B73] text-white hover:bg-[#001f57]">
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

        </div>

        {/* BOTTOM */}
        <div className="mt-16 border-t border-[#C3C6D4] pt-6">
          <p className="text-center text-[14px] text-[#64748B]">
            © 2026 Magnify Photo Frames. Curated Memories.
          </p>
        </div>

      </div>
    </footer>
  );
}