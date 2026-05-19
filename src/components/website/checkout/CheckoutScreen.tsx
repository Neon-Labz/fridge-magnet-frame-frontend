"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import OrderSummary, { SummaryItem } from "./OrderSummary";
import { clearCart, getCartItems, saveOrder } from "@/services/cartService";
import { useFrameStore } from "@/store/frameStore";
import { Truck, UserRound } from "lucide-react";

const generateOrderNumber = () => {
  return `MAG-${Math.floor(10000 + Math.random() * 90000)}`;
};

export default function CheckoutScreen() {
  const router = useRouter();
  const { setSelectedFrame } = useFrameStore();
  const [items, setItems] = useState<SummaryItem[]>([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    deliveryNotes: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const stored = getCartItems();
    setItems(stored);
  }, []);

  const subtotal = useMemo(
    () => items.reduce((total, item) => total + item.price * item.quantity, 0),
    [items],
  );

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }
    if (!formData.street.trim()) {
      newErrors.street = "Street address is required";
    }
    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }
    if (!formData.state.trim()) {
      newErrors.state = "State/Province is required";
    }
    if (!formData.zip.trim()) {
      newErrors.zip = "ZIP code is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handlePlaceOrder = () => {
    if (items.length === 0) {
      return;
    }

    if (!validateForm()) {
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
                    <label className="text-xs sm:text-sm font-semibold text-[#434652]">First Name</label>
                    <Input 
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="John" 
                      className={`h-[44px] sm:h-[49px] border rounded-[8px] px-3 py-[12px] sm:py-[14px] text-sm ${
                        errors.firstName ? "border-red-500 focus:border-red-500" : "border-[#C3C6D4]"
                      }`}
                    />
                    {errors.firstName && (
                      <p className="text-xs sm:text-sm text-red-500 font-medium">{errors.firstName}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs sm:text-sm font-semibold text-[#434652]">Last Name</label>
                    <Input 
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Doe" 
                      className={`h-[44px] sm:h-[49px] border rounded-[8px] px-3 py-[12px] sm:py-[14px] text-sm ${
                        errors.lastName ? "border-red-500 focus:border-red-500" : "border-[#C3C6D4]"
                      }`}
                    />
                    {errors.lastName && (
                      <p className="text-xs sm:text-sm text-red-500 font-medium">{errors.lastName}</p>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs sm:text-sm font-semibold text-[#434652]">Email Address</label>
                  <Input 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    type="email"
                    placeholder="john.doe@example.com" 
                    className={`h-[44px] sm:h-[49px] border rounded-[8px] px-3 py-[12px] sm:py-[14px] text-sm w-full ${
                      errors.email ? "border-red-500 focus:border-red-500" : "border-[#C3C6D4]"
                    }`}
                  />
                  {errors.email && (
                    <p className="text-xs sm:text-sm text-red-500 font-medium">{errors.email}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-xs sm:text-sm font-semibold text-[#434652]">Phone Number</label>
                  <Input 
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+1 (555) 000-0000" 
                    className={`h-[44px] sm:h-[49px] border rounded-[8px] px-3 py-[12px] sm:py-[14px] text-sm w-full ${
                      errors.phone ? "border-red-500 focus:border-red-500" : "border-[#C3C6D4]"
                    }`}
                  />
                  {errors.phone && (
                    <p className="text-xs sm:text-sm text-red-500 font-medium">{errors.phone}</p>
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
                  <label className="text-xs sm:text-sm font-semibold text-[#434652]">Street Address</label>
                  <Input 
                    name="street"
                    value={formData.street}
                    onChange={handleInputChange}
                    placeholder="123 Gallery Street" 
                    className={`h-[44px] sm:h-[49px] border rounded-[8px] px-3 py-[12px] sm:py-[14px] text-sm w-full ${
                      errors.street ? "border-red-500 focus:border-red-500" : "border-[#C3C6D4]"
                    }`}
                  />
                  {errors.street && (
                    <p className="text-xs sm:text-sm text-red-500 font-medium">{errors.street}</p>
                  )}
                </div>
                <div className="grid gap-4 sm:gap-5 md:grid-cols-[1fr_1fr_100px]">
                  <div className="space-y-2">
                    <label className="text-xs sm:text-sm font-semibold text-[#434652]">City</label>
                    <Input 
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="Manhattan" 
                      className={`h-[44px] sm:h-[49px] border rounded-[8px] px-3 py-[12px] sm:py-[14px] text-sm ${
                        errors.city ? "border-red-500 focus:border-red-500" : "border-[#C3C6D4]"
                      }`}
                    />
                    {errors.city && (
                      <p className="text-xs sm:text-sm text-red-500 font-medium">{errors.city}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs sm:text-sm font-semibold text-[#434652]">State / Province</label>
                    <Input 
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      placeholder="Sri Lanka" 
                      className={`h-[44px] sm:h-[49px] border rounded-[8px] px-3 py-[12px] sm:py-[14px] text-sm ${
                        errors.state ? "border-red-500 focus:border-red-500" : "border-[#C3C6D4]"
                      }`}
                    />
                    {errors.state && (
                      <p className="text-xs sm:text-sm text-red-500 font-medium">{errors.state}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs sm:text-sm font-semibold text-[#434652]">ZIP</label>
                    <Input 
                      name="zip"
                      value={formData.zip}
                      onChange={handleInputChange}
                      placeholder="10001" 
                      className={`h-[44px] sm:h-[49px] border rounded-[8px] px-3 py-[12px] sm:py-[14px] text-sm ${
                        errors.zip ? "border-red-500 focus:border-red-500" : "border-[#C3C6D4]"
                      }`}
                    />
                    {errors.zip && (
                      <p className="text-xs sm:text-sm text-red-500 font-medium">{errors.zip}</p>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs sm:text-sm font-semibold text-[#434652]">Delivery Notes (Optional)</label>
                  <Textarea 
                    name="deliveryNotes"
                    value={formData.deliveryNotes}
                    onChange={handleInputChange}
                    placeholder="Leave at front desk" 
                    className="min-h-[88px] sm:min-h-[98px] border border-[#C3C6D4] rounded-[8px] px-3 py-[12px] text-sm resize-none"
                  />
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
    </div>
  );
}