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
  price?: number;
  note?: string;
  image?: { secure_url?: string } | null;
}

interface RawPersonalizationEntry {
  label?: unknown;
  price?: unknown;
  note?: unknown;
  image?: { secure_url?: string } | null;
}

// Converts whatever the DB/API returns (new {label,image} objects OR legacy plain strings) into a consistent array
function toPersonalizationEntries(raw: unknown[] | undefined | null): PersonalizationEntry[] {
  if (!raw || !Array.isArray(raw)) return [];
  return raw.map((item) => {
    if (typeof item === "string") {
      return { label: item, image: null };
    }

    const option = item as RawPersonalizationEntry;
    return {
      label: typeof option.label === "string" ? option.label : "",
      price:
        option.price === undefined || option.price === null
          ? undefined
          : Number(option.price) || 0,
      note: typeof option.note === "string" ? option.note : "",
      image: option.image ?? null,
    };
  });
}

function getProductKey(product: ShopProduct | undefined): string {
  return String(product?._id ?? product?.id ?? product?.productId ?? "").trim();
}

function getPrimaryImageUrl(product: ShopProduct | undefined): string {
  return product?.primaryImage?.secure_url ?? "";
}

function isWithFrameLabel(label: string | undefined): boolean {
  const normalized = (label ?? "").trim().toLowerCase();
  return normalized.includes("with frame") && !normalized.includes("without frame");
}

function isWithoutFrameLabel(label: string | undefined): boolean {
  return (label ?? "").trim().toLowerCase().includes("without frame");
}

function getProductPersonalizationEntries(product: ShopProduct | undefined): PersonalizationEntry[] {
  return toPersonalizationEntries(
    Array.isArray(product?.personalization) ? product.personalization : undefined
  );
}

function isAvailableProduct(product: ShopProduct): boolean {
  const status = String(product.status ?? "").trim().toLowerCase();
  const stock = Number(product.stock ?? 0);
  return stock > 0 && status !== "out of stock";
}

function hasWithFrameOption(product: ShopProduct): boolean {
  const name = product.productName?.trim().toLowerCase() ?? "";
  return (
    name.includes("with frame") ||
    name.includes("black frame") ||
    name.includes("white frame") ||
    getProductPersonalizationEntries(product).some((entry) =>
      isWithFrameLabel(entry.label)
    )
  );
}

function hasWithoutFrameOption(product: ShopProduct): boolean {
  const name = product.productName?.trim().toLowerCase() ?? "";
  const personalizationEntries = getProductPersonalizationEntries(product);

  return (
    name.includes("without frame") ||
    personalizationEntries.some((entry) => isWithoutFrameLabel(entry.label)) ||
    (!hasWithFrameOption(product) && personalizationEntries.length === 0)
  );
}

