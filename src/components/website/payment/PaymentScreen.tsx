"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { CreditCard, Lock, ShieldCheck } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { useFrameStore } from "@/store/frameStore";
import {
  PendingOrder,
  clearPendingOrder,
  getPendingOrder,
  submitOrder,
} from "@/services/orderService";

const cardNumberRegex = /^\d{16}$/;
const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
const cvvRegex = /^\d{3,4}$/;

export default function PaymentScreen() {
  const router = useRouter();
  const { clearCart } = useCart();
  const setSelectedFrame = useFrameStore((state) => state.setSelectedFrame);

  const [pendingOrder, setPendingOrder] = useState<PendingOrder | null>(null);
  const [loaded, setLoaded] = useState(false);

  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const order = getPendingOrder();
    if (!order || order.paymentMethod !== "card") {
      router.replace("/checkout");
      return;
    }
    setPendingOrder(order);
    setLoaded(true);
  }, [router]);

  const handleCardNumberChange = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 16);
    const formatted = digits.replace(/(\d{4})(?=\d)/g, "$1 ");
    setCardNumber(formatted);
  };

  const handleExpiryChange = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 4);
    const formatted =
      digits.length >= 3 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
    setExpiry(formatted);
  };

  const isFormValid = useMemo(() => {
    return (
      cardName.trim() !== "" &&
      cardNumberRegex.test(cardNumber.replace(/\s/g, "")) &&
      expiryRegex.test(expiry.trim()) &&
      cvvRegex.test(cvv.trim())
    );
  }, [cardName, cardNumber, expiry, cvv]);

  const handlePay = async () => {
    if (!pendingOrder || !isFormValid) return;

    setIsProcessing(true);
    setError(null);

    try {
      // Simulate the payment gateway authorizing the card before the
      // order is finalized on the backend.
      await new Promise((resolve) => setTimeout(resolve, 1200));

      await submitOrder(pendingOrder);

      clearPendingOrder();
      clearCart();
      setSelectedFrame("black-frame");
      router.push("/order-confirmation");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Payment failed. Please try again."
      );
      setIsProcessing(false);
    }
  };

  const handleCancel = () => {
    clearPendingOrder();
    router.push("/checkout");
  };

  if (!loaded || !pendingOrder) {
    return (
      <div className="min-h-screen bg-[#F9F9FE] flex items-center justify-center">
        <p className="text-[#434652]">Loading payment gateway...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9F9FE] py-25">
      <div className="mx-auto max-w-[640px] px-4 sm:px-6">
        <div className="mb-8 text-center">
          <h1 className="font-manrope text-3xl font-bold tracking-[-0.02em] text-[#0040A1] sm:text-4xl">
            Secure Payment
          </h1>
          <p className="mt-2 text-[#434652]">
            Complete your payment to finalize order #{pendingOrder.backendPayload.orderId}.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CreditCard className="h-5 w-5 text-[#0040A1]" />
            <h2 className="text-xl font-semibold">Card Details</h2>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="flex items-center justify-between rounded-lg bg-[#F3F3F8] px-4 py-3">
              <span className="text-sm font-medium text-[#434652]">
                Amount to pay
              </span>
              <span className="text-lg font-bold text-[#0040A1]">
                Rs{pendingOrder.amount.toLocaleString(undefined, {
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>

            <div>
              <Input
                placeholder="Name on Card"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
              />
            </div>

            <div>
              <Input
                placeholder="Card Number (16 digits)"
                inputMode="numeric"
                maxLength={19}
                value={cardNumber}
                onChange={(e) => handleCardNumberChange(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Input
                placeholder="MM/YY"
                inputMode="numeric"
                maxLength={5}
                value={expiry}
                onChange={(e) => handleExpiryChange(e.target.value)}
              />
              <Input
                placeholder="CVV"
                inputMode="numeric"
                maxLength={4}
                value={cvv}
                onChange={(e) => setCvv(e.target.value.replace(/[^\d]/g, ""))}
              />
            </div>

            {error && (
              <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                {error}
              </p>
            )}

            <Button
              type="button"
              className={`w-full text-white font-bold text-base py-3 rounded flex items-center justify-center gap-2 ${
                !isFormValid || isProcessing
                  ? "bg-[#D3D3D3] cursor-not-allowed opacity-60"
                  : "bg-[#FF3B30] hover:bg-[#E61D11]"
              }`}
              onClick={handlePay}
              disabled={!isFormValid || isProcessing}
            >
              <Lock className="h-4 w-4" />
              {isProcessing
                ? "Processing Payment..."
                : `Pay Rs${pendingOrder.amount.toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                  })}`}
            </Button>

            <button
              type="button"
              onClick={handleCancel}
              disabled={isProcessing}
              className="w-full text-sm font-medium text-[#434652] underline disabled:opacity-50"
            >
              Cancel and return to checkout
            </button>

            <div className="flex items-center justify-center gap-1 text-xs text-[#434652]">
              <ShieldCheck className="h-3 w-3" />
              <span>Your payment is encrypted and secure</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
