"use client";

import React, { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { useToastStore } from "@/store/toastStore";
import { useWebsiteAuthSession } from "@/hooks/useWebsiteAuthSession";
import type { ShopProduct } from "@/types/shopProduct";
import { useRouter } from "next/navigation";

interface ShopViewProductDetailsSectionProps {
  products: ShopProduct[];
  initialProductId?: string;
  initialFrameType?: string;
}

// Consistent shape we use internally, regardless of legacy string[] or new object[] from backend
interface PersonalizationEntry {
  label: string;
  image?: { secure_url?: string } | null;
}

// Converts whatever the DB/API returns (new {label,image} objects OR legacy plain strings) into a consistent array
function toPersonalizationEntries(raw: any[] | undefined | null): PersonalizationEntry[] {
  if (!raw || !Array.isArray(raw)) return [];
  return raw.map((item) =>
    typeof item === "string"
      ? { label: item, image: null }
      : { label: item?.label ?? "", image: item?.image ?? null }
  );
}

// A pure color option such as "Black" / "White". These must NOT show up as their
// own dropdown choices — they only appear as color swatches once a framed option
// is selected.
function labelIsColorOption(label: string): boolean {
  const l = label.trim().toLowerCase();
  return l === "black" || l === "white";
}

// "With Frame" (or any framed) option — Black/White color choice should be offered.
function labelIsWithFrame(label: string): boolean {
  const l = label.toLowerCase();
  return l.includes("frame") && !l.includes("without");
}

export default function ShopViewProductDetailsSection({
  products,
  initialProductId,
  initialFrameType,
}: ShopViewProductDetailsSectionProps) {
  const router = useRouter();
  const { addToCart } = useCart();
  const { addToast } = useToastStore();
  const { isAuthenticated } = useWebsiteAuthSession();

  const [quantity, setQuantity] = useState(1);

  const initialProduct = initialProductId
    ? products.find((product) =>
        [product._id, product.id, product.productId]
          .filter(Boolean)
          .some((id) => String(id).trim() === initialProductId.trim())
      )
    : undefined;

  const initialProductName = initialProduct?.productName?.toLowerCase() ?? "";

  const inferredInitialFrameType = initialProductName.includes("black frame")
    ? "black-frame"
    : initialProductName.includes("white frame")
    ? "white-frame"
    : initialProductName.includes("without frame")
    ? "without-frame"
    : initialFrameType;

  const initialHasFrame =
    inferredInitialFrameType === "black-frame" ||
    inferredInitialFrameType === "white-frame";

  const [selectedOption, setSelectedOption] = useState(
    initialHasFrame ? "With Frame" : "Without Frame"
  );

  const [selectedColor, setSelectedColor] = useState(
    inferredInitialFrameType === "black-frame"
      ? "Black"
      : inferredInitialFrameType === "white-frame"
      ? "White"
      : ""
  );

  const [activeProductId, setActiveProductId] = useState(
    initialProduct ? initialProductId : undefined
  );

  const [selectedPersonalization, setSelectedPersonalization] =
    useState<PersonalizationEntry | null>(null);

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Only set when the user explicitly clicks a personalization option in the dropdown.
  // Primary image always shows by default until this is set.
  const [personalizationImageOverride, setPersonalizationImageOverride] =
    useState<string | null>(null);

  // Click-to-zoom: only the image scales up in place. Page itself is untouched.
  const [isImageZoomed, setIsImageZoomed] = useState(false);
  const [zoomOrigin, setZoomOrigin] = useState("center");

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
      const name = product.productName?.trim().toLowerCase() ?? "";

      if (variant === "black") return name.includes("black frame");
      if (variant === "white") return name.includes("white frame");

      return (
        name.includes("without frame") ||
        (!name.includes("with frame") &&
          !name.includes("black frame") &&
          !name.includes("white frame"))
      );
    });

  const isPersonalizedProduct = products[0]?.personalizationEnabled;

  const productSelectedFromRoute = activeProductId
    ? products.find((product) =>
        [product._id, product.id, product.productId]
          .filter(Boolean)
          .some((id) => String(id).trim() === activeProductId.trim())
      )
    : undefined;

  const selectedProduct =
    productSelectedFromRoute ??
    (isPersonalizedProduct
      ? products[0]
      : selectedOption === "Without Frame"
      ? findProductByVariant("without") || products[0]
      : selectedColor === "Black"
      ? findProductByVariant("black") || products[0]
      : selectedColor === "White"
      ? findProductByVariant("white") || products[0]
      : products[0]);

  // Normalized personalization entries for the currently selected product
  const personalizationEntries = toPersonalizationEntries(
    selectedProduct?.personalization as any[]
  );

  
  const colorOptionEntries = personalizationEntries.filter((e) =>
    labelIsColorOption(e.label)
  );
  const frameOptionEntriesRaw = personalizationEntries.filter(
    (e) => !labelIsColorOption(e.label)
  );
  
  const frameOptionEntries =
    frameOptionEntriesRaw.length > 0
      ? frameOptionEntriesRaw
      : personalizationEntries;

  // Is the currently selected dropdown option a framed one (needs Black/White)?
  const selectedIsWithFrame = selectedPersonalization
    ? labelIsWithFrame(selectedPersonalization.label)
    : false;

  const availablePersonalizationColors =
    colorOptionEntries.length > 0
      ? colorOptionEntries.map((e) => e.label)
      : ["Black", "White"];

  // Only show the color swatches for personalized products when a framed option is active.
  const showPersonalizationColors = Boolean(
    isPersonalizedProduct && selectedIsWithFrame
  );

  useEffect(() => {
    setActiveImageIndex(0);
    setPersonalizationImageOverride(null); // reset — primary image shows first on product change
    setIsImageZoomed(false); // reset zoom when product changes

    if (
      selectedProduct?.personalizationEnabled &&
      frameOptionEntries.length > 0
    ) {
      setSelectedPersonalization(frameOptionEntries[0]); // dropdown default value (for cart), image NOT switched yet
    } else {
      setSelectedPersonalization(null);
    }
    setSelectedColor(""); // reset frame color when the product changes
  }, [selectedProduct?._id, selectedProduct?.id]);

  const title = selectedProduct?.productName ?? "";
  const price = Number(selectedProduct?.price ?? 0);
  const description = selectedProduct?.description ?? "";
  const status = selectedProduct?.status ?? "Out of Stock";
  const availableStock = Math.max(Number(selectedProduct?.stock ?? 0), 0);
  const mainImage = selectedProduct?.primaryImage?.secure_url ?? "";

  const galleryImages = Array.isArray(selectedProduct?.galleryImages)
    ? selectedProduct.galleryImages
    : [];

  const allImages = [
    ...(mainImage ? [mainImage] : []),
    ...galleryImages.map((img) => img.secure_url).filter(Boolean),
  ];

  // Primary image (allImages[0]) shows by default.
  // Only switches when user explicitly selects a personalization option with its own image.
  const activeImage =
    personalizationImageOverride ?? allImages[activeImageIndex] ?? mainImage;

  const handlePersonalizationChange = (label: string) => {
    const entry =
      frameOptionEntries.find((p) => p.label === label) ??
      personalizationEntries.find((p) => p.label === label) ??
      null;
    setSelectedPersonalization(entry);
    // User explicitly selected this option — NOW show its image (if it has one)
    setPersonalizationImageOverride(entry?.image?.secure_url ?? null);
    setActiveImageIndex(0);
    setIsImageZoomed(false); // reset zoom when switching personalization option
    setSelectedColor(""); // reset color — hidden for "Without Frame", re-chosen for "With Frame"
  };

  // Personalized products: pick Black/White once a "With Frame" option is selected.
  const handlePersonalizationColorSelect = (color: string) => {
    setSelectedColor(color);
    const colorEntry = colorOptionEntries.find(
      (e) => e.label.toLowerCase() === color.toLowerCase()
    );
    if (colorEntry?.image?.secure_url) {
      setPersonalizationImageOverride(colorEntry.image.secure_url);
      setActiveImageIndex(0);
      setIsImageZoomed(false);
    }
  };

  // Click on the image: zoom in centered on the click point. Click again to zoom out.
  const handleImageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!activeImage) return;

    if (isImageZoomed) {
      setIsImageZoomed(false);
      return;
    }

    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomOrigin(`${x}% ${y}%`);
    setIsImageZoomed(true);
  };

  const handleAddToCart = () => {
    if (status === "Out of Stock") {
      addToast("This product is out of stock!", "error");
      return;
    }

    if (
      !isPersonalizedProduct &&
      selectedOption === "With Frame" &&
      !selectedColor
    ) {
      addToast("Please select frame color.", "error");
      return;
    }

    if (isPersonalizedProduct && selectedIsWithFrame && !selectedColor) {
      addToast("Please select frame color.", "error");
      return;
    }

    if (quantity > availableStock) {
      addToast(`Only ${availableStock} items are available.`, "error");
      return;
    }

    const frameType =
      isPersonalizedProduct && selectedPersonalization
        ? selectedPersonalization.label
        : selectedOption;

    const colorOption = isPersonalizedProduct
      ? showPersonalizationColors
        ? selectedColor
        : ""
      : selectedOption === "With Frame"
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

    if (
      !isPersonalizedProduct &&
      selectedOption === "With Frame" &&
      !selectedColor
    ) {
      addToast("Please select frame color.", "error");
      return;
    }

    if (isPersonalizedProduct && selectedIsWithFrame && !selectedColor) {
      addToast("Please select frame color.", "error");
      return;
    }

    if (quantity > availableStock) {
      addToast(`Only ${availableStock} items are available.`, "error");
      return;
    }

    const frameType =
      isPersonalizedProduct && selectedPersonalization
        ? selectedPersonalization.label
        : selectedOption;

    const colorOption = isPersonalizedProduct
      ? showPersonalizationColors
        ? selectedColor
        : ""
      : selectedOption === "With Frame"
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
      stock: availableStock,
    });

    router.push("/checkout");
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-25 sm:px-4 lg:px-8">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="flex flex-col gap-6">
          <div
            className="group relative flex aspect-[4/5] w-full max-h-[575px] max-w-[480px] items-center justify-center overflow-hidden rounded-sm bg-[#F4F3ED]"
            onClick={handleImageClick}
            style={{ cursor: activeImage ? (isImageZoomed ? "zoom-out" : "zoom-in") : "default" }}
          >
            {activeImage ? (
              <>
                <img
                  src={activeImage}
                  alt={title}
                  className="h-full w-full object-cover transition-transform duration-300 ease-out"
                  style={{
                    transform: isImageZoomed ? "scale(2)" : "scale(1)",
                    transformOrigin: isImageZoomed ? zoomOrigin : "center",
                  }}
                />
                {/* Zoom indicator icon — hides while zoomed in */}
                {!isImageZoomed && (
                  <div className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-md transition-transform duration-150 group-hover:scale-110">
                    <svg
                      className="h-4 w-4 text-[#1A2B5E]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <circle cx="11" cy="11" r="7" />
                      <path strokeLinecap="round" d="M21 21l-4.35-4.35" />
                    </svg>
                  </div>
                )}
              </>
            ) : (
              <p className="text-sm font-medium text-slate-400">
                No image available
              </p>
            )}
          </div>

          {/* Gallery thumbnails grid — still works independently when no option-image override is active */}
          {allImages.length > 1 && (
            <div className="flex flex-wrap gap-2 max-w-[480px]">
              {allImages.map((img, idx) => (
                <button
                  key={`${img}-${idx}`}
                  type="button"
                  onClick={() => {
                    setActiveImageIndex(idx);
                    setPersonalizationImageOverride(null); // back to gallery/primary flow
                    setIsImageZoomed(false); // reset zoom when switching image
                  }}
                  className={`relative h-16 w-16 overflow-hidden rounded-md border-2 bg-slate-100 transition-all ${
                    activeImageIndex === idx && !personalizationImageOverride
                      ? "border-[#002B73] opacity-100 ring-2 ring-[#002B73]/20"
                      : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                >
                  <img
                    src={img}
                    alt={`Gallery ${idx + 1}`}
                    className="h-full w-full object-cover"
                  />
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
              ({Number(selectedProduct?.stock ?? 0)} Available)
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
            frameOptionEntries.length > 0 && (
              <>
                <div className="mb-8">
                  <label className="mb-3 block text-[15px] font-semibold text-slate-800">
                    Personalization Options
                  </label>

                  <div className="relative w-full max-w-[260px]">
                    <select
                      value={selectedPersonalization?.label ?? ""}
                      onChange={(e) =>
                        handlePersonalizationChange(e.target.value)
                      }
                      className="h-11 w-full appearance-none rounded-full border-2 border-[#002B73] bg-white pl-4 pr-10 text-sm font-medium outline-none"
                    >
                      {frameOptionEntries.map((opt, idx) => (
                        <option key={`${opt.label}-${idx}`} value={opt.label}>
                          {opt.label}
                        </option>
                      ))}
                    </select>

                    {/* Custom arrow with proper spacing from the border */}
                    <svg
                      className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#002B73]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>

                {/* Black/White only appears for a "With Frame" option, hidden for "Without Frame" */}
                {showPersonalizationColors && (
                  <div className="mb-8">
                    <label className="mb-3 block text-[15px] text-slate-800">
                      Select Color
                    </label>

                    <div className="flex gap-5">
                      {availablePersonalizationColors.map((color) => {
                        const isBlack = color.toLowerCase() === "black";
                        const isWhite = color.toLowerCase() === "white";
                        return (
                          <button
                            key={color}
                            type="button"
                            onClick={() =>
                              handlePersonalizationColorSelect(color)
                            }
                            className="flex flex-col items-center gap-1 text-xs"
                          >
                            <span
                              className={`h-8 w-8 rounded-full border ${
                                isBlack
                                  ? "bg-black"
                                  : isWhite
                                  ? "bg-white"
                                  : "bg-slate-300"
                              } ${
                                selectedColor === color
                                  ? "ring-2 ring-[#002B73] ring-offset-2"
                                  : ""
                              }`}
                            />
                            {color}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </>
            )
          ) : (
            <>
              <div className="mb-8">
                <label className="mb-3 block text-[15px] text-slate-800">
                  Personalization
                </label>

                <div className="relative w-full max-w-[260px]">
                  <select
                    value={selectedOption}
                    onChange={(e) => {
                      setActiveProductId(undefined);
                      setSelectedOption(e.target.value);
                      setSelectedColor("");
                    }}
                    className="h-11 w-full appearance-none rounded-full border-2 border-[#002B73] bg-white pl-4 pr-10 text-sm outline-none"
                  >
                    <option value="Without Frame">Without Frame</option>
                    <option value="With Frame">With Frame</option>
                  </select>
                  <svg
                    className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#002B73]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
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
                        setActiveProductId(undefined);
                        setSelectedColor("Black");
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
                        setActiveProductId(undefined);
                        setSelectedColor("White");
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
              disabled={status === "Out of Stock" || availableStock < 1}
              className="flex flex-1 items-center justify-center rounded-[4px] border-2 border-[#1A2B5E] px-6 py-3 font-medium text-[#1A2B5E] disabled:cursor-not-allowed disabled:opacity-50"
            >
              🛒 Add to Cart
            </button>

            <button
              type="button"
              onClick={handleBuyNow}
              disabled={status === "Out of Stock" || availableStock < 1}
              className={`flex-1 rounded-[4px] px-6 py-3 font-medium text-white ${
                status !== "Out of Stock" && availableStock >= 1
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