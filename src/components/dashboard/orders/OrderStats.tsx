import type { Order } from '@/types/order';

function StatCard({
  label, value, change, changeColor,
}: { label: string; value: string; change: string; changeColor: string }) {
  return (
    <div
      className="flex flex-col justify-between px-5 py-4"
      style={{
        minWidth: 0,
        background: '#fff',
        border: '1px solid #C3C6D4',
        borderRadius: 10,
        boxShadow: '0px 1px 2px rgba(0,0,0,0.05)',
      }}
    >
      <p
        className="font-semibold text-xs uppercase"
        style={{ color: '#434652', letterSpacing: '0.7px' }}
      >
        {label}
      </p>
      <div className="mt-2 flex items-baseline gap-2">
        <span className="text-[26px] font-bold leading-8" style={{ color: '#002B73' }}>
          {value}
        </span>
        <span className="font-bold text-xs" style={{ color: changeColor }}>
          {change}
        </span>
      </div>
    </div>
  );
}

export default function OrderStats({ orders }: { orders: Order[] }) {
  const totalOrders = orders.length;
  const pendingOrders = orders.filter((order) => order.status === 'pending').length;

  return (
    <div className="mb-4 grid max-w-[400px] flex-shrink-0 grid-cols-1 gap-4 sm:grid-cols-2">
      <StatCard
        label="Total Orders"
        value={totalOrders.toLocaleString()}
        change="Current"
        changeColor="#16A34A"
      />
      <StatCard
        label="Pending"
        value={pendingOrders.toLocaleString()}
        change={pendingOrders > 0 ? 'Action Needed' : 'Clear'}
        changeColor={pendingOrders > 0 ? '#BC0000' : '#16A34A'}
      />
    </div>
  );
}
