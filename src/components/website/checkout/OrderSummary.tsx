"use client";

import { Banknote, CreditCard, Lock, ShieldCheck } from "lucide-react";
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

const formatCurrency = (value: number) =>
  `Rs${value.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

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
    <div className="flex w-full flex-col gap-6 rounded-[25px] bg-[#D9D9D9]/25 px-6 pb-12 pt-8 sm:px-8">
      {/* Heading */}
      <h2 className="border-b border-[#C3C6D4] pb-4 font-manrope text-[32px] font-semibold leading-10 tracking-[-0.32px] text-[#1A1C1F]">
        Order Summary
      </h2>

      {/* Items List */}
      <div className="flex flex-col gap-6 pt-2">
        {hasItems ? (
          items.map((item, index) => (
            <div
              key={`${item.id}-${item.frameType ?? ""}-${item.colorOption ?? ""}-${index}`}
              className="flex items-center gap-4"
            >
              <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center overflow-hidden rounded border border-[#C3C6D4] bg-white">
                <Image
                  src={item.image || "/home-product-1.png"}
                  alt={item.name}
                  width={80}
                  height={80}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="font-manrope text-base font-bold leading-6 text-[#1A1C1F] line-clamp-2">
                  {item.name}
                </h3>
                <p className="text-sm leading-5 text-[#434652]">
                  Quantity:{item.quantity}
                </p>
              </div>

              <div className="whitespace-nowrap text-right text-base font-bold leading-6 text-[#0040A1]">
                {formatCurrency(item.price * item.quantity)}
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-lg bg-white p-6 text-center">
            <p className="text-sm font-semibold text-[#1A1C1F]">
              Your cart is empty.
            </p>
            <p className="mt-2 text-xs text-[#434652]">
              Add items to checkout before placing your order.
            </p>
          </div>
        )}
      </div>

      {/* Calculation */}
      <div className="flex flex-col gap-4 border-t border-[#C3C6D4] pb-2 pt-8">
        <div className="flex items-start justify-between text-base leading-6 text-[#434652]">
          <span>Subtotal</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>

        <div className="flex items-start justify-between text-base leading-6 text-[#434652]">
          <span>Shipping</span>
          {shippingEntered ? (
            <span>{formatCurrency(shipping)}</span>
          ) : (
            <span className="text-[#5D1900]">Enter your shipping address</span>
          )}
        </div>

        <div className="flex items-start justify-between border-t border-[#C3C6D4] pt-4 font-manrope text-base leading-6 text-[#0040A1]">
          <span>Total</span>
          <span>{formatCurrency(total)}</span>
        </div>
      </div>

      {/* Payment Method */}
      <div className="flex flex-col gap-6 rounded-xl border border-[#C3C6D4] bg-white px-8 pb-12 pt-8 shadow-sm">
        <h3 className="font-manrope text-2xl font-semibold leading-8 text-[#002B73]">
          Payment Method
        </h3>

        <div className="flex flex-col gap-3">
          <label className="flex h-[58px] cursor-pointer items-center gap-4 rounded-lg border border-[#C3C6D4] px-4 hover:bg-[#F9FAFB]">
            <input
              type="radio"
              name="payment"
              value="card"
              checked={paymentMethod === "card"}
              onChange={() => onPaymentMethodChange?.("card")}
              className="h-[18px] w-[18px] accent-[#002B73]"
            />
            <CreditCard className="h-5 w-5 text-[#747784]" />
            <span className="text-base font-medium leading-6 text-[#1A1C1F]">
              Credit or Debit Card
            </span>
          </label>

          <label className="flex h-[58px] cursor-pointer items-center gap-4 rounded-lg border border-[#C3C6D4] px-4 hover:bg-[#F9FAFB]">
            <input
              type="radio"
              name="payment"
              value="cod"
              checked={paymentMethod === "cod"}
              onChange={() => onPaymentMethodChange?.("cod")}
              className="h-[18px] w-[18px] accent-[#002B73]"
            />
            <Banknote className="h-5 w-5 text-[#747784]" />
            <span className="text-base font-medium leading-6 text-[#1A1C1F]">
              Cash on Delivery
            </span>
          </label>
        </div>
      </div>

      {/* Place Order Button */}
      <div className="flex flex-col gap-3">
        <Button
          type="button"
          className={`flex h-[60px] w-full items-center justify-center gap-3 rounded-lg text-lg font-bold leading-7 text-white shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] ${
            isDisabled
              ? "cursor-not-allowed bg-[#D3D3D3] opacity-60 shadow-none"
              : "bg-[#E61D11] hover:bg-[#FF3B30]"
          }`}
          onClick={() => !isDisabled && onPlaceOrder?.()}
          disabled={isDisabled}
        >
          <Lock className="h-5 w-5" />
          Place Order
        </Button>

        {isDisabled && (
          <p className="text-center text-xs text-[#FF3B30]">
            {!hasItems
              ? "Add items to cart to place order"
              : "Please fill all required fields to place order"}
          </p>
        )}
      </div>

      {/* SSL note */}
      <div className="flex items-center justify-center gap-2 text-xs leading-4 text-[#434652]">
        <ShieldCheck className="h-3 w-3" />
        <span>SSL Encrypted Checkout</span>
      </div>
    </div>
  );
}
