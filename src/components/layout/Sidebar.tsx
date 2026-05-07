<<<<<<< HEAD
import Image from 'next/image';

export default function Sidebar({ menu, setMenu }: any) {
  return (
    <aside className="flex w-56 flex-col border-r bg-slate-50 p-6">
      <Image
        src="/logo.png"
        alt="Magnify Logo"
        width={150}
        height={60}
        className="mb-10"
      />

      <nav className="space-y-5 text-sm font-semibold text-slate-600">
        <SidebarButton label="▣ Products" active={menu === 'products'} onClick={() => setMenu('products')} />
        <SidebarButton label="🛒 Orders" active={menu === 'orders'} onClick={() => setMenu('orders')} />
        <SidebarButton label="👥 Customers" active={menu === 'customers'} onClick={() => setMenu('customers')} />
        <SidebarButton label="👤 Account" active={menu === 'account'} onClick={() => setMenu('account')} />
      </nav>

      <button onClick={() => setMenu('logout')} className="mt-auto text-left text-sm text-slate-600">
        ↪ Logout
      </button>
    </aside>
  );
}

function SidebarButton({ label, active, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className={`w-full rounded-lg p-3 text-left ${
        active ? 'bg-blue-50 text-blue-900' : 'hover:bg-blue-50'
      }`}
    >
      {label}
    </button>
  );
}
=======
'use client';

import { Package, ShoppingCart, Users, UserCog, LogOut } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_ITEMS = [
  { label: 'Products', icon: Package, href: '/dashboard/products' },
  { label: 'Orders', icon: ShoppingCart, href: '/dashboard/orders' },
  { label: 'Customers', icon: Users, href: '/dashboard/customers' },
  { label: 'Account', icon: UserCog, href: '/dashboard/account' },
] as const;

export default function Sidebar({ open = false, onClose }: { open?: boolean; onClose?: () => void }) {
  const pathname = usePathname();

  return (
    <aside
      className={`fixed left-0 top-0 z-40 flex flex-col bg-white transition-transform duration-300 ${
        open ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0`}
      style={{ width: 252, height: '100vh', borderRight: '1px solid #F1F5F9' }}
    >
      {/* Logo section — same height as TopAppBar */}
      <div
        className="flex items-center justify-center flex-shrink-0"
        style={{ height: 89, borderBottom: '1px solid #F1F5F9', padding: '0 24px' }}
      >
        <Link href="/dashboard/products">
          <Image src="/logo.png" alt="Magnify" width={140} height={48} priority />
        </Link>
      </div>

      {/* Nav items */}
      <nav className="flex flex-col gap-1 pt-[25px] flex-1">
        {NAV_ITEMS.map(({ label, icon: Icon, href }) => {
          const isActive = pathname === href || pathname.startsWith(href + '/');
          return (
            <Link
              key={label}
              href={href}
              onClick={onClose}
              className="flex items-center gap-3 px-6 py-4 w-full transition-colors"
              style={{
                background: isActive ? '#EFF6FF' : 'transparent',
                borderRight: isActive ? '4px solid #1E3A8A' : '4px solid transparent',
              }}
            >
              <Icon
                size={20}
                color={isActive ? '#1E3A8A' : '#475569'}
                style={{ flexShrink: 0 }}
              />
              <span
                className="text-sm"
                style={{
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? '#1E3A8A' : '#475569',
                }}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="px-4 py-4">
        <button
          className="flex items-center gap-3 px-3 py-3 rounded-lg w-full transition hover:bg-slate-50"
        >
          <LogOut size={18} color="#475569" style={{ flexShrink: 0 }} />
          <span className="text-sm font-semibold" style={{ color: '#475569' }}>
            Logout
          </span>
        </button>
      </div>
    </aside>
  );
}
>>>>>>> development
