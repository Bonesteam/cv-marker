"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "sonner";
import confetti from "canvas-confetti";
import { motion } from "framer-motion";
import Button from "@/components/ui/button/ButtonUI";
import { Loader2 } from "lucide-react";
import CheckoutLayout from "@/components/checkout/CheckoutLayout";

export default function CheckoutPage() {
  const router = useRouter();
  const [checkout, setCheckout] = useState<any>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem("checkoutData");
    if (!data) router.push("/pricing");
    else setCheckout(JSON.parse(data));
  }, [router]);

  if (!checkout) return null;

  const vatRate = 0.2;
  const subtotal = checkout.amount;
  const vatAmount = subtotal * vatRate;
  const total = subtotal + vatAmount;

  const validationSchema = Yup.object({
    cardNumber: Yup.string()
      .matches(/^\d{4}\s\d{4}\s\d{4}\s\d{4}$/, "Card number must be 16 digits")
      .required("Card number is required"),
    expiry: Yup.string()
      .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, "Format must be MM/YY")
      .required("Expiry date is required"),
    cvv: Yup.string()
      .matches(/^\d{3}$/, "CVV must be 3 digits")
      .required("CVV is required"),
    name: Yup.string().required("Cardholder name is required"),
    address: Yup.string().required("Billing address is required"),
    city: Yup.string().required("City is required"),
    postalCode: Yup.string().required("Postal code is required"),
  });

  const handleCardNumberFormat = (value: string) =>
    value
      .replace(/\D/g, "")
      .slice(0, 16)
      .replace(/(\d{4})(?=\d)/g, "$1 ")
      .trim();

  const handleExpiryFormat = (value: string) => {
    const v = value.replace(/\D/g, "").slice(0, 4);
    if (v.length >= 3) return `${v.slice(0, 2)}/${v.slice(2)}`;
    return v;
  };

  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    try {
      const res = await fetch("/api/cardserv/sale", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...checkout, card: values, tokens: checkout.tokens }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Payment creation failed");

      // 🔁 Якщо є redirect URL → одразу редиректимо на 3DS
      if (data?.data?.redirectUrl) {
        window.location.href = data.data.redirectUrl;
        return;
      }

      // 🔁 Якщо redirect URL ще не згенерований → чекаємо
      let redirectUrl = null;
      let attempts = 0;

      while (!redirectUrl && attempts < 5) {
        await new Promise((resolve) => setTimeout(resolve, 2000)); // чекати 2 сек
        const check = await fetch("/api/cardserv/status", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderMerchantId: data.data.orderMerchantId }),
        });
        const status = await check.json();
        redirectUrl = status.data?.redirectUrl;
        attempts++;
      }

      if (redirectUrl) {
        window.location.href = redirectUrl;
        return;
      }

      // Якщо навіть після кількох спроб redirect не з’явився
      toast.success("Order created successfully!");
      setSuccess(true);
      confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
      setTimeout(() => router.push("/my-orders"), 4000);
    } catch (err: any) {
      toast.error(err.message || "Payment failed");
    } finally {
      setSubmitting(false);
    }
  };

  const form = (
  <Formik
    initialValues={{
      cardNumber: "",
      expiry: "",
      cvv: "",
      name: "",
      address: "",
      city: "",
      postalCode: "",
    }}
    validationSchema={validationSchema}
    onSubmit={handleSubmit}
  >
    {({ values, setFieldValue, isSubmitting }) => (
      <Form className="space-y-4">
        <div>
          <Field
            name="cardNumber"
            placeholder="Card number"
            value={values.cardNumber}
            onChange={(e: any) =>
              setFieldValue("cardNumber", handleCardNumberFormat(e.target.value))
            }
            className="border border-slate-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-indigo-500"
          />
          <ErrorMessage name="cardNumber" component="div" className="text-red-500 text-xs mt-1" />
        </div>

        <div className="flex gap-3">
          <div className="w-1/2">
            <Field
              name="expiry"
              placeholder="MM/YY"
              value={values.expiry}
              onChange={(e: any) => setFieldValue("expiry", handleExpiryFormat(e.target.value))}
              className="border border-slate-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-indigo-500"
            />
            <ErrorMessage name="expiry" component="div" className="text-red-500 text-xs mt-1" />
          </div>
          <div className="w-1/2">
            <Field
              name="cvv"
              placeholder="CVV"
              value={values.cvv}
              onChange={(e: any) => setFieldValue("cvv", e.target.value.replace(/\D/g, "").slice(0, 3))}
              className="border border-slate-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-indigo-500"
            />
            <ErrorMessage name="cvv" component="div" className="text-red-500 text-xs mt-1" />
          </div>
        </div>

        <Field name="name" placeholder="Cardholder name" className="border border-slate-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-indigo-500" />
        <ErrorMessage name="name" component="div" className="text-red-500 text-xs mt-1" />

        <Field name="address" placeholder="Billing address" className="border border-slate-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-indigo-500" />
        <ErrorMessage name="address" component="div" className="text-red-500 text-xs mt-1" />

        <div className="flex gap-3">
          <div className="w-2/3">
            <Field name="city" placeholder="City" className="border border-slate-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-indigo-500" />
            <ErrorMessage name="city" component="div" className="text-red-500 text-xs mt-1" />
          </div>
          <div className="w-1/3">
            <Field name="postalCode" placeholder="Postal code" className="border border-slate-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-indigo-500" />
            <ErrorMessage name="postalCode" component="div" className="text-red-500 text-xs mt-1" />
          </div>
        </div>

        <Button
          size="lg"
          type="submit"
          disabled={isSubmitting}
          fullWidth
          sx={{ mt: "1.5rem", display: "flex", alignItems: "center", justifyContent: "center", gap: 1 }}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" /> Processing...
            </>
          ) : (
            <>Pay {total.toFixed(2)} {checkout.currency}</>
          )}
        </Button>
      </Form>
    )}
  </Formik>
);

  return <CheckoutLayout checkout={checkout} success={success} subtotal={subtotal} vatAmount={vatAmount} total={total} form={form} />;
}
