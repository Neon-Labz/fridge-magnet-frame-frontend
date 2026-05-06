import { ORDER_STATS } from '@/data/orders';

function StatCard({
  label, value, change, changeColor,
}: { label: string; value: string; change: string; changeColor: string }) {
  return (
    <div
      className="flex flex-col justify-between p-6"
      style={{
        flex: 1, minWidth: 0,
        background: '#fff',
        border: '1px solid #C3C6D4',
        borderRadius: 12,
        boxShadow: '0px 1px 2px rgba(0,0,0,0.05)',
      }}
    >
      <p
        className="font-semibold text-sm uppercase"
        style={{ color: '#434652', letterSpacing: '0.7px' }}
      >
        {label}
      </p>
      <div className="flex items-baseline gap-2 mt-2">
        <span className="font-bold text-[30px] leading-9" style={{ color: '#002B73' }}>
          {value}
        </span>
        <span className="font-bold text-xs" style={{ color: changeColor }}>
          {change}
        </span>
      </div>
    </div>
  );
}

export default function OrderStats() {
  return (
    <div className="flex-shrink-0 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-5">
      <StatCard
        label="Total Orders"
        value={ORDER_STATS.totalOrders.value}
        change={ORDER_STATS.totalOrders.change}
        changeColor={ORDER_STATS.totalOrders.changeColor}
      />
      <StatCard
        label="Pending"
        value={ORDER_STATS.pending.value}
        change={ORDER_STATS.pending.change}
        changeColor={ORDER_STATS.pending.changeColor}
      />
      <StatCard
        label="Revenue (MoM)"
        value={ORDER_STATS.revenue.value}
        change={ORDER_STATS.revenue.change}
        changeColor={ORDER_STATS.revenue.changeColor}
      />
    </div>
  );
}
