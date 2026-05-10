import type { ReactNode } from "react";

export default function WebsiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f9f9fe] text-[#1A1C1F]">
      <main>{children}</main>
    </div>
  );
}