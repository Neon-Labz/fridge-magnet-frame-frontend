"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ShoppingCart } from "lucide-react";

export default function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-40 h-[75px] border-b border-[#E5E5EA] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
      
      {/* TOP BAR */}
      <div className="mx-auto flex h-full max-w-[1280px] items-center justify-between px-8">
        
        {/* LOGO */}
        <Link href="/" className="flex h-[42px] w-[109px] items-center">
          <Image
            src="/logo.png"
            alt="Magnify Logo"
            width={109}
            height={42}
            className="object-contain"
          />
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-base text-[#475569]"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* DESKTOP RIGHT */}
        <div className="hidden md:flex items-center gap-6">
          <div className="relative">
            <ShoppingCart className="h-5 w-5 text-[#475569]" />
            <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#BC0000] text-[10px] font-bold text-white">
              2
            </span>
          </div>

          <Link
            href="/logout"
            className="flex h-[40px] items-center rounded-[8px] bg-[#E61D11] px-6 text-sm font-semibold text-white"
          >
            Logout
          </Link>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="md:hidden text-[#475569]"
        >
          {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {isMobileOpen && (
        <div className="md:hidden border-t border-[#E5E5EA] bg-white px-6 py-4">
          <div className="flex flex-col gap-4">

            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileOpen(false)}
                className="text-[#475569]"
              >
                {link.name}
              </Link>
            ))}

            <div className="flex items-center gap-4 mt-2">
              <div className="relative">
                <ShoppingCart className="h-5 w-5 text-[#475569]" />
                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#BC0000] text-[10px] font-bold text-white">
                  2
                </span>
              </div>

              <Link
                href="/logout"
                className="rounded-[8px] bg-[#E61D11] px-4 py-2 text-sm font-semibold text-white"
              >
                Logout
              </Link>
            </div>

          </div>
        </div>
      )}
    </header>
  );
}