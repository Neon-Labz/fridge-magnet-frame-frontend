"use client";
import { useEffect, useState } from "react";
import {
  X,
  ShoppingBag,
  List,
  Truck,
  Mail,
  Phone,
  MapPin,
  ChevronDown,
  Check,
  Loader2,
} from "lucide-react";
import { useToastStore } from "@/store/toastStore";
import { mapApiOrder, statusToApi } from "@/lib/orders";
import { apiV1Url } from "@/lib/backendUrl";
import { getProductLineTotal } from "@/lib/productQuantityRules";
import type { Order, OrderStatus as OrderStatusType } from "@/types/order";

type OrderWithMongoId = Order & { _id?: string };

type OrderStatusProps = {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
  /** Called with the fresh order after a successful backend update, so the parent list can refresh */
  onUpdated?: (order: Order) => void;
};

const STATUS_OPTIONS: OrderStatusType[] = [
  "pending",
  "processing",
  "shipped",
  "delivered",
  "canceled",
];

const STATUS_RANK: Record<OrderStatusType, number> = {
  pending: 0,
  processing: 1,
  shipped: 2,
  delivered: 3,
  canceled: 4,
};

function getStatusStyle(status: string) {
  switch (status) {
    case "delivered":
      return { bg: "#DCFCE7", text: "#15803D" };
    case "shipped":
      return { bg: "#DBEAFE", text: "#1D4ED8" };
    case "processing":
      return { bg: "#FEF3C7", text: "#B45309" };
    case "pending":
      return { bg: "#F1F5F9", text: "#475569" };
    case "canceled":
      return { bg: "#FEE2E2", text: "#B91C1C" };
    default:
      return { bg: "#F1F5F9", text: "#475569" };
  }
}

function formatPlacedOn(dateInput?: string) {
  if (!dateInput) return "-";
  const date = new Date(dateInput);
  if (Number.isNaN(date.getTime())) return "-";
  const datePart = date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const timePart = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return `${datePart} · ${timePart}`;
}

