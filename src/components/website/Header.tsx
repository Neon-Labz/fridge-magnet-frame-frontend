'use client';

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/" && pathname === "/") return true;
    if (href === "/shop" && pathname === "/shop") return true;
    if (href === "/contact" && pathname === "/contact") return true;
    if (href === "/price" && pathname === "/price") return true;
    return false;
  };

  return (
    <header className="fixed left-0 top-0 z-50 h-[82px] w-full border-b border-[#E5E5EA]/80 bg-white/95 shadow-[0_6px_18px_rgba(15,23,42,0.05)] backdrop-blur-sm">
      <nav className=" flex h-full w-full max-w-[1800px] items-center justify-between px-4 sm:px-6 lg:px-10">
        
        {/* LOGO */}
        <Link href="/" className="shrink-0">
          <Image
            src="/logo.png"
            alt="Magnify Logo"
            width={177}
            height={55}
            priority
            className="h-auto w-[118px] object-contain sm:w-[138px] lg:w-[162px]"
          />
        </Link>

        {/* NAV LINKS */}
        <div className="flex items-center gap-3 font-inter text-[13px] font-medium sm:gap-6 sm:text-[15px] lg:gap-8 lg:text-[16px]">
          
          <Link
            href="/"
            className={
              isActive("/")
                ? "border-b-[2px] border-[#BC0000] pb-[4px] font-semibold text-[#BC0000]"
                : "text-[#64748B] transition-colors hover:text-[#002B73]"
            }
          >
            Home
          </Link>

          <Link
            href="/shop"
            className={
              isActive("/shop")
                ? "border-b-[2px] border-[#BC0000] pb-[4px] font-semibold text-[#BC0000]"
                : "text-[#64748B] transition-colors hover:text-[#002B73]"
            }
          >
            Shop
          </Link>

          <Link
            href="/contact"
            className={
              isActive("/contact")
                ? "border-b-[2px] border-[#BC0000] pb-[4px] font-semibold text-[#BC0000]"
                : "text-[#64748B] transition-colors hover:text-[#002B73]"
            }
          >
            Contact
          </Link>

          <Link
            href="/price"
            className={
              isActive("/price")
                ? "border-b-[2px] border-[#BC0000] pb-[4px] font-semibold text-[#BC0000]"
                : "text-[#64748B] transition-colors hover:text-[#002B73]"
            }
          >
            Price
          </Link>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-2 sm:gap-4 lg:gap-6">
          
          <div className="cursor-pointer text-[26px] text-black transition-all duration-200 hover:scale-110 hover:text-gray-700">
          🛒
          </div>

          <Link href="/login">
          <button className="h-[46px] rounded-[10px] bg-[#BC0000] px-6 font-inter text-[15px] font-semibold text-white shadow-[0_4px_10px_rgba(188,0,0,0.15)] transition-all hover:bg-[#a10000] sm:h-[50px] sm:px-7 sm:text-[16px] lg:text-[17px]">
           Login
          </button>
          </Link>

        </div>
      </nav>
    </header>
  );
}