'use client';

import { useEffect, useMemo, useState } from 'react';
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
import { apiV1Url } from '@/lib/backendUrl';
import { useToastStore } from '@/store/toastStore';

const PAGE_SIZE = 4;
const ID_PREFIX = 'MG-';

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
const computeNextProductId = (products: Product[]): string => {
  let maxNumber = 0;
  let padLength = 2;

  products.forEach((product) => {
    const match = /^MG-(\d+)$/i.exec(product.sku ?? '');
    if (!match) return;

    const num = parseInt(match[1], 10);
    if (num > maxNumber) {
      maxNumber = num;
      padLength = match[1].length;
    }
  });

  const nextNumber = maxNumber + 1;
  return `${ID_PREFIX}${String(nextNumber).padStart(padLength, '0')}`;
};

export default function ProductsPage() {
  const { products, isLoaded, refreshProducts } = useProducts();
  const { addToast } = useToastStore();

  const [addOpen, setAddOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);
  const [viewTarget, setViewTarget] = useState<Product | null>(null);
  const [editTarget, setEditTarget] = useState<Product | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [productMessage, setProductMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!productMessage) return;

    const timer = window.setTimeout(() => {
      setProductMessage(null);
    }, 3000);

    return () => window.clearTimeout(timer);
  }, [productMessage]);
  const [page, setPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');
  const [sortBy, setSortBy] = useState<SortBy>('default');
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

  const safeProducts = Array.isArray(products) ? products : [];

  const autoProductId = useMemo(() => computeNextProductId(safeProducts), [safeProducts]);

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
      data.append('stock', String(formData.stock));
      data.append('description', formData.description);
      data.append('status', getProductStatus(formData.stock));

      data.append('price', String(formData.price));

      if (formData.primaryImage) {
        data.append('primaryImage', formData.primaryImage);
      }

      formData.galleryImages.forEach((file) => {
        data.append('galleryImages', file);
      });

      const res = await fetch(
        apiV1Url('/api/products'),
        {
          method: 'POST',
          body: data,
        }
      );

      const result = await res.text();

      if (!res.ok) {
        throw new Error(getErrorMessage(result));
      }

      addToast('Product added successfully', 'success');
      setProductMessage('Product added successfully');

      await refreshProducts();
      setAddOpen(false);

      setPage(1);
      setFilterStatus('all');
      setSortBy('default');

      return true;

    } catch (error) {
      addToast(error instanceof Error ? error.message : 'Something went wrong', 'error');
      return false;
    }
  };

  const handleEditProduct = async (formData: ProductFormData) => {
    if (!editTarget) return false;

    try {
      const data = new FormData();

      data.append('productName', formData.name);
      data.append('productId', formData.productId);
      data.append('stock', String(formData.stock));
      data.append('price', String(formData.price));
      data.append('description', formData.description);
      data.append('status', getProductStatus(formData.stock));

      if (formData.primaryImage) {
        data.append('primaryImage', formData.primaryImage);
      }

      const res = await fetch(apiV1Url(`/api/products/${editTarget.id}`), {
        method: 'PUT',
        body: data,
      });

      const result = await res.text();

      if (!res.ok) {
        throw new Error(getErrorMessage(result));
      }
      const removedUrls = formData.removedGalleryUrls ?? [];
      if (removedUrls.length > 0 && editTarget.galleryImagesRaw) {
        const toDelete = editTarget.galleryImagesRaw.filter((img) =>
          removedUrls.includes(img.secure_url),
        );

        await Promise.all(
          toDelete.map(async (img) => {
            const encodedPublicId = encodeURIComponent(img.public_id);
            const deleteRes = await fetch(
              apiV1Url(`/api/products/${editTarget.id}/image/${encodedPublicId}`),
              { method: 'DELETE' },
            );
            if (!deleteRes.ok) {
              const text = await deleteRes.text();
              throw new Error(getErrorMessage(text));
            }
          }),
        );
      }

      if (formData.galleryImages.length > 0) {
        const galleryData = new FormData();
        formData.galleryImages.forEach((file) => {
          galleryData.append('galleryImages', file);
        });

        const galleryRes = await fetch(
          apiV1Url(`/api/products/${editTarget.id}/gallery`),
          {
            method: 'POST',
            body: galleryData,
          },
        );

        if (!galleryRes.ok) {
          const text = await galleryRes.text();
          throw new Error(getErrorMessage(text));
        }
      }
      addToast('Product updated successfully', 'success');
      setProductMessage('Product updated successfully');
      await refreshProducts();
      setEditTarget(null);
      return true;
    } catch (error) {
      addToast(error instanceof Error ? error.message : 'Failed to update product', 'error');
      return false;
    }
  };

  const handleUpdateProduct = async (
    product: Product,
    newStock: string,
  ) => {
    try {
      const updatedStock = Number(newStock);

      let status = 'Out of Stock';

      if (updatedStock > 10) {
        status = 'In Stock';
      } else if (updatedStock > 4) {
        status = 'Low Stock';
      }

      const res = await fetch(
        apiV1Url(`/api/products/${product.id}`),
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            stock: updatedStock,
            status,
          }),
        },
      );

      const result = await res.text();

      if (!res.ok) {
        throw new Error(getErrorMessage(result));
      }

      addToast('Stock updated successfully', 'success');
      setProductMessage('Stock updated successfully');

      await refreshProducts();

      setViewTarget(null);

      return true;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to update stock';
      addToast(message, 'error');
      setProductMessage(message);

      return false;
    }
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;

    setDeleteError(null);
    setIsDeleting(true);

    try {
      const res = await fetch(apiV1Url(`/api/products/${deleteTarget.id}`), {
        method: 'DELETE',
      });

      const result = await res.text();

      if (!res.ok) {
        throw new Error(getErrorMessage(result));
      }

      addToast('Product deleted successfully', 'success');
      setProductMessage('Product deleted successfully');
      await refreshProducts();
      setDeleteTarget(null);
    } catch (error) {
      setDeleteError(error instanceof Error ? error.message : 'Failed to delete product');
    } finally {
      setIsDeleting(false);
    }
  };

  if (!isLoaded) {
    return <div className="p-8">Loading products...</div>;
  }

  return (
    <>
      <div className="flex h-full flex-col px-6 pb-0 pt-6 sm:px-10 sm:pt-8 lg:px-12">
        <ProductHeader onAddClick={() => setAddOpen(true)} />

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

          {productMessage && (
            <div
              className="mx-8 mt-5 rounded-lg px-4 py-3 text-sm font-semibold"
              style={{ background: '#F1F7FF', color: '#002B73', border: '1px solid rgba(0, 43, 115, 0.14)' }}
            >
              {productMessage}
            </div>
          )}

          <ProductTable
            products={paged}
            onDelete={(product) => {
              setDeleteError(null);
              setDeleteTarget(product);
            }}
            onView={setViewTarget}
            onEdit={setEditTarget}
          />

          <Pagination
            currentPage={safePage}
            totalPages={totalPages}
            startItem={startItem}
            endItem={endItem}
            totalItems={sorted.length}
            label="products"
            onPageChange={setPage}
          />
        </section>
      </div>

      <AddProductModal
        isOpen={addOpen}
        onClose={() => setAddOpen(false)}
        onSubmit={handleAddProduct}
        autoProductId={autoProductId}
      />

      <AddProductModal
        isOpen={Boolean(editTarget)}
        onClose={() => setEditTarget(null)}
        onSubmit={handleEditProduct}
        editingProduct={editTarget}
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
        onCancel={() => {
          setDeleteError(null);
          setDeleteTarget(null);
        }}
        onConfirm={confirmDelete}
        error={deleteError}
        isDeleting={isDeleting}
      />
    </>
  );
}