"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import OrderDetails, { OrderItem } from "./OrderDetails";
import { clearCart, getCartItems, getSavedOrder } from "@/services/cartService";

export default function OrderConfirmationScreen() {
  const [items, setItems] = useState<OrderItem[]>([]);
  const [orderNumber, setOrderNumber] = useState<string | undefined>(undefined);
  const [shipping, setShipping] = useState<number>(200);

  useEffect(() => {
    const savedOrder = getSavedOrder();

    if (savedOrder && savedOrder.items.length > 0) {
      setItems(savedOrder.items);
      setOrderNumber(savedOrder.orderNumber);
      setShipping(savedOrder.shipping);
      clearCart();
      return;
    }

    const stored = getCartItems();
    setItems(stored.map((item) => ({
      ...item,
      price: typeof item.price === "string" ? parseFloat(item.price) : item.price,
    })));
  }, []);

  const subtotal = useMemo(
    () => items.reduce((total, item) => total + item.price * item.quantity, 0),
    [items]
  );

  return (
    <div className="min-h-screen bg-[#F9F9FE] text-[#1A1C1F]">
      <main className="mx-auto max-w-[1280px] px-4 pb-16 pt-20 sm:px-6 lg:px-8">
        <section className="flex flex-col items-center gap-6 text-center">
          <div className="grid h-20 w-20 place-items-center rounded-full bg-[#0040A1] shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
            <div className="grid h-12 w-12 place-items-center rounded-full bg-white text-[#0040A1]">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 6L9 17L4 12" stroke="#0040A1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>

          <div className="max-w-[672px]">
            <h1 className="font-manrope text-[48px] font-bold leading-[56px] tracking-[-0.96px] text-[#002B73]">
              Thank You for Your Order
            </h1>
            <p className="mt-4 text-[18px] leading-7 text-[#434652]">
              Your memories are in safe hands. We’ve received your order and are preparing to craft your custom frames with the precision they deserve.
            </p>
          </div>
        </section>

        {items.length === 0 ? (
          <div className="mt-16 rounded-[20px] border border-[#C3C6D4] bg-white p-12 text-center">
            <h2 className="text-2xl font-semibold text-[#002B73]">No order was found</h2>
            <p className="mt-4 text-[#434652]">
              We couldn’t find order details for this confirmation. Please return to checkout and place your order again.
            </p>
          </div>
        ) : (
          <div className="mt-16 grid gap-8 xl:grid-cols-[1.8fr_1fr]">
            <div className="space-y-6">
              <OrderDetails
                items={items}
                subtotal={subtotal}
                shipping={shipping}
                orderNumber={orderNumber}
              />

              <Card className="rounded-[12px] bg-[#F3F3F8] border-[#C3C6D4]">
                <CardContent className="space-y-6 p-8">
                  <div>
                    <h2 className="text-[24px] font-manrope font-semibold text-[#002B73]">Delivery Information</h2>
                  </div>
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="rounded-[12px] bg-white p-6">
                      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#747784]">Shipping Address</p>
                      <p className="mt-4 text-[16px] leading-6 text-[#1A1C1F]">
                        Alex Thompson<br />
                        1248 Memory Lane<br />
                        Suite 400<br />
                        San Francisco, CA 94105
                      </p>
                    </div>
                    <div className="rounded-[12px] bg-white p-6">
                      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#747784]">Contact Details</p>
                      <p className="mt-4 text-[16px] leading-6 text-[#1A1C1F]">
                        alex.thompson@example.com<br />
                        +1 (555) 098-7654
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <div className="relative overflow-hidden rounded-[12px] bg-[#0040A1] p-8 text-white">
                <div className="absolute inset-0 bg-[rgba(255,255,255,0.002)] shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-4px_rgba(0,0,0,0.1)]" />
                <div className="relative space-y-6">
                  <div>
                    <p className="text-[24px] font-manrope font-semibold text-white">Your order was successful</p>
                    <p className="mt-2 max-w-[325px] text-[16px] leading-7 text-[#98B3FF]">
                      Help us improve the framing experience for everyone.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <button
                        key={index}
                        type="button"
                        className="inline-flex h-11 w-11 items-center justify-center rounded-[8px] bg-white/10 text-white transition hover:bg-white/20"
                      >
                        <Star className="h-4 w-4" />
                      </button>
                    ))}
                  </div>

                  <div className="rounded-[8px] border border-white/20 bg-white/10 p-3">
                    <textarea
                      placeholder="Tell us what you liked..."
                      className="min-h-[86px] w-full resize-none bg-transparent text-sm text-white placeholder:text-[#98B3FF] outline-none"
                    />
                  </div>

                  <Button variant="secondary" className="w-full rounded-[8px] bg-white text-[#002B73] hover:bg-[#f7f7f7]">
                    Submit Feedback
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
