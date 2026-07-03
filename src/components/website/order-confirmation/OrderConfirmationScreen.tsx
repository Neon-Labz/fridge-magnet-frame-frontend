"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";
import FeedbackCard from "@/components/website/order-confirmation/FeedbackCard";
import Link from "next/link";
import { getSavedOrder, clearSavedOrder } from "@/services/cartService";
import { getProductLineTotal } from "@/lib/productQuantityRules";

interface OrderItem {
  id: string | number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface Order {
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  orderNumber: string;
  createdAt: string;
  customerDetails: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    street: string;
    city: string;
    state: string;
    zip: string;
    deliveryNotes: string;
  };
}

export default function OrderConfirmationScreen() {
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    const savedOrder = getSavedOrder();
    if (savedOrder) {
      setOrder(savedOrder as Order);
    }

    const cleanupTimer = setTimeout(() => {
      clearSavedOrder();
    }, 5 * 60 * 1000);

    const handleBeforeUnload = () => {
      clearSavedOrder();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      clearTimeout(cleanupTimer);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  if (!order) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-[#F9F9FE] to-white px-4">
        <p className="text-center text-[#434652]">Loading order details...</p>
      </div>
    );
  }

  const total = order.subtotal + order.shipping;

  return (
    <div className="min-h-screen overflow-x-hidden bg-gradient-to-b from-[#F9F9FE] to-white">
      <div className="mx-auto w-full max-w-7xl px-4 pt-16 pb-8 sm:px-6 sm:pt-20 sm:pb-12 lg:px-12 lg:py-24">
        <div className="mb-8 mt-6 flex flex-col items-center text-center sm:mb-12 sm:mt-8">
          <div className="mb-5 mt-3 flex h-16 w-16 items-center justify-center rounded-full bg-[#0040A1] sm:h-20 sm:w-20">
            <CheckCircle className="h-8 w-8 text-white sm:h-10 sm:w-10" />
          </div>

          <h1 className="mb-3 max-w-3xl font-manrope text-3xl font-bold tracking-[-0.04em] text-[#002B73] sm:text-5xl lg:text-[48px]">
            Thank You for Your Order
          </h1>

          <p className="max-w-2xl text-sm leading-relaxed text-[#434652] sm:text-lg">
            Your memories are in safe hands. We've received your order and are
            preparing to craft your custom frames.
          </p>
        </div>

        <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(320px,1fr)]">
          <div className="min-w-0 space-y-6">
            <div className="overflow-hidden rounded-xl border border-[#C3C6D4] bg-white">
              <div className="flex flex-col gap-3 border-b px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-6">
                <h2 className="text-xl font-semibold text-[#002B73] sm:text-2xl">
                  Order Details
                </h2>

                <span className="w-fit max-w-full break-all rounded-full bg-[#E8E8ED] px-3 py-2 text-xs text-[#1A1C1F] sm:px-4 sm:text-sm">
                  Order #{order.orderNumber}
                </span>
              </div>

              <div className="divide-y">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-3 px-4 py-4 sm:gap-4 sm:px-6"
                  >
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-lg border bg-white sm:h-24 sm:w-24">
                      <Image
                        src={item.image || "/home-product-1.png"}
                        alt={item.name}
                        width={96}
                        height={96}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="line-clamp-2 text-sm font-semibold text-[#1A1C1F] sm:text-lg">
                        {item.name}
                      </h3>
                      <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                        Quantity: {item.quantity}
                      </p>
                    </div>

                    <div className="shrink-0 text-right text-sm font-bold text-[#0040A1] sm:text-base">
                      Rs{getProductLineTotal(item.price, item.quantity, item.name).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-2 border-t bg-[#F9F9FE] px-4 py-5 text-sm sm:px-6 sm:py-6 sm:text-base">
                <div className="flex justify-between gap-4">
                  <span>Subtotal</span>
                  <span>Rs{order.subtotal.toLocaleString()}</span>
                </div>

                <div className="flex justify-between gap-4">
                  <span>Shipping</span>
                  <span>Rs{order.shipping.toLocaleString()}</span>
                </div>

                <div className="flex justify-between gap-4 border-t pt-2 text-base font-bold sm:text-lg">
                  <span>Total</span>
                  <span>Rs{total.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="rounded-xl border bg-[#F3F3F8] p-4 sm:p-6">
              <h2 className="mb-4 text-lg font-semibold sm:text-xl">
                Delivery Information
              </h2>

              <div className="grid grid-cols-1 gap-5 text-sm sm:grid-cols-2 sm:gap-6 sm:text-base">
                <div className="min-w-0">
                  <p className="mb-1 text-sm font-semibold">Shipping Address</p>
                  <p className="break-words">
                    {order.customerDetails.firstName}{" "}
                    {order.customerDetails.lastName}
                  </p>
                  <p className="break-words">{order.customerDetails.street}</p>
                  <p className="break-words">
                    {order.customerDetails.city}, {order.customerDetails.state}{" "}
                    {order.customerDetails.zip}
                  </p>
                </div>

                <div className="min-w-0">
                  <p className="mb-1 text-sm font-semibold">Contact</p>
                  <p className="break-all">{order.customerDetails.email}</p>
                  <p className="break-words">{order.customerDetails.phone}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="min-w-0">
            <FeedbackCard
              orderNumber={order.orderNumber}
              customerName={`${order.customerDetails.firstName} ${order.customerDetails.lastName}`.trim()}
              email={order.customerDetails.email}
            />
          </div>
        </div>

        <div className="mt-10 text-center sm:mt-12">
          <Link
            href="/shop"
            className="inline-flex w-full max-w-xs items-center justify-center rounded-lg bg-[#FF3B30] px-6 py-3 font-semibold text-white sm:w-auto"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
