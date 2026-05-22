"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import {
  clearWebsiteAuthSession,
  useWebsiteAuthSession,
} from "@/hooks/useWebsiteAuthSession";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();

  const { totalQuantity } = useCart();
  const { isAuthenticated } = useWebsiteAuthSession();

  const isActive = (href: string) => {
    if (href === "/" && pathname === "/") return true;
    if (href === "/shop" && pathname === "/shop") return true;
    if (href === "/contact" && pathname === "/contact") return true;
    if (href === "/price" && pathname === "/price") return true;
    return false;
  };

  return (
    <header className="fixed left-0 top-0 z-50 h-[82px] w-full border-b border-[#E5E5EA]/80 bg-white/95 shadow-[0_6px_18px_rgba(15,23,42,0.05)] backdrop-blur-sm">
      <nav className="flex h-full w-full max-w-[1800px] items-center justify-between px-4 sm:px-6 lg:px-10">
        
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
          
          <button className="relative cursor-pointer text-[24px] text-[#475569] transition-colors hover:text-[#002B73]">
            🛒
            {totalQuantity > 0 && (
              <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#BC0000] text-[12px] font-bold text-white">
                {totalQuantity}
              </span>
            )}
          </button>

          {isAuthenticated ? (
            <button
              type="button"
              onClick={() => {
                clearWebsiteAuthSession();
                router.push("/");
              }}
              className="h-[46px] rounded-[10px] bg-[#BC0000] px-6 font-inter text-[15px] font-semibold text-white shadow-[0_4px_10px_rgba(188,0,0,0.15)] transition-all hover:bg-[#a10000] sm:h-[50px] sm:px-7 sm:text-[16px] lg:text-[17px]"
            >
              Logout
            </button>
          ) : (
            <Link href="/login">
              <button className="h-[46px] rounded-[10px] bg-[#BC0000] px-6 font-inter text-[15px] font-semibold text-white shadow-[0_4px_10px_rgba(188,0,0,0.15)] transition-all hover:bg-[#a10000] sm:h-[50px] sm:px-7 sm:text-[16px] lg:text-[17px]">
                Login
              </button>
            </Link>
          )}
        </div>
      </nav>

      <style jsx>{`
        @media (max-width: 640px) {
          header {
            height: auto;
          }

          nav {
            height: auto;
            display: grid;
            grid-template-columns: 1fr auto;
            grid-template-areas:
              "logo actions"
              "links links";
            align-items: center;
            gap: 4px 8px;
            padding-top: 6px;
            padding-bottom: 6px;
          }

          nav > :nth-child(1) {
            grid-area: logo;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            width: auto;
          }

          nav > :nth-child(2) {
            grid-area: links;
            display: flex;
            justify-content: center;
            width: 100%;
            gap: 8px;
            overflow-x: auto;
            padding-bottom: 0;
          }

          nav > :nth-child(3) {
            grid-area: actions;
            display: flex;
            justify-content: flex-end;
            align-items: center;
            width: auto;
            gap: 8px;
          }

          nav > :nth-child(3) > * {
            flex-shrink: 0;
          }

          nav > :nth-child(3) button {
            height: 32px;
            padding-left: 10px;
            padding-right: 10px;
            font-size: 12px;
          }

          nav > :nth-child(3) .relative {
            font-size: 17px;
          }

          nav > :nth-child(1) img {
            width: 96px !important;
          }
        }
      `}</style>
    </header>
  );
}