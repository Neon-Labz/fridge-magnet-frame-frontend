import Link from "next/link";
import Image from "next/image";
import { MapPin } from "lucide-react";

const navigationLinks = [
  { title: "Privacy Policy", href: "/privacy-policy" },
  { title: "Terms of Service", href: "/terms-of-service" },
  { title: "Shipping Policy", href: "/shipping-policy" },
];

const connectLinks = [
  { title: "Contact Us", href: "/contact" },
  { title: "About Our Craft", href: "/gallery" },
  { title: "Sustainability", href: "/sustainability" },
];

export default function Footer() {
  return (
    <footer className="w-full border-t border-[#E2E8F0] bg-[#F9F9FE]">

      <div className="mx-auto w-full max-w-[1700px] px-4 py-6 sm:px-6 lg:px-[120px]">

        <div className="grid grid-cols-2 gap-15 sm:grid-cols-4 xl:grid-cols-4">

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
              Our Location
            </h4>

            <div className="mt-4 flex items-start gap-2 max-w-[260px]">
              <MapPin
                size={18}
                className="mt-0.5 shrink-0 text-[#64748B]"
                aria-hidden="true"
              />
              <p className="font-inter text-[15px] leading-6 text-[#64748B]">
                125A, KKS Road, Kokuvil, Jaffna, Sri Lanka
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-[#D7DBE4]">
        <div className="mx-auto flex w-full max-w-[1700px] flex-col items-center gap-1 px-4 py-3 sm:px-6 lg:px-[120px]">
          <p className="text-center font-inter text-[13px] text-[#64748B]">
            © 2026 Magnify Photo Frames. Curated Memories.
          </p>
          <p className="text-center font-inter text-[12px] text-[#94A3B8]">
            Developed by NeonLabz (Pvt) Ltd.
          </p>
        </div>
      </div>
    </footer>
  );
}
