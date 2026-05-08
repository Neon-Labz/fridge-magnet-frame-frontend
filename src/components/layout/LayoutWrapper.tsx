'use client';

import { useState } from 'react';
import type { ReactNode } from 'react';
import TopAppBar from './TopAppBar';
import Sidebar from './Sidebar';

export default function LayoutWrapper({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <style>{`
        .layout-main {
          margin-top: 89px;
          height: calc(100vh - 89px);
          background-color: #FFFFFF;
        }
      `}</style>
      <div className="h-screen overflow-hidden bg-white">
        <TopAppBar onMenuClick={() => setSidebarOpen(v => !v)} />

        {/* Mobile backdrop */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <main
          className="layout-main flex flex-col overflow-hidden lg:ml-[252px]"
        >
          {children}
        </main>
      </div>
    </>
  );
}
