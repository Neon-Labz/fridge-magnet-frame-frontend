"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import OrderSummary, { SummaryItem } from "./OrderSummary";
import { saveOrder } from "@/services/cartService";
import { useCart } from "@/context/CartContext";
import { useFrameStore } from "@/store/frameStore";
import { useWebsiteAuthSession } from "@/hooks/useWebsiteAuthSession";
import { Truck, UserRound } from "lucide-react";
import { apiV1Url } from "@/lib/backendUrl";

const generateOrderNumber = () =>
  `MAG-${Math.floor(10000 + Math.random() * 90000)}`;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const SHIPPING_FEE = 200;

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

export default function CheckoutScreen() {
  const router = useRouter();
  const { items: cartItems, subtotal: cartSubtotal, clearCart } = useCart();
  const { isAuthenticated, user } = useWebsiteAuthSession();
  const setSelectedFrame = useFrameStore((state) => state.setSelectedFrame);

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

  useEffect(() => {
    const storedUser =
      user ||
      JSON.parse(
        localStorage.getItem("user") ||
          localStorage.getItem("authUser") ||
          localStorage.getItem("customer") ||
          localStorage.getItem("websiteUser") ||
          "{}"
      );

    if (!storedUser) return;

    setForm((prev) => ({
      ...prev,
      firstName:
        storedUser.firstName ||
        storedUser.first_name ||
        storedUser.name?.split(" ")[0] ||
        "",
      lastName:
        storedUser.lastName ||
        storedUser.last_name ||
        storedUser.name?.split(" ").slice(1).join(" ") ||
        "",
      email: storedUser.email || "",
      phone:
        storedUser.phone ||
        storedUser.mobile ||
        storedUser.phoneNumber ||
        storedUser.contactNumber ||
        "",
      street: storedUser.street || storedUser.address || "",
      city: storedUser.city || "",
      state: storedUser.state || storedUser.district || "",
      zip: storedUser.zip || storedUser.postalCode || storedUser.postal_code || "",
    }));
  }, [user]);

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

  // Shipping details are considered "entered" once all delivery fields are filled.
  const shippingDetailsEntered = useMemo(
    () =>
      form.street.trim() !== "" &&
      form.city.trim() !== "" &&
      form.state.trim() !== "" &&
      form.zip.trim() !== "",
    [form.street, form.city, form.state, form.zip]
  );

  const shipping = shippingDetailsEntered ? SHIPPING_FEE : 0;

  const [touched, setTouched] = useState<
    Partial<Record<keyof FormState, boolean>>
  >({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

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
        return form.state.trim() === "" ? "District is required" : null;
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

  const handlePlaceOrder = async () => {
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

    const orderNumber = generateOrderNumber();
    const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
    const shippingAddress = `${form.street}, ${form.city}, ${form.state} ${form.zip}`.trim();
    const customerName = `${form.firstName} ${form.lastName}`.trim();

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch(apiV1Url("/orders"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: orderNumber,
          customerName,
          customerId: `CUST-${Date.now()}`,
          email: form.email,
          phone: form.phone,
          qty: totalQuantity,
          totalValue: subtotal + shipping,
          shippingAddress,
          adminNote: form.notes?.trim() || undefined,
          items: items.map((item) => ({
            productId: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            image: item.image,
            frameType: item.frameType,
            colorOption: item.colorOption,
          })),
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data?.message || `Order failed: ${response.status}`);
      }

      saveOrder({
      items,
      subtotal,
      shipping,
      orderNumber,
      createdAt: new Date().toISOString(),
      customerDetails: form,
      });

      clearCart();
      setSelectedFrame("black-frame");
      router.push("/order-confirmation");
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Failed to place order");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F9FE] py-25">
      <div className="mx-auto max-w-[1700px] px-4 sm:px-6 lg:px-[120px]">
        <div className="mb-8">
          <h1 className="font-manrope text-4xl font-bold tracking-[-0.02em] text-[#0040A1] sm:text-5xl lg:text-[48px] lg:leading-[56px]">
            Secure Checkout
          </h1>
          <p className="mt-2 text-[#434652]">
            Review your curated frames and finalize your order.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <UserRound className="h-5 w-5 text-[#0040A1]" />
                <h2 className="text-xl font-semibold">Customer Details</h2>
              </CardHeader>

              <CardContent className="space-y-4">
                <Input placeholder="First Name" value={form.firstName} onChange={(e) => setField("firstName", e.target.value)} onBlur={() => markTouched("firstName")} />
                {getFieldError("firstName") && <p className="text-xs text-red-500">{getFieldError("firstName")}</p>}

                <Input placeholder="Last Name" value={form.lastName} onChange={(e) => setField("lastName", e.target.value)} onBlur={() => markTouched("lastName")} />
                {getFieldError("lastName") && <p className="text-xs text-red-500">{getFieldError("lastName")}</p>}

                <Input placeholder="Email" value={form.email} onChange={(e) => setField("email", e.target.value)} onBlur={() => markTouched("email")} />
                {getFieldError("email") && <p className="text-xs text-red-500">{getFieldError("email")}</p>}

                <Input placeholder="Phone" value={form.phone} onChange={(e) => setField("phone", e.target.value)} onBlur={() => markTouched("phone")} />
                {getFieldError("phone") && <p className="text-xs text-red-500">{getFieldError("phone")}</p>}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Truck className="h-5 w-5 text-[#0040A1]" />
                <h2 className="text-xl font-semibold">Delivery Details</h2>
              </CardHeader>

              <CardContent className="space-y-4">
                <Input placeholder="Street" value={form.street} onChange={(e) => setField("street", e.target.value)} onBlur={() => markTouched("street")} />
                <Input placeholder="City" value={form.city} onChange={(e) => setField("city", e.target.value)} onBlur={() => markTouched("city")} />
                <Input placeholder="District" value={form.state} onChange={(e) => setField("state", e.target.value)} onBlur={() => markTouched("state")} />
                <Input placeholder="ZIP" value={form.zip} onChange={(e) => setField("zip", e.target.value)} onBlur={() => markTouched("zip")} />
                <Textarea placeholder="Notes (optional)" value={form.notes} onChange={(e) => setField("notes", e.target.value)} />
              </CardContent>
            </Card>
          </div>

          <OrderSummary
            items={items}
            subtotal={subtotal}
            shipping={shipping}
            shippingEntered={shippingDetailsEntered}
            onPlaceOrder={handlePlaceOrder}
            disabled={!isFormValid || isSubmitting}
          />
          {submitError && (
            <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
              {submitError}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
