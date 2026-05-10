import type { ReactNode } from "react";
import React from 'react';
import Footer from "@/components/website/Footer";
import Header from "@/components/website/Header";

export default function WebsiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans">
      <Header />
      <main className="pt-[92px]">{children}</main>
      <Footer />
    </div>
  );
}