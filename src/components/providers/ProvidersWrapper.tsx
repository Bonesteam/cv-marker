"use client";

import React from "react";
import { I18nProvider } from "@/context/i18nContext";
import { AlertProvider } from "@/context/AlertContext";
import { AllOrdersProvider } from "@/context/AllOrdersContext";
import { CurrencyProvider } from "@/context/CurrencyContext";

type Props = {
  children: React.ReactNode;
};

// Single client-side wrapper that composes all context providers into one React boundary.
// This avoids multiple small client boundaries in the root layout which can cause
// provider state to be remounted on navigation. Keeping providers in one wrapper
// ensures the CurrencyProvider state persists across client-side route changes.
export default function ProvidersWrapper({ children }: Props) {
  return (
    <I18nProvider>
      <AlertProvider>
        <AllOrdersProvider>
          <CurrencyProvider>{children}</CurrencyProvider>
        </AllOrdersProvider>
      </AlertProvider>
    </I18nProvider>
  );
}
