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
    <footer className="w-full border-t border-[#C3C6D4] bg-[#F9F9FE]">
      <div className="mx-auto w-full max-w-[1600px] px-6 py-16 lg:px-8 lg:py-20">
        {/* GRID */}
        <div className="grid grid-cols-1 gap-y-10 md:grid-cols-2 lg:grid-cols-[minmax(260px,1.3fr)_minmax(170px,0.9fr)_minmax(170px,0.9fr)_minmax(280px,1.1fr)] lg:gap-x-16 lg:items-start lg:justify-items-start lg:gap-y-0">
          
          {/* LOGO + DESC */}
          <div className="flex min-w-0 w-[252px] flex-col items-start gap-[14.88px] self-start pb-[74.5px]">
            <Image
              src="/logo.png"
              alt="Magnify Logo"
              width={109}
              height={42}
              className="block h-[42px] w-[109px]"
            />
            <div className="flex h-[69.62px] w-[252px] flex-col items-start pb-[0.625px]">
              <p className="flex h-[69px] w-[252px] items-center text-[14px] leading-[23px] font-normal text-[#64748B] [font-family:'Inter']">
                Preserving your most precious moments in artisanal frames that last a lifetime.
              </p>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div className="min-w-0 self-start justify-self-start pb-[32px]">
            <h3 className="text-[16px] font-semibold leading-6 text-[#1A1C1F] [font-family:'Inter']">
              Quick Links
            </h3>
            <div className="mt-6 flex flex-col gap-3 text-[14px] leading-5 font-normal text-[#64748B] [font-family:'Inter']">
              {quickLinks.map((link) => (
                <Link key={link.title} href={link.href} className="hover:text-[#002B73]">
                  {link.title}
                </Link>
              ))}
            </div>
          </div>

          {/* SUPPORT */}
          <div className="min-w-0 self-start justify-self-start pb-[32px]">
            <h3 className="text-[16px] font-semibold leading-6 text-[#1A1C1F] [font-family:'Inter']">
              Support
            </h3>
            <div className="mt-6 flex flex-col gap-3 text-[14px] leading-5 font-normal text-[#64748B] [font-family:'Inter']">
              {supportLinks.map((link) => (
                <Link key={link.title} href={link.href} className="hover:text-[#002B73]">
                  {link.title}
                </Link>
              ))}
            </div>
          </div>

          {/* NEWSLETTER */}
          <div className="min-w-0 self-start justify-self-start flex flex-col items-start gap-4 pb-[22px]">
            <h3 className="text-[16px] font-semibold leading-6 text-[#1A1C1F] [font-family:'Inter']">
              Join Our Studio
            </h3>

            <p className="max-w-[252px] text-[14px] leading-5 font-normal text-[#64748B] [font-family:'Inter']">
              Get 10% off your next frame by joining our newsletter.
            </p>

            <div className="relative h-[38px] w-full max-w-[252px] overflow-hidden rounded-[8px] border border-[#C3C6D4] bg-white">
              <input
                type="email"
                placeholder="Email address"
                className="h-full w-full border-0 px-4 text-[14px] leading-[17px] font-normal text-[#6B7280] outline-none [font-family:'Inter']"
              />
              <button className="absolute right-0 top-0 flex h-full w-[43px] items-center justify-center bg-[#0040A1] text-white">
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="mt-16 border-t border-[#C3C6D4] pt-6">
          <p className="text-center text-[14px] leading-5 font-normal text-[#64748B] [font-family:'Inter']">
            © 2026 Magnify Photo Frames. Curated Memories.
          </p>
        </div>

      </div>
    </footer>
  );
}