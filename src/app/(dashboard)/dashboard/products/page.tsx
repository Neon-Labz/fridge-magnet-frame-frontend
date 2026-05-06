'use client';

import { useState } from 'react';
import type { ReactNode } from 'react';
import {
  Check, ChevronDown, ChevronLeft, ChevronRight, Eye, Filter, Package,
  SlidersHorizontal, SquarePlus, Trash2, TriangleAlert,
} from 'lucide-react';
import Link from 'next/link';
import { PRODUCTS, DASHBOARD_STATS } from '@/data/products';
import type { Product, StockStatus } from '@/types/product';
import AddProductModal from '@/components/modals/AddProductModal';
import DeleteProductModal from '@/components/modals/DeleteProductModal';

const STATS = [
  { label: 'Total Products', value: DASHBOARD_STATS.totalProducts.toLocaleString(), icon: Package,        iconBg: '#EFF6FF', iconColor: '#002B73', valueColor: '#002B73' },
  { label: 'Low Stock',      value: `${DASHBOARD_STATS.lowStock} Items`,              icon: TriangleAlert, iconBg: '#FEF2F2', iconColor: '#BC0000', valueColor: '#BC0000' },
  { label: 'Active Listings',value: DASHBOARD_STATS.activeListings.toLocaleString(),  icon: Eye,           iconBg: '#F8FAFC', iconColor: '#334155', valueColor: '#1A1C1F' },
];

function ProductThumb({ gradient }: { gradient: string }) {
  return (
    <>
      <style jsx>{`
        .product-thumb {
          width: 64px;
          height: 64px;
          border: 1px solid #E2E8F0;
          background: #F1F5F9;
        }
      `}</style>
      <div className="relative flex-shrink-0 overflow-hidden rounded-lg product-thumb">
        <div className={`absolute inset-1 rounded-md bg-gradient-to-br ${gradient}`} />
        <div className="absolute inset-[14px] rounded-sm border border-white/30 bg-white/10" />
      </div>
    </>
  );
}

function StockBadge({ status, count }: { status: StockStatus; count: number }) {
  return (
    <>
      <style jsx>{`
        .badge-indicator {
          width: 8px;
          height: 10px;
          border-radius: 9999px;
          flex-shrink: 0;
        }
        .badge-in-stock {
          background: #10B981;
        }
        .badge-low-stock {
          background: #BC0000;
        }
        .badge-out-of-stock {
          background: #CBD5E1;
        }
        .badge-text {
          display: inline-flex;
          align-items: center;
          border-radius: 9999px;
          padding: 6px 12px;
          font-size: 14px;
          font-weight: 600;
        }
        .badge-text-in-stock {
          background: #ECFDF5;
          color: #047857;
        }
        .badge-text-low-stock {
          background: #FEF2F2;
          color: #BC0000;
        }
        .badge-text-out-of-stock {
          background: #F1F5F9;
          color: #64748B;
        }
      `}</style>
      {status === 'in-stock' && (
        <div className="flex items-center gap-2">
          <span className="badge-indicator badge-in-stock" />
          <span className="badge-text badge-text-in-stock">In Stock ({count})</span>
        </div>
      )}
      {status === 'low-stock' && (
        <div className="flex items-center gap-2">
          <span className="badge-indicator badge-low-stock" />
          <span className="badge-text badge-text-low-stock">Low Stock ({count})</span>
        </div>
      )}
      {status === 'out-of-stock' && (
        <div className="flex items-center gap-2">
          <span className="badge-indicator badge-out-of-stock" />
          <span className="badge-text badge-text-out-of-stock">Out of Stock</span>
        </div>
      )}
    </>
  );
}

function PageBtn({ children, active = false, onClick }: { children: ReactNode; active?: boolean; onClick?: () => void }) {
  return (
    <>
      <style jsx>{`
        .page-btn {
          width: 36px;
          height: 36px;
          background: transparent;
          color: #475569;
        }
        .page-btn.active {
          background: #002B73;
          color: #fff;
        }
      `}</style>
      <button onClick={onClick} className={`flex items-center justify-center rounded-lg text-sm font-bold transition page-btn ${active ? 'active' : ''}`}>
        {children}
      </button>
    </>
  );
}

type FilterStatus = 'all' | StockStatus;
type SortBy = 'default' | 'name-asc' | 'name-desc' | 'price-asc' | 'price-desc' | 'stock-asc' | 'stock-desc';

const FILTER_OPTIONS: { value: FilterStatus; label: string }[] = [
  { value: 'all',           label: 'All Products'  },
  { value: 'in-stock',      label: 'In Stock'       },
  { value: 'low-stock',     label: 'Low Stock'      },
  { value: 'out-of-stock',  label: 'Out of Stock'   },
];

const SORT_OPTIONS: { value: SortBy; label: string }[] = [
  { value: 'default',    label: 'Default'        },
  { value: 'name-asc',   label: 'Name (A → Z)'   },
  { value: 'name-desc',  label: 'Name (Z → A)'   },
  { value: 'price-asc',  label: 'Price (Low → High)' },
  { value: 'price-desc', label: 'Price (High → Low)' },
  { value: 'stock-asc',  label: 'Stock (Low → High)' },
  { value: 'stock-desc', label: 'Stock (High → Low)' },
];

