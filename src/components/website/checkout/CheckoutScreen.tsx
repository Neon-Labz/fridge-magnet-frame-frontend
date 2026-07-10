"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SearchableSelect } from "@/components/ui/SearchableSelect";
import { SRI_LANKA_DISTRICTS } from "@/lib/sriLankaDistricts";
import OrderSummary, { SummaryItem } from "./OrderSummary";
import { useCart } from "@/context/CartContext";
import { useFrameStore } from "@/store/frameStore";
import { useWebsiteAuthSession } from "@/hooks/useWebsiteAuthSession";
import { apiV1Url } from "@/lib/backendUrl";
import { Truck, UserRound } from "lucide-react";
import {
  PaymentMethod,
  PendingOrder,
  savePendingOrder,
  submitOrder,
} from "@/services/orderService";

const generateOrderNumber = () =>
  `MAG-${Math.floor(10000 + Math.random() * 90000)}`;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^(?:\+94|0)?7[0-9]{8}$/;

const SHIPPING_FEE = 200;

// Shared input styling to match the Figma spec (49px tall, #C3C6D4 border).
const inputClass =
  "h-[49px] rounded-lg border-[#C3C6D4] px-3 py-3.5 text-[16px] placeholder:text-[#6B7280]";

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

type PreviousCustomer = {
  customerName?: string;
  name?: string;
  emailAddress?: string;
  email?: string;
  phoneNumber?: string;
  phone?: string;
  customerAddress?: string;
  address?: string;
};

function splitFullName(fullName: string) {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);

  return {
    firstName: parts[0] || "",
    lastName: parts.slice(1).join(" "),
  };
}

function parseSavedAddress(address: string) {
  const parts = address
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);

  const lastPart = parts.at(-1) || "";
  const zipMatch = lastPart.match(/\b\d{4,6}\b$/);
  const zip = zipMatch?.[0] || "";
  const districtPart = zip ? lastPart.replace(zip, "").trim() : lastPart;
  const district =
    SRI_LANKA_DISTRICTS.find(
      (item) => item.toLowerCase() === districtPart.toLowerCase(),
    ) || districtPart;

  return {
    street: parts.length > 2 ? parts.slice(0, -2).join(", ") : parts[0] || "",
    city: parts.length > 1 ? parts.at(-2) || "" : "",
    state: district,
    zip,
  };
}

