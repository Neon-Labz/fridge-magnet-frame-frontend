"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import FramePreview from "../FramePreview";
import { CreditCard, Lock } from "lucide-react";

export type SummaryItem = {
  id: string | number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
};

interface OrderSummaryProps {
  items: SummaryItem[];
  subtotal: number;
  onPlaceOrder?: () => void;
}

const resolvePreview = (item: SummaryItem): "updated-1" | "updated-2" | "gradient" => {
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

export default function OrderSummary({ items, subtotal, onPlaceOrder }: OrderSummaryProps) {
  const hasItems = items.length > 0;

  return (
    <div className="rounded-[25px] bg-[rgba(217,217,217,0.25)] p-5">
      <Card className="border-0 bg-transparent shadow-none">
        <CardHeader className="border-b border-[#C3C6D4] px-0 pb-4 pt-0">
          <div>
            <h2 className="font-manrope text-[32px] font-semibold tracking-[-0.01em] text-[#1A1C1F]">
              Order Summary
            </h2>
          </div>
        </CardHeader>
        <CardContent className="space-y-6 px-0 pb-0 pt-6">
          <div className="space-y-5 border-b border-[#C3C6D4] pb-5">
            {hasItems ? (
              items.map((item) => (
                <div key={item.id} className="flex items-center gap-4">
                  <FramePreview
                    variant={resolvePreview(item)}
                    className="h-14 w-14 flex-shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate text-sm font-semibold text-[#1A1C1F]">
                      {item.name}
                    </h3>
                    <p className="text-[13px] text-[#434652]">Quantity: {item.quantity}</p>
                  </div>
                  <div className="text-sm font-bold text-[#0040A1]">
                    Rs{(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))
            ) : (
              <div className="rounded-[16px] bg-white p-6 text-center text-[#434652]">
                <p className="text-base font-semibold text-[#1A1C1F]">Your cart is empty.</p>
                <p className="mt-2 text-sm">Add items to checkout before placing your order.</p>
              </div>
            )}
          </div>

          <div className="space-y-4 border-b border-[#C3C6D4] pb-5 text-sm text-[#434652]">
            <div className="flex items-center justify-between">
              <span>Subtotal</span>
              <span>Rs{subtotal.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Shipping</span>
              <span className="text-[#5D1900]">Enter your shipping address</span>
            </div>
          </div>

          <div className="flex items-center justify-between border-b border-[#C3C6D4] pb-4 text-sm">
            <span className="text-[#0040A1]">Total</span>
            <span className="text-[#0040A1]">
              Rs{subtotal.toLocaleString(undefined, { maximumFractionDigits: 2 })}
            </span>
          </div>

          <div className="rounded-lg border border-[#C3C6D4] bg-white p-4">
            <h3 className="text-xl font-semibold text-[#002B73]">Payment Method</h3>
            <div className="mt-4 space-y-3">
              <label className="flex items-center gap-3 rounded-lg border border-[#C3C6D4] px-4 py-3 text-sm text-[#1A1C1F]">
                <input
                  type="radio"
                  name="payment"
                  defaultChecked
                  className="h-4 w-4 accent-[#002B73]"
                />
                <CreditCard className="h-4 w-4 text-[#747784]" />
                <span>Credit or Debit Card</span>
              </label>
              <label className="flex items-center gap-3 rounded-lg border border-[#C3C6D4] px-4 py-3 text-sm text-[#1A1C1F]">
                <input type="radio" name="payment" className="h-4 w-4 accent-[#002B73]" />
                <Lock className="h-4 w-4 text-[#747784]" />
                <span>Cash on Delivery</span>
              </label>
            </div>
          </div>

          <Button
            variant="danger"
            className="w-full text-[18px]"
            onClick={onPlaceOrder}
            disabled={!hasItems}
          >
            <Lock className="mr-2 h-4 w-4" />
            Place Order
          </Button>

          <div className="flex items-center justify-center gap-2 text-[12px] text-[#434652]">
            <Lock className="h-3 w-3" />
            <span>SSL Encrypted Checkout</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
