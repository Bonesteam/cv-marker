"use client";

import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { formSchemaCV } from "./formSchemaCV";
import Textarea from "@mui/joy/Textarea";
import Input from "@mui/joy/Input";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import ButtonUI from "@/components/ui/button/ButtonUI";
import styles from "./ManualGenerator.module.scss";
import { useAlert } from "@/context/AlertContext";
import { mockCVData } from "./MOC";
import { useUser } from "@/context/UserContext";

type ReviewType = "instant" | "manager" | "hr_plus" | "priority" | "expert";

// Expanded set of additional services (more options, varied costs)
const EXTRA_OPTIONS = [
    { name: "coverLetter", label: "Cover Letter", cost: 12 },
    { name: "linkedin", label: "LinkedIn Summary", cost: 18 },
    { name: "keywords", label: "Keyword Optimization", cost: 15 },
    { name: "atsCheck", label: "ATS Compatibility Report", cost: 14 },
    { name: "jobAdaptation", label: "Adapt CV to Job Description", cost: 25 },
    { name: "achievements", label: "Achievements Booster", cost: 12 },
    { name: "skillsGap", label: "Skills Gap Analysis", cost: 16 },
    { name: "portfolioLayout", label: "Portfolio Layout Review", cost: 20 },
    { name: "personalBranding", label: "Personal Branding Notes", cost: 10 },
    { name: "prioritySupport", label: "Priority Email Support", cost: 8 },
    { name: "multiLocale", label: "Multi-language CV (translation)", cost: 30 },
    { name: "jobMatch", label: "Job Matching & Keywords", cost: 22 },
    { name: "customFont", label: "Custom Font Embedding", cost: 5 },
    { name: "customColor", label: "Custom Color Theme", cost: 5 },
];

const BASE_COST: Record<ReviewType, number> = {
    instant: 25,
    manager: 60,
    hr_plus: 90,
    priority: 120,
    expert: 180,
};

const schema = Yup.object().shape({
    fullName: Yup.string().required("Required"),
    phone: Yup.string().required("Required"),
    cvStyle: Yup.string().required("Required"),
    industry: Yup.string().required("Required"),
    experienceLevel: Yup.string().required("Required"),
    summary: Yup.string().required("Required"),
    workExperience: Yup.string().required("Required"),
    education: Yup.string().required("Required"),
    skills: Yup.string().required("Required"),
    reviewType: Yup.mixed<ReviewType>()
        .oneOf(["instant", "manager", "hr_plus", "priority", "expert"])
        .required("Required"),
});

const toBase64 = (file: File) =>
    new Promise<string>((resolve, reject) => {
        const r = new FileReader();
        r.onload = () => resolve(String(r.result));
        r.onerror = reject;
        r.readAsDataURL(file);
    });

interface FormValues {
    fullName: string;
    phone: string;
    photo: string;
    cvStyle: string;
    fontStyle: string;
    themeColor: string;
    industry: string;
    experienceLevel: string;
    summary: string;
    workExperience: string;
    education: string;
    skills: string;
    reviewType: ReviewType;
    extras: string[];
}

