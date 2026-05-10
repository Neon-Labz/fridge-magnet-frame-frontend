"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import OrderSummary, { SummaryItem } from "./OrderSummary";
import { clearCart, getCartItems, saveOrder } from "@/services/cartService";
import { Truck, UserRound } from "lucide-react";

const generateOrderNumber = () => {
  return `MAG-${Math.floor(10000 + Math.random() * 90000)}`;
};

export default function CheckoutScreen() {
  const router = useRouter();
  const [items, setItems] = useState<SummaryItem[]>([]);

  useEffect(() => {
    const stored = getCartItems();
    setItems(stored);
  }, []);

  const subtotal = useMemo(
    () => items.reduce((total, item) => total + item.price * item.quantity, 0),
    [items],
  );

  const handlePlaceOrder = () => {
    if (items.length === 0) {
      return;
    }

    const order = {
      items,
      subtotal,
      shipping: 200,
      orderNumber: generateOrderNumber(),
      createdAt: new Date().toISOString(),
    };

    saveOrder(order);
    clearCart();
    router.push("/order-confirmation");
  };

  return (
    <div className="mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 lg:px-8 lg:pb-20 lg:pt-14">
      <div className="max-w-3xl">
        <h1 className="font-manrope text-4xl font-bold tracking-[-0.02em] text-[#0040A1] sm:text-5xl lg:text-[48px] lg:leading-[56px]">
          Secure Checkout
        </h1>
        <p className="mt-4 text-[18px] leading-7 text-[#434652]">
          Review your curated frames and finalize your order.
        </p>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_486px]">
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F3F3F8] text-[#0040A1]">
                <UserRound className="h-4 w-4" />
              </div>
              <div>
                <h2 className="font-manrope text-[32px] font-semibold tracking-[-0.01em] text-[#1A1C1F]">Customer Details</h2>
              </div>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="grid gap-5 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-[#434652]">First Name</label>
                  <Input defaultValue="John" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-[#434652]">Last Name</label>
                  <Input defaultValue="Doe" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-[#434652]">Email Address</label>
                <Input defaultValue="john.doe@example.com" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-[#434652]">Phone Number</label>
                <Input defaultValue="+1 (555) 000-0000" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F3F3F8] text-[#0040A1]">
                <Truck className="h-4 w-4" />
              </div>
              <div>
                <h2 className="font-manrope text-[32px] font-semibold tracking-[-0.01em] text-[#1A1C1F]">Delivery Details</h2>
              </div>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-[#434652]">Street Address</label>
                <Input defaultValue="123 Gallery Street" />
              </div>
              <div className="grid gap-5 md:grid-cols-[1fr_1fr_83px]">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-[#434652]">City</label>
                  <Input defaultValue="Manhattan" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-[#434652]">State / Province</label>
                  <Input defaultValue="Sri Lanka" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-[#434652]">ZIP</label>
                  <Input defaultValue="10001" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-[#434652]">Delivery Notes (Optional)</label>
                <Textarea defaultValue="Leave at front desk" />
              </div>
            </CardContent>
          </Card>
        </div>

        <OrderSummary
          items={items}
          subtotal={subtotal}
          onPlaceOrder={handlePlaceOrder}
        />
      </div>
    </div>
  );
}