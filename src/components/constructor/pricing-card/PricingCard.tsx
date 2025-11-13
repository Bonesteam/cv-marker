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
  buttonLink,
  badgeTop,
  badgeBottom,
  index = 0,
}) => {
  const { showAlert } = useAlert();
  const user = useUser();
  const { currency, setCurrency, sign, convertFromGBP, convertToGBP } = useCurrency();
  // allow user to enter desired tokens for custom top-up
  const [customTokens, setCustomTokens] = useState<number>(100);

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
      // Prepare checkout payload and redirect to /checkout where payment flow runs
      let checkoutData: any = {};

      if (isCustom) {
        // User specified tokens to buy
        const tokensToBuy = Math.max(1, Math.floor(customTokens));
        const gbpEquivalent = tokensToBuy / TOKENS_PER_GBP; // tokens -> GBP
        const amountInCurrency = convertFromGBP(gbpEquivalent);

        checkoutData = {
          amount: Number(amountInCurrency.toFixed(2)),
          currency,
          tokens: tokensToBuy,
          description: `${tokensToBuy} tokens (custom top-up)`,
          email: user?.email ?? "",
          planId: undefined,
        };
      } else {
        // Standard plan — tokens are provided by the plan
        const amountInCurrency = convertedPrice; // already converted from GBP

        checkoutData = {
          amount: Number(amountInCurrency.toFixed(2)),
          currency,
          tokens: tokens,
          description: title,
          email: user?.email ?? "",
          planId: buttonLink ?? undefined,
        };
      }

      // Store to localStorage and navigate to checkout page
      try {
        localStorage.setItem("checkoutData", JSON.stringify(checkoutData));
      } catch (e) {
        console.warn("Unable to persist checkoutData to localStorage", e);
      }

      // Redirect to checkout
      window.location.href = "/checkout";
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
              value={customTokens}
              onChange={(e) => setCustomTokens(Number(e.target.value))}
              slotProps={{ input: { min: 1, step: 1 } }}
              placeholder="Enter tokens"
              size="md"
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
            {(() => {
              const gbp = customTokens / TOKENS_PER_GBP;
              return convertFromGBP(gbp).toFixed(2);
            })()} ≈ {Math.floor(customTokens)} tokens
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
