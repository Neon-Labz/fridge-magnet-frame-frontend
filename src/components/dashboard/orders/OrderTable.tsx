"use client";

import { Eye, Trash2 } from "lucide-react";
import type { Order } from "@/types/order";
import StatusBadge from "./StatusBadge";
import Link from "next/link";

interface OrderTableProps {
  orders: Order[];
  onDelete: (order: Order) => void;
}

export default function OrderTable({
  orders,
  onDelete,
}: OrderTableProps) {
  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
      <div className="hidden min-h-0 flex-1 lg:block">
        <div className="h-full overflow-auto">
          <table className="w-full table-fixed border-collapse">
            <thead className="sticky top-0 z-30">
              <tr
                style={{
                  background: "#F3F3F8",
                  borderBottom: "1px solid #C3C6D4",
                }}
              >
                <th
                  className="w-[17%] px-5 py-2.5 text-left text-[11px] font-semibold uppercase"
                  style={{
                    color: "#002B73",
                    letterSpacing: "0.5px",
                  }}
                >
                  Order ID
                </th>

                <th
                  className="w-[23%] px-5 py-2.5 text-left text-[11px] font-semibold uppercase"
                  style={{
                    color: "#002B73",
                    letterSpacing: "0.5px",
                  }}
                >
                  Customer Name
                </th>

                <th
                  className="w-[10%] px-5 py-2.5 text-center text-[11px] font-semibold uppercase"
                  style={{
                    color: "#002B73",
                    letterSpacing: "0.5px",
                  }}
                >
                  QTY
                </th>

                <th
                  className="w-[17%] px-5 py-2.5 text-left text-[11px] font-semibold uppercase"
                  style={{
                    color: "#002B73",
                    letterSpacing: "0.5px",
                  }}
                >
                  Customer ID
                </th>

                <th
                  className="w-[17%] px-5 py-2.5 text-center text-[11px] font-semibold uppercase"
                  style={{
                    color: "#002B73",
                    letterSpacing: "0.5px",
                  }}
                >
                  Status
                </th>

                <th
                  className="w-[16%] px-5 py-2.5 text-center text-[11px] font-semibold uppercase"
                  style={{
                    color: "#002B73",
                    letterSpacing: "0.5px",
                  }}
                >
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-5 py-12 text-center text-sm text-slate-500"
                  >
                    No orders found.
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr
                    key={order.id}
                    className="transition-colors hover:bg-slate-50/60"
                    style={{
                      borderBottom: "1px solid #E2E5EC",
                    }}
                  >
                    <td className="px-5 py-4 text-left align-middle">
                      <span
                        className="text-sm font-medium"
                        style={{
                          color: "#002B73",
                          fontFamily: "monospace",
                        }}
                      >
                        {order.orderId}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-left align-middle">
                      <div className="flex items-center gap-3">
                        <div
                          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold"
                          style={{
                            background: "#DAE2FF",
                            color: "#002B73",
                          }}
                        >
                          {order.customerInitials}
                        </div>

                        <span
                          className="truncate text-sm font-medium"
                          style={{
                            color: "#1A1C1F",
                          }}
                        >
                          {order.customerName}
                        </span>
                      </div>
                    </td>

                    <td className="px-5 py-4 text-center align-middle">
                      <span className="text-sm font-medium text-[#1A1C1F]">
                        {order.qty}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-left align-middle">
                      <span className="text-sm font-medium text-[#434652]">
                        {order.customerId}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-center align-middle">
                      <Link
                        href={`/dashboard/orders/${order.id}`}
                        className="relative z-10 inline-flex"
                      >
                        <StatusBadge status={order.status} />
                      </Link>
                    </td>

                    <td className="px-5 py-4 text-center align-middle">
                      <div className="flex items-center justify-center gap-1">
                        <Link
                          href={`/dashboard/orders/${order.id}`}
                          className="relative z-10 flex h-9 w-9 items-center justify-center rounded-lg transition hover:bg-blue-50"
                          aria-label="View order"
                        >
                          <Eye
                            size={17}
                            strokeWidth={2}
                            color="#002B73"
                          />
                        </Link>

                        <button
                          type="button"
                          onClick={() => onDelete(order)}
                          className="relative z-10 flex h-9 w-9 items-center justify-center rounded-lg transition hover:bg-red-50"
                          aria-label="Delete order"
                        >
                          <Trash2
                            size={17}
                            strokeWidth={2}
                            color="#BC0000"
                          />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto lg:hidden">
        <div className="space-y-3 p-3 sm:space-y-4 sm:p-4">
          {orders.length === 0 ? (
            <div className="rounded-xl border border-slate-200 bg-white px-5 py-12 text-center">
              <p className="text-sm text-slate-500">
                No orders found.
              </p>
            </div>
          ) : (
            orders.map((order) => (
              <div
                key={order.id}
                className="overflow-hidden rounded-xl border bg-white shadow-sm"
                style={{
                  borderColor: "#E2E5EC",
                }}
              >
                <div
                  className="flex items-center justify-between gap-3 border-b px-4 py-3.5 sm:px-5"
                  style={{
                    background: "#F3F3F8",
                    borderColor: "#E8EBF1",
                  }}
                >
                  <div className="min-w-0">
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                      Order ID
                    </p>

                    <p
                      className="mt-1 truncate text-sm font-medium"
                      style={{
                        color: "#002B73",
                        fontFamily: "monospace",
                      }}
                    >
                      {order.orderId}
                    </p>
                  </div>

                  <Link
                    href={`/dashboard/orders/${order.id}`}
                    prefetch
                    onClick={(event) => {
                      event.stopPropagation();
                    }}
                    className="relative z-20 flex h-10 w-10 shrink-0 cursor-pointer touch-manipulation items-center justify-center rounded-lg border border-[#DDE2EC] bg-white transition hover:bg-blue-50 active:scale-95"
                    aria-label={`View order ${order.orderId}`}
                  >
                    <Eye
                      size={18}
                      strokeWidth={2}
                      color="#002B73"
                    />
                  </Link>
                </div>

                <div className="px-4 py-4 sm:px-5 lg:px-5">
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold"
                      style={{
                        background: "#DAE2FF",
                        color: "#002B73",
                      }}
                    >
                      {order.customerInitials}
                    </div>

                    <div className="min-w-0">
                      <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                        Customer Name
                      </p>

                      <p
                        className="mt-1 truncate text-sm font-medium"
                        style={{
                          color: "#1A1C1F",
                        }}
                      >
                        {order.customerName}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-3 gap-3">
                    <OrderInfo
                      label="QTY"
                      value={String(order.qty)}
                    />

                    <OrderInfo
                      label="Customer ID"
                      value={order.customerId}
                    />

                    <div className="min-w-0">
                      <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                        Status
                      </p>

                      <div className="relative z-10 mt-1 col-span-2">
                        <Link
                          href={`/dashboard/orders/${order.id}`}
                          onClick={(event) => {
                            event.stopPropagation();
                          }}
                          className="inline-flex cursor-pointer touch-manipulation"
                        >
                          <StatusBadge status={order.status} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="flex items-center justify-between gap-3 border-t px-4 py-3 sm:px-5"
                  style={{
                    borderColor: "#EEF1F5",
                  }}
                >
                  <span className="text-xs font-medium text-slate-400">
                    Order Actions
                  </span>

                  <button
                    type="button"
                    onClick={() => onDelete(order)}
                    className="relative z-10 flex h-9 items-center justify-center gap-2 rounded-lg bg-red-50 px-3 text-xs font-semibold text-[#BC0000] transition hover:bg-red-100 active:scale-95"
                    aria-label={`Delete order ${order.orderId}`}
                  >
                    <Trash2 size={16} strokeWidth={2} />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

interface OrderInfoProps {
  label: string;
  value: string;
}

function OrderInfo({
  label,
  value,
}: OrderInfoProps) {
  return (
    <div className="min-w-0">
      <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <p className="mt-1 truncate text-sm font-medium text-[#1A1C1F]">
        {value}
      </p>
    </div>
  );
}