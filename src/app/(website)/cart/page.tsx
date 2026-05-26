"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Trash2 } from "lucide-react";
import OrderSummary from "@/components/OrderSummary";
import { useCart } from "@/context/CartContext";

type CartItemData = {
  id: string;
  title: string;
  subtitle: string;
  price: number;
  quantity: number;
  image: string;
  frameType?: string;
  colorOption?: string;
};

function CartItem({
  item,
  onQuantityChange,
  onDelete,
}: {
  item: CartItemData;
  onQuantityChange: (
    id: string,
    frameType: string | undefined,
    colorOption: string | undefined,
    quantity: number
  ) => void;
  onDelete: (
    id: string,
    frameType: string | undefined,
    colorOption: string | undefined
  ) => void;
}) {
  const handleInput = (value: string) => {
    const qty = Number(value);

    if (!Number.isNaN(qty)) {
      onQuantityChange(
        item.id,
        item.frameType,
        item.colorOption,
        Math.max(1, qty)
      );
    }
  };

  return (
<article className="relative flex flex-col sm:flex-row gap-5 sm:gap-6 p-9 bg-white border border-[#E2E8F0] rounded-xl w-full max-w-[1220px]">      {/* DELETE */}
      <button
        type="button"
        onClick={() =>
          onDelete(item.id, item.frameType, item.colorOption)
        }
        className="absolute top-3 right-3 z-10 text-gray-500 hover:text-red-500"
        aria-label="Delete item"
      >
        <Trash2 size={16} />
      </button>

      {/* IMAGE */}
      <div className="w-[90px] h-[90px] bg-[#F3F3F8] rounded-lg flex items-center justify-center overflow-hidden shrink-0">
        <Image
          src={
            item.image ||
            'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="178" height="178"><rect width="178" height="178" fill="#e5e7eb" /></svg>'
          }
          alt={item.title || "Product image"}
          width={90}
          height={90}
          className="object-cover rounded-lg w-full h-full"
        />
      </div>

      {/* CONTENT */}
      <div className="flex-1 flex flex-col justify-between gap-[18px]">
        {/* TITLE */}
        <div>
          <h3 className="text-[16px] sm:text-[18px] font-semibold text-[#002B73]">
            {item.title}
          </h3>

          {/* SUBTITLE */}
          <p className="text-[14px] sm:text-[15px] text-gray-600">
            {item.subtitle}
          </p>
        </div>

        {/* BOTTOM ROW */}
        <div className="flex items-center justify-between">
          {/* QUANTITY */}
          <div className="flex items-center border border-gray-300 w-[130px] sm:w-28 rounded-md overflow-hidden">
            <button
              type="button"
              onClick={() =>
                onQuantityChange(
                  item.id,
                  item.frameType,
                  item.colorOption,
                  Math.max(4, item.quantity - 1)
                )
              }
              className="px-3 py-1 hover:bg-gray-100"
            >
              -
            </button>

            <input
              value={item.quantity}
              onChange={(e) => handleInput(e.target.value)}
              className="w-10 text-center outline-none text-sm"
              type="number"
              inputMode="numeric"
            />

            <button
              type="button"
              onClick={() =>
                onQuantityChange(
                  item.id,
                  item.frameType,
                  item.colorOption,
                  item.quantity + 1
                )
              }
              className="px-3 py-1 hover:bg-gray-100"
            >
              +
            </button>
          </div>

          {/* PRICE */}
          <div className="font-semibold text-[#1A1C1F]">
            Rs {(item.price * item.quantity).toFixed(2)}
          </div>
        </div>
      </div>
    </article>
  );
}

export default function CartPage() {
  const {
    items,
    subtotal,
    totalQuantity,
    updateQuantity,
    removeFromCart,
  } = useCart();

  const handleQuantityChange = (
    id: string,
    frameType: string | undefined,
    colorOption: string | undefined,
    quantity: number
  ) => {
    updateQuantity(
      id,
      frameType,
      colorOption,
      Math.max(1, quantity)
    );
  };

  const handleDelete = (
    id: string,
    frameType: string | undefined,
    colorOption: string | undefined
  ) => {
    removeFromCart(id, frameType, colorOption);
  };

  return (
    <div className="bg-[#F9F9FE]">
      <main className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-[120px] py-10 lg:py-25">
        {/* HEADER */}
        <header className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#1A1C1F]">
            Your Gallery Bag
          </h1>

          <p className="text-gray-500 mt-2 text-sm sm:text-base">
            Review your items before checkout
          </p>
        </header>

        {/* GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_340px] gap-8 items-start">
          {/* LEFT */}
          <section className="space-y-5 w-full">
            {items.map((it) => {
              const item: CartItemData = {
                id: it.id,
                title: it.title,
                subtitle: it.colorOption
                  ? `Frame: ${it.frameType} • Color: ${it.colorOption}`
                  : `Frame: ${it.frameType}`,
                price: it.price,
                quantity: it.quantity,
                image: it.image,
                frameType: it.frameType,
                colorOption: it.colorOption,
              };

              return (
                <CartItem
                  key={`${item.id}-${item.frameType}-${item.colorOption ?? "no-color"}`}
                  item={item}
                  onQuantityChange={handleQuantityChange}
                  onDelete={handleDelete}
                />
              );
            })}

            <Link
              href="/shop"
              className="inline-flex items-center gap-2 text-[#002B73] font-medium hover:underline"
            >
              <ArrowLeft size={18} />
              Continue Shopping
            </Link>
          </section>

          {/* RIGHT */}
          <OrderSummary
            subtotal={subtotal}
            quantity={totalQuantity}
          />
        </div>
      </main>
    </div>
  );
}