
'use client';

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCartStore } from "@/store/cartStore";

export default function Header() {
  const pathname = usePathname();
  const { items } = useCartStore();
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

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
        <div className="flex items-center gap-4 sm:gap-6 lg:gap-8">
          <button className="relative cursor-pointer text-[24px] text-[#475569] hover:text-[#002B73] transition-colors">
            🛒
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#BC0000] text-white text-[12px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>

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