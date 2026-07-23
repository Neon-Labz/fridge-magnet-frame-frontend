"use client";

import { Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { useWebsiteAuthSession } from "@/hooks/useWebsiteAuthSession";
import styles from "./OrderSummary.module.css";

export default function OrderSummary({
  subtotal,
  quantity,
}: {
  subtotal: number;
  quantity: number;
}) {
  const router = useRouter();
  const { isAuthenticated } = useWebsiteAuthSession();

  const handleCheckout = () => {
    try {
      router.push(
        isAuthenticated
          ? "/checkout"
          : `/login?redirect=${encodeURIComponent("/checkout")}`,
      );
    } catch (err) {
      console.error("Navigation to /checkout failed", err);
    }
  };

  return (
    <aside className={styles.orderSummary}>
      <h2 className={styles.heading}>Order Summary</h2>

      <div className={styles.rows}>
        <div className={styles.row}>
          <span>Subtotal</span>
          <span>Rs. {subtotal.toFixed(2)}</span>
        </div>

        <div className={styles.row}>
          <span>Quantity</span>
          <span>{quantity}</span>
        </div>
      </div>

      <div className={styles.divider} />

      <div className={styles.totalRow}>
        <span>Total</span>
        <span className={styles.total}>Rs. {subtotal.toFixed(2)}</span>
      </div>

      <div className={styles.checkoutWrapper}>
        <button
          type="button"
          className={styles.checkoutBtn}
          onClick={handleCheckout}
        >
          <span className={styles.checkoutText}>Check Out</span>
        </button>
      </div>

      
    </aside>
  );
}