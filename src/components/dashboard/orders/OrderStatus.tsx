"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Order, OrderStatus as OrderStatusValue } from "@/types/order";
import { mapApiOrder, statusToApi } from "@/lib/orders";
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

export default function OrderStatus({ order }: OrderStatusProps) {
  const router = useRouter();
  const [currentOrder, setCurrentOrder] = useState(order);
  const [status, setStatus] = useState<OrderStatusValue>(
order?.status || "processing"
  );
order?.adminNote || ""
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

const mongoOrderId = currentOrder?._id || currentOrder?.id || "";
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
      const response = await fetch(`/api/v1/orders/${mongoOrderId}/status`, {
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
    <div className="h-full overflow-y-auto bg-white px-8 py-8 lg:ml-[100px]">
      <div className="mb-8 text-m text-[#1A1C1F]">
        <button onClick={() => router.back()} className="hover:text-[#002B73]">
          Orders
        </button>{" "}
        › <b>Update Status</b>
      </div>

      <div className="grid max-w-[1300px] grid-cols-1 gap-10 lg:grid-cols-[1fr_320px]">
        <section className="overflow-hidden rounded-[22px] border border-[#E1E5EE] bg-white">
          <div className="flex items-start justify-between px-12 py-12">
            <div>
              <h1 className="text-[36px] font-extrabold text-[#002B73]">
                Order #{currentOrder.orderId || "MAG-82910"}
              </h1>
              <p className="mt-2 max-w-[340px] text-[18px] leading-6 text-[#434652]">
                Modify the current stage of this order fulfillment.
              </p>
            </div>

            <div className="text-center">
              <div className="rounded-full border border-[#C9D9F2] bg-[#EAF3FF] px-8 py-3 text-left text-m font-bold text-[#0052B4]">
                Status:
                <br />
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </div>
            </div>
          </div>

          <div className="border-t border-[#EEF1F5] px-12 py-10">
            <h2 className="text-lg font-bold text-[22px] text-[#1A1C1F]">
              Change Status
            </h2>

            <div className="mt-8 flex flex-wrap gap-10">
              {statuses.map(({ label, value, icon: Icon }) => (
                <button
                  key={label}
                  onClick={() => {
                    setStatus(value as OrderStatusValue);
                    setSuccess(null);
                    setError(null);
                  }}
                  className={`flex h-[130px] w-[116px] flex-col items-center justify-center rounded-[20px] border transition ${
                    status === value
                      ? "border-[#003CC7] bg-[#F4F8FF] shadow-sm"
                      : "border-[#D9DEE8] bg-white"
                  }`}
                >
                  <Icon
                    size={30}
                    strokeWidth={1.5}
                    className={`mb-2 ${
                      status === value ? "text-[#003CC7]" : "text-[#3D4451]"
                    }`}
                  />

                  <span
                    className={`text-[14px] font-black uppercase tracking-[1.5px] ${
                      status === value ? "text-[#003CC7]" : "text-[#111827]"
                    }`}
                  >
                    {label}
                  </span>
                </button>
              ))}
            </div>

            <div className="mt-12">
              <p className="mb-3 flex items-center gap-2 text-[17px] font-bold text-[#1A1C1F]">
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
                <p className="text-l font-bold text-[#1A1C1F]">
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
              className="h-[58px] w-[220px] rounded-[14px] border border-[#DDE2EC] text-l font-bold text-[#434652]"
            >
              Discard Changes
            </button>

            <button
              onClick={handleUpdate}
              disabled={saving}
              className="h-[58px] w-[240px] rounded-[14px] bg-[#BC0000] font-bold text-l text-white shadow hover:bg-[#9f0000] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? "Updating..." : "Update Order Status"}
            </button>
          </div>
        </section>

        <aside className="space-y-8">
          <div className="w-[450px] rounded-[22px] border border-[#E1E5EE] bg-white px-8 py-9">
            <h3 className="mb-8 text-m font-extrabold tracking-[4px] text-[#002B73]">
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

            <div className="mt-7 flex items-center justify-between">
              <span className="text-m font-extrabold tracking-wider text-[#1A1C1F]">
                TOTAL
                <br />
                VALUE
              </span>
              <span className="text-2xl font-extrabold text-[#002B73]">
                ${currentOrder.totalValue || "284.50"}
              </span>
            </div>

            <div className="mt-9 rounded-[18px] border border-[#EEF1F5] px-6 py-7">
              <h4 className="mb-5 text-m font-extrabold tracking-[2px] text-[#002B73]">
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
              <p className="mt-2 text-m font-bold text-[#002B73]">
                Standard Delivery
              </p>
            </div>
          </div>

          <div className="w-[450px] rounded-[22px] border border-[#E1E5EE] bg-white px-8 py-9">
            <h3 className="text-m font-extrabold tracking-[4px] text-[#002B73]">
              ITEM SUMMARY ({currentOrder.qty ?? 0})
            </h3>

            <div className="relative mt-8 rounded-[22px] border border-[#EEF1F5] bg-white p-6 shadow-sm">
              <div className="absolute left-0 top-0 h-full w-2 rounded-l-[22px] bg-[#BC0000]" />
              <div className="flex items-start gap-5 pl-4">
                <div className="h-30 w-30 overflow-hidden rounded-[20px] bg-slate-100">
                  <img
                    src="/product-2.png"
                    alt="frame"
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="flex flex-1 flex-col">
                  <h4 className="text-[22px] font-extrabold leading-8 text-[#1A1C1F]">
                    Modern Oak
                    <br />
                    Frame
                  </h4>

                  <p className="mt-3 text-[16px] leading-8 text-[#434652]">
                    Size: 11&quot; x 14&quot;
                    <br />
                    Finish: Natural
                    <br />
                    Matte
                  </p>

                  <div className="mt-5 flex items-center justify-between">
                    <div className="rounded-[14px] border border-[#DDE2EC] bg-[#F7F7FA] px-4 py-2 text-[18px] font-extrabold text-[#002B73]">
                      Qty:
                      <br />
                      {currentOrder.qty ?? 0}
                    </div>

                    <div className="text-right">
                      <p className="text-[22px] font-extrabold text-[#1A1C1F]">
                        $
                        {currentOrder.totalValue
                          ? (
                              currentOrder.totalValue /
                              Math.max(currentOrder.qty ?? 1, 1)
                            ).toFixed(2)
                          : "0.00"}
                      </p>

                      <p className="text-[18px] font-extrabold text-[#1A1C1F]">
                        ea
                      </p>
                    </div>
                  </div>
                </div>
              </div>
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