const ManualGeneratorCV = () => {
    const { showAlert } = useAlert();
    const user = useUser();
    const [loading, setLoading] = useState(false);

    const initialValues: FormValues = {
        fullName: "",
        phone: "",
        photo: "",
        cvStyle: "Executive",
        fontStyle: "Default",
        themeColor: "Default",
        industry: "Technology",
        experienceLevel: "Mid",
        summary: "",
        workExperience: "",
        education: "",
        skills: "",
        reviewType: "instant",
        extras: [],
    };

    return (
        <Formik<FormValues>
            initialValues={initialValues}
            validationSchema={schema}
            onSubmit={async (values) => {
                setLoading(true);
                try {
                    // ✅ 1. Обчислюємо totalTokens перед payload
                    let extras = [...values.extras];
                    if (values.fontStyle !== "Default" && !extras.includes("customFont"))
                        extras.push("customFont");
                    if (values.themeColor !== "Default" && !extras.includes("customColor"))
                        extras.push("customColor");

                    const totalTokens =
                        BASE_COST[values.reviewType] +
                        extras.reduce((sum, name) => {
                            const opt = EXTRA_OPTIONS.find((o) => o.name === name);
                            return sum + (opt?.cost || 0);
                        }, 0);

                    // ✅ 2. Формуємо payload після обчислення totalTokens
                    // Ensure we send the computed `extras` (including automatic appearance extras)
                    // and also include explicit appearance fields expected by backend (customFont/customColor)
                    const payload = {
                        ...values,
                        email: user?.email,
                        totalTokens,
                        extras,
                        // backend uses `customFont`/`customColor` in prompt builders
                        customFont: values.fontStyle !== "Default" ? values.fontStyle : undefined,
                        customColor: values.themeColor !== "Default" ? values.themeColor : undefined,
                    };

                    // ✅ 3. Відправляємо запит
                    const res = await fetch("/api/cv/create-order", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        credentials: "include",
                        body: JSON.stringify(payload),
                    });

                    const data = await res.json();
                    console.log("📤 create-order response:", data);
                    if (res.ok) {
                        const order = data?.order;
                        const extrasKeys = order?.extrasData ? Object.keys(order.extrasData) : [];
                        showAlert(
                            "Success",
                            values.reviewType === "manager"
                                ? `Your request was accepted. A specialist will prepare your CV and deliver it in 24 hours. Extras generated: ${extrasKeys.join(", ")}`
                                : `Your CV was generated successfully and is ready to download. Extras generated: ${extrasKeys.join(", ")}`,
                            "success"
                        );
                    } else {
                        console.error("create-order error payload:", data);
                        showAlert("Error", data.message || "Failed to create CV order", "error");
                    }
                } catch (e) {
                    showAlert("Error", "Network or server error", "error");
                }
                setLoading(false);
            }}
        >
            {({ values, setFieldValue, setValues }) => {
                // 🔹 автоматичне оновлення extras (Appearance)
                let extras = [...values.extras];
                if (values.fontStyle !== "Default" && !extras.includes("customFont"))
                    extras.push("customFont");
                else if (values.fontStyle === "Default")
                    extras = extras.filter((x) => x !== "customFont");

                if (values.themeColor !== "Default" && !extras.includes("customColor"))
                    extras.push("customColor");
                else if (values.themeColor === "Default")
                    extras = extras.filter((x) => x !== "customColor");

                const totalTokens =
                    BASE_COST[values.reviewType] +
                    extras.reduce((sum: number, name: string) => {
                        const opt = EXTRA_OPTIONS.find((o) => o.name === name);
                        return sum + (opt?.cost || 0);
                    }, 0);

                return (
                    <Form className={styles.form}>
                        {/* 👤 Personal Info */}
                        <div className={styles.section}>
                            <h3 className={styles.sectionTitle}>👤 Personal Info</h3>
                            {formSchemaCV.personal.map((f) => (
                                <div key={f.name} className={styles.fullWidth}>
                                    <label className={styles.label}>{f.label}</label>
                                    {f.type === "file" ? (
                                        <div className={styles.fileInputWrapper}>
                                            <label className={styles.fileInputCustom}>
                                                📷 Select photo
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={async (e) => {
                                                        const file = e.target.files?.[0];
                                                        if (file)
                                                            setFieldValue("photo", await toBase64(file));
                                                    }}
                                                />
                                            </label>
                                            {values.photo && (
                                                <>
                                                    <img
                                                        src={values.photo}
                                                        alt="preview"
                                                        className={styles.photoPreview}
                                                    />
                                                    <span className={styles.fileDisplay}>
                                                    Photo selected
                                                </span>
                                                </>
                                            )}
                                        </div>
                                    ) : (
                                        <Field
                                            name={f.name}
                                            as={Input}
                                            placeholder={f.label}
                                            className={styles.inputBase}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* ⚙️ CV Settings */}
                        <div className={styles.section}>
                            <h3 className={styles.sectionTitle}>⚙️ CV Settings</h3>
                            <div className={styles.selectGrid}>
                                {formSchemaCV.selectors.map((f) => (
                                    <div key={f.name} className={styles.formGroup}>
                                        <label className={styles.label}>{f.label}</label>
                                        <Select
                                            value={(values as any)[f.name]}
                                            onChange={(_, v) => setFieldValue(f.name, v)}
                                            className={styles.inputBase}
                                        >
                                            {f.options.map((opt: string) => (
                                                <Option key={opt} value={opt}>
                                                    {opt}
                                                </Option>
                                            ))}
                                        </Select>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 🔍 Review Type */}
                        <div className={styles.section}>
                            <h3 className={styles.sectionTitle}>🔍 Review Type</h3>
                            <Select
                                value={values.reviewType}
                                onChange={(_, v) => setFieldValue("reviewType", v as ReviewType)}
                                className={styles.inputBase}
                            >
                                <Option value="instant">Instant — AI Generated (25 tokens)</Option>
                                <Option value="manager">Manager Review — 24h (60 tokens)</Option>
                                <Option value="hr_plus">HR+ Review — 24h + ATS (90 tokens)</Option>
                                <Option value="priority">Priority Review — 6h turnaround (120 tokens)</Option>
                                <Option value="expert">Expert Package — HR + Design (180 tokens)</Option>
                            </Select>
                            <p
                                style={{
                                    fontSize: "0.85rem",
                                    color: "var(--text-muted)",
                                    marginTop: "0.4rem",
                                }}
                            >
                                {values.reviewType === "instant" && "⚡ Instant AI CV generation with no manual review."}
                                {values.reviewType === "manager" && "🧠 A professional will review and enhance your CV for 24-hour delivery."}
                                {values.reviewType === "hr_plus" && "📋 HR+ includes ATS checks and recruiter phrasing guidance."}
                                {values.reviewType === "priority" && "🚀 Priority delivery within 6 hours by our fast-track team."}
                                {values.reviewType === "expert" && "🏆 Expert package: senior HR + visual design polish and 2 revisions."}
                            </p>
                        </div>

                        {/* ✨ Additional Services */}
                        <div className={styles.section}>
                            <h3 className={styles.sectionTitle}>✨ Additional Services</h3>
                            <div className={styles.extrasList}>
                                {EXTRA_OPTIONS.map((opt) => {
                                        // some services require manager or higher
                                        const managerOnly = [
                                            "keywords",
                                            "atsCheck",
                                            "jobAdaptation",
                                            "achievements",
                                            "skillsGap",
                                            "multiLocale",
                                            "portfolioLayout",
                                        ].includes(opt.name);

                                        // priority or expert unlock additional services
                                        const isDisabled =
                                            managerOnly && !["manager", "hr_plus", "priority", "expert"].includes(values.reviewType);

                                        return (
                                            <label
                                                key={opt.name}
                                                className={`${styles.extraItem} ${
                                                    isDisabled ? styles.disabled : ""
                                                }`}
                                            >
                                                <input
                                                    type="checkbox"
                                                    disabled={isDisabled}
                                                    checked={values.extras.includes(opt.name)}
                                                    onChange={(e) => {
                                                        if (e.target.checked)
                                                            setFieldValue("extras", [
                                                                ...values.extras,
                                                                opt.name,
                                                            ]);
                                                        else
                                                            setFieldValue(
                                                                "extras",
                                                                values.extras.filter(
                                                                    (x) => x !== opt.name
                                                                )
                                                            );
                                                    }}
                                                />
                                                <span>{opt.label}</span>
                                                <span className={styles.badge}>+{opt.cost}</span>
                                                {isDisabled && (
                                                    <span className={styles.lockHint}>
                                                    🔒 Available with Manager/HR+ or higher
                                                </span>
                                                )}
                                            </label>
                                        );
                                    })}
                            </div>
                        </div>

                        {/* 🎨 Appearance */}
                        <div className={styles.section}>
                            <div className={styles.premiumNotice}>
                                💎 Selecting custom font or color adds +5 tokens each. Default
                                choices are free.
                            </div>
                            <h3 className={styles.sectionTitle}>🎨 Appearance Settings</h3>
                            <div className={styles.selectGrid}>
                                <div className={styles.formGroup}>
                                    <label className={styles.label}>Font Style</label>
                                    <Select
                                        value={values.fontStyle}
                                        onChange={(_, v) => setFieldValue("fontStyle", v)}
                                        className={styles.inputBase}
                                    >
                                        <Option value="Default">Default (Helvetica)</Option>
                                        <Option value="Roboto">Roboto</Option>
                                        <Option value="Lora">Lora (Serif)</Option>
                                        <Option value="Merriweather">Merriweather (Serif)</Option>
                                        <Option value="Inter">Inter</Option>
                                        <Option value="Montserrat">Montserrat</Option>
                                        <Option value="Source Sans 3">Source Sans 3</Option>
                                        <Option value="Courier">Courier</Option>
                                        <Option value="Times-Roman">Times New Roman</Option>
                                    </Select>
                                </div>
                                <div className={styles.formGroup}>
                                    <label className={styles.label}>Primary Color</label>
                                    <Select
                                        value={values.themeColor}
                                        onChange={(_, v) => setFieldValue("themeColor", v)}
                                        className={styles.inputBase}
                                    >
                                        <Option value="Default">Default Indigo</Option>
                                        <Option value="#111827">Charcoal</Option>
                                        <Option value="#0ea5a4">Teal</Option>
                                        <Option value="#ef4444">Vibrant Red</Option>
                                        <Option value="#f97316">Orange</Option>
                                        <Option value="#f59e0b">Amber</Option>
                                        <Option value="#84cc16">Lime</Option>
                                        <Option value="#06b6d4">Cyan</Option>
                                        <Option value="#7c3aed">Electric Purple</Option>
                                        <Option value="#e11d48">Pink</Option>
                                        <Option value="#0ea5a4">Mint Teal</Option>
                                        <Option value="#2563eb">Blue Classic</Option>
                                    </Select>
                                </div>
                            </div>
                        </div>

                        {/* 💳 Summary */}
                        <div className={styles.section}>
                            <h3 className={styles.sectionTitle}>💳 Summary</h3>
                            <p className={styles.tokenSummary}>
                                Total tokens: <strong>{totalTokens}</strong>
                            </p>
                        </div>

                        {/* Actions */}
                        <div className={styles.actions}>
                            <ButtonUI
                                type="button"
                                color="secondary"
                                textColor="backgroundLight"
                                variant="soft"
                                hoverEffect="shadow"
                                onClick={() => setValues(mockCVData)}
                            >
                                Fill with Mock Data
                            </ButtonUI>

                            <ButtonUI
                                type="submit"
                                color="primary"
                                textColor="backgroundLight"
                                variant="solid"
                                hoverEffect="glow"
                                loading={loading}
                            >
                                Submit Request
                            </ButtonUI>
                        </div>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default ManualGeneratorCV;