function inferFrameTypeFromProduct(
  product: ShopProduct | undefined,
  requestedFrameType?: string
): string | undefined {
  if (!product) return requestedFrameType;

  const name = product.productName?.trim().toLowerCase() ?? "";
  const personalizationEntries = getProductPersonalizationEntries(product);
  const hasExplicitWithFrame =
    (name.includes("with frame") && !name.includes("without frame")) ||
    name.includes("black frame") ||
    name.includes("white frame") ||
    personalizationEntries.some((entry) => isWithFrameLabel(entry.label));
  const hasExplicitWithoutFrame =
    name.includes("without frame") ||
    personalizationEntries.some((entry) => isWithoutFrameLabel(entry.label));

  if (name.includes("white frame")) return "white-frame";
  if (name.includes("black frame")) return "black-frame";
  if (hasExplicitWithFrame && !hasExplicitWithoutFrame) return "black-frame";
  if (hasExplicitWithoutFrame && !hasExplicitWithFrame) return "without-frame";

  return requestedFrameType;
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

  const inferredInitialFrameType = inferFrameTypeFromProduct(
    initialProduct,
    initialFrameType
  );

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

  const availableProducts = products.filter(
    (product) => isAvailableProduct(product) && Boolean(getPrimaryImageUrl(product))
  );

  const withFrameProducts = availableProducts.filter(hasWithFrameOption);
  const withoutFrameProducts = availableProducts.filter(hasWithoutFrameOption);
  const visibleFrameProducts =
    selectedOption === "With Frame" ? withFrameProducts : withoutFrameProducts;
  const productSelectedFromRoute = activeProductId
    ? availableProducts.find((product) => getProductKey(product) === activeProductId.trim())
    : undefined;

  const selectedProduct =
    productSelectedFromRoute ??
    visibleFrameProducts[0] ??
    availableProducts[0] ??
    products[0];

  // Normalized personalization entries for the currently selected product
  const personalizationEntries = toPersonalizationEntries(
    Array.isArray(selectedProduct?.personalization)
      ? selectedProduct.personalization
      : undefined
  );
  const isWithFrameSelected = selectedOption === "With Frame";
  const selectedFrameColor = isWithFrameSelected ? selectedColor || "Black" : "";

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setActiveImageIndex(0);
    setPersonalizationImageOverride(null); // reset — primary image shows first on product change
    setIsImageZoomed(false); // reset zoom when product changes

    if (personalizationEntries.length > 0) {
      const nextEntry =
        selectedOption === "With Frame"
          ? personalizationEntries.find((entry) => isWithFrameLabel(entry.label))
          : personalizationEntries.find((entry) => isWithoutFrameLabel(entry.label));

      setSelectedPersonalization(nextEntry ?? null);
    } else {
      setSelectedPersonalization(null);
    }
  }, [selectedProduct?._id, selectedProduct?.id, selectedOption]);

  if (!products || products.length === 0) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="text-xl font-medium text-slate-500">
          No products found in database.
        </p>
      </div>
    );
  }

  const title = selectedProduct?.productName ?? "";
  const basePrice = Number(selectedProduct?.price ?? 0);
  const price =
    selectedPersonalization?.price !== undefined && selectedPersonalization.price > 0
      ? selectedPersonalization.price
      : basePrice;
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

  const resetImageSelection = () => {
    setPersonalizationImageOverride(null);
    setActiveImageIndex(0);
    setIsImageZoomed(false);
  };

  const handleFrameModeSelect = (option: "With Frame" | "Without Frame") => {
    const nextProducts = option === "With Frame" ? withFrameProducts : withoutFrameProducts;

    setSelectedOption(option);
    setSelectedColor(option === "With Frame" ? selectedColor || "Black" : "");
    setActiveProductId(getProductKey(nextProducts[0]) || undefined);
    resetImageSelection();
  };

  const handleFrameProductSelect = (product: ShopProduct) => {
    const productId = getProductKey(product);
    if (!productId) return;

    setActiveProductId(productId);
    resetImageSelection();
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

    if (isWithFrameSelected && !selectedFrameColor) {
      addToast("Please select frame color.", "error");
      return;
    }

    if (quantity > availableStock) {
      addToast(`Only ${availableStock} items are available.`, "error");
      return;
    }

    const frameType = selectedOption;

    const colorOption = selectedFrameColor;

    addToCart({
      id: selectedProduct?._id ?? selectedProduct?.id ?? `shop-${Date.now()}`,
      title,
      price,
      frameType,
      colorOption,
      quantity,
      image: activeImage || mainImage,
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

    if (isWithFrameSelected && !selectedFrameColor) {
      addToast("Please select frame color.", "error");
      return;
    }

    if (quantity > availableStock) {
      addToast(`Only ${availableStock} items are available.`, "error");
      return;
    }

    const frameType = selectedOption;

    const colorOption = selectedFrameColor;

    addToCart({
      id: selectedProduct?._id ?? selectedProduct?.id ?? `shop-${Date.now()}`,
      title,
      price,
      frameType,
      colorOption,
      quantity,
      image: activeImage || mainImage,
      stock: availableStock,
    });

    router.push("/checkout");
  };

  return (
    <section className="mx-auto w-full max-w-[1700px] px-4 pb-20 pt-[104px] sm:px-6 lg:px-[120px] lg:pb-24 lg:pt-[112px]">
      <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(380px,520px)_minmax(420px,1fr)] lg:gap-16">
        <div className="flex flex-col gap-5">
          <div
            className="group relative flex aspect-[4/5] w-full max-h-[560px] max-w-[520px] items-center justify-center overflow-hidden rounded-sm bg-[#F4F3ED] lg:max-h-[520px]"
            onClick={handleImageClick}
            style={{ cursor: activeImage ? (isImageZoomed ? "zoom-out" : "zoom-in") : "default" }}
          >
            {activeImage ? (
              <>
                <img
                  src={activeImage}
                  alt={title}
                  className="h-full w-full object-contain transition-transform duration-300 ease-out"
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
            <div className="grid max-w-[520px] grid-cols-6 gap-2">
              {allImages.map((img, idx) => (
                <button
                  key={`${img}-${idx}`}
                  type="button"
                  onClick={() => {
                    setActiveImageIndex(idx);
                    setPersonalizationImageOverride(null); // back to gallery/primary flow
                    setIsImageZoomed(false); // reset zoom when switching image
                  }}
                  className={`relative aspect-square w-full overflow-hidden rounded-md border-2 bg-slate-100 transition-all ${
                    activeImageIndex === idx && !personalizationImageOverride
                      ? "border-[#002B73] opacity-100 ring-2 ring-[#002B73]/20"
                      : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                >
                  <img
                    src={img}
                    alt={`Gallery ${idx + 1}`}
                    className="h-full w-full object-contain"
                  />
                </button>
              ))}
            </div>
          )}

          {visibleFrameProducts.length > 0 && (
            <div className="flex max-w-[520px] gap-3 overflow-x-auto pb-2 sm:grid sm:w-full sm:grid-cols-3 sm:overflow-visible lg:grid-cols-4">
              {visibleFrameProducts.map((product) => {
                const productId = getProductKey(product);
                const imageUrl = getPrimaryImageUrl(product);
                const isSelected = productId === getProductKey(selectedProduct);

                return (
                  <button
                    key={productId || imageUrl}
                    type="button"
                    onClick={() => handleFrameProductSelect(product)}
                    title={product.productName ?? "Frame product"}
                    className={`relative h-20 w-20 flex-none overflow-hidden rounded-[4px] border-2 bg-white p-1 shadow-sm transition-all sm:h-24 sm:w-full ${
                      isSelected
                        ? "border-[#002B73] opacity-100 ring-2 ring-[#002B73]/20"
                        : "border-transparent opacity-75 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={imageUrl}
                      alt={product.productName ?? "Frame product"}
                      className="h-full w-full object-contain"
                    />
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div className="flex w-full flex-col pt-0 lg:max-w-[620px] lg:justify-self-end lg:pt-4">
          <h1 className="mb-5 text-[22px] font-medium leading-tight text-slate-800 md:text-[24px]">
            {title}
          </h1>

          <div className="mb-7 flex flex-wrap items-center gap-4">
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

          <div className="mb-7 text-[28px] font-bold text-[#1A2B5E] md:text-[36px]">
            Rs {price.toFixed(2)}
          </div>

          <p className="mb-7 max-w-[560px] text-sm leading-relaxed text-slate-600 md:text-base">
            {description}
          </p>

          <hr className="mb-7 w-full border-slate-200" />

          <div className="mb-6">
            <label className="mb-3 block text-[15px] text-slate-800">
              Personalization
            </label>

            <div className="flex w-full flex-col gap-4 sm:flex-row">
              {(["With Frame", "Without Frame"] as const).map((option) => {
                const isSelected = selectedOption === option;

                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => handleFrameModeSelect(option)}
                    className={`flex h-14 flex-1 items-center justify-center rounded-[4px] border-2 px-6 text-base font-semibold transition ${
                      isSelected
                        ? "border-[#002B73] bg-[#002B73] text-white"
                        : "border-[#002B73] bg-white text-[#1A2B5E]"
                    }`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>

            {selectedPersonalization?.note && (
              <p className="mt-2 text-xs text-slate-500">
                Note: {selectedPersonalization.note}
              </p>
            )}
          </div>

          {isWithFrameSelected && (
            <div className="mb-7">
              <label className="mb-3 block text-[15px] text-slate-800">
                Select Color
              </label>

              <div className="flex gap-5">
                <button
                  type="button"
                  onClick={() => setSelectedColor("Black")}
                  className="flex flex-col items-center gap-1 text-xs text-slate-700"
                >
                  <span
                    className={`h-8 w-8 rounded-full border bg-black ${
                      selectedFrameColor === "Black"
                        ? "ring-2 ring-[#002B73] ring-offset-2"
                        : ""
                    }`}
                  />
                  Black
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedColor("White")}
                  className="flex flex-col items-center gap-1 text-xs text-slate-700"
                >
                  <span
                    className={`h-8 w-8 rounded-full border bg-white ${
                      selectedFrameColor === "White"
                        ? "ring-2 ring-[#002B73] ring-offset-2"
                        : ""
                    }`}
                  />
                  White
                </button>
              </div>
            </div>
          )}

          <div className="mb-9">
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

          <div className="flex w-full flex-col gap-4 sm:flex-row">
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={status === "Out of Stock" || availableStock < 1}
              className="flex h-14 flex-1 items-center justify-center rounded-[4px] border-2 border-[#1A2B5E] px-6 font-medium text-[#1A2B5E] disabled:cursor-not-allowed disabled:opacity-50"
            >
              🛒 Add to Cart
            </button>

            <button
              type="button"
              onClick={handleBuyNow}
              disabled={status === "Out of Stock" || availableStock < 1}
              className={`h-14 flex-1 rounded-[4px] px-6 font-medium text-white ${
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
