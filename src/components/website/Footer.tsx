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
    <footer className="bg-[#f8f9fa] text-[#64748B]">
      <div className="mx-auto w-full px-6 lg:px-8" style={{ maxWidth: '1600px' }}>
        <div style={{ paddingTop: '60px', paddingBottom: '40px' }}>
          <div className="flex justify-between gap-16 flex-wrap lg:flex-nowrap">
            <div className="flex flex-col gap-4 w-full lg:w-auto min-w-[200px]">
              <div className="h-[42px] w-[109px] -translate-y-1">
                <Image
                  src="/logo.png"
                  alt="Magnify Logo"
                  width={109}
                  height={42}
                  className="object-contain"
                />
              </div>
              <p className="text-sm leading-[23px] max-w-[280px]">
                Preserving your most precious moments in artisanal frames that last a lifetime.
              </p>
            </div>

            <div className="flex flex-col gap-6 w-full lg:w-auto min-w-[180px]">
              <h3 className="text-base font-semibold text-[#1A1C1F]">Quick Links</h3>
              <div className="flex flex-col gap-3 text-sm">
                {quickLinks.map((link) => (
                  <Link key={link.title} href={link.href} className="text-[#64748B] hover:text-[#003399]">
                    {link.title}
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-6 w-full lg:w-auto min-w-[180px]">
              <h3 className="text-base font-semibold text-[#1A1C1F]">Support</h3>
              <div className="flex flex-col gap-3 text-sm">
                {supportLinks.map((link) => (
                  <Link key={link.title} href={link.href} className="text-[#64748B] hover:text-[#003399]">
                    {link.title}
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4 w-full lg:w-auto min-w-[280px]">
              <h3 className="text-base font-semibold text-[#1A1C1F]">Join Our Studio</h3>
              <p className="text-sm leading-5">
                Get 10% off your next frame by joining our newsletter.
              </p>
              <div className="relative h-[38px] w-full">
                <input
                  type="email"
                  placeholder="Email address"
                  className="h-full w-full rounded-l-lg border border-[#C3C6D4] bg-white px-4 text-sm text-[#64748B] outline-none"
                />
                <button className="absolute right-0 top-0 flex h-full w-[43px] items-center justify-center rounded-r-lg bg-[#0040A1] text-white">
                  <ArrowRight className="h-3 w-3" />
                </button>
              </div>
            </div>
          </div>

          <div className="mt-12 border-t border-[#C3C6D4] pt-8">
            <p className="text-center text-sm text-[#64748B]">
              © 2026 Magnify Photo Frames. Curated Memories.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
