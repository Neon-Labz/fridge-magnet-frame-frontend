"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, ShoppingCart } from "lucide-react";
import { clearWebsiteAuthSession, useWebsiteAuthSession } from "@/hooks/useWebsiteAuthSession";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  const { isAuthenticated } = useWebsiteAuthSession();
  const { totalQuantity } = useCart();

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

        {/* DESKTOP RIGHT */}
        <div className="hidden md:flex items-center gap-6">

          {/* CART */}
          <div className="relative">
            <Link href="/cart">
              <ShoppingCart className="h-5 w-5 text-[#475569]" />
            </Link>

            {totalQuantity > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#BC0000] text-[10px] font-bold text-white">
                {totalQuantity}
              </span>
            )}
          </div>

          {/* AUTH BUTTON */}
          {isAuthenticated ? (
            <button
              type="button"
              onClick={() => {
                clearWebsiteAuthSession();
                router.push("/");
              }}
              className="flex h-[40px] items-center rounded-[8px] bg-[#E61D11] px-6 text-sm font-semibold text-white"
            >
              Logout
            </button>
          ) : (
            <Link
              href="/login"
              className="flex h-[40px] items-center rounded-[8px] bg-[#E61D11] px-6 text-sm font-semibold text-white"
            >
              Login
            </Link>
          )}
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden text-[#475569]"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
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

            {/* CART + AUTH MOBILE */}
            <div className="flex items-center justify-between mt-2">

              <div className="relative">
                <Link href="/cart" onClick={closeMenu}>
                  <ShoppingCart className="h-5 w-5 text-[#475569]" />
                </Link>

                {totalQuantity > 0 && (
                  <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#BC0000] text-[10px] font-bold text-white">
                    {totalQuantity}
                  </span>
                )}
              </div>

              {isAuthenticated ? (
                <button
                  type="button"
                  onClick={() => {
                    clearWebsiteAuthSession();
                    router.push("/");
                  }}
                  className="rounded-[8px] bg-[#E61D11] px-4 py-2 text-sm font-semibold text-white"
                >
                  Logout
                </button>
              ) : (
                <Link
                  href="/login"
                  onClick={closeMenu}
                  className="rounded-[8px] bg-[#E61D11] px-4 py-2 text-sm font-semibold text-white"
                >
                  Login
                </Link>
              )}
            </div>

          </div>
        </div>
      )}
    </header>
  );
}