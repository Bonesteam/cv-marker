"use client";

import React from "react";
import { motion } from "framer-motion";
import styles from "./CheckoutLayout.module.scss";

type Props = {
  checkout: any;
  success: boolean;
  subtotal: number;
  vatAmount: number;
  total: number;
  form: React.ReactNode;
};

export default function CheckoutLayout({ checkout, success, subtotal, vatAmount, total, form }: Props) {
  return (
    <div className={styles.root}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className={styles.card}
      >
        <div className={styles.header}>
          <h1 className={styles.h1}>{success ? "Thank You!" : "Checkout"}</h1>
          {!success && <p className={styles.smallText}>Secure Payment</p>}
        </div>

        <div className={styles.content}>
          {success ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className={styles.successCenter}
            >
              <h2 className={styles.h2} style={{ color: '#4f46e5', marginBottom: '0.75rem' }}>
                Your order has been created successfully!
              </h2>
              <p className={styles.smallTextSuccess}>
                Tokens will be credited automatically once payment is confirmed. Track your order in your dashboard.
              </p>
            </motion.div>
          ) : (
            <div className={styles.grid}>
              <div>
                <h2 className={styles.summaryTitle}>Order Summary</h2>
                <div className={styles.summary}>
                  <div className={styles.summaryRow}>
                    <div>
                      <p style={{ fontWeight: 600, color: '#0f172a' }}>
                        {checkout.planId ? checkout.planId.replace('price_', '') : 'Custom top-up'}
                      </p>
                      <p className={styles.muted} style={{ marginTop: '0.25rem' }}>
                        {checkout.description}
                      </p>
                    </div>
                    <p style={{ fontWeight: 700, color: '#0f172a' }}>
                      {checkout.amount} {checkout.currency}
                    </p>
                  </div>

                  <div className={styles.divider} />

                  <div className={styles.summaryRow}>
                    <span className={styles.muted}>Subtotal</span>
                    <span style={{ fontWeight: 600 }}>{subtotal.toFixed(2)} {checkout.currency}</span>
                  </div>
                  <div className={styles.summaryRow}>
                    <span className={styles.muted}>VAT (20%)</span>
                    <span style={{ fontWeight: 600 }}>{vatAmount.toFixed(2)} {checkout.currency}</span>
                  </div>
                  <div className={styles.summaryRow} style={{ marginTop: '0.75rem', borderTop: '1px solid #e6eef8', paddingTop: '0.75rem' }}>
                    <span style={{ fontWeight: 700 }}>Total</span>
                    <span style={{ fontWeight: 700 }}>{total.toFixed(2)} {checkout.currency}</span>
                  </div>
                </div>

                <div style={{ marginTop: '1rem', color: '#475569', fontSize: '0.95rem' }}>
                  <p>You are purchasing <strong>{checkout.description}</strong>. Tokens credited after approval.</p>
                  <p style={{ marginTop: '0.5rem' }}>Invoice sent to <strong>{checkout.email}</strong>.</p>
                </div>
              </div>

              <div className={styles.rightColumn}>
                <div className="formContainer">
                  <h2 className="formTitle">Payment Details</h2>
                  {form}
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
