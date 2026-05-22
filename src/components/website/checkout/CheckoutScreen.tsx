"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import OrderSummary, { SummaryItem } from "./OrderSummary";
import { saveOrder } from "@/services/cartService";
import { useCart } from "@/context/CartContext";
import { useFrameStore } from "@/store/frameStore";
import { useWebsiteAuthSession } from "@/hooks/useWebsiteAuthSession";
import { Truck, UserRound, AlertCircle } from "lucide-react";

const generateOrderNumber = () => {
  return `MAG-${Math.floor(10000 + Math.random() * 90000)}`;
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function CheckoutScreen() {
  const router = useRouter();
  const { items: cartItems, subtotal: cartSubtotal, clearCart } = useCart();
  const { isAuthenticated } = useWebsiteAuthSession();
  const setSelectedFrame = useFrameStore((state) => state.setSelectedFrame);

  const items = useMemo<SummaryItem[]>(
    () =>
      cartItems.map((i) => ({
        id: i.id,
        name: i.title,
        price: i.price,
        quantity: i.quantity,
        image: i.image,
        frameType: i.frameType,
        colorOption: i.colorOption,
      })),
    [cartItems]
  );

  const subtotal = cartSubtotal;

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

  const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>({});

  const setField = (k: keyof FormState, v: string) =>
    setForm((s) => ({ ...s, [k]: v }));

  const markTouched = (k: keyof FormState) =>
    setTouched((s) => ({ ...s, [k]: true }));

  const getFieldError = (field: keyof FormState): string | null => {
    if (!touched[field]) return null;

    switch (field) {
      case "firstName":
        return form.firstName.trim() === "" ? "First name is required" : null;
      case "lastName":
        return form.lastName.trim() === "" ? "Last name is required" : null;
      case "email":
        if (form.email.trim() === "") return "Email is required";
        if (!emailRegex.test(form.email.trim()))
          return "Please enter a valid email address";
        return null;
      case "phone":
        return form.phone.trim() === "" ? "Phone number is required" : null;
      case "street":
        return form.street.trim() === "" ? "Street address is required" : null;
      case "city":
        return form.city.trim() === "" ? "City is required" : null;
      case "state":
        return form.state.trim() === "" ? "State/Province is required" : null;
      case "zip":
        return form.zip.trim() === "" ? "ZIP code is required" : null;
      default:
        return null;
    }
  };

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
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    setTouched({
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
      street: true,
      city: true,
      state: true,
      zip: true,
    });

    if (!isFormValid || items.length === 0) return;

    const order = {
      items,
      subtotal,
      shipping: 200,
      orderNumber: generateOrderNumber(),
      createdAt: new Date().toISOString(),
      customerDetails: form,
    };

    saveOrder(order);
    clearCart();
    setSelectedFrame("black-frame");
    router.push("/order-confirmation");
  };

  return (
    <div className="min-h-screen bg-[#F9F9FE] py-12">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="font-manrope text-4xl font-bold tracking-[-0.02em] text-[#0040A1] sm:text-5xl lg:text-[48px] lg:leading-[56px]">
            Secure Checkout
          </h1>
          <p className="mt-2 text-[#434652]">
            Review your curated frames and finalize your order.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          {!isAuthenticated && (
            <div className="lg:col-span-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
              Please log in before placing an order.
            </div>
          )}

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <UserRound className="h-5 w-5 text-[#0040A1]" />
                <h2 className="text-xl font-semibold">Customer Details</h2>
              </CardHeader>

              <CardContent className="space-y-4">
                <Input
                  placeholder="First Name"
                  value={form.firstName}
                  onChange={(e) => setField("firstName", e.target.value)}
                  onBlur={() => markTouched("firstName")}
                />
                {getFieldError("firstName") && (
                  <p className="text-red-500 text-xs">{getFieldError("firstName")}</p>
                )}

                <Input
                  placeholder="Last Name"
                  value={form.lastName}
                  onChange={(e) => setField("lastName", e.target.value)}
                  onBlur={() => markTouched("lastName")}
                />
                {getFieldError("lastName") && (
                  <p className="text-red-500 text-xs">{getFieldError("lastName")}</p>
                )}

                <Input
                  placeholder="Email"
                  value={form.email}
                  onChange={(e) => setField("email", e.target.value)}
                  onBlur={() => markTouched("email")}
                />
                {getFieldError("email") && (
                  <p className="text-red-500 text-xs">{getFieldError("email")}</p>
                )}

                <Input
                  placeholder="Phone"
                  value={form.phone}
                  onChange={(e) => setField("phone", e.target.value)}
                  onBlur={() => markTouched("phone")}
                />
                {getFieldError("phone") && (
                  <p className="text-red-500 text-xs">{getFieldError("phone")}</p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Truck className="h-5 w-5 text-[#0040A1]" />
                <h2 className="text-xl font-semibold">Delivery Details</h2>
              </CardHeader>

              <CardContent className="space-y-4">
                <Input
                  placeholder="Street"
                  value={form.street}
                  onChange={(e) => setField("street", e.target.value)}
                  onBlur={() => markTouched("street")}
                />
                <Input
                  placeholder="City"
                  value={form.city}
                  onChange={(e) => setField("city", e.target.value)}
                  onBlur={() => markTouched("city")}
                />
                <Input
                  placeholder="State"
                  value={form.state}
                  onChange={(e) => setField("state", e.target.value)}
                  onBlur={() => markTouched("state")}
                />
                <Input
                  placeholder="ZIP"
                  value={form.zip}
                  onChange={(e) => setField("zip", e.target.value)}
                  onBlur={() => markTouched("zip")}
                />

                <Textarea
                  placeholder="Notes (optional)"
                  value={form.notes}
                  onChange={(e) => setField("notes", e.target.value)}
                />
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