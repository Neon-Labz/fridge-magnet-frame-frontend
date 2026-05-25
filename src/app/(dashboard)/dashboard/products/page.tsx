'use client';

import { useState } from 'react';
import DeleteProductModal from '@/components/dashboard/products/DeleteProductModal';
import AddProductModal from '@/components/dashboard/products/AddProductModal';
import ViewProductModal from '@/components/dashboard/products/ViewProductModal';
import ProductHeader from '@/components/dashboard/products/ProductHeader';
import ProductStats from '@/components/dashboard/products/ProductStats';
import ProductFilters, { type FilterStatus, type SortBy } from '@/components/dashboard/products/ProductFilters';
import ProductTable from '@/components/dashboard/products/ProductTable';
import Pagination from '@/components/dashboard/shared/Pagination';
import { useProducts } from '@/hooks/useProducts';
import type { Product, ProductFormData } from '@/types/product';

const PAGE_SIZE = 4;
const API_BASE_URL = (
  process.env.NEXT_PUBLIC_BACKEND_API_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  'http://localhost:5000'
).replace(/\/$/, '');

const getProductStatus = (stock: number) => {
  if (stock > 10) return 'In Stock';
  if (stock > 0) return 'Low Stock';
  return 'Out of Stock';
};

const getErrorMessage = (responseText: string) => {
  try {
    const parsed = JSON.parse(responseText);
    return parsed.message || parsed.error || responseText;
  } catch {
    return responseText || 'Something went wrong';
  }
};

export default function ProductsPage() {
  const { products, isLoaded, refreshProducts } = useProducts();

  const [addOpen, setAddOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);
  const [viewTarget, setViewTarget] = useState<Product | null>(null);
  const [page, setPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');
  const [sortBy, setSortBy] = useState<SortBy>('default');
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

  const safeProducts = Array.isArray(products) ? products : [];

  const filtered =
    filterStatus === 'all'
      ? safeProducts
      : safeProducts.filter((product) => product.stockStatus === filterStatus);

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
    if (sortBy === 'name-desc') return b.name.localeCompare(a.name);
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'stock-asc') return a.stockCount - b.stockCount;
    if (sortBy === 'stock-desc') return b.stockCount - a.stockCount;
    return 0;
  });

  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);

  const paged = sorted.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const startItem = sorted.length === 0 ? 0 : (safePage - 1) * PAGE_SIZE + 1;
  const endItem = Math.min(safePage * PAGE_SIZE, sorted.length);

  const handleFilterSelect = (nextFilter: FilterStatus) => {
    setFilterStatus(nextFilter);
    setPage(1);
    setFilterOpen(false);
  };

  const handleSortSelect = (nextSort: SortBy) => {
    setSortBy(nextSort);
    setPage(1);
    setSortOpen(false);
  };

  const handleAddProduct = async (formData: ProductFormData) => {
  try {
    const data = new FormData();

    data.append('productName', formData.name);
    data.append('productId', formData.productId);
    data.append('category', formData.category);
    data.append('stock', String(formData.stock));
    data.append('price', String(formData.price));
    data.append('description', formData.description);
    data.append('status', getProductStatus(formData.stock));

    if (formData.primaryImage) {
      data.append('primaryImage', formData.primaryImage);
    }

    formData.galleryImages.forEach((file) => {
      data.append('galleryImages', file);
    });

    const res = await fetch(
      `${API_BASE_URL}/api/v1/api/products`,
      {
        method: 'POST',
        body: data,
      }
    );

    const result = await res.text();
    console.log(result);

    if (!res.ok) {
      throw new Error(getErrorMessage(result));
    }

    alert('Product added successfully');

    await refreshProducts();
    setAddOpen(false);

  } catch (error) {
    console.error(error);
    alert(error instanceof Error ? error.message : 'Something went wrong');
    throw error;
  }
};

  const handleUpdateProduct = () => {
    alert('Update API later connect pannalam');
  };

  const confirmDelete = () => {
    alert('Delete API later connect pannalam');
    setDeleteTarget(null);
  };

  if (!isLoaded) {
    return <div className="p-8">Loading products...</div>;
  }

  return (
    <>
      <div className="ml-[100px] flex h-full flex-col px-4 pb-0 pt-6 sm:px-8 sm:pt-8">
        <ProductHeader onAddClick={() => setAddOpen(true)} />

        <ProductStats products={safeProducts} />

        <section
          className="mb-0 flex flex-1 flex-col overflow-hidden"
          style={{
            background: '#fff',
            border: '1px solid #C3C6D4',
            borderRadius: 12,
            boxShadow:
              '0px 4px 6px -1px rgba(0,0,0,0.1), 0px 2px 4px -2px rgba(0,0,0,0.1)',
          }}
        >
          {(filterOpen || sortOpen) && (
            <div
              className="fixed inset-0 z-10"
              onClick={() => {
                setFilterOpen(false);
                setSortOpen(false);
              }}
            />
          )}

          <ProductFilters
            filterStatus={filterStatus}
            sortBy={sortBy}
            filterOpen={filterOpen}
            sortOpen={sortOpen}
            onFilterToggle={() => {
              setFilterOpen((current) => !current);
              setSortOpen(false);
            }}
            onSortToggle={() => {
              setSortOpen((current) => !current);
              setFilterOpen(false);
            }}
            onFilterSelect={handleFilterSelect}
            onSortSelect={handleSortSelect}
            startItem={startItem}
            endItem={endItem}
            totalItems={sorted.length}
          />

          <ProductTable products={paged} onDelete={setDeleteTarget} onView={setViewTarget} />

          <Pagination currentPage={safePage} totalPages={totalPages} onPageChange={setPage} />
        </section>
      </div>

      <AddProductModal
        isOpen={addOpen}
        onClose={() => setAddOpen(false)}
        onSubmit={handleAddProduct}
      />

      <ViewProductModal
        isOpen={Boolean(viewTarget)}
        product={viewTarget}
        onClose={() => setViewTarget(null)}
        onUpdate={handleUpdateProduct}
      />

      <DeleteProductModal
        isOpen={Boolean(deleteTarget)}
        product={deleteTarget}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
      />
    </>
  );
}
