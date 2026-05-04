"use client";

import Sidebar from "./Sidebar";
import { ReactNode } from "react";

export default function LayoutWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 lg:ml-64 transition-all duration-300">
        {children}
      </main>
    </div>
  );
}
