"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";

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
    <header className="fixed top-0 left-0 z-50 w-full h-[75px] bg-white/95 backdrop-blur-md border-b border-[#E5E5EA]/80 shadow-sm">
      <div className="flex h-full items-center justify-between max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-10">

        {/* LOGO */}
        <Link href="/" onClick={closeMenu}>
          <Image
            src="/logo.png"
            alt="Logo"
            width={140}
            height={50}
            className="h-auto w-[110px] sm:w-[130px] object-contain"
          />
        </Link>

        {/* DESKTOP MENU */}
        <nav className="hidden md:flex items-center gap-8 text-[15px] font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={
                isActive(link.href)
                  ? "text-[#BC0000] font-semibold border-b-2 border-[#BC0000] pb-1"
                  : "text-[#475569] hover:text-[#002B73]"
              }
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4">

          {/* CART */}
          <button
            onClick={() => router.push("/cart")}
            className="relative text-[#475569] hover:text-[#BC0000]"
            aria-label="Cart"
          >
            🛒
            {totalQuantity > 0 && (
              <span className="absolute -top-2 -right-2 h-4 w-4 rounded-full bg-[#BC0000] text-white text-[10px] flex items-center justify-center">
                {totalQuantity}
              </span>
            )}
          </button>

          {/* LOGIN / LOGOUT */}
          {isAuthenticated ? (
            <button
              onClick={() => {
                clearWebsiteAuthSession();
                router.push("/");
              }}
              className="h-[40px] rounded-[8px] bg-[#BC0000] px-5 text-white font-semibold hover:bg-[#a10000]"
            >
              Logout
            </button>
          ) : (
            <Link href="/login">
              <button className="h-[40px] rounded-[8px] bg-[#BC0000] px-5 text-white font-semibold hover:bg-[#a10000]">
                Login
              </button>
            </Link>
          )}

          {/* MOBILE MENU ICON */}
          <button
            className="md:hidden text-[#475569]"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="md:hidden border-t border-[#E5E5EA] bg-white px-6 py-4">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={closeMenu}
                className={
                  isActive(link.href)
                    ? "text-[#BC0000] font-semibold"
                    : "text-[#475569]"
                }
              >
                {link.name}
              </Link>
            ))}

            <Link href="/login" onClick={closeMenu}>
              <button className="w-full h-[42px] rounded-[8px] bg-[#BC0000] text-white font-semibold">
                Login
              </button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}