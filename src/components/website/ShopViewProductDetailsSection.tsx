"use client";

import React, { useCallback, useState } from "react";
import PersonalizationSection, { PersonalizationState } from "./PersonalizationSection";
import { useFrameStore } from "@/store/frameStore";
import { useCartStore } from "@/store/cartStore";
import { useToastStore } from "@/store/toastStore";
import type { ShopProduct } from "@/types/shopProduct";

interface ShopViewProductDetailsSectionProps {
  products: ShopProduct[];
}

function toStringArray(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value
      .map((item) => (typeof item === "string" ? item.trim() : ""))
      .filter(Boolean);
  }

  if (typeof value === "string") {
    const normalized = value.trim();
    return normalized ? [normalized] : [];
  }

  return [];
}

export default function ShopViewProductDetailsSection({
  products,
}: ShopViewProductDetailsSectionProps) {
  const selectedFrame = useFrameStore((s) => s.selectedFrame);

  const { addToCart } = useCartStore();
  const { addToast } = useToastStore();

  const [quantity, setQuantity] = useState(1);
  
  const handlePersonalizationChange = useCallback(
    (_state: PersonalizationState) => {
      // Store personalization state if needed for future use
    },
    []
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

  const product = products[0] && typeof products[0] === "object" ? products[0] : {};

  const title = product.productName ?? "";
  const price = Number(product.price ?? 0);
  const description = product.description ?? "";
  const inStock = product.status === "In Stock";
  const mainImage = product.primaryImage?.secure_url;

  const personalizationOptions =
    toStringArray(product.personalizationInstructions).length > 0
      ? toStringArray(product.personalizationInstructions)
      : toStringArray(product.personalization);

  const handleAddToCart = () => {
    addToCart({
      id: product._id ?? `shop-${Date.now()}`,
      title,
      price,
      frameOption: selectedFrame,
      quantity,
      image: mainImage,
    });

    addToast("Product added to cart successfully!", "success");
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">

        {/* IMAGE */}
        <div className="flex flex-col gap-6">
          <div className="relative flex aspect-[4/5] items-center justify-center overflow-hidden rounded-sm bg-[#F4F3ED]">
            {mainImage ? (
              <img
                src={mainImage}
                alt={title}
                className="h-full w-full object-cover"
                width={500}
                height={625}
              />
            ) : (
              <div className="text-center">
                <p className="text-sm font-medium text-slate-400">
                  No image available
                </p>
              </div>
            )}
          </div>
        </div>

        {/* DETAILS */}
        <div className="flex flex-col pt-4">
          <h1 className="mb-3 text-[22px] font-medium text-slate-800">
            {title}
          </h1>

          <div className="mb-6 flex items-center gap-4">
            <div className="text-[#FFB800]">★★★★★</div>
            <div className="mx-1 h-4 w-px bg-slate-300" />
            <span className="text-sm font-bold text-[#E62A24]">
              {inStock ? "IN STOCK" : "OUT OF STOCK"}
            </span>
          </div>

          <div className="mb-6 text-[32px] font-bold text-[#1A2B5E]">
            Rs {Number(price).toFixed(2)}
          </div>

          <p className="mb-8 text-base leading-relaxed text-slate-600">
            {description}
          </p>

          <hr className="mb-8 border-slate-200" />

          {personalizationOptions.length > 0 && (
            <div className="mb-8">
              <PersonalizationSection
                availableOptions={personalizationOptions}
                availableColors={[]}
                onChange={handlePersonalizationChange}
              />
            </div>
          )}

          {/* QUANTITY */}
          <div className="mb-10">
            <label className="mb-3 block text-[15px] text-slate-800">
              Quantity
            </label>

            <div className="flex w-fit items-center rounded-[4px] border border-slate-200">
              <button
                onClick={() => setQuantity((p) => Math.max(1, p - 1))}
                className="flex h-10 w-10 items-center justify-center"
              >
                −
              </button>

              <div className="flex h-10 w-10 items-center justify-center border-x text-[15px] font-semibold">
                {quantity}
              </div>

              <button
                onClick={() => setQuantity((p) => p + 1)}
                className="flex h-10 w-10 items-center justify-center"
              >
                +
              </button>
            </div>
          </div>

          {/* ACTIONS */}
          <div className="flex max-w-[500px] flex-col gap-4 sm:flex-row">
            <button
              onClick={handleAddToCart}
              className="flex flex-1 items-center justify-center rounded-[4px] border-2 border-[#1A2B5E] px-6 py-3 font-medium text-[#1A2B5E]"
            >
              🛒 Add to Cart
            </button>

            <button className="flex-1 rounded-[4px] bg-[#E62A24] px-6 py-3 font-medium text-white">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}