const PAGE_SIZE = 4;

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [addOpen, setAddOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);
  const [page, setPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');
  const [sortBy, setSortBy] = useState<SortBy>('default');
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

  const filtered = filterStatus === 'all' ? products : products.filter(p => p.stockStatus === filterStatus);
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'name-asc')   return a.name.localeCompare(b.name);
    if (sortBy === 'name-desc')  return b.name.localeCompare(a.name);
    if (sortBy === 'price-asc')  return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'stock-asc')  return a.stockCount - b.stockCount;
    if (sortBy === 'stock-desc') return b.stockCount - a.stockCount;
    return 0;
  });

  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const paged = sorted.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);
  const startItem = sorted.length === 0 ? 0 : (safePage - 1) * PAGE_SIZE + 1;
  const endItem = Math.min(safePage * PAGE_SIZE, sorted.length);

  const applyFilter = (f: FilterStatus) => { setFilterStatus(f); setPage(1); setFilterOpen(false); };
  const applySort   = (s: SortBy)       => { setSortBy(s);       setPage(1); setSortOpen(false);  };

  const confirmDelete = () => {
    if (deleteTarget) {
      setProducts(prev => {
        const next = prev.filter(p => p.id !== deleteTarget.id);
        if (page > Math.ceil(next.length / PAGE_SIZE)) setPage(p => Math.max(1, p - 1));
        return next;
      });
      setDeleteTarget(null);
    }
  };

  return (
    <>
      <div className="flex flex-col h-full w-full px-4 sm:px-8 pt-6 sm:pt-8 pb-0">

        {/* ── Page header ── */}
        <section className="flex-shrink-0 flex items-end justify-between gap-6 mb-5">
          <div className="flex flex-col gap-1">
            <h1 className="font-bold text-[26px] sm:text-[36px] lg:text-[40px] leading-tight"
              style={{ fontFamily: 'var(--font-manrope, Manrope, sans-serif)', color: '#002B73', letterSpacing: '-1.2px' }}>
              Product Management
            </h1>
            <p className="text-lg leading-[29px]" style={{ color: '#434652' }}>
              Manage your premium curated photo frames and track stock availability across the gallery with precision.
            </p>
          </div>
          <button onClick={() => setAddOpen(true)}
            className="flex items-center gap-2 font-bold text-base text-white flex-shrink-0 transition hover:opacity-90"
            style={{ height: 56, padding: '0 32px', background: '#BC0000', borderRadius: 12, boxShadow: '0px 20px 25px -5px rgba(0,0,0,0.1), 0px 8px 10px -6px rgba(0,0,0,0.1)' }}>
            <SquarePlus size={18} />
            Add Product
          </button>
        </section>

        {/* ── Stat cards ── */}
        <section className="flex-shrink-0 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-5">
          {STATS.map(({ label, value, icon: Icon, iconBg, iconColor }) => (
            <article key={label} className="flex items-center gap-5 bg-white flex-1"
              style={{ padding: '20px 24px', border: '1px solid #C3C6D4', borderRadius: 12, boxShadow: '0px 1px 2px rgba(0,0,0,0.05)' }}>
              <div className="flex items-center justify-center flex-shrink-0 rounded-lg" style={{ width: 48, height: 48, background: iconBg }}>
                <Icon size={22} color={iconColor} />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase" style={{ color: '#434652', letterSpacing: '0.7px' }}>{label}</p>
                <p className="text-[30px] font-bold leading-9 mt-1" style={{ color: '#002B73' }}>{value}</p>
              </div>
            </article>
          ))}
        </section>

        {/* ── Inventory table ── */}
        <section className="flex flex-col flex-1 overflow-hidden mb-0" style={{ background: '#fff', border: '1px solid #C3C6D4', borderRadius: 12, boxShadow: '0px 4px 6px -1px rgba(0,0,0,0.1), 0px 2px 4px -2px rgba(0,0,0,0.1)' }}>

          {/* Toolbar */}
          {(filterOpen || sortOpen) && (
            <div className="fixed inset-0 z-10" onClick={() => { setFilterOpen(false); setSortOpen(false); }} />
          )}
          <div className="flex-shrink-0 flex items-center justify-between px-8" style={{ height: 61, borderBottom: '1px solid #F1F5F9', background: 'rgba(248,250,252,0.5)', position: 'relative', zIndex: 20 }}>
            <div className="flex items-center gap-4">

              {/* Filter dropdown */}
              <div className="relative">
                <button
                  onClick={() => { setFilterOpen(v => !v); setSortOpen(false); }}
                  className="flex items-center gap-2 text-sm font-bold transition hover:opacity-80 px-3 py-1.5 rounded-lg"
                  style={{ color: filterStatus !== 'all' ? '#002B73' : '#475569', background: filterStatus !== 'all' ? '#EFF6FF' : 'transparent', border: filterStatus !== 'all' ? '1px solid #BFDBFE' : '1px solid transparent' }}
                >
                  <Filter size={14} />
                  {filterStatus === 'all' ? 'Filter' : FILTER_OPTIONS.find(o => o.value === filterStatus)?.label}
                  <ChevronDown size={13} style={{ transform: filterOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s' }} />
                </button>
                {filterOpen && (
                  <div className="absolute left-0 top-full mt-1 w-44 overflow-hidden z-30" style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 10, boxShadow: '0px 8px 16px rgba(0,0,0,0.1)' }}>
                    {FILTER_OPTIONS.map(o => (
                      <button key={o.value} onClick={() => applyFilter(o.value)}
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

              {/* Sort dropdown */}
              <div className="relative">
                <button
                  onClick={() => { setSortOpen(v => !v); setFilterOpen(false); }}
                  className="flex items-center gap-2 text-sm font-bold transition hover:opacity-80 px-3 py-1.5 rounded-lg"
                  style={{ color: sortBy !== 'default' ? '#002B73' : '#475569', background: sortBy !== 'default' ? '#EFF6FF' : 'transparent', border: sortBy !== 'default' ? '1px solid #BFDBFE' : '1px solid transparent' }}
                >
                  <SlidersHorizontal size={14} />
                  {sortBy === 'default' ? 'Sort' : SORT_OPTIONS.find(o => o.value === sortBy)?.label}
                  <ChevronDown size={13} style={{ transform: sortOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s' }} />
                </button>
                {sortOpen && (
                  <div className="absolute left-0 top-full mt-1 w-52 overflow-hidden z-30" style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 10, boxShadow: '0px 8px 16px rgba(0,0,0,0.1)' }}>
                    {SORT_OPTIONS.map(o => (
                      <button key={o.value} onClick={() => applySort(o.value)}
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
            <p className="text-sm font-medium" style={{ color: '#94A3B8' }}>Showing {startItem}–{endItem} of {sorted.length} products</p>
          </div>

          {/* Table */}
          <div className="flex-1 overflow-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  {['Product ID', 'Product Details', 'Price', 'Stock Status', 'Actions'].map((h, i) => (
                    <th key={h} className="py-5 text-xs font-bold uppercase" style={{
                      paddingLeft: 32, paddingRight: i === 4 ? 32 : 0,
                      textAlign: i === 4 ? 'right' : 'left',
                      color: '#64748B', letterSpacing: '0.07em',
                      borderBottom: '1px solid #F1F5F9',
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paged.map(product => (
                  <tr key={product.id} className="transition hover:bg-slate-50/50" style={{ borderTop: '1px solid #F8FAFC' }}>
                    <td className="pl-8 font-mono text-sm" style={{ height: 115, color: '#94A3B8', whiteSpace: 'nowrap' }}>
                      {product.id}
                    </td>
                    <td className="pr-8">
                      <div className="flex items-center gap-5">
                        <ProductThumb gradient={product.gradient} />
                        <div>
                          <p className="text-base font-bold leading-6" style={{ color: '#002B73' }}>{product.name}</p>
                          <p className="text-xs mt-0.5" style={{ color: '#64748B' }}>{product.series}</p>
                        </div>
                      </div>
                    </td>
                    <td className="pl-8 text-base font-bold" style={{ color: '#1A1C1F', whiteSpace: 'nowrap' }}>
                      ${product.price.toFixed(2)}
                    </td>
                    <td className="pl-8">
                      <StockBadge status={product.stockStatus} count={product.stockCount} />
                    </td>
                    <td className="pr-8">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/products/${product.sku}/edit`}
                          className="flex items-center justify-center rounded-xl transition hover:bg-blue-50"
                          style={{ width: 36, height: 38 }}>
                          <Eye size={18} color="#002B73" />
                        </Link>
                        <button onClick={() => setDeleteTarget(product)}
                          className="flex items-center justify-center rounded-xl transition hover:bg-red-50"
                          style={{ width: 36, height: 38 }}>
                          <Trash2 size={16} color="#BC0000" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex-shrink-0 flex items-center justify-between px-8" style={{ height: 72, borderTop: '1px solid #F1F5F9' }}>
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="flex items-center gap-2 text-sm font-bold transition hover:opacity-70 disabled:opacity-30"
              style={{ color: '#002B73' }}
            >
              <ChevronLeft size={16} /> Previous
            </button>
            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
                <PageBtn key={n} active={n === page} onClick={() => setPage(n)}>{n}</PageBtn>
              ))}
            </div>
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="flex items-center gap-2 text-sm font-bold transition hover:opacity-70 disabled:opacity-30"
              style={{ color: '#002B73' }}
            >
              Next <ChevronRight size={16} />
            </button>
          </div>
        </section>
      </div>

      <AddProductModal isOpen={addOpen} onClose={() => setAddOpen(false)} />
      <DeleteProductModal isOpen={!!deleteTarget} product={deleteTarget} onCancel={() => setDeleteTarget(null)} onConfirm={confirmDelete} />
    </>
  );
}
