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
          <Link href="/" className="flex items-center gap-1">
            <div className="flex items-center justify-center w-8 h-8 rounded bg-[#1A2B5E] text-white font-bold text-xl relative">
              m
              <div className="absolute top-1 right-1 w-2 h-2 bg-[#E62A24] rounded-full"></div>
            </div>
            <span className="text-2xl font-semibold text-[#1A2B5E] tracking-tight">agnify</span>
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
              <Link href="/" className="flex items-center gap-1 mb-6">
                <div className="flex items-center justify-center w-8 h-8 rounded bg-[#1A2B5E] text-white font-bold text-xl relative">
                  m
                  <div className="absolute top-1 right-1 w-2 h-2 bg-[#E62A24] rounded-full"></div>
                </div>
                <span className="text-2xl font-semibold text-[#1A2B5E] tracking-tight">agnify</span>
              </Link>
              <p className="text-sm text-slate-500 leading-relaxed mb-6">
                Dedicated to preserving your most precious moments through exquisite framing craftsmanship and museum-grade materials.
              </p>
              <div className="flex gap-4">
                <button className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.125 4.5a.37.37 0 00-.375.375v1.875A2.625 2.625 0 0013.125 11.625v.75a.375.375 0 00.375.375h1.125a1.125 1.125 0 011.125 1.125v1.5a1.125 1.125 0 01-1.125 1.125h-1.5A3.375 3.375 0 009.75 19.875v.375a.375.375 0 01-.375.375H8.625a.375.375 0 01-.375-.375v-1.5A3.375 3.375 0 004.875 15.375v-1.5A3.375 3.375 0 001.5 10.5v-.375a.375.375 0 01.375-.375h1.5A1.125 1.125 0 014.5 10.875v1.5a1.125 1.125 0 01-1.125 1.125h-.75A1.875 1.875 0 003.75 12.375v-1.875a1.875 1.875 0 00-1.875-1.875H1.5a.375.375 0 01-.375-.375v-.375a.375.375 0 01.375-.375h1.5A3.375 3.375 0 006.375 4.5v-.375a.375.375 0 01.375-.375h.75a.375.375 0 01.375.375v1.875A2.625 2.625 0 0010.5 8.625v-.75a.375.375 0 00-.375-.375h-1.125a1.125 1.125 0 01-1.125-1.125v-1.5a1.125 1.125 0 011.125-1.125h1.5A3.375 3.375 0 0014.25 1.125v-.375a.375.375 0 01.375-.375h.75a.375.375 0 01.375.375v1.5A1.125 1.125 0 0114.625 3.75h-1.5A3.375 3.375 0 009.75 7.125v1.5a3.375 3.375 0 003.375 3.375h1.5A1.125 1.125 0 0115.75 13.125v1.5a1.125 1.125 0 01-1.125 1.125h-1.5A3.375 3.375 0 009.75 19.125v.375a.375.375 0 01-.375.375h-.75a.375.375 0 01-.375-.375v-1.875A2.625 2.625 0 005.625 15.375v-1.5a2.625 2.625 0 00-2.625-2.625H2.25a.375.375 0 01-.375-.375v-.75a.375.375 0 01.375-.375h1.5a1.125 1.125 0 011.125 1.125v1.5a1.125 1.125 0 01-1.125 1.125h-.75A1.875 1.875 0 00.75 12.375v1.875a1.875 1.875 0 001.875 1.875h1.5A.375.375 0 014.5 16.5v.375a.375.375 0 01-.375.375h-1.5A3.375 3.375 0 00-.375 20.625v.375a.375.375 0 01-.375.375h-.75a.375.375 0 01-.375-.375v-1.875a2.625 2.625 0 00-2.625-2.625H-6a.375.375 0 01-.375-.375v-1.5a.375.375 0 01.375-.375H-4.5A1.125 1.125 0 01-3.375 9.75v-1.5a1.125 1.125 0 011.125-1.125h.75A1.875 1.875 0 00.375 5.25V3.375A1.875 1.875 0 00-1.5 1.5h-1.5a.375.375 0 01-.375-.375v-.375a.375.375 0 01.375-.375H-1.5A3.375 3.375 0 001.875-2.625v-.375a.375.375 0 01.375-.375h.75a.375.375 0 01.375.375v1.875A2.625 2.625 0 006-2.25v.75a.375.375 0 00.375.375h1.125a1.125 1.125 0 011.125 1.125v1.5a1.125 1.125 0 01-1.125 1.125H7.125A3.375 3.375 0 003.75 5.625v.375a.375.375 0 01.375.375h.75a.375.375 0 01.375-.375v-1.5A1.125 1.125 0 016.375 3.375h1.5A3.375 3.375 0 0011.25 0v-.375a.375.375 0 01.375-.375h.75A.375.375 0 0112.75-.375v1.875a2.625 2.625 0 002.625 2.625h1.5a.375.375 0 01.375.375v1.5a.375.375 0 01-.375.375H15.75A1.125 1.125 0 0114.625 7.125v-1.5a1.125 1.125 0 011.125-1.125h.75A1.875 1.875 0 0018.375 2.625V.75a1.875 1.875 0 00-1.875-1.875h-1.5a.375.375 0 01-.375-.375v-.375A.375.375 0 0115-.75h1.5A3.375 3.375 0 0019.875 2.625v.375a.375.375 0 01.375.375h.75a.375.375 0 01.375-.375v-1.5A1.125 1.125 0 0122.5.375h1.5A3.375 3.375 0 0027.375-3v-.375a.375.375 0 01.375-.375h.75a.375.375 0 01.375.375v1.875a2.625 2.625 0 002.625 2.625h1.5a.375.375 0 01.375.375v1.5a.375.375 0 01-.375.375H31.5A1.125 1.125 0 0130.375 2.625v-1.5a1.125 1.125 0 011.125-1.125h.75A1.875 1.875 0 0034.125-1.875v-1.875a1.875 1.875 0 00-1.875-1.875H30.75a.375.375 0 01-.375-.375v-.375a.375.375 0 01.375-.375h1.5A3.375 3.375 0 0035.625-8.25v-.375a.375.375 0 01.375-.375h.75A.375.375 0 0136.75-8.625v1.875a2.625 2.625 0 002.625 2.625h1.5a.375.375 0 01.375.375v1.5a.375.375 0 01-.375.375H39.75A1.125 1.125 0 0138.625-3.375v-1.5a1.125 1.125 0 011.125-1.125h.75A1.875 1.875 0 0042.375-7.875v-1.875A1.875 1.875 0 0040.5-11.625H39a.375.375 0 01-.375-.375v-.375a.375.375 0 01.375-.375h1.5A3.375 3.375 0 0043.875-15.375" clipRule="evenodd" />
                  </svg>
                </button>
                <button className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
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
