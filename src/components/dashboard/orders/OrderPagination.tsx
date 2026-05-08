import type { ReactNode } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

function PageBtn({ children, active = false, onClick }: { children: ReactNode; active?: boolean; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center rounded-lg text-sm font-bold transition"
      style={{
        width: 36, height: 36,
        background: active ? '#002B73' : 'transparent',
        color: active ? '#fff' : '#475569',
      }}
    >
      {children}
    </button>
  );
}

interface OrderPaginationProps {
  currentPage: number;
  totalPages: number;
  startItem: number;
  endItem: number;
  totalItems: number;
  onPageChange: (page: number) => void;
}

export default function OrderPagination({
  currentPage,
  totalPages,
  startItem,
  endItem,
  totalItems,
  onPageChange,
}: OrderPaginationProps) {
  return (
    <div
      className="flex-shrink-0 flex items-center justify-between px-6"
      style={{ height: 53, borderTop: '1px solid #C3C6D4' }}
    >
      <p className="text-sm font-medium " style={{ color: '#434652' }}>
        Showing {startItem}–{endItem} of {totalItems} orders
      </p>
      <div className="flex items-center gap-1">
        <PageBtn onClick={() => onPageChange(Math.max(1, currentPage - 1))}><ChevronLeft size={14} /></PageBtn>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
          <PageBtn key={n} active={n === currentPage} onClick={() => onPageChange(n)}>{n}</PageBtn>
        ))}
        <PageBtn onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}><ChevronRight size={14} /></PageBtn>
      </div>
    </div>
  );
}
