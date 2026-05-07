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
      <div className="mx-auto max-w-[1280px] px-8 py-20">
        
        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
          
          {/* LOGO + DESC */}
          <div className="flex flex-col gap-6">
            <Image
              src="/logo.png"
              alt="Magnify Logo"
              width={109}
              height={42}
            />
            <p className="text-sm leading-6 text-[#64748B] max-w-[260px]">
              Preserving your most precious moments in artisanal frames that last a lifetime.
            </p>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="text-base font-semibold text-[#1A1C1F] mb-6">
              Quick Links
            </h3>
            <div className="flex flex-col gap-3 text-sm">
              {quickLinks.map((link) => (
                <Link key={link.title} href={link.href} className="hover:text-[#002B73]">
                  {link.title}
                </Link>
              ))}
            </div>
          </div>

          {/* SUPPORT */}
          <div>
            <h3 className="text-base font-semibold text-[#1A1C1F] mb-6">
              Support
            </h3>
            <div className="flex flex-col gap-3 text-sm">
              {supportLinks.map((link) => (
                <Link key={link.title} href={link.href} className="hover:text-[#002B73]">
                  {link.title}
                </Link>
              ))}
            </div>
          </div>

          {/* NEWSLETTER */}
          <div className="flex flex-col gap-4">
            <h3 className="text-base font-semibold text-[#1A1C1F]">
              Join Our Studio
            </h3>

            <p className="text-sm text-[#64748B]">
              Get 10% off your next frame by joining our newsletter.
            </p>

            <div className="flex h-[44px] w-full overflow-hidden rounded-lg border border-[#C3C6D4] bg-white">
              <input
                type="email"
                placeholder="Email address"
                className="flex-1 px-4 text-sm outline-none"
              />
              <button className="w-[50px] flex items-center justify-center bg-[#0040A1] text-white">
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="mt-16 border-t border-[#C3C6D4] pt-6">
          <p className="text-center text-sm text-[#64748B]">
            © 2026 Magnify Photo Frames. Curated Memories.
          </p>
        </div>

      </div>
    </footer>
  );
}