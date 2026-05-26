"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, ShoppingCart } from "lucide-react";

import { useCart } from "@/context/CartContext";
import {
  clearWebsiteAuthSession,
  useWebsiteAuthSession,
} from "@/hooks/useWebsiteAuthSession";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  const { totalQuantity } = useCart();
  const { isAuthenticated } = useWebsiteAuthSession();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "Contact", href: "/contact" },
    { name: "Price", href: "/price" },
  ];

  const isActive = (href: string) => pathname === href;
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="fixed left-0 top-0 z-50 h-[85px] w-full border-b border-[#E5E5EA]/80 bg-white/95 shadow-sm backdrop-blur-md">
<div className="mx-auto flex h-full max-w-[1350px] items-center justify-between px-6 sm:px-8 lg:px-7">
          <div className="flex items-center gap-3">
          <button
            className="text-[#475569] md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <Link href="/" onClick={closeMenu}>
            <Image
              src="/logo.png"
              alt="Logo"
              width={140}
              height={50}
              className="h-auto w-[110px] object-contain sm:w-[130px]"
            />
          </Link>
        </div>

        <nav className="hidden items-center gap-8 text-[15px] font-medium md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={
                isActive(link.href)
                  ? "border-b-2 border-[#BC0000] pb-1 font-semibold text-[#BC0000]"
                  : "text-[#475569] hover:text-[#002B73]"
              }
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-6">
          <button
            onClick={() => router.push("/cart")}
            className="relative flex h-[46px] w-[46px] items-center justify-center text-[#475569] hover:text-[#BC0000]"
            aria-label="Cart"
          >
            <ShoppingCart size={22} strokeWidth={2.2} />

            {totalQuantity > 0 && (
              <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#BC0000] text-[10px] font-semibold text-white">
                {totalQuantity}
              </span>
            )}
          </button>

          {isAuthenticated ? (
            <button
              onClick={() => {
                clearWebsiteAuthSession();
                router.push("/");
              }}
              className="flex h-[46px] items-center justify-center rounded-[8px] bg-[#BC0000] px-6 text-sm font-semibold text-white hover:bg-[#a10000]"
            >
              Logout
            </button>
          ) : (
            <Link href="/login">
              <button className="flex h-[46px] items-center justify-center rounded-[8px] bg-[#BC0000] px-6 text-sm font-semibold text-white hover:bg-[#a10000]">
                Login
              </button>
            </Link>
          )}
        </div>
      </div>

      {isOpen && (
        <div className="border-t border-[#E5E5EA] bg-white px-6 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={closeMenu}
                className={
                  isActive(link.href)
                    ? "font-semibold text-[#BC0000]"
                    : "text-[#475569]"
                }
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}