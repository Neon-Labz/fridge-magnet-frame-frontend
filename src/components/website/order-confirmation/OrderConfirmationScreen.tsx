"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";
import FeedbackCard from "@/components/website/order-confirmation/FeedbackCard";
import Link from "next/link";
import { getSavedOrder, clearSavedOrder } from "@/services/cartService";

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

const resolvePreview = (item: OrderItem): "updated-1" | "updated-2" | "gradient" => {
  if (item.image === "updated-1" || item.image === "updated-2") {
    return item.image;
  }
  if (item.name && item.name.toLowerCase().includes("white frame")) {
    return "updated-1";
  }
  if (item.name && item.name.toLowerCase().includes("magnate frame")) {
    return "updated-2";
  }
  return "gradient";
};

export default function OrderConfirmationScreen() {
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    const savedOrder = getSavedOrder();
    if (savedOrder) {
      setOrder(savedOrder as Order);
    }

    // Cleanup: Clear saved order after 5 minutes
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
      <div className="min-h-screen bg-gradient-to-b from-[#F9F9FE] to-white flex items-center justify-center">
        <div className="text-center px-4">
          <p className="text-[#434652]">Loading order details...</p>
        </div>
      </div>
    );
  }

  const total = order.subtotal + order.shipping;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F9F9FE] to-white">
      <div className="mx-auto w-full max-w-full px-4 sm:px-8 lg:px-12 py-8 sm:py-12 lg:py-25">

        {/* Header */}
        <div className="flex flex-col items-center text-center mb-10 sm:mb-16">
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#0040A1]">
            <CheckCircle className="h-10 w-10 text-white" />
          </div>

          <h1 className="font-manrope text-4xl sm:text-5xl lg:text-[48px] font-bold tracking-[-0.96px] text-[#002B73] mb-4">
            Thank You for Your Order
          </h1>

          <p className="max-w-[672px] text-base sm:text-lg text-[#434652] leading-relaxed">
            Your memories are in safe hands. We've received your order and are preparing to craft your custom frames.
          </p>
        </div>

        {/* Main Content */}
<div className="grid gap-6 px-6 sm:px-10 lg:px-[75px] lg:grid-cols-[1.5fr_1fr]">
          {/* Left */}
          <div className="space-y-6">

            {/* Order Summary */}
            <div className="rounded-xl border border-[#C3C6D4] bg-white overflow-hidden">
              <div className="border-b px-6 py-6 flex justify-between items-center">
                <h2 className="text-2xl font-semibold text-[#002B73]">
                  Order Details
                </h2>
                <span className="bg-[#E8E8ED] rounded-full px-4 py-2 text-sm">
                  Order #{order.orderNumber}
                </span>
              </div>

              <div className="divide-y">
                {order.items.map((item) => (
                  <div key={item.id} className="flex gap-4 px-6 py-4">
                    <div className="w-24 h-24 border rounded-lg overflow-hidden flex items-center justify-center">
                      <Image
                        src={item.image || "/home-product-1.png"}
                        alt={item.name}
                        width={96}
                        height={96}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Quantity: {item.quantity}
                      </p>
                    </div>

                    <div className="font-bold">
                      Rs{(item.price * item.quantity).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t bg-[#F9F9FE] px-6 py-6 space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>Rs{order.subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Rs{order.shipping.toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-bold text-lg border-t pt-2">
                  <span>Total</span>
                  <span>Rs{total.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Delivery Info */}
            <div className="border rounded-xl p-6 bg-[#F3F3F8]">
              <h2 className="text-xl font-semibold mb-4">
                Delivery Information
              </h2>

              <div className="grid md:grid-cols-2 gap-6">

                <div>
                  <p className="font-semibold text-sm">Shipping Address</p>
                  <p>{order.customerDetails.firstName} {order.customerDetails.lastName}</p>
                  <p>{order.customerDetails.street}</p>
                  <p>{order.customerDetails.city}, {order.customerDetails.state} {order.customerDetails.zip}</p>
                </div>

                <div>
                  <p className="font-semibold text-sm">Contact</p>
                  <p>{order.customerDetails.email}</p>
                  <p>{order.customerDetails.phone}</p>
                </div>

              </div>
            </div>

          </div>

          {/* Right */}
          <FeedbackCard
            orderNumber={order.orderNumber}
            customerName={`${order.customerDetails.firstName} ${order.customerDetails.lastName}`.trim()}
            email={order.customerDetails.email}
          />
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/shop"
            className="bg-[#FF3B30] text-white px-6 py-3 rounded-lg"
          >
            Continue Shopping
          </Link>
        </div>

      </div>
    </div>
  );
}