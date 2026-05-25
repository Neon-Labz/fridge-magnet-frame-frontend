"use client";

import { useState } from "react";
import {
  CircleEllipsis,
  Clock3,
  PackageCheck,
  Truck,
  CheckCircle2,
  XCircle,
} from "lucide-react";

type Order = {
  _id?: string;
  id?: string;
  status: string;
};

interface OrderStatusProps {
  currentOrder: Order;
}

export default function OrderStatus({
  currentOrder,
}: OrderStatusProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  const mongoOrderId = currentOrder._id || currentOrder.id;

  const statuses = [
    { label: "PENDING", value: "pending", icon: CircleEllipsis },
    { label: "PROCESSING", value: "processing", icon: Clock3 },
    { label: "SHIPPED", value: "shipped", icon: Truck },
    { label: "DELIVERED", value: "delivered", icon: PackageCheck },
    { label: "COMPLETED", value: "completed", icon: CheckCircle2 },
    { label: "CANCELLED", value: "cancelled", icon: XCircle },
  ];

  const handleStatusChange = async (status: string) => {
    try {
      setLoading(true);

      console.log("Updating order:", mongoOrderId);
      console.log("New status:", status);

      // API call here

      setSuccess("Order status updated successfully");

      setTimeout(() => {
        setSuccess(null);
      }, 3000);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-[16px] border border-[#E2E8F0] bg-white p-5 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold text-[#002B73]">
        Update Order Status
      </h2>

      <div className="grid gap-3 sm:grid-cols-2">
        {statuses.map((status) => {
          const Icon = status.icon;

          return (
            <button
              key={status.value}
              onClick={() => handleStatusChange(status.value)}
              disabled={loading}
              className={`flex items-center gap-3 rounded-[12px] border p-3 text-left transition-all
                ${
                  currentOrder.status === status.value
                    ? "border-[#BC0000] bg-[#FFF5F5]"
                    : "border-[#E2E8F0] hover:border-[#BC0000]"
                }
              `}
            >
              <Icon className="h-5 w-5 text-[#BC0000]" />

              <span className="text-sm font-medium text-[#1E293B]">
                {status.label}
              </span>
            </button>
          );
        })}
      </div>

      {success && (
        <p className="mt-4 text-sm font-medium text-green-600">
          {success}
        </p>
      )}
    </div>
  );
}