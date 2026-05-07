"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Lock, Trash2 } from "lucide-react";
import OrderSummary from '../../../components/OrderSummary';

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
    if (!Number.isNaN(qty)) {
      onQuantityChange(item.id, Math.max(1, qty));
    }
  };

  return (
    <article style={{ position: 'relative', boxSizing: 'border-box', display: 'flex', flexDirection: 'row', alignItems: 'flex-start', padding: '32px', gap: '32px', width: '100%', minHeight: '220px', background: '#FFFFFF', border: '1px solid #C3C6D4', boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)', borderRadius: '14px' }} className="rounded-[14px]">
      <button
        type="button"
        onClick={() => onDelete(item.id)}
        style={{ position: 'absolute', top: '16px', right: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: 0, width: '16px', height: '18px', background: 'none', border: 'none', cursor: 'pointer', zIndex: 2 }}
        aria-label="Delete item"
      >
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 0, width: '16px', height: '18px' }}>
          <Trash2 style={{ width: '16px', height: '18px', color: '#747784' }} strokeWidth={2} />
        </div>
      </button>

      {/* Product Image - Left */}
      <div style={{ boxSizing: 'border-box', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: 0, width: '180px', height: '180px', minWidth: '180px', background: '#F3F3F8', border: '1px solid #EDEDF2', borderRadius: '10px', flex: 'none', order: 0, flexGrow: 0, overflow: 'hidden' }}>
        <Image
          src={item.image}
          alt={item.title}
          width={178}
          height={178}
          style={{ width: '178px', height: '178px', objectFit: 'cover' }}
          className="rounded-[10px]"
        />
      </div>

      {/* Content Wrapper - Middle & Right */}
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-start', padding: 0, gap: '24px', width: '100%', flex: 1, alignSelf: 'stretch', flexGrow: 1, position: 'relative' }}>
        
        {/* Title Row */}
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', padding: 0, width: '100%', flexGrow: 0 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: 0, gap: '6px', flexGrow: 1 }}>
            <h3 style={{ fontFamily: 'Manrope', fontStyle: 'normal', fontWeight: 600, fontSize: '26px', lineHeight: '32px', color: '#002B73', margin: 0, flex: 'none' }}>
              {item.title}
            </h3>
            <p style={{ fontFamily: 'Inter', fontStyle: 'normal', fontWeight: 400, fontSize: '14px', lineHeight: '20px', color: '#747784', margin: 0, flex: 'none' }}>
              {item.subtitle}
            </p>
          </div>
        </div>

        {/* Bottom Row: Quantity + Price */}
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 0, gap: '24px', width: '100%', flexGrow: 0 }}>
          
          {/* Quantity Selector */}
          <div style={{ boxSizing: 'border-box', display: 'flex', flexDirection: 'row', alignItems: 'stretch', padding: 0, height: '40px', border: '1px solid #C3C6D4', borderRadius: '8px', background: '#FFFFFF', overflow: 'hidden', flex: 'none' }}>
            <button
              type="button"
              onClick={() => onQuantityChange(item.id, Math.max(1, item.quantity - 1))}
              style={{ boxSizing: 'border-box', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '0 12px', border: 'none', borderRight: '1px solid #C3C6D4', background: '#FFFFFF', cursor: 'pointer', transition: 'background-color 0.2s ease', flex: 'none' }}
              className="hover:bg-[#F9F9FE]"
            >
              <span style={{ fontFamily: 'Inter', fontStyle: 'normal', fontWeight: 700, fontSize: '16px', lineHeight: '24px', color: '#002B73' }}>−</span>
            </button>
            
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '0 16px', flex: 'none', minWidth: '50px' }}>
              <input
                value={String(item.quantity)}
                onChange={(e) => handleInput(e.target.value)}
                style={{ fontFamily: 'Manrope', fontStyle: 'normal', fontWeight: 500, fontSize: '16px', lineHeight: '24px', textAlign: 'center', color: '#1A1C1F', border: 'none', outline: 'none', background: 'transparent', padding: 0, width: '30px', appearance: 'textfield' }}
                type="text"
                pattern="[0-9]*"
                inputMode="numeric"
                aria-label="Quantity"
              />
            </div>
            
            <button
              type="button"
              onClick={() => onQuantityChange(item.id, item.quantity + 1)}
              style={{ boxSizing: 'border-box', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '0 12px', border: 'none', borderLeft: '1px solid #C3C6D4', background: '#FFFFFF', cursor: 'pointer', transition: 'background-color 0.2s ease', flex: 'none' }}
              className="hover:bg-[#F9F9FE]"
            >
              <span style={{ fontFamily: 'Inter', fontStyle: 'normal', fontWeight: 700, fontSize: '16px', lineHeight: '24px', color: '#002B73' }}>+</span>
            </button>
          </div>

          {/* Price - Far Right */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'center', padding: 0, flex: 'none', marginLeft: 'auto', height: '40px' }}>
            <div style={{ fontFamily: 'Manrope', fontStyle: 'normal', fontWeight: 700, fontSize: '30px', lineHeight: '40px', color: '#002B73', textAlign: 'right' }}>
              Rs{(item.price * item.quantity).toFixed(2)}
            </div>
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
      quantity: 8,
      image: "/logo.png",
    },
    {
      id: "2",
      title: "Modern Matte Ebony",
      subtitle: "Frame: No Frame",
      price: 125,
      quantity: 4,
      image: "/logo.png",
    },
  ]);

  const handleQuantityChange = (id: string, quantity: number) => {
    setCartItems((current) =>
      current.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item,
      ),
    );
  };

  const handleDelete = (id: string) => {
    setCartItems((current) => current.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="relative w-full bg-[#F9F9FE]">
      <main className="mx-auto w-full max-w-[1600px] px-6 lg:px-8 pb-[100px] pt-[140px]">
        <div className="w-full">
          <header className="mb-16 max-w-4xl">
            <h1 className="font-manrope font-bold text-[56px] lg:text-[64px] leading-[64px] lg:leading-[72px] tracking-[-1.12px] text-[#1A1C1F] mb-4">
              Your Gallery Bag
            </h1>
            <p className="font-inter text-[18px] lg:text-[20px] font-normal leading-[28px] lg:leading-[32px] text-[#747784]">
              Review your curated selections before we frame them for eternity.
            </p>
          </header>

          <div className="grid gap-8 lg:gap-12 grid-cols-1 lg:grid-cols-[1fr_420px]">
            <section className="space-y-8 lg:space-y-6">
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: 0, gap: '32px', width: '100%' }}>
                {cartItems.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onQuantityChange={handleQuantityChange}
                    onDelete={handleDelete}
                  />
                ))}
              </div>

              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '32px 0px 0px', width: '100%', flex: 'none', order: 2, alignSelf: 'stretch', flexGrow: 0 }}>
                <Link
                  href="/shop"
                  style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: 0, gap: '12px', flex: 'none', order: 0, flexGrow: 0, textDecoration: 'none' }}
                  className="hover:underline"
                >
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 0, width: '20px', height: '20px', flex: 'none', order: 0, flexGrow: 0 }}>
                    <ArrowLeft style={{ width: '20px', height: '20px', color: '#002B73' }} />
                  </div>
                  <span style={{ fontFamily: 'Inter', fontStyle: 'normal', fontWeight: 600, fontSize: '18px', lineHeight: '28px', display: 'flex', alignItems: 'center', textAlign: 'center', color: '#002B73', flex: 'none', order: 1, flexGrow: 0 }}>
                    Continue Shopping
                  </span>
                </Link>
              </div>
            </section>

            <OrderSummary subtotal={subtotal} quantity={totalQuantity} />
          </div>
        </div>
      </main>
    </div>
  );
}
