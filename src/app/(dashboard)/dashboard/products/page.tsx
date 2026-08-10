"use client";

import { useEffect, useMemo, useState } from "react";
import DeleteProductModal from "@/components/dashboard/products/DeleteProductModal";
import AddProductModal from "@/components/dashboard/products/AddProductModal";
import ViewProductModal from "@/components/dashboard/products/ViewProductModal";
import ProductHeader from "@/components/dashboard/products/ProductHeader";
import ProductStats from "@/components/dashboard/products/ProductStats";
import ProductFilters, {
  type FilterStatus,
  type SortBy,
} from "@/components/dashboard/products/ProductFilters";
import ProductTable from "@/components/dashboard/products/ProductTable";
import Pagination from "@/components/dashboard/shared/Pagination";
import { useProducts } from "@/hooks/useProducts";
import type { Product, ProductFormData } from "@/types/product";
import { apiV1Url } from "@/lib/backendUrl";
import { useToastStore } from "@/store/toastStore";

const PAGE_SIZE = 3;
const ID_PREFIX = "MG-";

type MessageType = "success" | "error";

const getProductStatus = (stock: number) => {
  if (stock > 10) return "In Stock";
  if (stock > 0) return "Low Stock";
  return "Out of Stock";
};

const getErrorMessage = (responseText: string) => {
  try {
    const parsed = JSON.parse(responseText);
    return parsed.message || parsed.error || responseText;
  } catch {
    return responseText || "Something went wrong";
  }
};
const computeNextProductId = (products: Product[]): string => {
  let maxNumber = 0;
  let padLength = 2;

  products.forEach((product) => {
    const match = /^MG-(\d+)$/i.exec(product.sku ?? "");
    if (!match) return;

    const num = parseInt(match[1], 10);
    if (num > maxNumber) {
      maxNumber = num;
      padLength = match[1].length;
    }
  });

  const nextNumber = maxNumber + 1;
  return `${ID_PREFIX}${String(nextNumber).padStart(padLength, "0")}`;
};

