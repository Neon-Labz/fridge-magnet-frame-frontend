import type { Order } from '@/types/order';

function StatCard({
  label,
  value,
  change,
  changeColor,
}: {
  label: string;
  value: string;
  change: string;
  changeColor: string;
}) {
  return (
    <div
      className="flex min-w-0 flex-col justify-between rounded-lg px-3 py-3 sm:rounded-[10px] sm:px-5 sm:py-4"
      style={{
        background: '#fff',
        border: '1px solid #C3C6D4',
        boxShadow: '0px 1px 2px rgba(0,0,0,0.05)',
      }}
    >
      <p
        className="text-[10px] font-semibold uppercase sm:text-xs"
        style={{
          color: '#434652',
          letterSpacing: '0.5px',
        }}
      >
        {label}
      </p>

      <div className="mt-1.5 flex items-baseline gap-1.5 sm:mt-2 sm:gap-2">
        <span
          className="text-[20px] font-bold leading-6 sm:text-[26px] sm:leading-8"
          style={{ color: '#002B73' }}
        >
          {value}
        </span>

        <span
          className="text-[9px] font-bold sm:text-xs"
          style={{ color: changeColor }}
        >
          {change}
        </span>
      </div>
    </div>
  );
}

export default function OrderStats({ orders }: { orders: Order[] }) {
  const totalOrders = orders.length;

  const pendingOrders = orders.filter((order) => {
    const status = String(order.status || '').trim().toLowerCase();
    return status === 'pending';
  }).length;

  return (
    <div className="mb-3 grid w-full max-w-[400px] flex-shrink-0 grid-cols-2 gap-2 sm:mb-4 sm:gap-4">
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