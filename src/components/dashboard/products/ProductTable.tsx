import { Eye, Pencil, Trash2 } from "lucide-react";
import type { Product } from "@/types/product";
import ProductThumb from "./ProductThumb";
import StockBadge from "./StockBadge";

interface ProductTableProps {
  products: Product[];
  onDelete: (product: Product) => void;
  onView: (product: Product) => void;
  onEdit: (product: Product) => void;
}

const columns = [
  { label: "Product ID", className: "w-[13%]" },
  { label: "Product Details", className: "w-[31%]" },
  { label: "Price", className: "w-[15%]" },
  { label: "Image Count", className: "w-[13%]" },
  { label: "Stock Status", className: "w-[16%]" },
  { label: "Actions", className: "w-[14%]" },
];

export default function ProductTable({
  products,
  onDelete,
  onView,
  onEdit,
}: ProductTableProps) {
  if (products.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center px-6 py-16">
        <div className="text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
            <Eye size={22} className="text-slate-400" />
          </div>

          <p className="text-sm font-semibold text-slate-700">
            No products found
          </p>

          <p className="mt-1 text-xs text-slate-500">
            Try changing your filters or add a new product.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-0 flex-1 overflow-hidden">
      <div className="hidden h-full min-h-0 overflow-hidden lg:block">
        <table className="w-full table-fixed border-collapse">
          <thead>
            <tr
              className="bg-slate-100"
              style={{
                borderBottom: "2px solid #F1F5F9",
              }}
            >
              {columns.map((column, index) => (
                <th
                  key={column.label}
                  className={[
                    column.className,
                    "px-4 py-5 text-xs font-bold uppercase xl:px-6",
                    index === 1 ? "text-left" : "text-center",
                  ].join(" ")}
                  style={{
                    color: "#002B73",
                    letterSpacing: "0.06em",
                  }}
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {products.map((product, index) => (
              <tr
                key={`${product.id}-${index}`}
                className="transition-colors hover:bg-slate-50/70"
                style={{
                  borderBottom: "1px solid #E8ECF4",
                }}
              >
                <td
                  className={`${columns[0].className} px-4 py-5 text-center align-middle xl:px-6`}
                >
                  <span
                    className="font-mono text-xs font-medium"
                    style={{
                      color: "#64748B",
                    }}
                  >
                    {product.sku || product.id}
                  </span>
                </td>
                <td
                  className={`${columns[1].className} px-4 py-5 text-left align-middle xl:px-6`}
                >
                  <div className="flex min-w-0 items-center gap-3 xl:gap-4">
                    <div className="shrink-0">
                      <ProductThumb
                        gradient={product.gradient}
                        imageUrl={product.primaryImageUrl}
                        isPopular={product.isPopular}
                      />
                    </div>

                    <div className="min-w-0 max-w-[220px] text-left">
                      <p
                        className="truncate text-sm font-bold leading-5"
                        style={{
                          color: "#002B73",
                        }}
                        title={product.name}
                      >
                        {product.name}
                      </p>

                      {product.series && (
                        <p
                          className="mt-1 truncate text-xs font-medium"
                          style={{
                            color: "#64748B",
                          }}
                          title={product.series}
                        >
                          {product.series}
                        </p>
                      )}
                    </div>
                  </div>
                </td>
                <td
                  className={`${columns[2].className} px-4 py-5 text-center align-middle xl:px-6`}
                >
                  <span
                    className="whitespace-nowrap text-sm font-bold"
                    style={{
                      color: "#1A1C1F",
                    }}
                  >
                    LKR {Number(product.price ?? 0).toFixed(2)}
                  </span>
                </td>
                <td
                  className={`${columns[3].className} px-4 py-5 text-center align-middle xl:px-6`}
                >
                  <span
                    className="inline-flex min-w-8 items-center justify-center rounded-md bg-slate-100 px-2 py-1 text-xs font-bold"
                    style={{
                      color: "#334155",
                    }}
                  >
                    {product.imagecount ?? 0}
                  </span>
                </td>
                <td
                  className={`${columns[4].className} px-4 py-5 text-center align-middle xl:px-6`}
                >
                  <button
                    type="button"
                    onClick={() => onView(product)}
                    className="inline-flex rounded-full transition-transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[#002B73]/20"
                    aria-label={`View ${product.name} stock details`}
                  >
                    <StockBadge
                      status={product.stockStatus}
                      count={product.stockCount}
                    />
                  </button>
                </td>
                <td
                  className={`${columns[5].className} px-4 py-5 text-center align-middle xl:px-6`}
                >
                  <div className="flex items-center justify-center gap-1.5">
                    <ActionButton
                      label="View"
                      onClick={() => onView(product)}
                      icon={<Eye size={18} strokeWidth={2} />}
                      variant="view"
                    />

                    <ActionButton
                      label="Edit"
                      onClick={() => onEdit(product)}
                      icon={<Pencil size={17} strokeWidth={2} />}
                      variant="edit"
                    />

                    <ActionButton
                      label="Delete"
                      onClick={() => onDelete(product)}
                      icon={<Trash2 size={17} strokeWidth={2} />}
                      variant="delete"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="h-full min-h-0 overflow-y-auto bg-[#F8FAFC] px-3 py-3 sm:px-5 sm:py-5 lg:hidden">
        <div className="mx-auto w-full max-w-3xl space-y-3 sm:space-y-4">
          {products.map((product, index) => (
            <article
              key={`${product.id}-responsive-${index}`}
              className="overflow-hidden rounded-xl border bg-white shadow-[0_1px_3px_rgba(15,23,42,0.06)]"
              style={{
                borderColor: "#E2E8F0",
              }}
            >
              <div
                className="flex items-center gap-3 px-3.5 py-3.5 sm:px-5 sm:py-4"
                style={{
                  borderBottom: "1px solid #EEF2F7",
                }}
              >
                {/* Product Image */}
                <div className="shrink-0">
                  <ProductThumb
                    gradient={product.gradient}
                    imageUrl={product.primaryImageUrl}
                    isPopular={product.isPopular}
                  />
                </div>

                {/* Product Name */}
                <div className="min-w-0 flex-1 text-left">
                  <p
                    className="truncate text-sm font-bold leading-5 sm:text-base"
                    style={{
                      color: "#002B73",
                    }}
                    title={product.name}
                  >
                    {product.name}
                  </p>

                  {product.series && (
                    <p
                      className="mt-0.5 truncate text-[11px] font-medium sm:text-xs"
                      style={{
                        color: "#64748B",
                      }}
                      title={product.series}
                    >
                      {product.series}
                    </p>
                  )}
                </div>

                {/* Product ID */}
                <div className="shrink-0 text-right">
                  <p className="mb-0.5 text-[9px] font-bold uppercase tracking-wider text-slate-400">
                    ID
                  </p>

                  <p
                    className="max-w-[75px] truncate font-mono text-[10px] font-semibold sm:max-w-[100px] sm:text-xs"
                    style={{
                      color: "#64748B",
                    }}
                    title={product.sku || product.id}
                  >
                    {product.sku || product.id}
                  </p>
                </div>
              </div>
              <div className="px-3.5 py-3.5 sm:px-5 sm:py-4">
                <div
                  className="grid grid-cols-2 overflow-hidden rounded-lg border"
                  style={{
                    borderColor: "#E8ECF4",
                    background: "#F8FAFC",
                  }}
                >
                  <div
                    className="px-3 py-3.5 text-center sm:px-5 sm:py-4"
                    style={{
                      borderRight: "1px solid #E8ECF4",
                      borderBottom: "1px solid #E8ECF4",
                    }}
                  >
                    <p className="mb-1 text-[9px] font-bold uppercase tracking-[0.08em] text-slate-400 sm:text-[10px]">
                      Price
                    </p>

                    <p
                      className="truncate text-xs font-bold sm:text-sm"
                      style={{
                        color: "#1A1C1F",
                      }}
                      title={`LKR ${Number(product.price ?? 0).toFixed(2)}`}
                    >
                      LKR {Number(product.price ?? 0).toFixed(2)}
                    </p>
                  </div>
                  <div
                    className="px-3 py-3.5 text-center sm:px-5 sm:py-4"
                    style={{
                      borderBottom: "1px solid #E8ECF4",
                    }}
                  >
                    <p className="mb-1 text-[9px] font-bold uppercase tracking-[0.08em] text-slate-400 sm:text-[10px]">
                      Image Count
                    </p>

                    <p
                      className="text-sm font-bold sm:text-base"
                      style={{
                        color: "#1A1C1F",
                      }}
                    >
                      {product.imagecount ?? 0}
                    </p>
                  </div>
                  <div className="col-span-2 px-3 py-3.5 text-center sm:px-5 sm:py-4">
                    <p className="mb-2 text-[9px] font-bold uppercase tracking-[0.08em] text-slate-400 sm:text-[10px]">
                      Stock Status
                    </p>

                    <button
                      type="button"
                      onClick={() => onView(product)}
                      className="inline-flex rounded-full transition-transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[#002B73]/20"
                      aria-label={`View ${product.name} stock details`}
                    >
                      <StockBadge
                        status={product.stockStatus}
                        count={product.stockCount}
                      />
                    </button>
                  </div>
                </div>
              </div>
              <div
                className="grid grid-cols-3 gap-2 px-3.5 pb-3.5 sm:px-5 sm:pb-4"
              >
                <ResponsiveActionButton
                  label="View"
                  onClick={() => onView(product)}
                  icon={<Eye size={16} strokeWidth={2} />}
                  variant="view"
                />

                <ResponsiveActionButton
                  label="Edit"
                  onClick={() => onEdit(product)}
                  icon={<Pencil size={15} strokeWidth={2} />}
                  variant="edit"
                />

                <ResponsiveActionButton
                  label="Delete"
                  onClick={() => onDelete(product)}
                  icon={<Trash2 size={15} strokeWidth={2} />}
                  variant="delete"
                />
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
interface ActionButtonProps {
  label: string;
  onClick: () => void;
  icon: React.ReactNode;
  variant: "view" | "edit" | "delete";
}

function ActionButton({
  label,
  onClick,
  icon,
  variant,
}: ActionButtonProps) {
  const variantClasses = {
    view: "text-[#002B73] hover:bg-blue-50",
    edit: "text-slate-600 hover:bg-slate-100",
    delete: "text-[#BC0000] hover:bg-red-50",
  };

  return (
    <button
      type="button"
      onClick={onClick}
      title={label}
      aria-label={label}
      className={[
        "flex h-10 w-10 items-center justify-center rounded-lg",
        "transition-colors duration-150",
        "focus:outline-none focus:ring-2 focus:ring-[#002B73]/20",
        variantClasses[variant],
      ].join(" ")}
    >
      {icon}
    </button>
  );
}

interface ResponsiveActionButtonProps {
  label: string;
  onClick: () => void;
  icon: React.ReactNode;
  variant: "view" | "edit" | "delete";
}

function ResponsiveActionButton({
  label,
  onClick,
  icon,
  variant,
}: ResponsiveActionButtonProps) {
  const variantClasses = {
    view: "border-[#D8E4F5] bg-[#F4F8FF] text-[#002B73] hover:bg-[#EAF2FF]",
    edit: "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100",
    delete: "border-red-100 bg-red-50 text-[#BC0000] hover:bg-red-100",
  };

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={[
        "flex h-10 w-full min-w-0 items-center justify-center gap-1.5",
        "rounded-lg border px-2 text-[11px] font-semibold",
        "transition-colors duration-150",
        "focus:outline-none focus:ring-2 focus:ring-[#002B73]/20",
        "sm:h-11 sm:gap-2 sm:px-3 sm:text-xs",
        variantClasses[variant],
      ].join(" ")}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}