// Small inline icons so this file has no new dependencies.
const CheckIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 20 20"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M16.6 5.6 8.25 14 3.4 9.15"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const AlertIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 20 20"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M10 6.5v4.25M10 13.75h.008M10 2.5c-.53 0-1.02.28-1.29.75L2.9 13.9c-.55.94.12 2.1 1.2 2.1h11.8c1.08 0 1.75-1.16 1.2-2.1L11.29 3.25A1.48 1.48 0 0 0 10 2.5Z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CloseIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 20 20"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M5 5l10 10M15 5 5 15"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

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
  const [messageType, setMessageType] = useState<MessageType>("success");

  const showMessage = (text: string, type: MessageType = "success") => {
    setMessageType(type);
    setProductMessage(text);
  };

  useEffect(() => {
    if (!productMessage) return;

    const timer = window.setTimeout(() => {
      setProductMessage(null);
    }, 3000);

    return () => window.clearTimeout(timer);
  }, [productMessage]);
  const [page, setPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all");
  const [sortBy, setSortBy] = useState<SortBy>("default");
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

  const safeProducts = Array.isArray(products) ? products : [];

  const autoProductId = useMemo(
    () => computeNextProductId(safeProducts),
    [safeProducts],
  );

  const filtered =
    filterStatus === "all"
      ? safeProducts
      : safeProducts.filter((product) => product.stockStatus === filterStatus);

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "name-asc") return a.name.localeCompare(b.name);
    if (sortBy === "name-desc") return b.name.localeCompare(a.name);
    if (sortBy === "price-asc") return a.price - b.price;
    if (sortBy === "price-desc") return b.price - a.price;
    if (sortBy === "stock-asc") return a.stockCount - b.stockCount;
    if (sortBy === "stock-desc") return b.stockCount - a.stockCount;
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

      data.append("productName", formData.name);
      data.append("productId", formData.productId);
      data.append("stock", String(formData.stock));
      data.append("description", formData.description);
      data.append("status", getProductStatus(formData.stock));

      data.append("price", String(formData.price));
      data.append("imagecount", String(formData.imagecount));

      if (formData.primaryImage) {
        data.append("primaryImage", formData.primaryImage);
      }

      formData.galleryImages.forEach((file) => {
        data.append("galleryImages", file);
      });

      const res = await fetch(apiV1Url("/api/products"), {
        method: "POST",
        body: data,
      });

      const result = await res.text();

      if (!res.ok) {
        throw new Error(getErrorMessage(result));
      }

      addToast("Product added successfully", "success");
      showMessage("Product added successfully", "success");

      await refreshProducts();
      setAddOpen(false);

      setPage(1);
      setFilterStatus("all");
      setSortBy("default");

      return true;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Something went wrong";
      addToast(message, "error");
      showMessage(message, "error");
      return false;
    }
  };

  const handleEditProduct = async (formData: ProductFormData) => {
    if (!editTarget) return false;

    try {
      const data = new FormData();

      data.append("productName", formData.name);
      data.append("productId", formData.productId);
      data.append("stock", String(formData.stock));
      data.append("price", String(formData.price));
      data.append("imagecount", String(formData.imagecount));
      data.append("description", formData.description);
      data.append("status", getProductStatus(formData.stock));

      if (formData.primaryImage) {
        data.append("primaryImage", formData.primaryImage);
      }

      const res = await fetch(apiV1Url(`/api/products/${editTarget.id}`), {
        method: "PUT",
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
              apiV1Url(
                `/api/products/${editTarget.id}/image/${encodedPublicId}`,
              ),
              { method: "DELETE" },
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
          galleryData.append("galleryImages", file);
        });

        const galleryRes = await fetch(
          apiV1Url(`/api/products/${editTarget.id}/gallery`),
          {
            method: "POST",
            body: galleryData,
          },
        );

        if (!galleryRes.ok) {
          const text = await galleryRes.text();
          throw new Error(getErrorMessage(text));
        }
      }
      addToast("Product updated successfully", "success");
      showMessage("Product updated successfully", "success");
      await refreshProducts();
      setEditTarget(null);
      return true;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to update product";
      addToast(message, "error");
      showMessage(message, "error");
      return false;
    }
  };

  const handleUpdateProduct = async (product: Product, newStock: string) => {
    try {
      const updatedStock = Number(newStock);

      let status = "Out of Stock";

      if (updatedStock > 10) {
        status = "In Stock";
      } else if (updatedStock > 4) {
        status = "Low Stock";
      }

      const res = await fetch(apiV1Url(`/api/products/${product.id}`), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          stock: updatedStock,
          status,
        }),
      });

      const result = await res.text();

      if (!res.ok) {
        throw new Error(getErrorMessage(result));
      }

      addToast("Stock updated successfully", "success");
      showMessage("Stock updated successfully", "success");

      await refreshProducts();

      setViewTarget(null);

      return true;
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to update stock";
      addToast(message, "error");
      showMessage(message, "error");

      return false;
    }
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;

    setDeleteError(null);
    setIsDeleting(true);

    try {
      const res = await fetch(apiV1Url(`/api/products/${deleteTarget.id}`), {
        method: "DELETE",
      });

      const result = await res.text();

      if (!res.ok) {
        throw new Error(getErrorMessage(result));
      }

      addToast("Product deleted successfully", "success");
      showMessage("Product deleted successfully", "success");
      await refreshProducts();
      setDeleteTarget(null);
    } catch (error) {
      setDeleteError(
        error instanceof Error ? error.message : "Failed to delete product",
      );
    } finally {
      setIsDeleting(false);
    }
  };

  if (!isLoaded) {
    return (
      <div className="flex h-full items-center justify-center p-8">
        <div className="flex items-center gap-3 text-sm font-medium text-slate-500">
          <span
            className="h-4 w-4 animate-spin rounded-full border-2 border-[#C3C6D4] border-t-[#002B73]"
            aria-hidden="true"
          />
          Loading products…
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex h-full flex-col bg-[#F7F8FB] px-6 pb-0 pt-6 sm:px-10 sm:pt-8 lg:px-12">
        <ProductHeader onAddClick={() => setAddOpen(true)} />

        <section className="mb-0 flex flex-1 flex-col overflow-hidden rounded-xl border border-[#C3C6D4] bg-white shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-2px_rgba(0,0,0,0.1)]">
          {/* Brand accent rail ties the panel back to the #002B73 identity without competing with row content */}
          <div className="h-1 w-full shrink-0 bg-gradient-to-r from-[#002B73] via-[#0A3E96] to-[#002B73]" />

          {productMessage && (
            <div
              role="status"
              className={[
                "mx-8 mt-5 flex items-center justify-between gap-3 rounded-lg border px-4 py-3 text-sm font-semibold",
                "animate-in fade-in slide-in-from-top-1 duration-200",
                messageType === "success"
                  ? "border-[#002B73]/15 bg-[#F1F7FF] text-[#002B73]"
                  : "border-[#B3261E]/20 bg-[#FDECEC] text-[#8C1D18]",
              ].join(" ")}
            >
              <span className="flex items-center gap-2">
                <span
                  className={[
                    "flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
                    messageType === "success"
                      ? "bg-[#002B73] text-white"
                      : "bg-[#B3261E] text-white",
                  ].join(" ")}
                >
                  {messageType === "success" ? <CheckIcon /> : <AlertIcon />}
                </span>
                {productMessage}
              </span>
              <button
                type="button"
                onClick={() => setProductMessage(null)}
                aria-label="Dismiss message"
                className="shrink-0 rounded-md p-1 text-current/70 transition hover:bg-black/5 hover:text-current"
              >
                <CloseIcon />
              </button>
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