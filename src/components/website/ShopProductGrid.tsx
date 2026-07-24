"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useToastStore } from "@/store/toastStore";
import type { ShopProduct } from "@/types/shopProduct";
import { normalizeProductQuantity } from "@/lib/productQuantityRules";

type ShopProductGridProps = {
  products: ShopProduct[];
};

function getProductId(product: ShopProduct): string {
  return String(product._id ?? product.id ?? product.productId ?? "").trim();
}

function getProductImage(product: ShopProduct): string {
  return product.primaryImage?.secure_url || "/product-1.png";
}

function getProductStatus(product: ShopProduct): string {
  return String(product.status ?? "In Stock").trim() || "In Stock";
}

function isOutOfStock(product: ShopProduct): boolean {
  return Number(product.stock ?? 0) <= 0 || getProductStatus(product) === "Out of Stock";
}

export default function ShopProductGrid({ products }: ShopProductGridProps) {
  const router = useRouter();
  const { addToCart } = useCart();
  const { addToast } = useToastStore();

  const handleOpenProduct = (product: ShopProduct) => {
    const productId = getProductId(product);
    if (!productId) return;

    router.push(`/shop?productId=${encodeURIComponent(productId)}`);
  };

  const handleAddToCart = (product: ShopProduct) => {
    if (isOutOfStock(product)) {
      addToast("This product is out of stock!", "error");
      return;
    }

    const title = product.productName ?? "Product";
    const stock = Number(product.stock ?? 0);

    addToCart({
      id: getProductId(product) || `shop-${Date.now()}`,
      title,
      image: getProductImage(product),
      price: Number(product.price ?? 0),
      quantity: normalizeProductQuantity(1, title, stock),
      frameType: "Product",
      stock,
    });

    addToast("Product added to cart successfully!", "success");
  };

  return (
      <section className="w-full bg-[#F9F9FE] px-4 pb-16 pt-[120px] sm:px-6 lg:px-[120px] lg:pt-[128px]">
        <div className="mx-auto w-full max-w-[1700px]">
          <h1 className="font-manrope text-[32px] font-bold leading-tight text-[#002B73] md:text-[42px]">
            Our Products
          </h1>

          {products.length === 0 ? (
            <div className="mt-8 rounded-[13px] border border-dashed border-[#C3C6D4] bg-white px-6 py-10 text-center text-[#64748B]">
              No products available right now.
            </div>
          ) : (
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => {
                const productId = getProductId(product);
                const title = product.productName ?? "Product";
                const status = getProductStatus(product);
                const disabled = isOutOfStock(product);
                const imageUrl = getProductImage(product);

                return (
                  <article
                    key={productId || title}
                    role="link"
                    tabIndex={0}
                    onClick={() => handleOpenProduct(product)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        handleOpenProduct(product);
                      }
                    }}
                    aria-label={`View ${title}`}
                    className="flex h-full cursor-pointer flex-col overflow-hidden rounded-[8px] border border-[#E5E5EA] bg-white shadow-sm transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#002B73] focus-visible:ring-offset-2"
                  >
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-white">
                      <Image
                        src={imageUrl}
                        alt=""
                        fill
                        aria-hidden="true"
                        className="scale-125 object-cover blur-2xl"
                      />
                      <div className="absolute inset-0 bg-black/10" />
                      <Image
                        src={imageUrl}
                        alt={title}
                        fill
                        className="relative object-contain"
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      />

                      <span
                        className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-bold text-white ${
                          disabled ? "bg-red-600" : "bg-[#002B73]"
                        }`}
                      >
                        {status}
                      </span>
                    </div>

                    <div className="flex flex-1 flex-col p-5">
                      <h2 className="font-manrope text-[20px] font-bold leading-tight text-[#1A1C1F]">
                        {title}
                      </h2>

                      <p
                        className="mt-2 h-[48px] overflow-hidden text-sm leading-6 text-[#434652]"
                        style={{
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                        }}
                      >
                        {product.description}
                      </p>

                      <div className="mt-auto flex items-center justify-between gap-3 pt-5">
                        <span className="font-inter text-[18px] font-bold text-[#002B73]">
                          Rs {Number(product.price ?? 0).toFixed(2)}
                        </span>

                        <button
                          type="button"
                          onClick={(event) => {
                            event.stopPropagation();
                            handleAddToCart(product);
                          }}
                          onKeyDown={(event) => event.stopPropagation()}
                          disabled={disabled}
                          className="rounded-[8px] bg-[#BC0000] px-4 py-2 text-sm font-bold text-white transition hover:bg-[#a00000] disabled:cursor-not-allowed disabled:bg-gray-400"
                        >
                          {disabled ? "Out of Stock" : "Add to Cart"}
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>
  );
}