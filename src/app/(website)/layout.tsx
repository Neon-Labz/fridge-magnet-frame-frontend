import React from 'react';
import Link from 'next/link';

export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-800 font-sans">
      {/* Header */}
      <header className="border-b border-slate-200 sticky top-0 bg-white z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="flex items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo-removebg-preview.png"
              alt="Magnify Logo"
              width={140}
              height={56}
              className="object-contain"
            />
          </Link>

          {/* Nav */}
          <nav className="hidden md:flex items-center gap-10">
            <Link href="/" className="text-[15px] font-medium text-slate-600 hover:text-[#1A2B5E]">Home</Link>
            <Link href="/shop/magnate-picture-with-black-frame" className="text-[15px] font-medium text-[#1A2B5E] relative py-2">
              Shop
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#E62A24]"></div>
            </Link>
            <Link href="/contact" className="text-[15px] font-medium text-slate-600 hover:text-[#1A2B5E]">Contact</Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-6">
            <button className="text-slate-600 hover:text-[#1A2B5E]">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
              </svg>
            </button>
            <button className="bg-[#E62A24] text-white px-6 py-2 rounded-[4px] font-medium hover:bg-red-700 transition-colors">
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-grow">
        {children}
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-200 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            
            {/* Brand Column */}
            <div className="col-span-1">
              <Link href="/" className="flex items-center mb-6">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logo-removebg-preview.png"
                  alt="Magnify Logo"
                  width={130}
                  height={52}
                  className="object-contain"
                />
              </Link>
              <p className="text-sm text-slate-500 leading-relaxed">
                Dedicated to preserving your most precious moments through exquisite framing craftsmanship and museum-grade materials.
              </p>
            </div>

            {/* Quick Links */}
            <div className="col-span-1 md:ml-12">
              <h3 className="text-[13px] font-bold text-[#1A2B5E] tracking-wider uppercase mb-6">Quick Links</h3>
              <ul className="space-y-4">
                <li><Link href="/" className="text-sm text-slate-500 hover:text-[#1A2B5E]">Home</Link></li>
                <li><Link href="/shop" className="text-sm text-slate-500 hover:text-[#1A2B5E]">Shop</Link></li>
                <li><Link href="/contact" className="text-sm text-slate-500 hover:text-[#1A2B5E]">Contact</Link></li>
              </ul>
            </div>

            {/* Company */}
            <div className="col-span-1">
              <h3 className="text-[13px] font-bold text-[#1A2B5E] tracking-wider uppercase mb-6">Company</h3>
              <ul className="space-y-4">
                <li><Link href="/privacy" className="text-sm text-slate-500 hover:text-[#1A2B5E]">Privacy Policy</Link></li>
                <li><Link href="/terms" className="text-sm text-slate-500 hover:text-[#1A2B5E]">Terms of Service</Link></li>
                <li><Link href="/shipping" className="text-sm text-slate-500 hover:text-[#1A2B5E]">Shipping & Returns</Link></li>
                <li><Link href="/contact-us" className="text-sm text-slate-500 hover:text-[#1A2B5E]">Contact Us</Link></li>
              </ul>
            </div>

            {/* Newsletter */}
            <div className="col-span-1">
              <h3 className="text-[13px] font-bold text-[#1A2B5E] tracking-wider uppercase mb-6">Newsletter</h3>
              <p className="text-sm text-slate-500 leading-relaxed mb-4">
                Subscribe for framing tips and exclusive offers.
              </p>
              <div className="flex w-full">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-l-[4px] focus:ring-1 focus:ring-[#1A2B5E] focus:outline-none block w-full p-2.5"
                />
                <button className="bg-[#1A2B5E] hover:bg-blue-900 px-4 rounded-r-[4px] flex items-center justify-center transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white">
                    <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Copyright */}
          <div className="text-center pt-8 border-t border-slate-200">
            <p className="text-sm text-slate-500">© 2024 Magnify Photo Frames. Curated Memories.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
