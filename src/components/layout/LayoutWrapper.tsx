"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import TopAppBar from "./TopAppBar";
import Sidebar from "./Sidebar";

export default function LayoutWrapper({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen overflow-hidden bg-white">
      <TopAppBar onMenuClick={() => setSidebarOpen((v) => !v)} />

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main
        className="flex flex-col overflow-hidden lg:ml-[252px]"
        style={{
          marginTop: 89,
          height: "calc(100vh - 89px)",
          backgroundColor: "#FFFFFF",
        }}
      >
        {children}
      </main>
    </div>
  );
}