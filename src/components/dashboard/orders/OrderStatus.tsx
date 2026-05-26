"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Order, OrderStatus as OrderStatusValue } from "@/types/order";
import { mapApiOrder, statusToApi } from "@/lib/orders";
import { apiV1Url } from "@/lib/backendUrl";
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
  const [currentOrder, setCurrentOrder] = useState<OrderWithMongoId>(order);
  const [status, setStatus] = useState<OrderStatusValue>(
    order.status || "processing"
  );
  const [adminNote, setAdminNote] = useState(order.adminNote || "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const mongoOrderId = currentOrder._id || currentOrder.id;

  const statuses = [
    { label: "PENDING", value: "pending", icon: CircleEllipsis },
    { label: "PROCESSING", value: "processing", icon: RefreshCw },
    { label: "SHIPPED", value: "shipped", icon: Truck },
    { label: "DELIVERED", value: "delivered", icon: CheckCircle2 },
    { label: "CANCELED", value: "canceled", icon: XCircle },
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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: statusToApi(status),
          adminNote: adminNote.trim() || undefined,
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data?.message || `Update failed: ${response.status}`);
      }

      const updatedOrder = mapApiOrder(await response.json());
      setCurrentOrder(updatedOrder);
      setStatus(updatedOrder.status);
      setAdminNote(updatedOrder.adminNote || "");
      setSuccess("Order status updated");
      router.push("/dashboard/orders");
    } catch (error) {
      console.error(error);
      setError(
        error instanceof Error ? error.message : "Failed to update order status"
      );
    } finally {
      setSaving(false);
    }
  };

  return (
<div className="h-full overflow-y-auto bg-[#F8FAFC] px-6 py-8 lg:px-12">

        <div className="mb-8 text-s text-[#1A1C1F]">
        <button onClick={() => router.back()} className="hover:text-[#002B73]">
          Orders
        </button>{" "}
        › <b>Update Status</b>
      </div>

<div className="mx-auto grid w-full max-w-[1600px] grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_420px]">
          <section className="overflow-hidden rounded-[22px] border border-[#E1E5EE] bg-white">
          <div className="flex items-start justify-between px-12 py-12">
            <div>
              <h1 className="text-[30px] font-extrabold text-[#002B73]">
                Order #{currentOrder.orderId || "MAG-82910"}
              </h1>
              <p className="mt-2 max-w-[340px] text-[14px] leading-6 text-[#434652]">
                Modify the current stage of this order fulfillment.
              </p>
            </div>

            <div className="text-center">
              <div className="rounded-full border border-[#C9D9F2] bg-[#EAF3FF] px-8 py-3 text-left text-s font-bold text-[#0052B4]">
                Status:
                <br />
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </div>
            </div>
          </div>

          <div className="border-t border-[#EEF1F5] px-12 py-10">
            <h2 className="text-lg font-bold text-[20px] text-[#1A1C1F]">
              Change Status
            </h2>

<div className="mt-8 flex items-center justify-between gap-4">              {statuses.map(({ label, value, icon: Icon }) => {
                const statusValue = value as OrderStatusValue;
                const isDisabled = STATUS_RANK[statusValue] < STATUS_RANK[currentOrder.status];

                return (
                <button
                  key={label}
                  onClick={() => {
                    if (isDisabled) return;
                    setStatus(statusValue);
                    setSuccess(null);
                    setError(null);
                  }}
                  disabled={isDisabled}
                  className={`flex h-[120px] w-[110px] flex-col items-center justify-center rounded-[20px] border transition ${
                    status === value
                      ? "border-[#003CC7] bg-[#F4F8FF] shadow-sm"
                      : isDisabled
                        ? "cursor-not-allowed border-[#E5E7EB] bg-[#F5F6F8] opacity-50"
                        : "border-[#D9DEE8] bg-white"
                  }`}
                  title={isDisabled ? "Cannot move order status backward" : undefined}
                >
                  <Icon
                    size={25}
                    strokeWidth={1.5}
                    className={`mb-2 ${
                      status === value ? "text-[#003CC7]" : isDisabled ? "text-[#9CA3AF]" : "text-[#3D4451]"
                    }`}
                  />

                  <span
                    className={`text-[12px] font-black uppercase tracking-[1.5px] ${
                      status === value ? "text-[#003CC7]" : isDisabled ? "text-[#9CA3AF]" : "text-[#111827]"
                    }`}
                  >
                    {label}
                  </span>
                </button>
                );
              })}
            </div>

            <div className="mt-12">
              <p className="mb-3 flex items-center gap-2 text-[16px] font-bold text-[#1A1C1F]">
                <ListChecks size={16} className="text-[#002B73]" />
                Internal Admin Note
              </p>
              <textarea
                value={adminNote}
                onChange={(event) => setAdminNote(event.target.value)}
                className="h-[170px] w-full resize-none rounded-[18px] border border-[#DDE2EC] px-6 py-5 text-m outline-none placeholder:text-[#C7CBD4]"
                placeholder="Describe the reason for this status change or add fulfillment notes..."
              />
            </div>

            {(error || success) && (
              <p
                className={`mt-6 text-sm font-bold ${
                  error ? "text-red-700" : "text-green-700"
                }`}
              >
                {error || success}
              </p>
            )}

            <div className="mt-8 flex items-start gap-4 rounded-[16px] border border-[#EEF1F5] bg-[#F7F7FA] px-6 py-5">
              <div className="mt-1 flex h-5 w-5 items-center justify-center rounded bg-[#BC0000] text-white">
                <Check size={14} />
              </div>
              <div>
                <p className="text-m font-bold text-[#1A1C1F]">
                  Send email notification to customer
                </p>
                <p className="mt-1 text-s text-[#434652]">
                  Recipient:{" "}
                  <span className="text-[#002B73]">
                    {currentOrder.email || "eleanor.h@example.com"}
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-5 border-t border-[#EEF1F5] bg-[#FAFAFC] px-12 py-8">
            <button
              onClick={() => router.back()}
              className="h-[58px] w-[200px] rounded-[14px] border border-[#DDE2EC] text-l font-bold text-[#434652]"
            >
              Discard Changes
            </button>

            <button
              onClick={handleUpdate}
              disabled={saving}
              className="h-[58px] w-[200px] rounded-[14px] bg-[#BC0000] font-bold text-l text-white shadow hover:bg-[#9f0000] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? "Updating..." : "Update Order Status"}
            </button>
          </div>
        </section>

        <aside className="space-y-8">
          <div className="w-full  rounded-[22px] border border-[#E1E5EE] bg-white px-8 py-9">
            <h3 className="mb-5 text-m font-extrabold tracking-[4px] text-[#002B73]">
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

            <div className="mt-4 flex items-center justify-between">
              <span className="text-m font-extrabold tracking-wider text-[#1A1C1F]">
                TOTAL
                <br />
                VALUE
              </span>
              <span className="text-xl font-extrabold text-[#002B73]">
                LKR {Number(currentOrder.totalValue || 0).toFixed(2)}
              </span>
            </div>

            <div className="mt-6 rounded-[18px] border border-[#EEF1F5] px-6 py-7">
              <h4 className="mb-5 text-m font-bold tracking-[2px] text-[#002B73]">
                SHIPPING INFORMATION
              </h4>
              <p className="text-m leading-6 text-[#434652]">
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
              <p className="mt-2 text-m font-semibold text-[#002B73]">
                Standard Delivery
              </p>
            </div>
          </div>

          <div className="w-full rounded-[22px] border border-[#E1E5EE] bg-white px-8 py-9">
            <h3 className="text-m font-extrabold tracking-[4px] text-[#002B73]">
              ITEM SUMMARY ({currentOrder.qty ?? 0})
            </h3>

            <div className="mt-8 space-y-4">
              {(currentOrder.items || []).map((item, index) => (
                <div
                  key={`${item.productId || item.name}-${index}`}
                  className="relative rounded-[18px] border border-[#EEF1F5] bg-white p-5 shadow-sm"
                >
                  <div className="absolute left-0 top-0 h-full w-2 rounded-l-[18px] bg-[#BC0000]" />
                  <div className="flex items-start gap-4 pl-4">
                    <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-[14px] bg-slate-100">
                      <img
                        src={item.image || "/home-product-1.png"}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h4 className="text-[18px] font-extrabold leading-6 text-[#1A1C1F]">
                        {item.name}
                      </h4>
                      <p className="mt-2 text-[14px] leading-6 text-[#434652]">
                        {item.frameType || "Frame"}
                        {item.colorOption ? ` - ${item.colorOption}` : ""}
                      </p>

                      <div className="mt-4 flex items-center justify-between gap-3">
                        <div className="rounded-[12px] border border-[#DDE2EC] bg-[#F7F7FA] px-3 py-2 text-[14px] font-extrabold text-[#002B73]">
                          Qty: {item.quantity}
                        </div>

                        <div className="text-right">
                          <p className="text-[17px] font-extrabold text-[#1A1C1F]">
                            LKR {(item.price * item.quantity).toFixed(2)}
                          </p>
                          <p className="text-[13px] font-bold text-[#434652]">
                            LKR {item.price.toFixed(2)} ea
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {!currentOrder.items?.length && (
                <div className="rounded-[18px] border border-[#EEF1F5] bg-[#F7F7FA] px-5 py-6 text-sm font-semibold text-[#434652]">
                  No item details saved for this order.
                </div>
              )}
            </div>

            <button className="mt-6 flex w-full items-center justify-between rounded-[16px] border border-[#DDE2EC] bg-white px-4 py-4 text-left font-bold text-[#000000] transition hover:bg-slate-50">
              View Full Order History
              <span className="text-[#6B7280]">→</span>
            </button>

            <button className="mt-3 flex w-full items-center justify-between rounded-[16px] border border-[#DDE2EC] bg-white px-4 py-4 text-left font-bold text-[#000000] transition hover:bg-slate-50">
              Message Customer
              <span className="text-[#6B7280]">💬</span>
            </button>
          </div>
        </aside>
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
    <div className="flex justify-between gap-4 border-b border-[#EEF1F5] py-5 text-m">
      <p className="text-[#434652]">{label}</p>
      <div className="text-right">
        <p className="font-bold text-[#1A1C1F]">{value}</p>
        {subValue && <p className="text-xs text-[#434652]">{subValue}</p>}
      </div>
    </div>
  );
}
