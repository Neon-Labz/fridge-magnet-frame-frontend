"use client";

import { Lock } from 'lucide-react';
import { useRouter } from 'next/navigation';
import styles from "./OrderSummary.module.css";

export default function OrderSummary({
  subtotal,
  quantity,
}: {
  subtotal: number;
  quantity: number;
}) {
  const router = useRouter();

  const handleCheckout = () => {
    router.push('/checkout');
  };

  return (
    <aside className={styles.orderSummary}>
      <div className={styles.headingWrapper}>
        <h2 className={styles.heading}>Order Summary</h2>
      </div>

      <div className={styles.rows}>
        <div className={styles.row}>
          <div className={styles.label}>Subtotal</div>
          <div className={styles.value}>Rs{subtotal.toFixed(2)}</div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>Quantity</div>
          <div className={styles.value}>{quantity}</div>
        </div>
      </div>

      <div className={styles.dividerContainer} />

      <div className={styles.totalRow}>
        <div className="">Total</div>
        <div className={`${styles.totalValue}`}>Rs{subtotal.toFixed(2)}</div>
      </div>

      <div className={styles.checkoutWrapper}>
        <button type="button" className={styles.checkoutBtn} onClick={handleCheckout}>
          <span className={styles.checkoutText}>Check Out</span>
        </button>
      </div>

      <div className={styles.infoContainer}>
        <Lock className={styles.icon} size={16} strokeWidth={2.5} />
        <div className={styles.infoText}>Secure 256-bit SSL encrypted checkout</div>
      </div>

      <p className={styles.secureNote} />
    </aside>
  );
}