function getCustomerFormPatch(customer: PreviousCustomer): Partial<FormState> {
  const fullName = String(
    customer.customerName ?? customer.name ?? "",
  ).trim();
  const nameParts = splitFullName(fullName);
  const address = String(
    customer.customerAddress ?? customer.address ?? "",
  ).trim();
  const parsedAddress = parseSavedAddress(address);

  return {
    ...nameParts,
    email: String(customer.emailAddress ?? customer.email ?? "").trim(),
    phone: String(customer.phoneNumber ?? customer.phone ?? "").trim(),
    ...parsedAddress,
  };
}

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

    // eslint-disable-next-line react-hooks/set-state-in-effect
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

  useEffect(() => {
    const email = form.email.trim();

    if (!emailRegex.test(email)) return;

    const controller = new AbortController();

    async function hydratePreviousCustomer() {
      try {
        const response = await fetch(
          apiV1Url(`/customers/by-email/${encodeURIComponent(email)}`),
          {
            cache: "no-store",
            signal: controller.signal,
          },
        );

        if (!response.ok) return;

        const payload = await response.json();
        const customer = payload?.data as PreviousCustomer | null;

        if (!customer) return;

        const patch = getCustomerFormPatch(customer);

        setForm((current) => ({
          ...current,
          firstName: patch.firstName || current.firstName,
          lastName: patch.lastName || current.lastName,
          email: patch.email || current.email,
          phone: patch.phone || current.phone,
          street: patch.street || current.street,
          city: patch.city || current.city,
          state: patch.state || current.state,
          zip: patch.zip || current.zip,
        }));
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }
      }
    }

    void hydratePreviousCustomer();

    return () => controller.abort();
  }, [form.email]);

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
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cod");

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
        if (form.phone.trim() === "") {
          return "Phone number is required";
        }

        if (!phoneRegex.test(form.phone.trim().replace(/\s/g, ""))) {
          return "Please enter a valid phone number";
        }

        return null;
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
      phoneRegex.test(form.phone.trim().replace(/\s/g, "")) &&
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
    const totalValue = subtotal + shipping;

    const pendingOrder: PendingOrder = {
      paymentMethod,
      amount: totalValue,
      backendPayload: {
        orderId: orderNumber,
        customerName,
        customerId: `CUST-${Date.now()}`,
        email: form.email,
        phone: form.phone,
        qty: totalQuantity,
        totalValue,
        shippingAddress,
        district: form.state,
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
      },
      orderRecord: {
        items,
        subtotal,
        shipping,
        orderNumber,
        createdAt: new Date().toISOString(),
        customerDetails: form,
      },
    };

    // Card payments must go through the payment gateway before the order is
    // finalized. Store the prepared order and redirect to the payment page.
    if (paymentMethod === "card") {
      savePendingOrder(pendingOrder);
      router.push("/payment");
      return;
    }

    // Cash on delivery: place the order immediately.
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      await submitOrder(pendingOrder);
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
        <div className="mb-8 flex flex-col gap-4">
          <h1 className="font-manrope text-4xl font-bold tracking-[-0.96px] text-[#0040A1] sm:text-5xl lg:text-[48px] lg:leading-[56px]">
            Secure Checkout
          </h1>
          <p className="text-[18px] leading-7 text-[#434652]">
            Review your curated frames and finalize your order.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.42fr_1fr]">
          <div className="space-y-8">
            <Card>
              <CardHeader className="gap-4 border-b-0 px-8 pb-0 pt-8">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F3F3F8]">
                  <UserRound className="h-5 w-5 text-[#0040A1]" />
                </span>
                <h2 className="font-manrope text-2xl font-semibold tracking-[-0.32px] text-[#1A1C1F] sm:text-[32px] sm:leading-10">
                  Customer Details
                </h2>
              </CardHeader>

              <CardContent className="space-y-5 px-8 pb-12 pt-8">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <Field label="First Name" error={getFieldError("firstName")}>
                    <Input
                      className={inputClass}
                      placeholder="John"
                      value={form.firstName}
                      onChange={(e) => setField("firstName", e.target.value)}
                      onBlur={() => markTouched("firstName")}
                    />
                  </Field>

                  <Field label="Last Name" error={getFieldError("lastName")}>
                    <Input
                      className={inputClass}
                      placeholder="Doe"
                      value={form.lastName}
                      onChange={(e) => setField("lastName", e.target.value)}
                      onBlur={() => markTouched("lastName")}
                    />
                  </Field>
                </div>

                <Field label="Email Address" error={getFieldError("email")}>
                  <Input
                    className={inputClass}
                    placeholder="john.doe@example.com"
                    value={form.email}
                    onChange={(e) => setField("email", e.target.value)}
                    onBlur={() => markTouched("email")}
                  />
                </Field>

                <Field label="Phone Number" error={getFieldError("phone")}>
                  <Input
                    className={inputClass}
                    placeholder="+94 7XXXXXXXX"
                    value={form.phone}
                    onChange={(e) => setField("phone", e.target.value)}
                    onBlur={() => markTouched("phone")}
                  />
                </Field>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="gap-4 border-b-0 px-8 pb-0 pt-8">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F3F3F8]">
                  <Truck className="h-5 w-5 text-[#0040A1]" />
                </span>
                <h2 className="font-manrope text-2xl font-semibold tracking-[-0.32px] text-[#1A1C1F] sm:text-[32px] sm:leading-10">
                  Delivery Details
                </h2>
              </CardHeader>

              <CardContent className="space-y-5 px-8 pb-12 pt-8">
                <Field label="Street Address" error={getFieldError("street")}>
                  <Input
                    className={inputClass}
                    placeholder="123 Gallery Street"
                    value={form.street}
                    onChange={(e) => setField("street", e.target.value)}
                    onBlur={() => markTouched("street")}
                  />
                </Field>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-[1.5fr_1fr_0.45fr]">
                  <Field label="City" error={getFieldError("city")}>
                    <Input
                      className={inputClass}
                      placeholder="Manhattan"
                      value={form.city}
                      onChange={(e) => setField("city", e.target.value)}
                      onBlur={() => markTouched("city")}
                    />
                  </Field>

                  <Field label="District" error={getFieldError("state")}>
                    <SearchableSelect
                      className={inputClass}
                      options={SRI_LANKA_DISTRICTS}
                      value={form.state}
                      onChange={(v) => setField("state", v)}
                      onBlur={() => markTouched("state")}
                      placeholder="Select district"
                      searchPlaceholder="Search district..."
                    />
                  </Field>

                  <Field label="ZIP" error={getFieldError("zip")}>
                    <Input
                      className={inputClass}
                      placeholder="10001"
                      value={form.zip}
                      onChange={(e) => setField("zip", e.target.value)}
                      onBlur={() => markTouched("zip")}
                    />
                  </Field>
                </div>

                <Field label="Delivery Notes (Optional)">
                  <Textarea
                    placeholder="Leave at front desk"
                    value={form.notes}
                    onChange={(e) => setField("notes", e.target.value)}
                  />
                </Field>
              </CardContent>
            </Card>
          </div>

          <OrderSummary
            items={items}
            subtotal={subtotal}
            shipping={shipping}
            shippingEntered={shippingDetailsEntered}
            onPlaceOrder={handlePlaceOrder}
            disabled={items.length === 0 || isSubmitting}
            paymentMethod={paymentMethod}
            onPaymentMethodChange={setPaymentMethod}
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

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string | null;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-[#434652]">
        {label}
      </label>
      {children}
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
