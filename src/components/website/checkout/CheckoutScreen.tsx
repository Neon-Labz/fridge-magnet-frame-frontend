"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import OrderSummary, { SummaryItem } from "./OrderSummary";
import { saveOrder } from "@/services/cartService";
import { useCart } from '@/context/CartContext';
import { useFrameStore } from "@/store/frameStore";
import { useWebsiteAuthSession } from '@/hooks/useWebsiteAuthSession';
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

  // Track which fields have been touched
  const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>({});

  const setField = (k: keyof FormState, v: string) => setForm((s) => ({ ...s, [k]: v }));
  const markTouched = (k: keyof FormState) => setTouched((s) => ({ ...s, [k]: true }));

  // Validation function for each field
  const getFieldError = (field: keyof FormState): string | null => {
    if (!touched[field]) return null;

    switch (field) {
      case "firstName":
        return form.firstName.trim() === "" ? "First name is required" : null;
      case "lastName":
        return form.lastName.trim() === "" ? "Last name is required" : null;
      case "email":
        if (form.email.trim() === "") return "Email is required";
        if (!emailRegex.test(form.email.trim())) return "Please enter a valid email address";
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
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    // Mark all fields as touched to show validation errors
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

    if (!isFormValid || items.length === 0) {
      return;
    }

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
          {!isAuthenticated && (
            <div className="lg:col-span-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
              Please log in before placing an order.
            </div>
          )}

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
                    <label className="text-sm font-semibold text-[#434652]">First Name <span className="text-red-500">*</span></label>
                    <Input
                      required
                      value={form.firstName}
                      placeholder="John"
                      onChange={(e) => setField("firstName", (e.target as HTMLInputElement).value)}
                      onBlur={() => markTouched("firstName")}
                      className={getFieldError("firstName") ? "border-red-500" : ""}
                    />
                    {getFieldError("firstName") && (
                      <p className="text-xs text-red-500 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {getFieldError("firstName")}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-[#434652]">Last Name <span className="text-red-500">*</span></label>
                    <Input
                      required
                      value={form.lastName}
                      placeholder="Doe"
                      onChange={(e) => setField("lastName", (e.target as HTMLInputElement).value)}
                      onBlur={() => markTouched("lastName")}
                      className={getFieldError("lastName") ? "border-red-500" : ""}
                    />
                    {getFieldError("lastName") && (
                      <p className="text-xs text-red-500 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {getFieldError("lastName")}
                      </p>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-[#434652]">Email Address <span className="text-red-500">*</span></label>
                  <Input
                    required
                    type="email"
                    value={form.email}
                    placeholder="example123@gmail.com"
                    onChange={(e) => setField("email", (e.target as HTMLInputElement).value)}
                    onBlur={() => markTouched("email")}
                    className={getFieldError("email") ? "border-red-500" : ""}
                  />
                  {getFieldError("email") && (
                    <p className="text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {getFieldError("email")}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-[#434652]">Phone Number <span className="text-red-500">*</span></label>
                  <Input
                    required
                    type="tel"
                    value={form.phone}
                    placeholder="+1 (555) 000-0000"
                    onChange={(e) => setField("phone", (e.target as HTMLInputElement).value)}
                    onBlur={() => markTouched("phone")}
                    className={getFieldError("phone") ? "border-red-500" : ""}
                  />
                  {getFieldError("phone") && (
                    <p className="text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {getFieldError("phone")}
                    </p>
                  )}
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
                  <label className="text-sm font-semibold text-[#434652]">Street Address <span className="text-red-500">*</span></label>
                  <Input
                    required
                    value={form.street}
                    placeholder="123 Gallery Street"
                    onChange={(e) => setField("street", (e.target as HTMLInputElement).value)}
                    onBlur={() => markTouched("street")}
                    className={getFieldError("street") ? "border-red-500" : ""}
                  />
                  {getFieldError("street") && (
                    <p className="text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {getFieldError("street")}
                    </p>
                  )}
                </div>
                <div className="grid gap-4 sm:gap-5 md:grid-cols-[1fr_1fr_100px]">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-[#434652]">City <span className="text-red-500">*</span></label>
                    <Input
                      required
                      value={form.city}
                      placeholder="Manhattan"
                      onChange={(e) => setField("city", (e.target as HTMLInputElement).value)}
                      onBlur={() => markTouched("city")}
                      className={getFieldError("city") ? "border-red-500" : ""}
                    />
                    {getFieldError("city") && (
                      <p className="text-xs text-red-500 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {getFieldError("city")}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-[#434652]">State / Province <span className="text-red-500">*</span></label>
                    <Input
                      required
                      value={form.state}
                      placeholder="Sri Lanka"
                      onChange={(e) => setField("state", (e.target as HTMLInputElement).value)}
                      onBlur={() => markTouched("state")}
                      className={getFieldError("state") ? "border-red-500" : ""}
                    />
                    {getFieldError("state") && (
                      <p className="text-xs text-red-500 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {getFieldError("state")}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-[#434652]">ZIP <span className="text-red-500">*</span></label>
                    <Input
                      required
                      value={form.zip}
                      placeholder="10001"
                      onChange={(e) => setField("zip", (e.target as HTMLInputElement).value)}
                      onBlur={() => markTouched("zip")}
                      className={getFieldError("zip") ? "border-red-500" : ""}
                    />
                    {getFieldError("zip") && (
                      <p className="text-xs text-red-500 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {getFieldError("zip")}
                      </p>
                    )}
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