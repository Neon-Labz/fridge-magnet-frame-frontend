"use client";

import { Lock } from "lucide-react";
import styles from "./OrderSummary.module.css";

export default function OrderSummary({
  subtotal,
  quantity,
}: {
  subtotal: number;
  quantity: number;
}) {
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

      <button className={styles.button}>Checkout</button>

      <div className={styles.secure}>
        <Lock size={14} />
        Secure 256-bit SSL checkout
      </div>
    </aside>
  );
}