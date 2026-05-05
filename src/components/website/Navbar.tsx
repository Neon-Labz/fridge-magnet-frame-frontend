"use client";

import { useState, useEffect } from "react";
import { Phone, Mail, Clock, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Properties", href: "/properties" },
    { name: "Projects", href: "/projects" },
    { name: "About Us", href: "/about-us" },
    // { name: "Branches", href: "/branches" },
    // { name: "Blogs", href: "/blogs" },
  ];

  return (
    <>
      {/* Top Bar */}
      <div className="bg-dark text-white text-sm py-2 hidden md:block border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center relative">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <Phone className="w-3 h-3 text-accent" />
              +94 (77) 801 9399
            </span>
            <span className="flex items-center gap-2">
              <Mail className="w-3 h-3 text-accent" />
              info@tranquilleproperty.lk
            </span>
            <span className="flex items-center gap-2">
              <Clock className="w-3 h-3 text-accent" />
              Mon - Sat: 9:00 AM - 6:00 PM
            </span>
          </div>
          {/* <div className="flex items-center gap-4">
            {Socialmedias.map((media) => (
              <a
                key={media.name}
                href={media.link}
                className="hover:text-primary-400 transition"
              >
                <media.icon className="w-4 h-4" />
              </a>
            ))}
          </div> */}
        </div>
      </div>

      {/* Main Nav */}
      <nav
        className={cn(
          "fixed w-full z-50 transition-all duration-500 py-2 top-0 md:top-5",
          isScrolled
            ? "nav-scrolled !top-0"
            : "bg-transparent md:bg-transparent",
        )}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          {isScrolled ? (
            <Link href="/" className="flex items-center gap-3 group">
              {/* <div className="w-10 h-10 bg-primary-500 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform">
              <Home className="text-white w-6 h-6" />
            </div> */}

              <img
                src="/logo.png"
                alt="Tranquille Real Estate Logo"
                className="w-25 h-18 object-cover rounded-xl group-hover:rotate-12 transition-transform"
              />
            </Link>
          ) : (
            <Link href="/" className="flex items-center gap-3 group">
              {/* <div className="w-10 h-10 bg-primary-500 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform">
              <Home className="text-white w-6 h-6" />
            </div> */}

              <img
                src="/logo.png"
                alt="Tranquille Real Estate Logo"
                className="w-25 h-25 object-contain rounded-xl group-hover:rotate-12 transition-transform"
              />
            </Link>
          )}

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={cn(
                  "nav-link font-medium",
                  isScrolled
                    ? "text-gray-700 hover:text-primary-500"
                    : "text-white hover:text-primary-400",
                )}
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* <div className="hidden lg:flex items-center gap-4">
            <a
              href="#"
              className={cn(
                "flex items-center gap-1 font-medium hover:text-primary-400 transition",
                isScrolled ? "text-gray-700" : "text-white",
              )}
            >
              <Heart className="w-4 h-4" /> Saved
            </a>
            <Link
              href="/properties"
              className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-2.5 rounded-full font-semibold transition-all shadow-lg shadow-accent/30 hover:shadow-accent/50"
            >
              List Property
            </Link>
          </div> */}

          {/* Mobile Toggle */}
          <button
            className={cn(
              "lg:hidden text-2xl",
              isScrolled ? "text-dark" : "text-white",
            )}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-white shadow-2xl p-6 mt-2 animate-in slide-in-from-top duration-300">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-gray-800 hover:text-primary-400 font-medium py-2 border-b border-gray-100"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              {/* <Link
                href="/properties"
                className="bg-primary-500 hover:bg-primary-600 text-white text-center px-6 py-3 rounded-full font-semibold mt-2"
              >
                List Property
              </Link> */}
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