export default function OrderStatus({
  order,
  isOpen,
  onClose,
  onUpdated,
}: OrderStatusProps) {
  const { addToast } = useToastStore();

  const [currentOrder, setCurrentOrder] = useState<OrderWithMongoId | null>(
    order,
  );
  const [statusMenuOpen, setStatusMenuOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [adminNote, setAdminNote] = useState("");

  // Keep local order in sync whenever a different order is opened
  useEffect(() => {
    setCurrentOrder(order);
    setAdminNote(order?.adminNote || "");
  }, [order?.id, order?._id]);

  // Handle escape key to close
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen || !currentOrder) return null;

  const items = currentOrder.items || [];

  const subtotal = items.reduce(
    (sum, item) =>
      sum + getProductLineTotal(item.price, item.quantity, item.name),
    0,
  );

  const totalAmount = currentOrder.totalValue ?? subtotal;
  const shippingCost = Math.max(0, totalAmount - subtotal);

  const itemLineCount = items.length;
  const totalUnitsCount = items.reduce(
    (sum, item) => sum + (item.quantity || 0),
    0,
  );

  const statusStyle = getStatusStyle(currentOrder.status);
  const mongoOrderId = currentOrder._id || currentOrder.id;

  const handleStatusSelect = async (newStatus: OrderStatusType) => {
    setStatusMenuOpen(false);

    if (newStatus === currentOrder.status) return;

    if (!mongoOrderId) {
      addToast("Order ID missing. Cannot update status.", "error");
      return;
    }

    setSaving(true);

    try {
      const response = await fetch(
        apiV1Url(`/orders/${mongoOrderId}/status`),
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            status: statusToApi(newStatus),
            adminNote: adminNote.trim() || undefined,
          }),
        },
      );

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data?.message || `Update failed: ${response.status}`);
      }

      const rawData = await response.json();
      const updatedOrder = mapApiOrder(rawData);

      setCurrentOrder(updatedOrder);
      setAdminNote(updatedOrder.adminNote || "");
      onUpdated?.(updatedOrder);

      addToast("Order updated successfully.", "success");
    } catch (err) {
      addToast(
        err instanceof Error ? err.message : "Failed to update order status",
        "error",
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[200] bg-black/45 backdrop-blur-sm"
        onClick={onClose}
        role="presentation"
      />

      {/* Modal */}
      <div className="fixed inset-0 z-[200] flex items-center justify-center px-4 py-6 sm:px-6">
        <div
          className="relative flex w-full max-w-[680px] max-h-[90vh] flex-col overflow-hidden rounded-2xl bg-white shadow-[0px_20px_40px_rgba(0,0,0,0.18)]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Fixed Header */}
          <div className="shrink-0 border-b border-[#EEF1F5] px-5 py-4 sm:px-8 sm:py-5">
            <div className="flex items-start justify-between gap-3">
              {/* Order ID */}
              <h1 className="min-w-0 flex-1 break-words pt-1 text-[24px] font-bold leading-6 text-[#1A1C1F] sm:text-[26px] sm:leading-7">
                Order #{currentOrder.orderId}
              </h1>

              {/* Close */}
              {/* <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-[#64748B] transition hover:bg-slate-100 hover:text-[#1A1C1F]"
              >
                <X size={19} strokeWidth={1.8} />
              </button> */}
            </div>

            {/* Status row */}
            <div className="mt-3 flex items-center gap-2">
              <span
                className="inline-flex h-9 items-center gap-1.5 whitespace-nowrap rounded-md px-3.5 text-[13px] font-bold capitalize ring-1 ring-inset sm:text-[15px]"
                style={{
                  background: statusStyle.bg,
                  color: statusStyle.text,
                  boxShadow: `0 0 0 1px ${statusStyle.text}20`,
                }}
              >
                {saving ? (
                  <Loader2 size={13} className="animate-spin" />
                ) : (
                  <>
                    {currentOrder.status}
                    <Check size={12} strokeWidth={2.8} />
                  </>
                )}
              </span>

              <div className="relative">
                <button
                  type="button"
                  onClick={() => setStatusMenuOpen((v) => !v)}
                  disabled={saving}
                  className="inline-flex h-9 items-center gap-1 whitespace-nowrap rounded-md bg-[#002B73] px-3.5 text-[13px] font-semibold leading-none text-white transition hover:bg-[#001F52] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving ? "Updating..." : "Update Status"}
                  <ChevronDown size={12} strokeWidth={2.5} />
                </button>

                {statusMenuOpen && (
                  <>
                    {/* click-away layer */}
                    <div
                      className="fixed inset-0 z-20"
                      onClick={() => setStatusMenuOpen(false)}
                      role="presentation"
                    />
                    <div className="absolute left-0 top-full z-30 mt-1.5 w-40 overflow-hidden rounded-lg border border-[#E1E5EE] bg-white shadow-lg">
                      {STATUS_OPTIONS.map((s) => {
                        const isDisabled =
                          STATUS_RANK[s] < STATUS_RANK[currentOrder.status];

                        return (
                          <button
                            key={s}
                            type="button"
                            disabled={isDisabled}
                            title={
                              isDisabled
                                ? "Cannot move order status backward"
                                : undefined
                            }
                            onClick={() => handleStatusSelect(s)}
                            className={`flex w-full items-center justify-between px-3 py-2 text-left text-xs font-medium capitalize ${
                              isDisabled
                                ? "cursor-not-allowed text-[#B0B4BE]"
                                : "text-[#1A1C1F] hover:bg-slate-50"
                            }`}
                          >
                            {s}
                            {currentOrder.status === s && (
                              <Check size={13} className="text-[#002B73]" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </>
                )}
              </div>
            </div>

            <p className="mt-2.5 text-xs text-[#8A8D99] sm:text-sm">
              Order placed on {formatPlacedOn(currentOrder.createdAt)}
            </p>
          </div>

          {/* Scrollable Content */}
          <div className="overflow-y-auto px-5 pb-6 sm:px-8 sm:pb-8">
            <div className="pt-6 space-y-6">
              {/* ORDER ITEMS */}
              <div>
                <h3 className="mb-3 flex items-center gap-2 text-[12px] font-extrabold tracking-[1.5px] text-[#002B73] sm:text-sm">
                  <ShoppingBag size={15} strokeWidth={2.2} />
                  ORDER ITEMS
                </h3>

                <div className="overflow-hidden rounded-xl border border-[#E1E5EE]">
                  <div
                    className="grid grid-cols-[1fr_60px_100px] gap-2 px-4 py-2.5 text-[10px] font-bold uppercase tracking-wide text-[#8A8D99] sm:text-[11px]"
                    style={{ background: "#F7F8FB" }}
                  >
                    <span>Product</span>
                    <span className="text-center">Qty</span>
                    <span className="text-right">Total</span>
                  </div>

                  <div className="divide-y divide-[#EEF1F5]">
                    {items.map((item, index) => (
                      <div
                        key={`${item.productId || item.name}-${index}`}
                        className="grid grid-cols-[1fr_60px_100px] items-center gap-2 px-4 py-3"
                      >
                        <div className="flex min-w-0 items-center gap-3">
                          <div className="h-11 w-11 shrink-0 overflow-hidden rounded-lg bg-slate-100">
                            <img
                              src={item.image || "/home-product-1.png"}
                              alt={item.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="min-w-0">
                            <p className="truncate text-xs font-bold text-[#1A1C1F] sm:text-sm">
                              {item.name}
                            </p>
                            {item.productId && (
                              <p className="truncate text-[10px] text-[#8A8D99] sm:text-xs">
                                SKU: {item.productId}
                              </p>
                            )}
                          </div>
                        </div>

                        <span className="text-center text-xs font-semibold text-[#1A1C1F] sm:text-sm">
                          {item.quantity}
                        </span>

                        <span className="text-right text-xs font-bold text-[#1A1C1F] sm:text-sm">
                          Rs{" "}
                          {getProductLineTotal(
                            item.price,
                            item.quantity,
                            item.name,
                          ).toFixed(2)}
                        </span>
                      </div>
                    ))}

                    {!items.length && (
                      <div className="px-4 py-6 text-center text-xs font-semibold text-[#8A8D99]">
                        No item details saved for this order.
                      </div>
                    )}
                  </div>

                  {items.length > 0 && (
                    <div
                      className="flex items-center justify-between px-4 py-2.5 text-xs font-semibold sm:text-sm"
                      style={{ background: "#EEF3FF", color: "#002B73" }}
                    >
                      <span>
                        {itemLineCount} item{itemLineCount !== 1 ? "s" : ""} in
                        this order
                      </span>
                      <span>Total Items: {totalUnitsCount}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* FINANCIAL SUMMARY */}
              <div>
                <h3 className="mb-3 flex items-center gap-2 text-[12px] font-extrabold tracking-[1.5px] text-[#002B73] sm:text-sm">
                  <List size={15} strokeWidth={2.2} />
                  FINANCIAL SUMMARY
                </h3>

                <div className="rounded-xl border border-[#E1E5EE] px-4 py-4 sm:px-5 sm:py-5">
                  <div className="flex items-center justify-between py-1.5 text-xs sm:text-sm">
                    <span className="text-[#64748B]">Subtotal</span>
                    <span className="font-semibold text-[#1A1C1F]">
                      Rs {subtotal.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-1.5 text-xs sm:text-sm">
                    <span className="text-[#64748B]">Shipping Cost</span>
                    <span className="font-semibold text-[#1A1C1F]">
                      Rs {shippingCost.toFixed(2)}
                    </span>
                  </div>

                  <div className="mt-2 flex items-center justify-between border-t border-[#EEF1F5] pt-3">
                    <span className="text-sm font-bold text-[#1A1C1F] sm:text-base">
                      Total Amount
                    </span>
                    <span className="text-lg font-extrabold text-[#002B73] sm:text-xl">
                      Rs {totalAmount.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* SHIPPING DETAILS */}
              <div>
                <h3 className="mb-3 flex items-center gap-2 text-[12px] font-extrabold tracking-[1.5px] text-[#002B73] sm:text-sm">
                  <Truck size={15} strokeWidth={2.2} />
                  SHIPPING DETAILS
                </h3>

                <div className="rounded-xl border border-[#E1E5EE] px-4 py-4 sm:px-5 sm:py-5">
                  <p className="text-sm font-bold text-[#1A1C1F] sm:text-base">
                    {currentOrder.customerName || "-"}
                  </p>

                  <div className="mt-3 space-y-2.5 border-t border-[#EEF1F5] pt-3">
                    <div className="flex items-center gap-2.5 text-xs text-[#434652] sm:text-sm">
                      <Mail size={15} className="shrink-0 text-[#8A8D99]" />
                      <span className="truncate">
                        {currentOrder.email || "-"}
                      </span>
                    </div>

                    <div className="flex items-center gap-2.5 text-xs text-[#434652] sm:text-sm">
                      <Phone size={15} className="shrink-0 text-[#8A8D99]" />
                      <span>{currentOrder.phone || "-"}</span>
                    </div>
                  </div>

                  <div className="mt-3 flex items-start gap-2.5 border-t border-[#EEF1F5] pt-3 text-xs text-[#434652] sm:text-sm">
                    <MapPin
                      size={15}
                      className="mt-0.5 shrink-0 text-[#8A8D99]"
                    />
                    <span className="break-words">
                      {currentOrder.shippingAddress || "-"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Fixed Footer */}
          <div className="shrink-0 flex justify-end border-t border-[#EEF1F5] px-5 py-4 sm:px-8">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg px-5 py-2.5 text-sm font-semibold text-white transition"
              style={{ background: "#BC0000" }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
}










// "use client";
// import { useEffect, useState } from "react";
// import {
//   X,
//   ShoppingBag,
//   List,
//   Truck,
//   Mail,
//   Phone,
//   MapPin,
//   ChevronDown,
//   Check,
// } from "lucide-react";
// import { getProductLineTotal } from "@/lib/productQuantityRules";
// import type { Order, OrderStatus as OrderStatusType } from "@/types/order";

// type OrderStatusProps = {
//   order: Order | null;
//   isOpen: boolean;
//   onClose: () => void;
//   onStatusChange?: (order: Order, status: OrderStatusType) => void;
// };

// const STATUS_OPTIONS: OrderStatusType[] = [
//   "pending",
//   "processing",
//   "shipped",
//   "delivered",
//   "canceled",
// ];

// function getStatusStyle(status: string) {
//   switch (status) {
//     case "delivered":
//       return { bg: "#DCFCE7", text: "#15803D" };
//     case "shipped":
//       return { bg: "#DBEAFE", text: "#1D4ED8" };
//     case "processing":
//       return { bg: "#FEF3C7", text: "#B45309" };
//     case "pending":
//       return { bg: "#F1F5F9", text: "#475569" };
//     case "canceled":
//       return { bg: "#FEE2E2", text: "#B91C1C" };
//     default:
//       return { bg: "#F1F5F9", text: "#475569" };
//   }
// }

// function formatPlacedOn(dateInput?: string) {
//   if (!dateInput) return "-";
//   const date = new Date(dateInput);
//   if (Number.isNaN(date.getTime())) return "-";
//   const datePart = date.toLocaleDateString("en-US", {
//     month: "long",
//     day: "numeric",
//     year: "numeric",
//   });
//   const timePart = date.toLocaleTimeString("en-US", {
//     hour: "2-digit",
//     minute: "2-digit",
//   });
//   return `${datePart} · ${timePart}`;
// }

// export default function OrderStatus({
//   order,
//   isOpen,
//   onClose,
//   onStatusChange,
// }: OrderStatusProps) {
//   const [statusMenuOpen, setStatusMenuOpen] = useState(false);
//   const [currentStatus, setCurrentStatus] = useState<OrderStatusType>(
//     order?.status ?? "pending",
//   );

//   // Keep local status in sync when a different order is opened
//   useEffect(() => {
//     if (order) {
//       setCurrentStatus(order.status);
//     }
//   }, [order?.status, order?.orderId]);

//   // Handle escape key to close
//   useEffect(() => {
//     const handleEsc = (e: KeyboardEvent) => {
//       if (e.key === "Escape") onClose();
//     };
//     if (isOpen) {
//       document.addEventListener("keydown", handleEsc);
//       document.body.style.overflow = "hidden";
//     }
//     return () => {
//       document.removeEventListener("keydown", handleEsc);
//       document.body.style.overflow = "unset";
//     };
//   }, [isOpen, onClose]);

//   if (!isOpen || !order) return null;

//   const currentOrder = order;
//   const items = currentOrder.items || [];

//   const subtotal = items.reduce(
//     (sum, item) =>
//       sum + getProductLineTotal(item.price, item.quantity, item.name),
//     0,
//   );

//   const totalAmount = currentOrder.totalValue ?? subtotal;
//   const shippingCost = Math.max(0, totalAmount - subtotal);

//   const itemLineCount = items.length;
//   const totalUnitsCount = items.reduce(
//     (sum, item) => sum + (item.quantity || 0),
//     0,
//   );

//   const statusStyle = getStatusStyle(currentStatus);

//   const handleStatusSelect = (s: OrderStatusType) => {
//     setCurrentStatus(s); // auto update UI immediately
//     setStatusMenuOpen(false);
//     onStatusChange?.(currentOrder, s);
//   };

//   return (
//     <>
//       {/* Backdrop */}
//       <div
//         className="fixed inset-0 z-[200] bg-black/45 backdrop-blur-sm"
//         onClick={onClose}
//         role="presentation"
//       />

//       {/* Modal */}
//       <div className="fixed inset-0 z-[200] flex items-center justify-center px-4 py-6 sm:px-6">
//         <div
//           className="relative flex w-full max-w-[680px] max-h-[90vh] flex-col overflow-hidden rounded-2xl bg-white shadow-[0px_20px_40px_rgba(0,0,0,0.18)]"
//           onClick={(e) => e.stopPropagation()}
//         >
//           {/* Fixed Header */}
//           <div className="shrink-0 border-b border-[#EEF1F5] px-5 py-4 sm:px-8 sm:py-5">
//             <div className="flex items-start justify-between gap-3">
//               {/* Order ID */}
//               <h1 className="min-w-0 flex-1 break-words text-[24px] pt-1 font-bold leading-6 text-[#1A1C1F] sm:text-[26px] sm:leading-7">
//                 Order #{currentOrder.orderId}
//               </h1>

//               {/* Close */}
//               {/* <button
//                 type="button"
//                 onClick={onClose}
//                 aria-label="Close"
//                 className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[#64748B] transition hover:bg-slate-100 hover:text-[#1A1C1F] sm:h-9 sm:w-9"
//               >
//                 <X size={19} strokeWidth={1.8} />
//               </button> */}
//             </div>

//             {/* Status row */}
//             <div className="mt-3 flex items-center gap-2">
//               <span
//                 className="inline-flex h-10 items-center gap-1.5 whitespace-nowrap rounded-md px-3 text-[13px] font-bold capitalize ring-1 ring-inset sm:h-9 sm:px-3.5 sm:text-[15px]"
//                 style={{
//                   background: statusStyle.bg,
//                   color: statusStyle.text,
//                   boxShadow: `0 0 0 1px ${statusStyle.text}20`,
//                 }}
//               >
//                 {currentStatus}
//                 <Check size={12} strokeWidth={2.8} />
//               </span>

//               <div className="relative">
//                 <button
//                   type="button"
//                   onClick={() => setStatusMenuOpen((v) => !v)}
//                   className="inline-flex h-6 items-center gap-1 whitespace-nowrap rounded-md bg-[#002B73] px-3 text-[12px] font-semibold leading-none text-white transition hover:bg-[#001F52] sm:h-9 sm:px-3.5 sm:text-[15px]"
//                 >
//                   Update Status
//                   <ChevronDown size={12} strokeWidth={2.5} />
//                 </button>

//                 {statusMenuOpen && (
//                   <>
//                     {/* click-away layer */}
//                     <div
//                       className="fixed inset-0 z-20"
//                       onClick={() => setStatusMenuOpen(false)}
//                       role="presentation"
//                     />
//                     <div className="absolute left-0 top-full z-30 mt-1.5 w-36 overflow-hidden rounded-lg border border-[#E1E5EE] bg-white shadow-lg">
//                       {STATUS_OPTIONS.map((s) => (
//                         <button
//                           key={s}
//                           type="button"
//                           onClick={() => handleStatusSelect(s)}
//                           className="flex w-full items-center justify-between px-3 py-2 text-left text-xs font-medium capitalize text-[#1A1C1F] hover:bg-slate-50"
//                         >
//                           {s}
//                           {currentStatus === s && (
//                             <Check size={13} className="text-[#002B73]" />
//                           )}
//                         </button>
//                       ))}
//                     </div>
//                   </>
//                 )}
//               </div>
//             </div>

//             <p className="mt-2.5 text-xs text-[#8A8D99] sm:text-sm">
//               Order placed on {formatPlacedOn(currentOrder.createdAt)}
//             </p>
//           </div>

//           {/* Scrollable Content */}
//           <div className="overflow-y-auto px-5 pb-6 sm:px-8 sm:pb-8">
//             <div className="pt-6 space-y-6">
//               {/* ORDER ITEMS */}
//               <div>
//                 <h3 className="mb-3 flex items-center gap-2 text-[12px] font-extrabold tracking-[1.5px] text-[#002B73] sm:text-sm">
//                   <ShoppingBag size={15} strokeWidth={2.2} />
//                   ORDER ITEMS
//                 </h3>

//                 <div className="overflow-hidden rounded-xl border border-[#E1E5EE]">
//                   <div
//                     className="grid grid-cols-[1fr_60px_100px] gap-2 px-4 py-2.5 text-[10px] font-bold uppercase tracking-wide text-[#8A8D99] sm:text-[11px]"
//                     style={{ background: "#F7F8FB" }}
//                   >
//                     <span>Product</span>
//                     <span className="text-center">Qty</span>
//                     <span className="text-right">Total</span>
//                   </div>

//                   <div className="divide-y divide-[#EEF1F5]">
//                     {items.map((item, index) => (
//                       <div
//                         key={`${item.productId || item.name}-${index}`}
//                         className="grid grid-cols-[1fr_60px_100px] items-center gap-2 px-4 py-3"
//                       >
//                         <div className="flex min-w-0 items-center gap-3">
//                           <div className="h-11 w-11 shrink-0 overflow-hidden rounded-lg bg-slate-100">
//                             <img
//                               src={item.image || "/home-product-1.png"}
//                               alt={item.name}
//                               className="h-full w-full object-cover"
//                             />
//                           </div>
//                           <div className="min-w-0">
//                             <p className="truncate text-xs font-bold text-[#1A1C1F] sm:text-sm">
//                               {item.name}
//                             </p>
//                             {item.productId && (
//                               <p className="truncate text-[10px] text-[#8A8D99] sm:text-xs">
//                                 SKU: {item.productId}
//                               </p>
//                             )}
//                           </div>
//                         </div>

//                         <span className="text-center text-xs font-semibold text-[#1A1C1F] sm:text-sm">
//                           {item.quantity}
//                         </span>

//                         <span className="text-right text-xs font-bold text-[#1A1C1F] sm:text-sm">
//                           Rs{" "}
//                           {getProductLineTotal(
//                             item.price,
//                             item.quantity,
//                             item.name,
//                           ).toFixed(2)}
//                         </span>
//                       </div>
//                     ))}

//                     {!items.length && (
//                       <div className="px-4 py-6 text-center text-xs font-semibold text-[#8A8D99]">
//                         No item details saved for this order.
//                       </div>
//                     )}
//                   </div>

//                   {items.length > 0 && (
//                     <div
//                       className="flex items-center justify-between px-4 py-2.5 text-xs font-semibold sm:text-sm"
//                       style={{ background: "#EEF3FF", color: "#002B73" }}
//                     >
//                       <span>
//                         {itemLineCount} item{itemLineCount !== 1 ? "s" : ""} in
//                         this order
//                       </span>
//                       <span>Total Items: {totalUnitsCount}</span>
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* FINANCIAL SUMMARY */}
//               <div>
//                 <h3 className="mb-3 flex items-center gap-2 text-[12px] font-extrabold tracking-[1.5px] text-[#002B73] sm:text-sm">
//                   <List size={15} strokeWidth={2.2} />
//                   FINANCIAL SUMMARY
//                 </h3>

//                 <div className="rounded-xl border border-[#E1E5EE] px-4 py-4 sm:px-5 sm:py-5">
//                   <div className="flex items-center justify-between py-1.5 text-xs sm:text-sm">
//                     <span className="text-[#64748B]">Subtotal</span>
//                     <span className="font-semibold text-[#1A1C1F]">
//                       Rs {subtotal.toFixed(2)}
//                     </span>
//                   </div>

//                   <div className="flex items-center justify-between py-1.5 text-xs sm:text-sm">
//                     <span className="text-[#64748B]">Shipping Cost</span>
//                     <span className="font-semibold text-[#1A1C1F]">
//                       Rs {shippingCost.toFixed(2)}
//                     </span>
//                   </div>

//                   <div className="mt-2 flex items-center justify-between border-t border-[#EEF1F5] pt-3">
//                     <span className="text-sm font-bold text-[#1A1C1F] sm:text-base">
//                       Total Amount
//                     </span>
//                     <span className="text-lg font-extrabold text-[#002B73] sm:text-xl">
//                       Rs {totalAmount.toFixed(2)}
//                     </span>
//                   </div>
//                 </div>
//               </div>

//               {/* SHIPPING DETAILS */}
//               <div>
//                 <h3 className="mb-3 flex items-center gap-2 text-[12px] font-extrabold tracking-[1.5px] text-[#002B73] sm:text-sm">
//                   <Truck size={15} strokeWidth={2.2} />
//                   SHIPPING DETAILS
//                 </h3>

//                 <div className="rounded-xl border border-[#E1E5EE] px-4 py-4 sm:px-5 sm:py-5">
//                   <p className="text-sm font-bold text-[#1A1C1F] sm:text-base">
//                     {currentOrder.customerName || "-"}
//                   </p>

//                   <div className="mt-3 space-y-2.5 border-t border-[#EEF1F5] pt-3">
//                     <div className="flex items-center gap-2.5 text-xs text-[#434652] sm:text-sm">
//                       <Mail size={15} className="shrink-0 text-[#8A8D99]" />
//                       <span className="truncate">
//                         {currentOrder.email || "-"}
//                       </span>
//                     </div>

//                     <div className="flex items-center gap-2.5 text-xs text-[#434652] sm:text-sm">
//                       <Phone size={15} className="shrink-0 text-[#8A8D99]" />
//                       <span>{currentOrder.phone || "-"}</span>
//                     </div>
//                   </div>

//                   <div className="mt-3 flex items-start gap-2.5 border-t border-[#EEF1F5] pt-3 text-xs text-[#434652] sm:text-sm">
//                     <MapPin
//                       size={15}
//                       className="mt-0.5 shrink-0 text-[#8A8D99]"
//                     />
//                     <span className="break-words">
//                       {currentOrder.shippingAddress || "-"}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Fixed Footer */}
//           <div className="shrink-0 flex justify-end border-t border-[#EEF1F5] px-5 py-4 sm:px-8">
//             <button
//               type="button"
//               onClick={onClose}
//               className="rounded-lg px-5 py-2.5 text-sm font-semibold text-white transition"
//               style={{ background: "#BC0000" }}
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
