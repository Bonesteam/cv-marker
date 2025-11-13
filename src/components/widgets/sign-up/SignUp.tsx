"use client";

import { Formik, FormikHelpers } from "formik";
import { useAlert } from "@/context/AlertContext";
import { useRouter } from "next/navigation";
import {
    signUpValidation,
    signUpInitialValues,
    signUpOnSubmit
} from "@/validationSchemas/sign-up/schema";
import FormUI from "@/components/ui/form/FormUI";
import { Field } from "formik";

export type SignUpValues = { name: string; email: string; password: string; termsAccepted: boolean };

export default function SignUpPage() {
    const { showAlert } = useAlert();
    const router = useRouter();

    return (
        <Formik<SignUpValues>
            initialValues={signUpInitialValues}
            validate={signUpValidation}
            onSubmit={async (values, { setSubmitting }: FormikHelpers<SignUpValues>) =>
                signUpOnSubmit(values, { setSubmitting }, showAlert, router)
            }
        >
            {({ isSubmitting }) => (
                <FormUI
                    title="Sign Up"
                    description="Create your account"
                    isSubmitting={isSubmitting}
                    fields={[
                        { name: "name", type: "text", placeholder: "Name" },
                        { name: "email", type: "email", placeholder: "Email" },
                        { name: "password", type: "password", placeholder: "Password" }
                    ]}
                    extra={(
                        <label style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 12 }}>
                            <Field type="checkbox" name="termsAccepted" />
                            <span style={{ fontSize: 14, color: '#475569' }}>
                                I agree to the <a href="/terms-and-conditions" target="_blank" rel="noopener noreferrer">Terms &amp; Conditions</a>
                            </span>
                        </label>
                    )}
                    submitLabel="Sign Up"
                />
            )}
        </Formik>
    );
}