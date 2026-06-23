"use client";

import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useToastStore } from "@/store/toastStore";
import { useWebsiteAuthSession } from "@/hooks/useWebsiteAuthSession";
import type { ShopProduct } from "@/types/shopProduct";
import { useRouter } from "next/navigation";

interface ShopViewProductDetailsSectionProps {
  products: ShopProduct[];
  initialFrameType?: string;
}

export default function ShopViewProductDetailsSection({
  products,
  initialFrameType,
}: ShopViewProductDetailsSectionProps) {
  const router = useRouter();
  const { addToCart } = useCart();
  const { addToast } = useToastStore();
  const { isAuthenticated } = useWebsiteAuthSession();

  const initialHasFrame =
    initialFrameType === "black-frame" || initialFrameType === "white-frame";

  const [quantity, setQuantity] = useState(4);
  const [selectedOption, setSelectedOption] = useState(
    initialHasFrame ? "With Frame" : "Without Frame",
  );
  const [selectedColor, setSelectedColor] = useState(
    initialFrameType === "black-frame"
      ? "Black"
      : initialFrameType === "white-frame"
        ? "White"
        : "",
  );

  if (!products || products.length === 0) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="text-xl font-medium text-slate-500">
          No products found in database.
        </p>
      </div>
    );
  }

  const findProductByVariant = (variant: "without" | "black" | "white") =>
    products.find((product) => {
      const name = product.productName?.toLowerCase() ?? "";

      if (variant === "black") return name.includes("black frame");
      if (variant === "white") return name.includes("white frame");

      return (
        name.includes("without frame") ||
        (!name.includes("with frame") &&
          !name.includes("black frame") &&
          !name.includes("white frame"))
      );
    });

  const selectedProduct =
    selectedOption === "Without Frame"
      ? findProductByVariant("without") || products[0]
      : selectedColor === "Black"
        ? findProductByVariant("black") || products[0]
        : selectedColor === "White"
          ? findProductByVariant("white") || products[0]
          : products[0];

  const title = selectedProduct?.productName ?? "";
  const price = Number(selectedProduct?.price ?? 0);
  const description = selectedProduct?.description ?? "";
  const status = selectedProduct?.status ?? "Out of Stock";
  const availableStock = Math.max(Number(selectedProduct?.stock ?? 0), 0);
  const mainImage = selectedProduct?.primaryImage?.secure_url ?? "";

  const handleAddToCart = () => {
    if (status === "Out of Stock") {
      addToast("This product is out of stock!", "error");
      return;
    }

    if (availableStock < quantity) {
      addToast(`Only ${availableStock} items are available.`, "error");
      return;
    }

    if (selectedOption === "With Frame" && !selectedColor) {
      addToast("Please select frame color.", "error");
      return;
    }

    addToCart({
      id: selectedProduct?._id ?? `shop-${Date.now()}`,
      title,
      price,
      frameType: selectedOption,
      colorOption: selectedOption === "With Frame" ? selectedColor : "",
      quantity,
      image: mainImage,
      stock: availableStock,
    });

    addToast("Product added to cart successfully!", "success");
    router.push("/cart");
  };

  const handleDecreaseQuantity = () => {
    if (quantity <= 1) {
      addToast("Quantity cannot be less than 1.", "error");
      return;
    }

    setQuantity((current) => current - 1);
  };

  const handleIncreaseQuantity = () => {
    if (quantity >= availableStock) {
      addToast(`Only ${availableStock} items are available.`, "error");
      return;
    }

    setQuantity((current) => current + 1);
  };

  const handleBuyNow = () => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    if (status === "Out of Stock") {
      addToast("This product is out of stock!", "error");
      return;
    }

    if (availableStock < quantity) {
      addToast(`Only ${availableStock} items are available.`, "error");
      return;
    }

    if (selectedOption === "With Frame" && !selectedColor) {
      addToast("Please select frame color.", "error");
      return;
    }

    router.push("/checkout");
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-25 sm:px-4 lg:px-8">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="flex flex-col gap-6">
          <div className="relative flex aspect-[4/5] w-full max-h-[575px] max-w-[480px] items-center justify-center overflow-hidden rounded-sm bg-[#F4F3ED]">
            {mainImage ? (
              <img
                src={mainImage}
                alt={title}
                className="h-full w-full object-cover"
              />
            ) : (
              <p className="text-sm font-medium text-slate-400">
                No image available
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col pt-3">
          <h1 className="mb-3 text-[22px] font-medium text-slate-800">
            {title}
          </h1>

          <div className="mb-6 flex items-center gap-4">
            <div className="text-[#FFB800]">★★★★★</div>
            <div className="mx-1 h-4 w-px bg-slate-300" />

            <span
              className={`text-sm font-bold uppercase ${
                status === "Out of Stock"
                  ? "text-red-700"
                  : status === "Low Stock"
                    ? "text-red-500"
                    : "text-green-600"
              }`}
            >
              {status}
            </span>

            <span className="text-sm text-slate-500">
              ({availableStock} Available)
            </span>
          </div>

          <div className="mb-6 text-[24px] font-bold text-[#1A2B5E] md:text-[32px]">
            Rs {price.toFixed(2)}
          </div>

          <p className="mb-8 text-sm leading-relaxed text-slate-600 md:text-base">
            {description}
          </p>

          <hr className="mb-8 w-full max-w-[551px] border-slate-200" />

          <div className="mb-8">
            <label className="mb-3 block text-[15px] text-slate-800">
              Personalization
            </label>

            <select
              value={selectedOption}
              onChange={(e) => {
                setSelectedOption(e.target.value);
                setSelectedColor("");
                setQuantity(4);
              }}
              className="h-11 w-full max-w-[260px] rounded-full border-2 border-[#002B73] px-4 text-sm outline-none"
            >
              <option value="Without Frame">Without Frame</option>
              <option value="With Frame">With Frame</option>
            </select>
          </div>

          {selectedOption === "With Frame" && (
            <div className="mb-8">
              <label className="mb-3 block text-[15px] text-slate-800">
                Select Color
              </label>

              <div className="flex gap-5">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedColor("Black");
                    setQuantity(4);
                  }}
                  className="flex flex-col items-center gap-1 text-xs"
                >
                  <span
                    className={`h-8 w-8 rounded-full border bg-black ${
                      selectedColor === "Black"
                        ? "ring-2 ring-[#002B73] ring-offset-2"
                        : ""
                    }`}
                  />
                  Black
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedColor("White");
                    setQuantity(4);
                  }}
                  className="flex flex-col items-center gap-1 text-xs"
                >
                  <span
                    className={`h-8 w-8 rounded-full border bg-white ${
                      selectedColor === "White"
                        ? "ring-2 ring-[#002B73] ring-offset-2"
                        : ""
                    }`}
                  />
                  White
                </button>
              </div>
            </div>
          )}

          <div className="mb-10">
            <label className="mb-3 block text-[15px] text-slate-800">
              Quantity
            </label>

            <div className="flex w-fit items-center rounded-[4px] border border-slate-200">
              <button
                type="button"
                onClick={handleDecreaseQuantity}
                className="flex h-10 w-10 items-center justify-center"
              >
                −
              </button>

              <div className="flex h-10 w-10 items-center justify-center border-x text-[15px] font-semibold">
                {quantity}
              </div>

              <button
                type="button"
                onClick={handleIncreaseQuantity}
                disabled={quantity >= availableStock}
                className="flex h-10 w-10 items-center justify-center disabled:cursor-not-allowed disabled:opacity-40"
              >
                +
              </button>
            </div>
          </div>

          <div className="flex max-w-[500px] flex-col gap-4 sm:flex-row">
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={status === "Out of Stock" || availableStock < quantity}
              className="flex flex-1 items-center justify-center rounded-[4px] border-2 border-[#1A2B5E] px-6 py-3 font-medium text-[#1A2B5E] disabled:cursor-not-allowed disabled:opacity-50"
            >
              🛒 Add to Cart
            </button>

            <button
              type="button"
              onClick={handleBuyNow}
              disabled={status === "Out of Stock" || availableStock < quantity}
              className={`flex-1 rounded-[4px] px-6 py-3 font-medium text-white ${
                status !== "Out of Stock" && availableStock >= quantity
                  ? "bg-[#E62A24]"
                  : "cursor-not-allowed bg-[#E62A24]/60 opacity-50"
              }`}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}