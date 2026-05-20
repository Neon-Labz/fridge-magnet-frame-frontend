"use client";

import { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";
import FramePreview from "@/components/website/FramePreview";
import FeedbackCard from "@/components/website/order-confirmation/FeedbackCard";
import Link from "next/link";
import { getSavedOrder, clearSavedOrder } from "@/services/cartService";
import { useToast, ToastContainer } from "@/components/ui/toast";

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
  if (item.name.toLowerCase().includes("white frame")) {
    return "updated-1";
  }
  if (item.name.toLowerCase().includes("magnate frame")) {
    return "updated-2";
  }
  return "gradient";
};

export default function OrderConfirmationScreen() {
  const [order, setOrder] = useState<Order | null>(null);
  const { toasts, removeToast } = useToast();

  useEffect(() => {
    const savedOrder = getSavedOrder();
    if (savedOrder) {
      setOrder(savedOrder as Order);
    }

    // Cleanup: Clear saved order after 5 minutes to free up memory
    const cleanupTimer = setTimeout(() => {
      clearSavedOrder();
    }, 5 * 60 * 1000);

    // Also clear on page unload
    const handleBeforeUnload = () => {
      clearSavedOrder();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      clearTimeout(cleanupTimer);
      window.removeEventListener('beforeunload', handleBeforeUnload);
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
      <div className="mx-auto w-full max-w-full px-4 sm:px-8 lg:px-12 py-8 sm:py-12 lg:py-20">
        {/* Header - Success Message */}
        <div className="flex flex-col items-center text-center mb-12 sm:mb-16">
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#0040A1]">
            <CheckCircle className="h-10 w-10 text-white" />
          </div>

          <h1 className="font-manrope text-4xl sm:text-5xl lg:text-[48px] font-bold tracking-[-0.96px] text-[#002B73] mb-4">
            Thank You for Your Order
          </h1>

          <p className="max-w-[672px] text-base sm:text-lg text-[#434652] leading-relaxed">
            Your memories are in safe hands. We've received your order and are preparing to craft your custom frames with the precision they deserve.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-8 grid-cols-1 lg:grid-cols-[7fr_3fr]">
          {/* Left Column: Order Details */}
          <div className="space-y-6">
            {/* Order Summary Section */}
            <div className="rounded-xl border border-[#C3C6D4] bg-white shadow-[0px_1px_2px_rgba(0,0,0,0.05)] overflow-hidden">
              {/* Header */}
              <div className="border-b border-[#C3C6D4] px-4 sm:px-6 lg:px-8 py-4 sm:py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <h2 className="font-manrope text-2xl sm:text-[28px] font-semibold text-[#002B73]">
                  Order Details
                </h2>
                <div className="bg-[#E8E8ED] rounded-full px-4 py-2 self-start sm:self-auto">
                  <span className="text-xs sm:text-sm font-medium text-[#1A1C1F]">
                    Order #{order.orderNumber}
                  </span>
                </div>
              </div>

              {/* Items List */}
              <div className="divide-y divide-[#E2E2E7]">
                {order.items.map((item) => (
                  <div key={item.id} className="flex gap-3 sm:gap-4 px-4 sm:px-6 lg:px-8 py-4">
                    {/* Product Image */}
                    <div className="flex-shrink-0 w-20 sm:w-24 h-20 sm:h-24 rounded-lg border border-[#C3C6D4] bg-white overflow-hidden flex items-center justify-center">
                      <FramePreview
                        variant={resolvePreview(item)}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0 flex flex-col justify-center">
                      <h3 className="font-semibold text-base sm:text-lg text-[#1A1C1F] line-clamp-2 mb-1">
                        {item.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#434652]">
                        Quantity: {item.quantity} • Frame: White
                      </p>
                    </div>

                    {/* Price */}
                    <div className="text-right font-bold text-base sm:text-lg text-[#1A1C1F] whitespace-nowrap">
                      Rs{(item.price * item.quantity).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary Totals */}
              <div className="border-t border-[#C3C6D4] bg-[#F9F9FE] px-4 sm:px-6 lg:px-8 py-6 space-y-4">
                <div className="flex justify-between text-xs sm:text-sm text-[#434652]">
                  <span>Subtotal</span>
                  <span>Rs{order.subtotal.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between text-xs sm:text-sm text-[#434652]">
                  <span>Shipping</span>
                  <span>Rs{order.shipping.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                </div>
                <div className="border-t border-[#C3C6D4] pt-4 flex justify-between text-base sm:text-xl font-bold text-[#002B73]">
                  <span>Total</span>
                  <span>Rs{total.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                </div>
              </div>
            </div>

            {/* Delivery Information Section */}
            <div className="rounded-xl border border-[#C3C6D4] bg-[#F3F3F8] p-4 sm:p-6 lg:p-8">
              <h2 className="font-manrope text-2xl sm:text-[28px] font-semibold text-[#002B73] mb-6">
                Delivery Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                {/* Shipping Address */}
                <div className="space-y-3">
                  <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#747784]">
                    Shipping Address
                  </p>
                  <div className="text-xs sm:text-sm text-[#1A1C1F] space-y-1 leading-relaxed">
                    <p className="font-medium">
                      {order.customerDetails.firstName} {order.customerDetails.lastName}
                    </p>
                    <p>{order.customerDetails.street}</p>
                    <p>
                      {order.customerDetails.city}, {order.customerDetails.state}{" "}
                      {order.customerDetails.zip}
                    </p>
                  </div>
                </div>

                {/* Contact Details */}
                <div className="space-y-3">
                  <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#747784]">
                    Contact Details
                  </p>
                  <div className="text-xs sm:text-sm text-[#1A1C1F] space-y-1">
                    <p>{order.customerDetails.email}</p>
                    <p>{order.customerDetails.phone}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Feedback Section */}
          <FeedbackCard />
        </div>

        {/* Continue Shopping */}
        <div className="mt-12 text-center">
          <Link
            href="/shop"
            className="inline-block bg-[#FF3B30] hover:bg-[#E61D11] text-white font-semibold px-6 sm:px-8 py-3 rounded-lg transition-colors text-sm sm:text-base"
          >
            Continue Shopping
          </Link>
        </div>
      </div>

      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
}
