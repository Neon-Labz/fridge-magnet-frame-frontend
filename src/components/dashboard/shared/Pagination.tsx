import type { ReactNode } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

function PageBtn({ children, active = false, onClick }: { children: ReactNode; active?: boolean; onClick?: () => void }) {
  return (
    <button onClick={onClick} className="flex items-center justify-center rounded-lg text-sm font-bold transition"
      style={{ width: 36, height: 36, background: active ? '#002B73' : 'transparent', color: active ? '#fff' : '#475569' }}>
      {children}
    </button>
  );
}

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  return (
    <div className="flex-shrink-0 flex items-center justify-between px-8" style={{ height: 72, borderTop: '1px solid #F1F5F9' }}>
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="flex items-center gap-2 text-sm font-bold transition hover:opacity-70 disabled:opacity-30"
        style={{ color: '#002B73' }}
      >
        <ChevronLeft size={16} /> Previous
      </button>
      <div className="flex items-center gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
          <PageBtn key={n} active={n === currentPage} onClick={() => onPageChange(n)}>{n}</PageBtn>
        ))}
      </div>
      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="flex items-center gap-2 text-sm font-bold transition hover:opacity-70 disabled:opacity-30"
        style={{ color: '#002B73' }}
      >
        Next <ChevronRight size={16} />
      </button>
    </div>
  );
}
