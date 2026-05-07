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