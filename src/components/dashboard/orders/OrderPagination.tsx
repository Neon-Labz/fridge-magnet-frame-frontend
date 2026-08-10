import type { ReactNode } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

function PageBtn({
  children,
  active = false,
  disabled = false,
  onClick,
  ariaLabel,
}: {
  children: ReactNode;
  active?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  ariaLabel?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-current={active ? 'page' : undefined}
      className="flex h-8 w-8 items-center justify-center rounded-md text-xs font-semibold transition sm:h-9 sm:w-9 sm:rounded-lg sm:text-sm"
      style={{
        background: active ? '#002B73' : 'transparent',
        color: active ? '#fff' : disabled ? '#CBD5E1' : '#475569',
        cursor: disabled ? 'not-allowed' : 'pointer',
      }}
    >
      {children}
    </button>
  );
}

function getPageNumbers(currentPage: number, totalPages: number) {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  if (currentPage <= 3) {
    return [1, 2, 3, 4, 'ellipsis', totalPages];
  }

  if (currentPage >= totalPages - 2) {
    return [1, 'ellipsis', totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
  }

  return [1, 'ellipsis', currentPage - 1, currentPage, currentPage + 1, 'ellipsis', totalPages];
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
  const safeTotalPages = Math.max(1, totalPages);
  const safeCurrentPage = Math.min(
    Math.max(1, currentPage),
    safeTotalPages
  );

  const pageNumbers = getPageNumbers(
    safeCurrentPage,
    safeTotalPages
  );

  const hasPrevious = safeCurrentPage > 1;
  const hasNext = safeCurrentPage < safeTotalPages;

  return (
    <div
      className="flex min-h-[52px] flex-shrink-0 flex-col gap-2 border-t px-3 py-2.5 sm:min-h-[53px] sm:flex-row sm:items-center sm:justify-between sm:px-5 sm:py-2 lg:px-6"
      style={{
        borderColor: '#C3C6D4',
        background: '#fff',
      }}
    >
      <p
        className="text-center text-xs font-medium sm:text-left sm:text-sm"
        style={{ color: '#434652' }}
      >
        {totalItems === 0
          ? '0 of 0'
          : `${startItem}–${endItem} of ${totalItems}`}
      </p>

      {totalItems > 0 && (
        <div className="flex items-center justify-center gap-0.5 sm:gap-1">
          <PageBtn
            onClick={() => onPageChange(safeCurrentPage - 1)}
            disabled={!hasPrevious}
            ariaLabel="Previous page"
          >
            <ChevronLeft size={14} />
          </PageBtn>

          <div className="flex items-center gap-0.5 sm:gap-1">
            {pageNumbers.map((pageNumber, index) => {
              if (pageNumber === 'ellipsis') {
                return (
                  <span
                    key={`ellipsis-${index}`}
                    className="flex h-8 w-6 items-center justify-center text-xs font-semibold text-slate-400 sm:h-9 sm:w-7 sm:text-sm"
                  >
                    ...
                  </span>
                );
              }

              return (
                <PageBtn
                  key={pageNumber}
                  active={pageNumber === safeCurrentPage}
                  onClick={() => onPageChange(pageNumber)}
                  ariaLabel={`Page ${pageNumber}`}
                >
                  {pageNumber}
                </PageBtn>
              );
            })}
          </div>

          <PageBtn
            onClick={() => onPageChange(safeCurrentPage + 1)}
            disabled={!hasNext}
            ariaLabel="Next page"
          >
            <ChevronRight size={14} />
          </PageBtn>
        </div>
      )}
    </div>
  );
}




// import type { ReactNode } from 'react';
// import { ChevronLeft, ChevronRight } from 'lucide-react';

// function PageBtn({ children, active = false, onClick }: { children: ReactNode; active?: boolean; onClick?: () => void }) {
//   return (
//     <button
//       onClick={onClick}
//       className="flex items-center justify-center rounded-lg text-sm font-bold transition"
//       style={{
//         width: 36, height: 36,
//         background: active ? '#002B73' : 'transparent',
//         color: active ? '#fff' : '#475569',
//       }}
//     >
//       {children}
//     </button>
//   );
// }

// interface OrderPaginationProps {
//   currentPage: number;
//   totalPages: number;
//   startItem: number;
//   endItem: number;
//   totalItems: number;
//   onPageChange: (page: number) => void;
// }

// export default function OrderPagination({
//   currentPage,
//   totalPages,
//   startItem,
//   endItem,
//   totalItems,
//   onPageChange,
// }: OrderPaginationProps) {
//   return (
//     <div
//       className="flex-shrink-0 flex items-center justify-between px-6"
//       style={{ height: 53, borderTop: '1px solid #C3C6D4' }}
//     >
//       <p className="text-sm font-medium " style={{ color: '#434652' }}>
//         {startItem}–{endItem} of {totalItems}
//       </p>
//       <div className="flex items-center gap-1">
//         <PageBtn onClick={() => onPageChange(Math.max(1, currentPage - 1))}><ChevronLeft size={14} /></PageBtn>
//         {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
//           <PageBtn key={n} active={n === currentPage} onClick={() => onPageChange(n)}>{n}</PageBtn>
//         ))}
//         <PageBtn onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}><ChevronRight size={14} /></PageBtn>
//       </div>
//     </div>
//   );
// }
