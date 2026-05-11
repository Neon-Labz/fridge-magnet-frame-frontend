
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
    return false;
  };

  return (
    <header className="fixed left-0 top-0 z-50 h-[92px] w-full border-b border-[#E5E5EA] bg-white shadow-sm">
      <nav className="flex h-full w-full items-center justify-between px-[55px]">
        {/* LOGO */}
        <Link href="/" className="ml-4">
          <Image
            src="/logo.png"
            alt="Magnify Logo"
            width={177}
            height={55}
            priority
            className="object-contain"
          />
        </Link>

        {/* NAV LINKS */}
        <div className="flex items-center gap-[36px] font-inter text-[18px]">
          <Link
            href="/"
            className={isActive("/") ? "border-b-[2px] border-[#FF3B30] pb-[4px] font-semibold text-[#FF3B30]" : "text-[#475569]"}
          >
            Home
          </Link>

          <Link
            href="/shop"
            className={isActive("/shop") ? "border-b-[2px] border-[#FF3B30] pb-[4px] font-semibold text-[#FF3B30]" : "text-[#475569]"}
          >
            Shop
          </Link>

          <Link
            href="/contact"
            className={isActive("/contact") ? "border-b-[2px] border-[#FF3B30] pb-[4px] font-semibold text-[#FF3B30]" : "text-[#475569]"}
          >
            Contact
          </Link>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-[40px]">
          <button className="relative cursor-pointer text-[24px] text-[#475569] hover:text-[#002B73] transition-colors">
            🛒
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#BC0000] text-white text-[12px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>

          <Link href="/login">
            <button className="h-[45px] w-[116px] rounded-[9px] bg-[#BC0000] font-inter text-[18px] font-semibold text-white hover:bg-[#a00000] transition-colors">
              Login
            </button>
          </Link>
        </div>
      </nav>
    </header>
  );
}
