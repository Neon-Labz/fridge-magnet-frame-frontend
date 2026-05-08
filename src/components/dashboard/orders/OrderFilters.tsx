import { Check, ChevronDown, Filter, SlidersHorizontal } from 'lucide-react';
import type { OrderStatus } from '@/types/order';

type OrderFilterStatus = 'all' | OrderStatus;
type OrderSortBy = 'default' | 'id-asc' | 'id-desc' | 'name-asc' | 'name-desc' | 'qty-asc' | 'qty-desc';

const ORDER_FILTER_OPTIONS: { value: OrderFilterStatus; label: string }[] = [
  { value: 'all',        label: 'All Orders'  },
  { value: 'shipped',    label: 'Shipped'     },
  { value: 'pending',    label: 'Pending'     },
  { value: 'processing', label: 'Processing'  },
  { value: 'cancelled',  label: 'Cancelled'   },
];

const ORDER_SORT_OPTIONS: { value: OrderSortBy; label: string }[] = [
  { value: 'default',   label: 'Default'           },
  { value: 'id-asc',    label: 'Order ID (A → Z)'   },
  { value: 'id-desc',   label: 'Order ID (Z → A)'   },
  { value: 'name-asc',  label: 'Customer (A → Z)'   },
  { value: 'name-desc', label: 'Customer (Z → A)'   },
  { value: 'qty-asc',   label: 'Qty (Low → High)'   },
  { value: 'qty-desc',  label: 'Qty (High → Low)'   },
];

interface OrderFiltersProps {
  filterStatus: OrderFilterStatus;
  sortBy: OrderSortBy;
  filterOpen: boolean;
  sortOpen: boolean;
  onFilterToggle: () => void;
  onSortToggle: () => void;
  onFilterSelect: (filter: OrderFilterStatus) => void;
  onSortSelect: (sort: OrderSortBy) => void;
  startItem: number;
  endItem: number;
  totalItems: number;
}

export default function OrderFilters({
  filterStatus,
  sortBy,
  filterOpen,
  sortOpen,
  onFilterToggle,
  onSortToggle,
  onFilterSelect,
  onSortSelect,
  startItem,
  endItem,
  totalItems,
}: OrderFiltersProps) {
  return (
    <div className="flex-shrink-0 flex items-center justify-between px-6 " style={{ height: 53, borderBottom: '1px solid #C3C6D4', background: 'rgba(248,250,252,0.5)', position: 'relative', zIndex: 20 }}>
      <div className="flex items-center gap-4">
        <div className="relative">
          <button onClick={onFilterToggle}
            className="flex items-center gap-2 text-sm font-bold transition hover:opacity-80 px-3 py-1.5 rounded-lg"
            style={{ color: filterStatus !== 'all' ? '#002B73' : '#475569', background: filterStatus !== 'all' ? '#EFF6FF' : 'transparent', border: filterStatus !== 'all' ? '1px solid #BFDBFE' : '1px solid transparent' }}
          >
            <Filter size={14} />
            {filterStatus === 'all' ? 'Filter' : ORDER_FILTER_OPTIONS.find(o => o.value === filterStatus)?.label}
            <ChevronDown size={13} style={{ transform: filterOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s' }} />
          </button>
          {filterOpen && (
            <div className="absolute left-0 top-full mt-1 w-44 overflow-hidden z-30" style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 10, boxShadow: '0px 8px 16px rgba(0,0,0,0.1)' }}>
              {ORDER_FILTER_OPTIONS.map(o => (
                <button key={o.value} onClick={() => onFilterSelect(o.value)}
                  className="flex items-center justify-between w-full px-4 py-2.5 text-sm font-medium text-left transition hover:bg-slate-50"
                  style={{ color: filterStatus === o.value ? '#002B73' : '#475569' }}
                >
                  {o.label}
                  {filterStatus === o.value && <Check size={14} color="#002B73" />}
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="relative">
          <button onClick={onSortToggle}
            className="flex items-center gap-2 text-sm font-bold transition hover:opacity-80 px-3 py-1.5 rounded-lg"
            style={{ color: sortBy !== 'default' ? '#002B73' : '#475569', background: sortBy !== 'default' ? '#EFF6FF' : 'transparent', border: sortBy !== 'default' ? '1px solid #BFDBFE' : '1px solid transparent' }}
          >
            <SlidersHorizontal size={14} />
            {sortBy === 'default' ? 'Sort' : ORDER_SORT_OPTIONS.find(o => o.value === sortBy)?.label}
            <ChevronDown size={13} style={{ transform: sortOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s' }} />
          </button>
          {sortOpen && (
            <div className="absolute left-0 top-full mt-1 w-52 overflow-hidden z-30" style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 10, boxShadow: '0px 8px 16px rgba(0,0,0,0.1)' }}>
              {ORDER_SORT_OPTIONS.map(o => (
                <button key={o.value} onClick={() => onSortSelect(o.value)}
                  className="flex items-center justify-between w-full px-4 py-2.5 text-sm font-medium text-left transition hover:bg-slate-50"
                  style={{ color: sortBy === o.value ? '#002B73' : '#475569' }}
                >
                  {o.label}
                  {sortBy === o.value && <Check size={14} color="#002B73" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      <p className="text-sm font-medium" style={{ color: '#434652' }}>Showing {startItem}–{endItem} of {totalItems} orders</p>
    </div>
  );
}

export type { OrderFilterStatus, OrderSortBy };
