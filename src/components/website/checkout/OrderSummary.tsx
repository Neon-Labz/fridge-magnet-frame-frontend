"use client";

import { CreditCard, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import FramePreview from "../FramePreview";

export type SummaryItem = {
  id: string | number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  frameType?: string;
  colorOption?: string;
};

interface OrderSummaryProps {
  items: SummaryItem[];
  subtotal: number;
  onPlaceOrder?: () => void;
  disabled?: boolean;
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

export default function OrderSummary({ items, subtotal, onPlaceOrder, disabled = false }: OrderSummaryProps) {
  const hasItems = items.length > 0;
  const isDisabled = disabled || !hasItems;

  return (
    <div className="w-full">
      {/* Header */}
      <h2 className="text-xl sm:text-2xl font-semibold text-[#1A1C1F] mb-6 px-4 sm:px-6">
        Order Summary
      </h2>

      {/* Items List */}
      <div className="space-y-4 mb-6 px-4 sm:px-6">
        {hasItems ? (
          items.map((item) => (
            <div key={item.id} className="flex gap-3 sm:gap-4">
              {/* Product Image */}
              <div className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded border border-[#C3C6D4] bg-white overflow-hidden flex items-center justify-center">
                <FramePreview
                  variant={resolvePreview(item)}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Product Info */}
              <div className="flex-1 min-w-0">
                <h3 className="text-sm sm:text-base font-semibold text-[#1A1C1F] line-clamp-2">
                  {item.name}
                </h3>
                <p className="text-xs sm:text-sm text-[#434652] mt-1">
                  Quantity: {item.quantity}
                </p>
              </div>

              {/* Price */}
              <div className="text-sm sm:text-base font-semibold text-[#0040A1] text-right whitespace-nowrap">
                Rs{(item.price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-lg bg-[#F9F9FE] p-6 text-center">
            <p className="text-sm font-semibold text-[#1A1C1F]">Your cart is empty.</p>
            <p className="mt-2 text-xs text-[#434652]">Add items to checkout before placing your order.</p>
          </div>
        )}
      </div>

      {/* Divider */}
      <div className="border-t border-[#C3C6D4] mb-4 mx-4 sm:mx-6"></div>

      {/* Subtotal & Shipping */}
      <div className="space-y-3 mb-4 px-4 sm:px-6">
        <div className="flex justify-between text-xs sm:text-sm text-[#434652]">
          <span>Subtotal</span>
          <span className="font-medium">Rs{subtotal.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
        </div>
        <div className="flex justify-between text-xs sm:text-sm text-[#434652]">
          <span>Shipping</span>
          <span className="text-[#5D1900] text-xs">Enter your shipping address</span>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-[#C3C6D4] mb-4 mx-4 sm:mx-6"></div>

      {/* Total */}
      <div className="flex justify-between mb-6 px-4 sm:px-6">
        <span className="text-sm sm:text-base font-semibold text-[#434652]">Total</span>
        <span className="text-sm sm:text-base font-semibold text-[#0040A1]">Rs{subtotal.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
      </div>

      {/* Payment Method */}
      <div className="bg-white rounded-lg border border-[#C3C6D4] p-4 mb-6 mx-4 sm:mx-6">
        <h3 className="text-base font-semibold text-[#002B73] mb-3">Payment Method</h3>
        <div className="space-y-2">
          <label className="flex items-center gap-3 p-3 border border-[#C3C6D4] rounded cursor-pointer hover:bg-[#F9FAFB] transition-colors">
            <input
              type="radio"
              name="payment"
              defaultChecked
              className="h-4 w-4 accent-[#002B73]"
            />
            <CreditCard className="h-4 w-4 text-[#747784] flex-shrink-0" />
            <span className="text-sm font-medium text-[#1A1C1F]">Credit or Debit Card</span>
          </label>
          <label className="flex items-center gap-3 p-3 border border-[#C3C6D4] rounded cursor-pointer hover:bg-[#F9FAFB] transition-colors">
            <input 
              type="radio" 
              name="payment" 
              className="h-4 w-4 accent-[#002B73]"
            />
            <Lock className="h-4 w-4 text-[#747784] flex-shrink-0" />
            <span className="text-sm font-medium text-[#1A1C1F]">Cash on Delivery</span>
          </label>
        </div>
      </div>

      {/* Place Order Button */}
      <div className="px-4 sm:px-6 mb-3">
        <Button
          type="button"
          className={`w-full text-white font-bold text-base py-3 rounded transition-colors flex items-center justify-center gap-2 ${
            isDisabled
              ? "bg-[#D3D3D3] cursor-not-allowed opacity-60" 
              : "bg-[#FF3B30] hover:bg-[#E61D11]"
          }`}
          onClick={() => !isDisabled && onPlaceOrder?.()}
          disabled={isDisabled}
        >
          <Lock className="h-4 w-4" />
          Place Order
        </Button>
        {isDisabled && (
          <p className="text-xs text-center text-[#FF3B30] mt-2">
            {!hasItems 
              ? "Add items to cart to place order" 
              : "Please fill all required fields to place order"}
          </p>
        )}
      </div>

      {/* SSL Info */}
      <div className="flex items-center justify-center gap-1 text-xs text-[#434652] px-4 sm:px-6 pb-4 sm:pb-6">
        <Lock className="h-3 w-3" />
        <span>SSL Encrypted Checkout</span>
      </div>
    </div>
  );
}
