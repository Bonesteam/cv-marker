"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export type Currency = "GBP" | "EUR" | "USD";

interface CurrencyContextType {
    currency: Currency;
    setCurrency: (val: Currency) => void;
    sign: string;
    rateToGBP: number;
    convertFromGBP: (gbp: number) => number;
    convertToGBP: (val: number) => number;
}

const CURRENCY_SIGNS: Record<Currency, string> = {
    GBP: "£",
    EUR: "€",
    USD: "$",
};

// Rates are expressed as: 1 GBP = X <currency>
// Update these values periodically from a reliable FX source if needed.
const RATES: Record<Currency, number> = {
    GBP: 1,
    EUR: 1.17, // 1 GBP = 1.17 EUR
    USD: 1.27, // 1 GBP = 1.27 USD (approx)
};

const CurrencyContext = createContext<CurrencyContextType>({
    currency: "GBP",
    setCurrency: () => {},
    sign: "£",
    rateToGBP: 1,
    convertFromGBP: (v) => v,
    convertToGBP: (v) => v,
});

export const useCurrency = () => useContext(CurrencyContext);

export const CurrencyProvider = ({ children }: { children: ReactNode }) => {
    const [currency, setCurrency] = useState<Currency>("GBP");
    const rateToGBP = RATES[currency];
    const sign = CURRENCY_SIGNS[currency];

    return (
        <CurrencyContext.Provider
            value={{
                currency,
                setCurrency,
                sign,
                rateToGBP,
                convertFromGBP: (gbp) => gbp * rateToGBP,
                convertToGBP: (val) => val / rateToGBP,
            }}
        >
            {children}
        </CurrencyContext.Provider>
    );
};
