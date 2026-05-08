'use client';

import { Bell, Menu, UserCircle2 } from 'lucide-react';

export default function TopAppBar({ onMenuClick }: { onMenuClick?: () => void }) {
  return (
    <>
      <style>{`
        .topappbar {
          height: 89px;
          background: rgba(255, 255, 255, 0.92);
          border-bottom: 1px solid #E2E8F0;
          box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.05);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
        }
        .profile-button {
          padding: 4px 16px 4px 4px;
          border: 1px solid #E2E8F0;
        }
        .profile-avatar {
          width: 40px;
          height: 40px;
          background: rgba(0, 43, 115, 0.1);
          flex-shrink: 0;
        }
        .profile-name {
          color: #1E3A8A;
          font-size: 14px;
          line-height: 14px;
        }
        .profile-role {
          font-size: 10px;
          line-height: 15px;
          color: #64748B;
        }
      `}</style>
      <header
        className="topappbar fixed top-0 right-0 z-30 flex items-center justify-between px-4 sm:px-6 left-0 lg:left-[252px]"
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
            className="profile-button flex items-center gap-3 rounded-full bg-white transition hover:shadow-md"
          >
            <div
              className="profile-avatar flex items-center justify-center rounded-full"
            >
              <UserCircle2 size={20} color="#002B73" />
            </div>
            <div className="flex flex-col items-start">
              <span
                className="profile-name font-bold"
              >
                Admin
              </span>
              <span
                className="profile-role font-medium"
              >
                System Manager
              </span>
            </div>
          </button>
        </div>
      </header>
    </>
  );
}
