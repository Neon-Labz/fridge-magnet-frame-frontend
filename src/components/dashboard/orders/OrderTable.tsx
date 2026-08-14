"use client";

import { Eye, Trash2 } from "lucide-react";
import type { Order } from "@/types/order";

interface OrderTableProps {
  orders: Order[];
  onView: (order: Order) => void;
  onDelete: (order: Order) => void;
}

function formatDate(dateInput?: string | Date) {
  if (!dateInput) return "-";
  const date = new Date(dateInput);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatCurrency(value?: number) {
  if (value === undefined || value === null) return "-";
  return `Rs. ${value.toLocaleString("en-LK")}`;
}

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

export default function OrderTable({
  orders,
  onView,
  onDelete,
}: OrderTableProps) {
  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
      <div className="min-h-0 flex-1">
        <div className="h-full overflow-auto">
          <div className="overflow-x-auto">
            <table className="w-full table-fixed border-collapse min-w-[980px]">
              <thead className="sticky top-0 z-30">
                <tr
                  style={{
                    background: "#F3F3F8",
                    borderBottom: "1px solid #C3C6D4",
                  }}
                >
                  <th
                    className="w-[16%] px-5 py-2.5 text-center text-[11px] font-semibold uppercase"
                    style={{
                      color: "#002B73",
                      letterSpacing: "0.5px",
                    }}
                  >
                    Order ID
                  </th>

                  <th
                    className="w-[20%] px-5 py-2.5 text-center text-[11px] font-semibold uppercase"
                    style={{
                      color: "#002B73",
                      letterSpacing: "0.5px",
                    }}
                  >
                    Customer Info
                  </th>

                  <th
                    className="w-[16%] px-5 py-2.5 text-center text-[11px] font-semibold uppercase"
                    style={{
                      color: "#002B73",
                      letterSpacing: "0.5px",
                    }}
                  >
                    Date
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
                    className="w-[12%] px-5 py-2.5 text-center text-[11px] font-semibold uppercase"
                    style={{
                      color: "#002B73",
                      letterSpacing: "0.5px",
                    }}
                  >
                    Status
                  </th>

                  <th
                    className="w-[14%] px-5 py-2.5 text-center text-[11px] font-semibold uppercase"
                    style={{
                      color: "#002B73",
                      letterSpacing: "0.5px",
                    }}
                  >
                    Total Amount
                  </th>

                  <th
                    className="w-[14%] px-5 py-2.5 text-center text-[11px] font-semibold uppercase"
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
                      <td className="px-5 py-4 text-center align-middle">
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
                        <div className="flex flex-col pl-9">
                          <span className="truncate text-sm font-medium text-[#1A1C1F]">
                            {order.customerName}
                          </span>
                          <span className="truncate text-xs font-medium text-[#8A8D99]">
                            {order.customerId}
                          </span>
                        </div>
                      </td>

                      <td className="px-5 py-4 text-center align-center">
                        <span className="text-sm font-medium text-[#1A1C1F]">
                          {formatDate(order.createdAt)}
                        </span>
                      </td>

                      <td className="px-5 py-4 text-center align-center">
                        <span className="text-sm font-medium text-[#1A1C1F]">
                          {order.qty}
                        </span>
                      </td>

                      <td className="px-5 py-4 text-center align-center">
                        <span
                          className="inline-block rounded-full px-2.5 py-1 text-[11px] font-semibold capitalize"
                          style={{
                            background: getStatusStyle(order.status).bg,
                            color: getStatusStyle(order.status).text,
                          }}
                        >
                          {order.status}
                        </span>
                      </td>

                      <td className="px-5 py-4 text-center align-center">
                        <span className="text-sm font-semibold text-[#1A1C1F]">
                          {formatCurrency(order.totalValue)}
                        </span>
                      </td>

                      <td className="px-5 py-4 text-center align-center">
                        <div className="flex items-center justify-center gap-1">
                          <button
                            type="button"
                            onClick={() => onView(order)}
                            className="relative z-10 flex h-11 w-11 items-center justify-center rounded-lg transition hover:bg-blue-50"
                            aria-label="View order"
                          >
                            <Eye size={17} strokeWidth={2} color="#002B73" />
                          </button>

                          <button
                            type="button"
                            onClick={() => onDelete(order)}
                            className="relative z-10 flex h-11 w-11 items-center justify-center rounded-lg transition hover:bg-red-50"
                            aria-label="Delete order"
                          >
                            <Trash2 size={17} strokeWidth={2} color="#BC0000" />
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
      </div>
    </div>
  );
}
