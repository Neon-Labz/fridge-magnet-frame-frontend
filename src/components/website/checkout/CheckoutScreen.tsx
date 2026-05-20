"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import OrderSummary, { SummaryItem } from "./OrderSummary";
import { saveOrder } from "@/services/cartService";
import { useCart } from '@/context/CartContext';
import { Truck, UserRound } from "lucide-react";

const generateOrderNumber = () => {
  return `MAG-${Math.floor(10000 + Math.random() * 90000)}`;
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function CheckoutScreen() {
  const router = useRouter();
  const { items: cartItems, subtotal: cartSubtotal, clearCart } = useCart();
  const items = useMemo<SummaryItem[]>(
    () => cartItems.map((i) => ({ id: i.id, name: i.title, price: i.price, quantity: i.quantity, image: i.image, frameType: i.frameType, colorOption: i.colorOption })),
    [cartItems],
  );

  // use subtotal from cart context (keeps single source of truth)
  const subtotal = cartSubtotal;

  // Form state (controlled)
  type FormState = {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    street: string;
    city: string;
    state: string;
    zip: string;
    notes?: string;
  };

  const [form, setForm] = useState<FormState>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    notes: "",
  });

  const setField = (k: keyof FormState, v: string) => setForm((s) => ({ ...s, [k]: v }));

  // basic production-grade validation
  const isFormValid = useMemo(() => {
    return (
      form.firstName.trim() !== "" &&
      form.lastName.trim() !== "" &&
      emailRegex.test(form.email.trim()) &&
      form.phone.trim() !== "" &&
      form.street.trim() !== "" &&
      form.city.trim() !== "" &&
      form.state.trim() !== "" &&
      form.zip.trim() !== ""
    );
  }, [form]);

  const handlePlaceOrder = () => {
    if (!isFormValid || items.length === 0) {
      return;
    }

    const order = {
      items,
      subtotal,
      shipping: 200,
      orderNumber: generateOrderNumber(),
      createdAt: new Date().toISOString(),
      customerDetails: formData,
    };

    saveOrder(order);
    clearCart();
    setSelectedFrame('black-frame');
    router.push("/order-confirmation");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F9F9FE] to-[#F9F9FE]" style={{ backgroundImage: "linear-gradient(0deg, #F9F9FE, #F9F9FE), #FFFFFF" }}>
      <div className="mx-auto w-full max-w-full px-4 sm:px-8 lg:px-12 py-8 sm:py-12">
        <div className="mb-8 sm:mb-12">
          <h1 className="font-manrope text-3xl sm:text-4xl lg:text-[48px] font-bold tracking-tight sm:tracking-[-0.96px] text-[#0040A1] leading-tight sm:leading-[56px]">
            Secure Checkout
          </h1>
          <p className="mt-2 sm:mt-4 text-base sm:text-[18px] leading-relaxed sm:leading-[28px] text-[#434652]">
            Review your curated frames and finalize your order.
          </p>
        </div>

        <div className="grid gap-6 sm:gap-8 grid-cols-1 lg:grid-cols-[1.5fr_1fr]">
          <div className="space-y-6 sm:space-y-8 lg:space-y-8">
            <Card>
              <CardHeader>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F3F3F8] text-[#0040A1]">
                  <UserRound className="h-4 w-4" />
                </div>
                <div>
                  <h2 className="font-manrope text-[28px] sm:text-[32px] font-semibold tracking-tight text-[#1A1C1F]">
                    Customer Details
                  </h2>
                </div>
              </CardHeader>
              <CardContent className="space-y-5 px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12 pt-6 sm:pt-8">
                <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-[#434652]">First Name</label>
                      <Input
                        value={form.firstName}
                        placeholder="John"
                        onChange={(e) => setField("firstName", (e.target as HTMLInputElement).value)}
                      />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-[#434652]">Last Name</label>
                      <Input
                        value={form.lastName}
                        placeholder="Doe"
                        onChange={(e) => setField("lastName", (e.target as HTMLInputElement).value)}
                      />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-[#434652]">Email Address</label>
                    <Input
                      type="email"
                      value={form.email}
                      placeholder="example123@gmail.com"
                      onChange={(e) => setField("email", (e.target as HTMLInputElement).value)}
                    />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-[#434652]">Phone Number</label>
                    <Input
                      type="tel"
                      value={form.phone}
                      placeholder="+1 (555) 000-0000"
                      onChange={(e) => setField("phone", (e.target as HTMLInputElement).value)}
                    />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F3F3F8] text-[#0040A1]">
                  <Truck className="h-4 w-4" />
                </div>
                <div>
                  <h2 className="font-manrope text-[28px] sm:text-[32px] font-semibold tracking-tight text-[#1A1C1F]">
                    Delivery Details
                  </h2>
                </div>
              </CardHeader>
              <CardContent className="space-y-5 px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12 pt-6 sm:pt-8">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-[#434652]">Street Address</label>
                  <Input
                    value={form.street}
                    placeholder="123 Gallery Street"
                    onChange={(e) => setField("street", (e.target as HTMLInputElement).value)}
                  />
                </div>
                <div className="grid gap-4 sm:gap-5 md:grid-cols-[1fr_1fr_100px]">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-[#434652]">City</label>
                    <Input
                      value={form.city}
                      placeholder="Manhattan"
                      onChange={(e) => setField("city", (e.target as HTMLInputElement).value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-[#434652]">State / Province</label>
                    <Input
                      value={form.state}
                      placeholder="Sri Lanka"
                      onChange={(e) => setField("state", (e.target as HTMLInputElement).value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-[#434652]">ZIP</label>
                    <Input
                      value={form.zip}
                      placeholder="10001"
                      onChange={(e) => setField("zip", (e.target as HTMLInputElement).value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-[#434652]">Delivery Notes (Optional)</label>
                  <Textarea
                    value={form.notes}
                    placeholder="Leave at front desk"
                    onChange={(e) => setField("notes", (e.target as HTMLTextAreaElement).value)}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <OrderSummary
            items={items}
            subtotal={subtotal}
            onPlaceOrder={handlePlaceOrder}
            disabled={!isFormValid}
          />
        </div>
      </div>
    </div>
  );
}