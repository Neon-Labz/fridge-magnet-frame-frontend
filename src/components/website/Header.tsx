import Image from "next/image";
import Link from "next/link";

export default function Header() {
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
            className="border-b-[2px] border-[#FF3B30] pb-[4px] font-semibold text-[#FF3B30]"
          >
            Home
          </Link>

          <Link href="/shop" className="text-[#475569]">
            Shop
          </Link>

          <Link href="/contact" className="text-[#475569]">
            Contact
          </Link>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-[40px]">
          <div className="relative cursor-pointer text-[20px] text-[#475569]">
            🛒
            
          </div>

          <button className="h-[45px] w-[116px] rounded-[9px] bg-[#BC0000] font-inter text-[18px] font-semibold text-white">
            Login
          </button>
        </div>
      </nav>
    </header>
  );
}