"use client";

import React, { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { useToastStore } from "@/store/toastStore";
import { useWebsiteAuthSession } from "@/hooks/useWebsiteAuthSession";
import type { ShopProduct } from "@/types/shopProduct";
import { useRouter } from "next/navigation";

interface ShopViewProductDetailsSectionProps {
  products: ShopProduct[];
}

export default function ShopViewProductDetailsSection({
  products,
}: ShopViewProductDetailsSectionProps) {
  const router = useRouter();
  const { addToCart } = useCart();
  const { addToast } = useToastStore();
  const { isAuthenticated } = useWebsiteAuthSession();

  const [quantity, setQuantity] = useState(1);
  const [selectedOption, setSelectedOption] = useState("Without Frame");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedPersonalization, setSelectedPersonalization] = useState("");
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!products || products.length === 0) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="text-xl font-medium text-slate-500">
          No products found in database.
        </p>
      </div>
    );
  }

  const findProductByName = (name: string) =>
    products.find((p) =>
      p.productName?.toLowerCase().includes(name.toLowerCase())
    );

  const isPersonalizedProduct = products[0]?.personalizationEnabled;

  const selectedProduct = isPersonalizedProduct
    ? products[0]
    : selectedOption === "Without Frame"
    ? findProductByName("Without Frame") ||
      findProductByName("Magnet Frame") ||
      products[0]
    : selectedColor === "Black"
    ? findProductByName("Black Frame") ||
      findProductByName("Magnet With Black Frame") ||
      products[0]
    : selectedColor === "White"
    ? findProductByName("White Frame") ||
      findProductByName("Magnet With White Frame") ||
      products[0]
    : products[0];

  useEffect(() => {
    setActiveImageIndex(0);
    if (
      selectedProduct?.personalizationEnabled &&
      Array.isArray(selectedProduct?.personalization) &&
      selectedProduct.personalization.length > 0
    ) {
      setSelectedPersonalization(selectedProduct.personalization[0]);
    } else {
      setSelectedPersonalization("");
    }
  }, [selectedProduct?._id, selectedProduct?.id]);

  const title = selectedProduct?.productName ?? "";
  const price = Number(selectedProduct?.price ?? 0);
  const description = selectedProduct?.description ?? "";
  const status = selectedProduct?.status ?? "Out of Stock";
  const mainImage = selectedProduct?.primaryImage?.secure_url ?? "";

  const galleryImages = Array.isArray(selectedProduct?.galleryImages)
    ? selectedProduct.galleryImages
    : [];

  const allImages = [
    ...(mainImage ? [mainImage] : []),
    ...galleryImages.map((img) => img.secure_url).filter(Boolean),
  ];

  const activeImage = allImages[activeImageIndex] || mainImage;

  const handleAddToCart = () => {
    if (status === "Out of Stock") {
      addToast("This product is out of stock!", "error");
      return;
    }

    if (!isPersonalizedProduct && selectedOption === "With Frame" && !selectedColor) {
      addToast("Please select frame color.", "error");
      return;
    }

    const frameType = isPersonalizedProduct && selectedPersonalization
      ? selectedPersonalization
      : selectedOption;

    const colorOption = !isPersonalizedProduct && selectedOption === "With Frame"
      ? selectedColor
      : "";

    addToCart({
      id: selectedProduct?._id ?? selectedProduct?.id ?? `shop-${Date.now()}`,
      title,
      price,
      frameType,
      colorOption,
      quantity,
      image: mainImage,
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
    setQuantity((current) => current + 1);
  };

  const handleBuyNow = () => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    if (!isPersonalizedProduct && selectedOption === "With Frame" && !selectedColor) {
      addToast("Please select frame color.", "error");
      return;
    }

    const frameType = isPersonalizedProduct && selectedPersonalization
      ? selectedPersonalization
      : selectedOption;

    const colorOption = !isPersonalizedProduct && selectedOption === "With Frame"
      ? selectedColor
      : "";

    addToCart({
      id: selectedProduct?._id ?? selectedProduct?.id ?? `shop-${Date.now()}`,
      title,
      price,
      frameType,
      colorOption,
      quantity,
      image: mainImage,
    });

    router.push("/checkout");
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-25 sm:px-4 lg:px-8">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="flex flex-col gap-6">
          <div className="relative flex aspect-[4/5] w-full max-h-[575px] max-w-[480px] items-center justify-center overflow-hidden rounded-sm bg-[#F4F3ED]">
            {activeImage ? (
              <img
                src={activeImage}
                alt={title}
                className="h-full w-full object-cover"
              />
            ) : (
              <p className="text-sm font-medium text-slate-400">
                No image available
              </p>
            )}
          </div>

          {/* Gallery thumbnails grid */}
          {allImages.length > 1 && (
            <div className="flex flex-wrap gap-2 max-w-[480px]">
              {allImages.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative h-16 w-16 overflow-hidden rounded-md border-2 bg-slate-100 transition-all ${
                    activeImageIndex === idx
                      ? "border-[#002B73] opacity-100 ring-2 ring-[#002B73]/20"
                      : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                >
                  <img src={img} alt={`Gallery ${idx + 1}`} className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
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
              ({Number((selectedProduct as any)?.stock ?? 0)} Available)
            </span>
          </div>

          <div className="mb-6 text-[24px] md:text-[32px] font-bold text-[#1A2B5E]">
            Rs {price.toFixed(2)}
          </div>

          <p className="mb-8 text-sm md:text-base leading-relaxed text-slate-600">
            {description}
          </p>

          <hr className="w-full max-w-[551px] mb-8 border-slate-200" />

          {isPersonalizedProduct ? (
            Array.isArray(selectedProduct?.personalization) && selectedProduct.personalization.length > 0 && (
              <div className="mb-8">
                <label className="mb-3 block text-[15px] font-semibold text-slate-800">
                  Personalization Options
                </label>

                <select
                  value={selectedPersonalization}
                  onChange={(e) => setSelectedPersonalization(e.target.value)}
                  className="h-11 w-full max-w-[260px] rounded-full border-2 border-[#002B73] px-4 text-sm outline-none font-medium bg-white"
                >
                  {selectedProduct.personalization.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            )
          ) : (
            <>
              <div className="mb-8">
                <label className="mb-3 block text-[15px] text-slate-800">
                  Personalization
                </label>

                <select
                  value={selectedOption}
                  onChange={(e) => {
                    setSelectedOption(e.target.value);
                    setSelectedColor("");
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
                      onClick={() => setSelectedColor("Black")}
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
                      onClick={() => setSelectedColor("White")}
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
            </>
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
                className="flex h-10 w-10 items-center justify-center"
              >
                +
              </button>
            </div>
          </div>

          <div className="flex max-w-[500px] flex-col gap-4 sm:flex-row">
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={status === "Out of Stock"}
              className="flex flex-1 items-center justify-center rounded-[4px] border-2 border-[#1A2B5E] px-6 py-3 font-medium text-[#1A2B5E] disabled:cursor-not-allowed disabled:opacity-50"
            >
              🛒 Add to Cart
            </button>

            <button
              type="button"
              onClick={handleBuyNow}
              disabled={status === "Out of Stock"}
              className={`flex-1 rounded-[4px] px-6 py-3 font-medium text-white ${
                status !== "Out of Stock"
                  ? "bg-[#E62A24]"
                  : "bg-[#E62A24]/60 cursor-not-allowed opacity-50"
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