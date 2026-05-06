'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Sidebar = () => {
  const pathname = usePathname();
  const [hoveredItem, setHoveredItem] = React.useState<string | null>(null);

  const checkIsActive = (path: string) => {
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  const getNavItemStyle = (itemId: string, isActive: boolean) => {
    const base: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      padding: '0 20px',
      height: '44px',
      color: isActive ? '#2563eb' : '#4b5563',
      fontWeight: 500,
      fontSize: '15px',
      transition: 'all 0.2s',
      cursor: 'pointer',
      position: 'relative',
      textDecoration: 'none',
      width: '100%',
      gap: '12px',
      backgroundColor: isActive
        ? '#eff6ff'
        : hoveredItem === itemId
        ? '#f8fafc'
        : 'transparent',
    };
    return base;
  };

  const navIconStyle: React.CSSProperties = {
    width: '22px',
    height: '22px',
    flexShrink: 0,
  };

  const activeBarStyle: React.CSSProperties = {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: '4px',
    backgroundColor: '#2563eb',
    borderTopLeftRadius: '4px',
    borderBottomLeftRadius: '4px',
  };

  return (
    <aside
      style={{
        width: 'var(--sidebar-width)',
        backgroundColor: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRight: '1px solid var(--border-color)',
        padding: '20px 0',
      }}
    >
      <div>
        {/* Logo */}
        <div style={{ paddingLeft: '20px', display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
          <img
            src="/logo-removebg-preview.png"
            alt="Magnify Logo"
            style={{ maxWidth: '110px', height: 'auto', display: 'block' }}
          />
        </div>

        {/* Nav items — full width rows, flush with left edge */}
        <ul
          style={{
            listStyle: 'none',
            margin: '0',
            padding: '32px 0 0 0', // 32px gap from logo
            display: 'flex',
            flexDirection: 'column',
            gap: '6px', // Tight vertical spacing
          }}
        >
          {[
            {
              id: 'products',
              label: 'Products',
              href: '/dashboard/products',
              icon: (
                <svg style={navIconStyle} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <line x1="3" y1="9" x2="21" y2="9" />
                  <line x1="9" y1="21" x2="9" y2="9" />
                </svg>
              ),
            },
            {
              id: 'orders',
              label: 'Orders',
              href: '/dashboard/orders',
              icon: (
                <svg style={navIconStyle} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
              ),
            },
            {
              id: 'customers',
              label: 'Customers',
              href: '/dashboard/customers',
              icon: (
                <svg style={navIconStyle} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              ),
            },
            {
              id: 'account',
              label: 'Account',
              href: '/dashboard/account',
              icon: (
                <svg style={navIconStyle} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                </svg>
              ),
            },
          ].map(({ id, label, href, icon }) => {
            const active = checkIsActive(href) || (id === 'customers' && pathname === '/dashboard');
            return (
              <li key={id}>
                <Link
                  href={href}
                  style={getNavItemStyle(id, active)}
                  onMouseEnter={() => setHoveredItem(id)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  {icon}
                  {label}
                  {active && <div style={activeBarStyle} />}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Footer / Logout */}
      <div
        style={{
          padding: '20px',
          borderTop: '1px solid var(--border-color)',
        }}
      >
        <button
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            color: '#4b5563',
            fontWeight: 500,
            fontSize: '15px',
            height: '44px',
            padding: '0',
            transition: 'color 0.2s',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            width: '100%',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#2563eb')}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#4b5563')}
        >
          <svg style={{ width: '22px', height: '22px', flexShrink: 0 }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;