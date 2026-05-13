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
      <nav className="mx-auto flex h-full w-full max-w-[1800px] items-center justify-between px-4 sm:px-6 lg:px-10">
        
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
          
          <div className="relative cursor-pointer rounded-full p-1.5 text-[16px] text-[#64748B] transition-colors hover:bg-[#F8FAFC] hover:text-[#002B73] sm:p-2 sm:text-[18px]">
            🛒
          </div>

          <Link href="/login">
            <button className="h-[38px] rounded-[8px] bg-[#BC0000] px-4 font-inter text-[13px] font-semibold text-white shadow-[0_10px_20px_rgba(188,0,0,0.2)] transition-colors hover:bg-[#a10000] sm:h-[42px] sm:px-5 sm:text-[15px] lg:text-[16px]">
              Login
            </button>
          </Link>

        </div>
      </nav>
    </header>
  );
}