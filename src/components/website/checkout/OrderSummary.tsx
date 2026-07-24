"use client";

import { Banknote, CreditCard, Lock, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { getProductLineTotal } from "@/lib/productQuantityRules";

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
  paymentMethod = "cod",
  onPaymentMethodChange,
}: OrderSummaryProps) {
  const hasItems = items.length > 0;
  const isDisabled = disabled || !hasItems;
  const total = subtotal + (shippingEntered ? shipping : 0);

  return (
    <div className="flex w-full flex-col gap-6 rounded-[25px] bg-[#D9D9D9]/25 px-6 pb-12 pt-8 sm:px-8">
      <h2 className="border-b border-[#C3C6D4] pb-4 font-manrope text-[32px] font-semibold leading-10 tracking-[-0.32px] text-[#1A1C1F]">
        Order Summary
      </h2>

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
                {formatCurrency(getProductLineTotal(item.price, item.quantity, item.name))}
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

<div className="mx-auto mb-6 w-full max-w-[560px] rounded-lg border border-[#C3C6D4] bg-white p-4 md:max-w-[700px] lg:max-w-[560px]">

  <h3 className="mb-3 text-base font-semibold text-[#002B73]">
    Payment Method
  </h3>

  <div className="space-y-3">
    <label className="grid w-full cursor-not-allowed grid-cols-[18px_18px_1fr_auto] items-center gap-3 rounded-lg border border-[#C3C6D4] px-3 py-4 opacity-70">
  <input
    type="radio"
    name="payment"
    value="card"
    checked={paymentMethod === "card"}
    onChange={() => onPaymentMethodChange?.("card")}
    className="h-4 w-4 accent-[#002B73]"
    disabled
  />

  <CreditCard className="h-4 w-4 text-[#747784]" />

  <span className="break-words text-sm font-medium leading-snug text-[#1A1C1F]">
    Credit or Debit Card
  </span>

  <span className="whitespace-nowrap rounded-full bg-[#FFF3CD] px-3 py-1 text-xs font-semibold text-[#8A5A00]">
    Coming Soon
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

        {/* {isDisabled && (
          <p className="text-center text-xs text-[#FF3B30]">
            {!hasItems
              ? "Add items to cart to place order"
              : "Please fill all required fields to place order"}
          </p>
        )} */}
      </div>

      <div className="flex items-center justify-center gap-2 text-xs leading-4 text-[#434652]">
        <ShieldCheck className="h-3 w-3" />
        <span>SSL Encrypted Checkout</span>
      </div>
    </div>
  );
}
