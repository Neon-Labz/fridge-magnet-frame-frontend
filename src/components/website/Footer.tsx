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
    <footer className="w-full border-t border-[#E2E8F0] bg-[#F9F9FE]">
      <div className="mx-auto w-full max-w-[980px] px-0 py-6">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="relative mb-[-50px] mt-[-55px] ml-[-12px] h-[150px] w-[250px]">
              <Image
                src="/new_logo.png"
                alt="Magnify Logo"
                fill
                priority
                className="object-contain object-left"
                sizes="250px"
              />
            </div>

            <p className="max-w-[260px] font-inter text-[15px] leading-6 text-[#64748B]">
              © 2026 Magnify. Premium photo framing for curated memories.
              Elevating everyday moments into lasting legacies.
            </p>
          </div>

          <div>
            <h4 className="font-manrope text-[15px] font-bold uppercase tracking-[0.12em] text-[#1E3A8A]">
              Navigation
            </h4>

            <ul className="mt-4 space-y-3">
              {navigationLinks.map((link) => (
                <li key={link.title}>
                  <Link
                    href={link.href}
                    className="font-inter text-[15px] text-[#64748B] hover:text-[#002B73]"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-manrope text-[15px] font-bold uppercase tracking-[0.12em] text-[#1E3A8A]">
              Connect
            </h4>

            <ul className="mt-4 space-y-3">
              {connectLinks.map((link) => (
                <li key={link.title}>
                  <Link
                    href={link.href}
                    className="font-inter text-[15px] text-[#64748B] hover:text-[#002B73]"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-manrope text-[15px] font-bold uppercase tracking-[0.12em] text-[#1E3A8A]">
              Newsletter
            </h4>

            <p className="mt-4 max-w-[300px] font-inter text-[15px] leading-6 text-[#64748B]">
              Join our list for exclusive gallery updates and styling tips.
            </p>

            <div className="mt-4 flex h-[42px] w-full max-w-[300px] overflow-hidden rounded-xl border border-[#CBD5E1] bg-white">
              <input
                type="email"
                placeholder="Email address"
                className="w-full bg-transparent px-4 text-[15px] outline-none placeholder:text-[#94A3B8]"
              />

              <button className="flex w-[56px] items-center justify-center bg-[#002B73] text-white hover:bg-[#001F5C]">
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-[#D7DBE4]">
        <div className="mx-auto w-full max-w-[980px] px-0 py-3">
          <p className="text-center font-inter text-[13px] text-[#64748B]">
            © 2026 Magnify Photo Frames. Curated Memories.
          </p>
        </div>
      </div>
    </footer>
  );
}