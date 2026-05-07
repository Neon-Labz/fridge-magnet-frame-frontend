<<<<<<< HEAD
export default function TopAppBar({ setMenu }: any) {
  return (
    <div className="flex items-center justify-end border-b px-10 py-4">
      <div className="flex items-center gap-6">
        <button
          onClick={() => setMenu('notification')}
          className="relative text-slate-600 hover:text-blue-900"
        >
          🔔
          <span className="absolute -right-2 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[10px] text-white">
            3
          </span>
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setMenu('profile')}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-900 font-bold text-white"
          >
            A
          </button>

          <div className="text-sm">
            <p className="font-bold text-blue-900">Admin</p>
            <p className="text-xs text-slate-500">System Manager</p>
          </div>
        </div>
      </div>
    </div>
  );
}
=======
'use client';

import { Bell, Menu, UserCircle2 } from 'lucide-react';

export default function TopAppBar({ onMenuClick }: { onMenuClick?: () => void }) {
  return (
    <header
      className="fixed top-0 right-0 z-30 flex items-center justify-between px-4 sm:px-6 left-0 lg:left-[252px]"
      style={{
        height: 89,
        background: 'rgba(255, 255, 255, 0.92)',
        borderBottom: '1px solid #E2E8F0',
        boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
      }}
    >
      {/* Hamburger — mobile only */}
      <button
        onClick={onMenuClick}
        className="flex items-center justify-center rounded-lg transition hover:bg-slate-100 lg:hidden"
        style={{ width: 40, height: 40 }}
        aria-label="Toggle menu"
      >
        <Menu size={22} color="#475569" />
      </button>

      {/* Right controls */}
      <div className="flex items-center gap-3 sm:gap-6 ml-auto">
        {/* Bell */}
        <button
          className="flex items-center justify-center rounded-full transition hover:bg-slate-100"
          style={{ width: 36, height: 40 }}
          aria-label="Notifications"
        >
          <Bell size={20} color="#64748B" />
        </button>

        {/* User profile */}
        <button
          className="flex items-center gap-3 rounded-full bg-white transition hover:shadow-md"
          style={{
            padding: '4px 16px 4px 4px',
            border: '1px solid #E2E8F0',
          }}
        >
          <div
            className="flex items-center justify-center rounded-full flex-shrink-0"
            style={{ width: 40, height: 40, background: 'rgba(0, 43, 115, 0.1)' }}
          >
            <UserCircle2 size={20} color="#002B73" />
          </div>
          <div className="flex flex-col items-start">
            <span
              className="font-bold text-sm leading-[14px]"
              style={{ color: '#1E3A8A' }}
            >
              Admin
            </span>
            <span
              className="font-medium leading-[15px]"
              style={{ fontSize: 10, color: '#64748B' }}
            >
              System Manager
            </span>
          </div>
        </button>
      </div>
    </header>
  );
}
>>>>>>> development
