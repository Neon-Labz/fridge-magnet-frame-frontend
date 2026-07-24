"use client";

import Image from "next/image";
import { useProducts } from "@/hooks/useProducts";
import type { Product } from "@/types/product";

const formatStock = (stock: number) => Math.max(0, stock).toString().padStart(4, "0");

export default function CounterSection() {
  const { products, isLoaded } = useProducts();
  const lowStockProducts = [...products]
    .filter((product) => product.stockCount > 0)
    .sort((a, b) => a.stockCount - b.stockCount)
    .slice(0, 3);

  const displayedProducts: Array<Product | null> = isLoaded
    ? lowStockProducts
    : Array.from({ length: 3 }, () => null);

  if (isLoaded && lowStockProducts.length === 0) return null;

  return (
    <section className="w-full bg-[#F9F9FE] py-10 md:py-12">
      <div className="mx-auto w-full max-w-[1700px] px-4 sm:px-6 lg:px-[120px]">
        <header className="text-center">
          <p className="font-inter text-[11px] font-bold uppercase tracking-[2px] text-[#BC0000] sm:text-[12px]">Live stock update <span className="text-[#E9A6A6]">&bull;</span></p>
          <h2 className="mt-2 font-manrope text-[28px] font-bold leading-[1.1] tracking-[-0.35px] text-[#002B73] md:text-[35px]">Real-time Stock Counter</h2>
          <p className="mx-auto mt-2 max-w-[700px] font-inter text-[14px] leading-[1.45] text-[#434652] md:text-[17px]">Products are selling fast! Our stock counter updates in real-time.</p>
        </header>

        <div className="mt-6 grid grid-cols-1 gap-3 lg:grid-cols-3 lg:gap-[28px]">
          {displayedProducts.map((product, index) => {
            if (!product) return <div key={index} className="h-[420px] animate-pulse rounded-[13px] bg-white shadow-sm" />;
            const imageUrl = product.primaryImageUrl || product.imageUrl || product.image;
            return (
              <article key={product.id} className="overflow-hidden rounded-[13px] border border-[#E5E5EA] bg-white p-3 shadow-[0_4px_16px_rgba(0,0,0,0.04)]">
                <div className="relative h-[170px] overflow-hidden rounded-[10px] bg-[#f5f5f7] sm:h-[220px] md:h-[250px]">
                  {imageUrl ? <Image src={imageUrl} alt={product.name} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" /> : <div className={`h-full w-full bg-gradient-to-br ${product.gradient}`} />}
                </div>
                <div className="relative px-2 pb-2 pt-6 text-center">
                  
                  <h3 className="min-h-[42px] font-manrope text-[16px] font-semibold leading-[1.25] text-[#1A1C1F] md:text-[20px]">{product.name}</h3>
                  <div className="mt-1 flex items-center justify-center gap-2 font-inter text-[12px] text-[#64748B] md:text-[13px]">
                    {product.series && <span>{product.series}</span>}
                    <span className="font-semibold text-[#002B73]">Rs. {product.price.toLocaleString()}</span>
                  </div>
                  <div className="mx-auto mt-3 border-t border-dashed border-[#DCE2EB] pt-3">
                    <p className="text-[11px] font-semibold uppercase tracking-[2px] text-[#64748B]">Available stock</p>
                    <div className="mt-2 flex justify-center gap-1.5">
                      {formatStock(product.stockCount).split("").map((digit, digitIndex) => <span key={`${product.id}-${digitIndex}`} className="flex h-[46px] w-[42px] items-center justify-center rounded-[8px] border border-[#DCE2EB] bg-[#F7F9FC] text-[27px] font-bold text-[#002B73]">{digit}</span>)}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

       
      </div>
    </section>
  );
}
