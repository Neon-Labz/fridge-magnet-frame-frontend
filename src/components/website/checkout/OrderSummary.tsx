"use client";

import { CreditCard, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

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
  shipping?: number;
  shippingEntered?: boolean;
  onPlaceOrder?: () => void;
  disabled?: boolean;
  paymentMethod?: "card" | "cod";
  onPaymentMethodChange?: (method: "card" | "cod") => void;
}

export default function OrderSummary({
  items,
  subtotal,
  shipping = 0,
  shippingEntered = false,
  onPlaceOrder,
  disabled = false,
  paymentMethod = "card",
  onPaymentMethodChange,
}: OrderSummaryProps) {
  const hasItems = items.length > 0;
  const isDisabled = disabled || !hasItems;
  const total = subtotal + (shippingEntered ? shipping : 0);

  return (
    <div className="w-full rounded-xl border border-gray-200 bg-white py-6 shadow-sm">
      <h2 className="mb-6 px-4 text-xl font-semibold text-[#1A1C1F] sm:px-6 sm:text-2xl">
        Order Summary
      </h2>

      <div className="mb-6 space-y-4 px-4 sm:px-6">
        {hasItems ? (
          items.map((item) => (
            <div key={item.id} className="flex gap-3 sm:gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded border border-[#C3C6D4] bg-white sm:h-20 sm:w-20">
                <Image
                  src={item.image || "/home-product-1.png"}
                  alt={item.name}
                  width={80}
                  height={80}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="line-clamp-2 text-sm font-semibold text-[#1A1C1F] sm:text-base">
                  {item.name}
                </h3>
                <p className="mt-1 text-xs text-[#434652] sm:text-sm">
                  Quantity: {item.quantity}
                </p>
              </div>

              <div className="whitespace-nowrap text-right text-sm font-semibold text-[#0040A1] sm:text-base">
                Rs{(item.price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-lg bg-[#F9F9FE] p-6 text-center">
            <p className="text-sm font-semibold text-[#1A1C1F]">
              Your cart is empty.
            </p>
            <p className="mt-2 text-xs text-[#434652]">
              Add items to checkout before placing your order.
            </p>
          </div>
        )}
      </div>

      <div className="mx-4 mb-4 border-t border-[#C3C6D4] sm:mx-6" />

      <div className="mb-4 space-y-3 px-4 sm:px-6">
        <div className="flex justify-between text-xs text-[#434652] sm:text-sm">
          <span>Subtotal</span>
          <span className="font-medium">
            Rs{subtotal.toLocaleString(undefined, { maximumFractionDigits: 2 })}
          </span>
        </div>

        <div className="flex justify-between gap-3 text-xs text-[#434652] sm:text-sm">
          <span>Shipping</span>
          {shippingEntered ? (
            <span className="font-medium">
              Rs{shipping.toLocaleString(undefined, { maximumFractionDigits: 2 })}
            </span>
          ) : (
            <span className="text-right text-xs text-[#5D1900]">
              Enter your shipping address
            </span>
          )}
        </div>
      </div>

      <div className="mx-4 mb-4 border-t border-[#C3C6D4] sm:mx-6" />

      <div className="mb-6 flex justify-between px-4 sm:px-6">
        <span className="text-sm font-semibold text-[#434652] sm:text-base">
          Total
        </span>
        <span className="text-sm font-semibold text-[#0040A1] sm:text-base">
          Rs{total.toLocaleString(undefined, { maximumFractionDigits: 2 })}
        </span>
      </div>

      {/* Payment */}
<div className="mx-4 mb-6 rounded-lg border border-[#C3C6D4] bg-white p-4 sm:mx-6">
  <h3 className="mb-3 text-base font-semibold text-[#002B73]">
    Payment Method
  </h3>

  <div className="space-y-3">
    <label className="grid w-full cursor-pointer grid-cols-[18px_18px_1fr] items-center gap-3 rounded-lg border border-[#C3C6D4] px-3 py-4 hover:bg-[#F9FAFB]">
      <input
        type="radio"
        name="payment"
        value="card"
        checked={paymentMethod === "card"}
        onChange={() => onPaymentMethodChange?.("card")}
        className="h-4 w-4 accent-[#002B73]"
      />

      <CreditCard className="h-4 w-4 text-[#747784]" />

      <span className="break-words text-sm font-medium leading-snug text-[#1A1C1F]">
        Credit or Debit Card
      </span>
    </label>

    <label className="grid w-full cursor-pointer grid-cols-[18px_18px_1fr] items-center gap-3 rounded-lg border border-[#C3C6D4] px-3 py-4 hover:bg-[#F9FAFB]">
      <input
        type="radio"
        name="payment"
        value="cod"
        checked={paymentMethod === "cod"}
        onChange={() => onPaymentMethodChange?.("cod")}
        className="h-4 w-4 accent-[#002B73]"
      />

      <Lock className="h-4 w-4 text-[#747784]" />

      <span className="break-words text-sm font-medium leading-snug text-[#1A1C1F]">
        Cash on Delivery
      </span>
    </label>
  </div>


      </div>

      <div className="mb-3 px-4 sm:px-6">
        <Button
          type="button"
          className={`flex w-full items-center justify-center gap-2 rounded py-3 text-base font-bold text-white ${
            isDisabled
              ? "cursor-not-allowed bg-[#D3D3D3] opacity-60"
              : "bg-[#FF3B30] hover:bg-[#E61D11]"
          }`}
          onClick={() => !isDisabled && onPlaceOrder?.()}
          disabled={isDisabled}
        >
          <Lock className="h-4 w-4" />
          {paymentMethod === "card" ? "Proceed to Payment" : "Place Order"}
        </Button>

        {isDisabled && (
          <p className="mt-2 text-center text-xs text-[#FF3B30]">
            {!hasItems
              ? "Add items to cart to place order"
              : "Please fill all required fields to place order"}
          </p>
        )}
      </div>

      <div className="flex items-center justify-center gap-1 px-4 pb-4 text-xs text-[#434652] sm:px-6 sm:pb-6">
        <Lock className="h-3 w-3 shrink-0" />
        <span>SSL Encrypted Checkout</span>
      </div>
    </div>
  );
}