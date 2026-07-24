"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, ShoppingCart } from "lucide-react";
import {
  clearWebsiteAuthSession,
  useWebsiteAuthSession,
} from "@/hooks/useWebsiteAuthSession";
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
  ];

  const isActive = (href: string) => pathname === href;
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="fixed left-0 top-0 z-50 h-[75px] w-full border-b border-[#E5E5EA]/80 bg-white/95 shadow-sm backdrop-blur-md">
      <div className="mx-auto flex h-full w-full max-w-[1700px] items-center justify-between px-4 sm:px-6 lg:px-[120px]">
        <Link href="/" onClick={closeMenu} className="shrink-0">
          <Image
            src="/new_logo.png"
            alt="Logo"
            width={140}
            height={50}
            className="h-auto w-[110px] object-contain sm:w-[130px]"
          />
        </Link>

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

        <div className="hidden items-center gap-6 md:flex">
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

        <button
          className="text-[#475569] md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
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

            <div className="mt-2 flex items-center justify-between">
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
