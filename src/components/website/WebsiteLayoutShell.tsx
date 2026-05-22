'use client';

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Header from "@/components/website/Header";
import Footer from "@/components/website/FooterH";

type WebsiteLayoutShellProps = {
  children: ReactNode;
};

export default function WebsiteLayoutShell({ children }: WebsiteLayoutShellProps) {
  const pathname = usePathname();

  if (pathname === "/home") {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans">
      <Header />
      <main className="pt-[92px]">{children}</main>
      <Footer />
    </div>
  );
}