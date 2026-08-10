"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToastStore } from "@/store/toastStore";
import type { Order, OrderStatus as OrderStatusValue } from "@/types/order";
import { mapApiOrder, statusToApi } from "@/lib/orders";
import { apiV1Url } from "@/lib/backendUrl";
import { getProductLineTotal } from "@/lib/productQuantityRules";
import {
  CircleEllipsis,
  RefreshCw,
  Truck,
  CheckCircle2,
  XCircle,
  ListChecks,
  Check,
} from "lucide-react";

type OrderStatusProps = {
  order: Order;
};

type OrderWithMongoId = Order & {
  _id?: string;
};

const STATUS_RANK: Record<OrderStatusValue, number> = {
  pending: 0,
  processing: 1,
  shipped: 2,
  delivered: 3,
  canceled: 4,
};

export default function OrderStatus({ order }: OrderStatusProps) {
  const router = useRouter();
  const { addToast } = useToastStore();

  const [currentOrder, setCurrentOrder] = useState<OrderWithMongoId>(order);

  const [status, setStatus] = useState<OrderStatusValue>(
    order.status || "processing",
  );

  const [adminNote, setAdminNote] = useState(order.adminNote || "");

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [sendEmailNotification, setSendEmailNotification] = useState(true);

  const mongoOrderId = currentOrder._id || currentOrder.id;

  const statuses = [
    {
      label: "PENDING",
      value: "pending",
      icon: CircleEllipsis,
    },
    {
      label: "PROCESSING",
      value: "processing",
      icon: RefreshCw,
    },
    {
      label: "SHIPPED",
      value: "shipped",
      icon: Truck,
    },
    {
      label: "DELIVERED",
      value: "delivered",
      icon: CheckCircle2,
    },
    {
      label: "CANCELED",
      value: "canceled",
      icon: XCircle,
    },
  ];

  const handleUpdate = async () => {
    if (!mongoOrderId) {
      setError("Order ID missing. Cannot update status.");
      return;
    }

    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch(apiV1Url(`/orders/${mongoOrderId}/status`), {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: statusToApi(status),
          adminNote: adminNote.trim() || undefined,
          sendEmailNotification,
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));

        throw new Error(data?.message || `Update failed: ${response.status}`);
      }

      const rawData = await response.json();

      const emailNotif = rawData.emailNotification as
        | {
            attempted: boolean;
            success: boolean;
            error?: string;
          }
        | undefined;

      const updatedOrder = mapApiOrder(rawData);

      setCurrentOrder(updatedOrder);
      setStatus(updatedOrder.status);
      setAdminNote(updatedOrder.adminNote || "");

      if (!sendEmailNotification || !emailNotif?.attempted) {
        addToast("Order updated successfully.", "success");
      } else if (emailNotif.success) {
        addToast("Order updated. Email notification sent.", "success");
      } else {
        addToast(
          "Order updated, but the email notification failed to send. Please check with the customer manually.",
          "error",
        );
      }

      router.push("/dashboard/orders");
    } catch (error) {
      console.error(error);

      setError(
        error instanceof Error
          ? error.message
          : "Failed to update order status",
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="h-full overflow-y-auto bg-[#F8FAFC] px-3 py-5 sm:px-5 sm:py-6 lg:px-8 lg:py-8">
      <div className="mx-auto w-full max-w-[1600px]">
        <div className="mb-5 text-sm text-[#1A1C1F] sm:mb-6">
          <button
            type="button"
            onClick={() => router.back()}
            className="transition hover:text-[#002B73]"
          >
            Orders
          </button>{" "}
          › <b>Update Status</b>
        </div>

        <div className="grid w-full grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_390px] xl:gap-6">
          <section className="min-w-0 overflow-hidden rounded-2xl border border-[#E1E5EE] bg-white">
            <div className="flex flex-col gap-5 px-5 py-6 sm:px-7 sm:py-7 lg:px-9 lg:py-8 md:flex-row md:items-start md:justify-between">
              <div className="min-w-0">
                <h1 className="text-[26px] font-extrabold leading-tight text-[#002B73]">
                  Order #{currentOrder.orderId || "MAG-82910"}
                </h1>

                <p className="mt-2 max-w-[500px] text-sm leading-6 text-[#434652]">
                  Modify the current stage of this order fulfillment.
                </p>
              </div>

              <div className="shrink-0">
                <div className="rounded-full border border-[#C9D9F2] bg-[#EAF3FF] px-5 py-2.5 text-sm font-bold text-[#0052B4] sm:px-6">
                  Status: <span className="capitalize">{status}</span>
                </div>
              </div>
            </div>

            <div className="border-t border-[#EEF1F5] px-5 py-6 sm:px-7 sm:py-7 lg:px-9 lg:py-8">
              <h2 className="text-[20px] font-bold text-[#1A1C1F]">
                Change Status
              </h2>

              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5 lg:gap-4">
                {statuses.map(({ label, value, icon: Icon }) => {
                  const statusValue = value as OrderStatusValue;

                  const isDisabled =
                    STATUS_RANK[statusValue] < STATUS_RANK[currentOrder.status];

                  const isSelected = status === statusValue;

                  return (
                    <button
                      key={label}
                      type="button"
                      onClick={() => {
                        if (isDisabled) return;

                        setStatus(statusValue);
                        setSuccess(null);
                        setError(null);
                      }}
                      disabled={isDisabled}
                      title={
                        isDisabled
                          ? "Cannot move order status backward"
                          : undefined
                      }
                      className={`flex min-h-[96px] w-full flex-col items-center justify-center rounded-2xl border px-2 py-4 transition sm:min-h-[105px] ${
                        isSelected
                          ? "border-[#003CC7] bg-[#F4F8FF] shadow-sm"
                          : isDisabled
                            ? "cursor-not-allowed border-[#E5E7EB] bg-[#F5F6F8] opacity-50"
                            : "border-[#D9DEE8] bg-white hover:border-[#B8C5D9] hover:bg-[#FAFBFF]"
                      }`}
                    >
                      <Icon
                        size={23}
                        strokeWidth={1.6}
                        className={`mb-2 ${
                          isSelected
                            ? "text-[#003CC7]"
                            : isDisabled
                              ? "text-[#9CA3AF]"
                              : "text-[#3D4451]"
                        }`}
                      />

                      <span
                        className={`text-[11px] font-black uppercase tracking-[1px] sm:text-xs ${
                          isSelected
                            ? "text-[#003CC7]"
                            : isDisabled
                              ? "text-[#9CA3AF]"
                              : "text-[#111827]"
                        }`}
                      >
                        {label}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-8 sm:mt-10">
                <p className="mb-3 flex items-center gap-2 text-base font-bold text-[#1A1C1F]">
                  <ListChecks size={17} className="text-[#002B73]" />
                  Internal Admin Note
                </p>

                <textarea
                  value={adminNote}
                  onChange={(event) => setAdminNote(event.target.value)}
                  className="h-[50px] w-full resize-none rounded-2xl border border-[#DDE2EC] px-4 py-3 text-sm text-[#1A1C1F] outline-none transition focus:border-[#002B73] sm:h-[80px]"
                  placeholder="Describe the reason or note..."
                />
              </div>

              {(error || success) && (
                <p
                  className={`mt-5 text-sm font-bold ${
                    error ? "text-red-700" : "text-green-700"
                  }`}
                >
                  {error || success}
                </p>
              )}

              <button
                type="button"
                onClick={() => setSendEmailNotification((prev) => !prev)}
                className="mt-6 flex w-full items-start gap-3 rounded-2xl border border-[#EEF1F5] bg-[#F7F7FA] px-4 py-4 text-left sm:px-5"
              >
                <div
                  className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded"
                  style={{
                    background: sendEmailNotification ? "#BC0000" : "#fff",
                    border: sendEmailNotification
                      ? "none"
                      : "2px solid #DDE2EC",
                  }}
                >
                  {sendEmailNotification && (
                    <Check size={14} className="text-white" />
                  )}
                </div>

                <div className="min-w-0">
                  <p className="text-sm font-bold text-[#1A1C1F]">
                    Send email notification to customer
                  </p>

                  <p className="mt-1 break-all text-xs text-[#434652] sm:text-sm">
                    Recipient:{" "}
                    <span className="text-[#002B73]">
                      {currentOrder.email || "eleanor.h@example.com"}
                    </span>
                  </p>
                </div>
              </button>
            </div>

            <div className="flex flex-col-reverse gap-3 border-t border-[#EEF1F5] bg-[#FAFAFC] px-5 py-5 sm:flex-row sm:justify-end sm:px-7 lg:px-9">
              <button
                type="button"
                onClick={() => router.back()}
                className="h-12 w-full rounded-xl border border-[#DDE2EC] px-5 text-sm font-bold text-[#434652] transition hover:bg-white sm:w-auto sm:min-w-[170px]"
              >
                Discard Changes
              </button>

              <button
                type="button"
                onClick={handleUpdate}
                disabled={saving}
                className="h-12 w-full rounded-xl bg-[#BC0000] px-5 text-sm font-bold text-white shadow transition hover:bg-[#9f0000] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:min-w-[190px]"
              >
                {saving ? "Updating..." : "Update Order Status"}
              </button>
            </div>
          </section>

          <aside className="min-w-0 space-y-5">
            <div className="w-full rounded-2xl border border-[#E1E5EE] bg-white px-5 py-6 sm:px-6 sm:py-7">
              <h3 className="mb-3 text-sm font-extrabold tracking-[2.5px] text-[#002B73] sm:tracking-[3px]">
                • ORDER DETAILS
              </h3>

              <Detail
                label="Customer"
                value={currentOrder.customerName || "Eleanor Herbert"}
                subValue={`ID: ${currentOrder.customerId || "#CUST-9921"}`}
              />

              <Detail
                label="Email Address"
                value={currentOrder.email || "eleanor.h@example.com"}
              />

              <Detail label="Ordered On" value="Oct 24, 2023 · 14:32" />

              <div className="mt-4 flex items-center justify-between gap-4">
                <span className="text-sm font-extrabold tracking-wider text-[#1A1C1F]">
                  TOTAL
                </span>

                <span className="text-lg font-extrabold text-[#002B73] sm:text-xl">
                  LKR {Number(currentOrder.totalValue || 0).toFixed(2)}
                </span>
              </div>

              <div className="mt-5 rounded-2xl border border-[#EEF1F5] px-4 py-5 sm:px-5 sm:py-6">
                <h4 className="mb-4 text-sm font-bold tracking-[1.5px] text-[#002B73]">
                  SHIPPING INFORMATION
                </h4>

                <p className="break-words text-sm leading-6 text-[#434652]">
                  {currentOrder.shippingAddress || (
                    <>
                      4820 Memory Lane
                      <br />
                      Suite 102
                      <br />
                      San Francisco, CA
                      <br />
                      94105
                    </>
                  )}
                </p>

                <p className="mt-2 text-sm font-semibold text-[#002B73]">
                  Standard Delivery
                </p>
              </div>
            </div>

            <div className="w-full rounded-2xl border border-[#E1E5EE] bg-white px-5 py-6 sm:px-6 sm:py-7">
              <h3 className="text-sm font-extrabold tracking-[2.5px] text-[#002B73] sm:tracking-[3px]">
                ITEM SUMMARY ({currentOrder.qty ?? 0})
              </h3>

              <div className="mt-6 space-y-3">
                {(currentOrder.items || []).map((item, index) => (
                  <div
                    key={`${item.productId || item.name}-${index}`}
                    className="relative overflow-hidden rounded-2xl border border-[#EEF1F5] bg-white p-4 shadow-sm"
                  >
                    <div className="absolute left-0 top-0 h-full w-1.5 bg-[#BC0000]" />

                    <div className="flex items-start gap-3 pl-2">
                      <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-slate-100 sm:h-20 sm:w-20">
                        <img
                          src={item.image || "/home-product-1.png"}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <h4 className="break-words text-sm font-extrabold leading-5 text-[#1A1C1F] sm:text-base">
                          {item.name}
                        </h4>

                        <p className="mt-1.5 text-xs leading-5 text-[#434652] sm:text-sm">
                          {item.frameType || "Frame"}
                          {item.colorOption ? ` - ${item.colorOption}` : ""}
                        </p>

                        <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                          <div className="w-fit rounded-lg border border-[#DDE2EC] bg-[#F7F7FA] px-2.5 py-1.5 text-xs font-extrabold text-[#002B73]">
                            Qty: {item.quantity}
                          </div>

                          <div className="text-left sm:text-right">
                            <p className="text-sm font-extrabold text-[#1A1C1F] sm:text-base">
                              LKR{" "}
                              {getProductLineTotal(
                                item.price,
                                item.quantity,
                                item.name,
                              ).toFixed(2)}
                            </p>

                            <p className="text-xs font-bold text-[#434652]">
                              LKR {item.price.toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {!currentOrder.items?.length && (
                  <div className="rounded-2xl border border-[#EEF1F5] bg-[#F7F7FA] px-4 py-5 text-sm font-semibold text-[#434652]">
                    No item details saved for this order.
                  </div>
                )}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

function Detail({
  label,
  value,
  subValue,
}: {
  label: string;
  value: string;
  subValue?: string;
}) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-[#EEF1F5] py-4 text-sm">
      <p className="shrink-0 text-[#434652]">{label}</p>

      <div className="min-w-0 text-right">
        <p className="break-words font-bold text-[#1A1C1F]">{value}</p>

        {subValue && (
          <p className="mt-0.5 break-words text-xs text-[#434652]">
            {subValue}
          </p>
        )}
      </div>
    </div>
  );
}