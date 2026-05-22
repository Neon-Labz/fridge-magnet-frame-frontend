"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Trash2 } from "lucide-react";
import OrderSummary from "@/components/OrderSummary";

type CartItemData = {
  id: string;
  title: string;
  subtitle: string;
  price: number;
  quantity: number;
  image: string;
};

function CartItem({
  item,
  onQuantityChange,
  onDelete,
}: {
  item: CartItemData;
  onQuantityChange: (id: string, quantity: number) => void;
  onDelete: (id: string) => void;
}) {
  const handleInput = (value: string) => {
    const qty = Number(value);
    if (!isNaN(qty)) {
      onQuantityChange(item.id, qty < 1 ? 1 : qty);
    }
  };

  return (
    <article className="relative flex flex-col sm:flex-row gap-4 sm:gap-5 p-4 bg-white border border-[#E2E8F0] rounded-xl w-full max-w-[700px]">
      {/* DELETE */}
      <button
        type="button"
        onClick={() => onDelete(item.id)}
        className="absolute top-3 right-3 z-10 text-gray-500 hover:text-red-500"
      >
        <Trash2 size={16} />
      </button>

      {/* IMAGE (CENTER FIXED) */}
      <div className="w-[90px] h-[90px] bg-[#F3F3F8] rounded-lg flex items-center justify-center overflow-hidden">
        <Image
          src={item.image}
          alt={item.title}
          width={80}
          height={80}
          className="object-contain"
        />
      </div>

      {/* CONTENT */}
      <div className="flex-1 flex flex-col justify-between gap-[18px]">
        {/* TITLE */}
        <div>
          <h3 className="text-[16px] sm:text-[18px] font-semibold text-[#002B73]">
            {item.title}
          </h3>

          {/* SUBTITLE FIXED */}
          <p className="text-[14px] sm:text-[15px] text-gray-600">
            {item.subtitle}
          </p>
        </div>

        {/* BOTTOM ROW */}
        <div className="flex items-center justify-between">
          {/* QUANTITY */}
          <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
            <button
              type="button"
              onClick={() =>
                onQuantityChange(item.id, Math.max(1, item.quantity - 1))
              }
              className="px-3 py-1 hover:bg-gray-100"
            >
              -
            </button>

            <input
              value={item.quantity}
              onChange={(e) => handleInput(e.target.value)}
              className="w-10 text-center outline-none text-sm"
              type="text"
              inputMode="numeric"
            />

            <button
              type="button"
              onClick={() => onQuantityChange(item.id, item.quantity + 1)}
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
  const [cartItems, setCartItems] = useState<CartItemData[]>([
    {
      id: "1",
      title: "Heritage Oak Frame",
      subtitle: "Frame: White",
      price: 250,
      quantity: 2,
      image: "/logo.png",
    },
    {
      id: "2",
      title: "Modern Matte Ebony",
      subtitle: "Frame: No Frame",
      price: 125,
      quantity: 1,
      image: "/logo.png",
    },
  ]);

  const handleQuantityChange = (id: string, quantity: number) => {
    setCartItems((items) =>
      items.map((item) => (item.id === id ? { ...item, quantity } : item)),
    );
  };

  const handleDelete = (id: string) => {
    setCartItems((items) => items.filter((i) => i.id !== id));
  };

  const subtotal = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const totalQty = cartItems.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <div className="bg-[#F9F9FE]">
      <main className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10 py-10 lg:py-14">
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
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_340px] gap-8 items-start mr-12">
          {/* LEFT */}
          <section className="space-y-5 w-full">
            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onQuantityChange={handleQuantityChange}
                onDelete={handleDelete}
              />
            ))}

            <Link
              href="/shop"
              className="inline-flex items-center gap-2 text-[#002B73] font-medium hover:underline"
            >
              <ArrowLeft size={18} />
              Continue Shopping
            </Link>
          </section>

          {/* RIGHT */}
          <OrderSummary subtotal={subtotal} quantity={totalQty} />
        </div>
      </main>
    </div>
  );
}