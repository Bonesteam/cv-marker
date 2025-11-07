"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import styles from "./PricingCard.module.scss";
import ButtonUI from "@/components/ui/button/ButtonUI";
import { useAlert } from "@/context/AlertContext";
import { useUser } from "@/context/UserContext";
import Input from "@mui/joy/Input";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import { useCurrency } from "@/context/CurrencyContext";

const TOKENS_PER_GBP = 100;

interface PricingCardProps {
  variant?: "starter" | "pro" | "premium" | "custom";
  title: string;
  price: string;
  tokens: number;
  description: string;
  features: string[];
  buttonText: string;
  buttonLink?: string;
  badgeTop?: string;
  badgeBottom?: string;
  index?: number;
}

const PricingCard: React.FC<PricingCardProps> = ({
  variant = "starter",
  title,
  price,
  tokens,
  description,
  features,
  buttonText,
  badgeTop,
  badgeBottom,
  index = 0,
}) => {
  const { showAlert } = useAlert();
  const user = useUser();
  const { currency, setCurrency, sign, convertFromGBP, convertToGBP } = useCurrency();
  const [customAmount, setCustomAmount] = useState<number>(20);

  const isCustom = price === "dynamic";
  const basePriceGBP = useMemo(
    () => (isCustom ? 0 : parseFloat(price.replace(/[^0-9.]/g, ""))),
    [price, isCustom]
  );
  const convertedPrice = useMemo(
    () => (isCustom ? 0 : convertFromGBP(basePriceGBP)),
    [basePriceGBP, convertFromGBP, isCustom]
  );

  const handleBuy = async () => {
    if (!user) {
      showAlert("Please sign up", "You need to be signed in to purchase", "info");
      setTimeout(() => (window.location.href = "/sign-up"), 1200);
      return;
    }

    try {
      let body: any;
      if (isCustom) {
        const gbpEquivalent = convertToGBP(customAmount);
        if (gbpEquivalent < 0.01) {
          showAlert("Minimum is 0.01", "Enter at least 0.01 GBP equivalent", "warning");
          return;
        }
        body = { currency, amount: customAmount };
      } else {
        body = { amount: tokens };
      }

      const res = await fetch("/api/user/buy-tokens", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();

      showAlert(
        "Success!",
        isCustom
          ? `You paid ${sign}${customAmount.toFixed(2)} ${currency} (≈ ${Math.floor(
              convertToGBP(customAmount) * TOKENS_PER_GBP
            )} tokens)`
          : `You purchased ${tokens} tokens.`,
        "success"
      );
      console.log("Updated user:", data.user);
    } catch (err: any) {
      showAlert("Error", err.message || "Something went wrong", "error");
    }
  };

  return (
    <motion.div
      className={`${styles.card} ${styles[variant]}`}
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.015, y: -3 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: index * 0.08 }}
    >
      {badgeTop && <span className={styles.badgeTop}>{badgeTop}</span>}

      <h3 className={styles.title}>{title}</h3>

      {isCustom ? (
        <>
          <div className={styles.customInput}>
            <Input
              type="number"
              value={customAmount}
              onChange={(e) => setCustomAmount(Number(e.target.value))}
              slotProps={{ input: { min: 0.01, step: 0.01 } }}
              placeholder="Enter amount"
              size="md"
              startDecorator={sign}
            />
            <Select
              value={currency}
              onChange={(_, val) => val && setCurrency(val as "GBP" | "EUR" | "USD")}
              size="md"
              sx={{ minWidth: 90 }}
            >
              <Option value="GBP">£ GBP</Option>
              <Option value="EUR">€ EUR</Option>
              <Option value="USD">$ USD</Option>
            </Select>
          </div>
          <p className={styles.dynamicPrice}>
            {sign}
            {customAmount.toFixed(2)} ≈{" "}
            {Math.floor(convertToGBP(customAmount) * TOKENS_PER_GBP)} tokens
          </p>
        </>
      ) : (
        <p className={styles.price}>
          {sign}
          {convertedPrice.toFixed(2)}{" "}
          <span className={styles.tokens}>/ {tokens} tokens</span>
        </p>
      )}

      <p className={styles.description}>{description}</p>

      <ul className={styles.features}>
        {features.map((f, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.25, delay: i * 0.04 }}
          >
            {f}
          </motion.li>
        ))}
      </ul>

      <ButtonUI fullWidth onClick={handleBuy}>
        {user ? buttonText : "Sign Up to Buy"}
      </ButtonUI>

      {badgeBottom && <span className={styles.badgeBottom}>{badgeBottom}</span>}
    </motion.div>
  );
};

export default PricingCard;
