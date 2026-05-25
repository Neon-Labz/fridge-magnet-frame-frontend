"use client";

import { Card, CardContent } from "@/components/ui/card";
import FramePreview from "../FramePreview";

export type OrderItem = {
  id: string | number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  frameType?: string;
  colorOption?: string;
};

interface OrderDetailsProps {
  items: OrderItem[];
  subtotal: number;
  shipping?: number;
  orderNumber?: string;
}

const resolvePreview = (item: OrderItem): "updated-1" | "updated-2" | "gradient" => {
  if (item.image === "updated-1" || item.image === "updated-2") {
    return item.image;
  }

  if (item.name.toLowerCase().includes("white frame")) {
    return "updated-1";
  }

  if (item.name.toLowerCase().includes("magnate frame")) {
    return "updated-2";
  }

  return "gradient";
};

export default function OrderDetails({
  items,
  subtotal,
  shipping = 200,
  orderNumber = "MAG-29481",
}: OrderDetailsProps) {
  const total = subtotal + shipping;

  return (
    <Card className="overflow-hidden rounded-[20px] border border-[#C3C6D4] bg-white shadow-sm">
      <CardContent className="space-y-6 p-8">
        <div className="flex flex-col gap-4 border-b border-[#E2E2E7] pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[24px] font-manrope font-semibold text-[#002B73]">
              Order Details
            </p>
          </div>
          <div className="inline-flex rounded-full bg-[#E8E8ED] px-4 py-2 text-sm font-medium text-[#1A1C1F]">
            Order #{orderNumber}
          </div>
        </div>

        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex flex-col gap-4 border-b border-[#E2E2E7] pb-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex min-w-0 items-center gap-4">
                <FramePreview
                  variant={resolvePreview(item)}
                  className="h-24 w-24"
                />
                <div className="min-w-0">
                  <p className="truncate text-lg font-semibold text-[#1A1C1F]">{item.name}</p>
                  <p className="mt-2 text-sm leading-6 text-[#434652]">
                    Quantity: {item.quantity}
                  </p>
                </div>
              </div>
              <div className="text-lg font-semibold text-[#1A1C1F]">
                Rs{(item.price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-3 border-t border-[#C3C6D4] pt-5 text-sm text-[#434652]">
          <div className="flex items-center justify-between">
            <span>Subtotal</span>
            <span>Rs{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Shipping</span>
            <span>Rs{shipping.toFixed(2)}</span>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-[#C3C6D4] pt-5 text-[18px] font-semibold text-[#002B73]">
          <span>Total</span>
          <span>Rs{total.toFixed(2)}</span>
        </div>
      </CardContent>
    </Card>
  );
}
