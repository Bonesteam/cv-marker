"use client";
import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { Input, Textarea } from "@mui/joy";
import ButtonUI from "@/components/ui/button/ButtonUI";
import Confetti from "react-confetti";
import styles from "./ContactForm.module.scss";
import { validationSchema, initialValues, sendContactRequest } from "./schema";
import { useAlert } from "@/context/AlertContext";
import { motion } from "framer-motion";

const ContactUsForm = () => {
  const { showAlert } = useAlert();
  const [showConfetti, setShowConfetti] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = async (
    values: typeof initialValues,
    { setSubmitting, resetForm }: { setSubmitting: (isSubmitting: boolean) => void; resetForm: () => void }
  ) => {
    try {
      await sendContactRequest(values);
      resetForm();
      setSuccessMsg("✅ Thanks! Your message has been sent.");
      setShowConfetti(true);
      showAlert("Success", "Your request has been sent!", "success");
      setTimeout(() => setShowConfetti(false), 6000);
    } catch {
      showAlert("Error", "Failed to send. Please try again.", "error");
    }
    setSubmitting(false);
  };

  return (
    <motion.div
      className={styles.contactWrapper}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
    >
      {showConfetti && <Confetti />}

      <motion.div
        className={styles.contactCard}
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className={styles.paperHeader}>
          <h2>📄 Contact Us</h2>
          <p>
            Got a question or feedback? We usually reply within{" "}
            <strong>24 hours</strong>.
          </p>
        </div>

        {successMsg ? (
          <div className={styles.successMsg}>{successMsg}</div>
        ) : (
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form className={styles.form}>
                <div className={styles.row}>
                  <Field name="name">
                    {({ field }: { field: React.InputHTMLAttributes<HTMLInputElement> }) => (
                      <Input
                        {...field}
                        placeholder="First Name"
                        variant="soft"
                        color={touched.name && errors.name ? "danger" : "neutral"}
                        fullWidth
                      />
                    )}
                  </Field>
                  <Field name="secondName">
                    {({ field }: { field: React.InputHTMLAttributes<HTMLInputElement> }) => (
                      <Input
                        {...field}
                        placeholder="Last Name"
                        variant="soft"
                        color={touched.secondName && errors.secondName ? "danger" : "neutral"}
                        fullWidth
                      />
                    )}
                  </Field>
                </div>

                <Field name="email">
                  {({ field }: { field: React.InputHTMLAttributes<HTMLInputElement> }) => (
                    <Input
                      {...field}
                      type="email"
                      placeholder="Email"
                      variant="soft"
                      color={touched.email && errors.email ? "danger" : "neutral"}
                      fullWidth
                    />
                  )}
                </Field>

                <Field name="phone">
                  {({ field }: { field: React.InputHTMLAttributes<HTMLInputElement> }) => (
                    <Input
                      {...field}
                      type="tel"
                      placeholder="Phone Number"
                      variant="soft"
                      color={touched.phone && errors.phone ? "danger" : "neutral"}
                      fullWidth
                    />
                  )}
                </Field>

                <Field name="message">
                  {({ field }: { field: React.TextareaHTMLAttributes<HTMLTextAreaElement> }) => (
                    <Textarea
                      {...field}
                      placeholder="Your message..."
                      minRows={5}
                      variant="soft"
                      sx={{ borderRadius: "14px" }}
                    />
                  )}
                </Field>

                <ButtonUI
                  type="submit"
                  fullWidth
                  loading={isSubmitting}
                  text="Send Message"
                  color="secondary"
                  textColor="backgroundLight"
                  sx={{
                    mt: 2,
                    fontSize: "1.05rem",
                    borderRadius: "14px",
                    background:
                      "linear-gradient(90deg, #0f172a 0%, #1e293b 100%)",
                    color: "#f8fafc",
                    "&:hover": { opacity: 0.9 },
                  }}
                />
              </Form>
            )}
          </Formik>
        )}
      </motion.div>
    </motion.div>
  );
};

export default ContactUsForm;
