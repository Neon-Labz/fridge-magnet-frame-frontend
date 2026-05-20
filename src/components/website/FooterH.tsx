import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const navigationLinks = [
  { title: "Privacy Policy", href: "/privacy" },
  { title: "Terms of Service", href: "/terms" },
  { title: "Shipping Policy", href: "/shipping" },
];

const connectLinks = [
  { title: "Contact Us", href: "/contact" },
  { title: "About Our Craft", href: "/about" },
  { title: "Sustainability", href: "/sustainability" },
];

export default function Footer() {
  return (
    <footer className="w-full border-t border-[#E2E8F0] bg-[#f9f9fe]">
      <div className="mx-auto w-full max-w-[1800px] px-[100px] py-[42px]">
        <div className="grid items-start gap-[70px] xl:grid-cols-[320px_220px_220px_360px] xl:justify-between">
          
          {/* LOGO + TEXT */}
          <div>
            <div className="relative mb-[-45px] mt-[-35px] h-[150px] w-[250px]">
                  <Image
                src="/logo.png"
                alt="Magnify Logo"
                fill
                priority
                className="object-contain object-left"
                sizes="250px"
              />
            </div>

            <p className="max-w-[270px] font-inter text-[15px] leading-[30px] text-[#64748B]">
              © 2026 Magnify. Premium photo framing for curated memories.
              Elevating everyday moments into lasting legacies.
            </p>
          </div>

          {/* NAVIGATION */}
          <div className="pt-[18px]">
            <h4 className="font-manrope text-[15px] font-bold uppercase tracking-[0.12em] text-[#1E3A8A]">
              Navigation
            </h4>

            <ul className="mt-5 space-y-5 font-inter text-[16px] text-[#64748B]">
              {navigationLinks.map((link) => (
                <li key={link.title}>
                  <Link href={link.href} className="transition hover:text-[#002B73]">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CONNECT */}
          <div className="pt-[18px]">
            <h4 className="font-manrope text-[15px] font-bold uppercase tracking-[0.12em] text-[#1E3A8A]">
              Connect
            </h4>

            <ul className="mt-5 space-y-5 font-inter text-[16px] text-[#64748B]">
              {connectLinks.map((link) => (
                <li key={link.title}>
                  <Link href={link.href} className="transition hover:text-[#002B73]">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* NEWSLETTER */}
          <div className="pt-[18px]">
            <h4 className="font-manrope text-[15px] font-bold uppercase tracking-[0.12em] text-[#1E3A8A]">
              Newsletter
            </h4>

            <p className="mt-5 max-w-[330px] font-inter text-[16px] leading-[30px] text-[#64748B]">
              Join our list for exclusive gallery updates and styling tips.
            </p>

            <div className="mt-5 flex h-[52px] w-full max-w-[330px] overflow-hidden rounded-[14px] border border-[#C9CED8] bg-white">
              <input
                type="email"
                placeholder="Email address"
                className="w-full bg-transparent px-5 font-inter text-[16px] text-[#334155] outline-none placeholder:text-[#94A3B8]"
              />

              <button className="flex w-[58px] items-center justify-center bg-[#002B73] text-white transition hover:bg-[#001c52]">
                <ArrowRight size={18} />
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* BOTTOM FOOTER */}
      <div className="border-t border-[#E2E8F0] py-[18px]">
        <p className="text-center font-inter text-[14px] text-[#94A3B8]">
          © 2026 Magnify Photo Frames. Curated Memories.
        </p>
      </div>

    </footer>
  );
}