'use client';

import { useState } from 'react';
import DeleteProductModal from '@/components/dashboard/products/DeleteProductModal';
import AddProductModal from '@/components/dashboard/products/AddProductModal';
import ViewProductModal from '@/components/dashboard/products/ViewProductModal';
import ProductHeader from '@/components/dashboard/products/ProductHeader';
import ProductStats from '@/components/dashboard/products/ProductStats';
import ProductFilters, {
  type FilterStatus,
  type SortBy,
} from '@/components/dashboard/products/ProductFilters';
import ProductTable from '@/components/dashboard/products/ProductTable';
import Pagination from '@/components/dashboard/shared/Pagination';
import { useProducts } from '@/hooks/useProducts';
import type { Product, ProductFormData } from '@/types/product';

const PAGE_SIZE = 4;

export default function ProductsPage() {
  const { products, setProducts, addProduct, updateProduct, deleteProduct } = useProducts();
  const [addOpen, setAddOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);
  const [viewTarget, setViewTarget] = useState<Product | null>(null);
  const [page, setPage] = useState(1);
  const [filterStatus, setFilterStatus] =
    useState<FilterStatus>('all');
  const [sortBy, setSortBy] = useState<SortBy>('default');
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

  const filtered =
    filterStatus === 'all'
      ? products
      : products.filter(
          (product) => product.stockStatus === filterStatus
        );

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
    if (sortBy === 'name-desc') return b.name.localeCompare(a.name);
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'stock-asc') return a.stockCount - b.stockCount;
    if (sortBy === 'stock-desc') return b.stockCount - a.stockCount;
    return 0;
  });

  const totalPages = Math.max(
    1,
    Math.ceil(sorted.length / PAGE_SIZE)
  );

  const safePage = Math.min(page, totalPages);

  const paged = sorted.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE
  );

  const startItem =
    sorted.length === 0
      ? 0
      : (safePage - 1) * PAGE_SIZE + 1;

  const endItem = Math.min(
    safePage * PAGE_SIZE,
    sorted.length
  );

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

  const fileToDataUrl = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const handleAddProduct = async (formData: ProductFormData) => {
    const primaryImageUrl = formData.primaryImage
      ? await fileToDataUrl(formData.primaryImage)
      : undefined;

    const galleryImageUrls = await Promise.all(
      formData.galleryImages.map((file) => fileToDataUrl(file))
    );

    const newProduct: Product = {
      id: `PRD-${String(products.length + 1).padStart(3, '0')}`,
      sku:
        formData.productId ||
        `SKU-${String(products.length + 1).padStart(3, '0')}`,
      name: formData.name,
      series: formData.category,
      price: formData.price,
      stockCount: formData.stock,
      stockStatus:
        formData.stock > 50
          ? 'in-stock'
          : formData.stock > 0
          ? 'low-stock'
          : 'out-of-stock',
      gradient: 'from-blue-400 to-purple-500',
      primaryImageUrl,
      galleryImageUrls,
      description: formData.description,
      size: '8x10',
      finish: 'Matte',
      warehouseLocation: 'Section A-12',
      warehouseCenter: 'Main Distribution Center',
      lastUpdatedBy: 'Admin',
      lastUpdatedDate: new Date().toLocaleDateString(),
    };

    addProduct(newProduct);
    setAddOpen(false);
  };

  const handleUpdateProduct = (
    product: Product,
    newStatus: string
  ) => {
    const statusMap: Record<
      string,
      Product['stockStatus']
    > = {
      'In Stock': 'in-stock',
      'Low Stock': 'low-stock',
      'Out of Stock': 'out-of-stock',
    };

    updateProduct(product.id, {
      stockStatus:
        statusMap[newStatus] ?? product.stockStatus,
    });
  };

  const confirmDelete = () => {
    if (!deleteTarget) return;

    deleteProduct(deleteTarget.id);

    // Adjust page if needed after deletion
    if (page > 1) {
      const newLength = products.length - 1;
      const newTotalPages = Math.max(1, Math.ceil(newLength / PAGE_SIZE));
      if (page > newTotalPages) {
        setPage(newTotalPages);
      }
    }

    setDeleteTarget(null);
  };

  return (
    <>
      <div className="ml-[100px] flex h-full flex-col px-4 pb-0 pt-6 sm:px-8 sm:pt-8">
        <ProductHeader onAddClick={() => setAddOpen(true)} />

        <ProductStats />

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

          <ProductTable
            products={paged}
            onDelete={setDeleteTarget}
            onView={setViewTarget}
          />

          <Pagination
            currentPage={safePage}
            totalPages={totalPages}
            onPageChange={setPage}
          />
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