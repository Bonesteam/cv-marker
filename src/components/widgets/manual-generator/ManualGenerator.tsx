"use client";

import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
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

const EXTRA_OPTIONS = [
    { name: "coverLetter", label: "Cover Letter", cost: 10 },
    { name: "linkedin", label: "LinkedIn Summary", cost: 15 },
    { name: "keywords", label: "Keyword Optimization", cost: 12 },
    { name: "atsCheck", label: "ATS Compatibility Report", cost: 12 },
    { name: "jobAdaptation", label: "Adapt CV to Job Description", cost: 20 },
    { name: "achievements", label: "Achievements Booster", cost: 10 },
    { name: "skillsGap", label: "Skills Gap Analysis", cost: 15 },
];

const BASE_COST: Record<ReviewType, number> = {
    instant: 25,
    manager: 60,
    hr_plus: 90,
    priority: 120,
    expert: 180,
};

const schema = Yup.object().shape({
    fullName: Yup.string().required("Full name is required"),
    phone: Yup.string().required("Phone number is required"),
    cvStyle: Yup.string().required("CV style is required"),
    industry: Yup.string().required("Industry is required"),
    experienceLevel: Yup.string().required("Experience level is required"),
    summary: Yup.string().required("Summary is required"),
    workExperience: Yup.string().required("Work experience is required"),
    education: Yup.string().required("Education is required"),
    skills: Yup.string().required("Skills are required"),
    reviewType: Yup.mixed<ReviewType>()
        .oneOf(["instant", "manager", "hr_plus", "priority", "expert"])
        .required("Review type is required"),
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
    const [photoFile, setPhotoFile] = useState<File | null>(null);

    const initialValues: FormValues = {
        fullName: "",
        phone: "",
        photo: "",
        cvStyle: "Classic",
        fontStyle: "Default",
        themeColor: "Default",
        industry: "IT",
        experienceLevel: "Mid-level",
        summary: "",
        workExperience: "",
        education: "",
        skills: "",
        reviewType: "instant",
        extras: [],
    };

    const handleSubmit = async (values: FormValues) => {
        setLoading(true);
        
        if (!user?.email) {
            showAlert("Error", "You must be logged in to create a CV", "error");
            setLoading(false);
            return;
        }

        try {
            // 1. Обчислюємо totalTokens
            let extras = [...values.extras];
            
            // Додаємо кастомні налаштування як extras
            if (values.fontStyle !== "Default" && !extras.includes("customFont")) {
                extras.push("customFont");
            }
            if (values.themeColor !== "Default" && !extras.includes("customColor")) {
                extras.push("customColor");
            }

            const baseValue = BASE_COST[values.reviewType] ?? 0;
            const extrasSum = extras.reduce((sum, name) => {
                const opt = EXTRA_OPTIONS.find((o) => o.name === name);
                return sum + (opt?.cost || 0);
            }, 0);
            const totalTokens = baseValue + extrasSum;

            // 2. Перевіряємо баланс користувача
            if (user.tokens < totalTokens) {
                showAlert("Error", `Insufficient tokens. You need ${totalTokens} tokens but have only ${user.tokens}`, "error");
                setLoading(false);
                return;
            }

            // 3. Готуємо payload з усіма даними
            const payload = {
                ...values,
                email: user.email,
                totalTokens,
                // Додаємо кастомні налаштування як окремі поля
                customFont: values.fontStyle !== "Default" ? values.fontStyle : undefined,
                customColor: values.themeColor !== "Default" ? values.themeColor : undefined,
            };

            console.log("📤 Submitting CV request:", {
                ...payload,
                photo: payload.photo ? "[base64-photo]" : "none",
                extrasCount: extras.length,
                totalTokens
            });

            // 4. Відправляємо запит на сервер
            const res = await fetch("/api/cv/create-order", {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(payload),
            });

            let data: any = {};
            try {
                data = await res.json();
            } catch (jsonErr) {
                console.error("Response JSON parse failed:", jsonErr);
            }

            if (res.ok && data.order) {
                showAlert(
                    "Success! 🎉",
                    values.reviewType === "instant" 
                        ? "Your CV was generated successfully! You can download it from your orders page."
                        : "Your request was accepted. A specialist will prepare your CV and deliver it within 24 hours.",
                    "success"
                );
                
                // Перенаправлення на сторінку дашборду (orders route may not exist)
                setTimeout(() => {
                    window.location.href = "/dashboard";
                }, 2000);
            } else {
                const errorMessage = data.message || data.error || "Failed to create CV order";
                showAlert("Error", errorMessage, "error");
                console.error("Server error:", data);
            }
        } catch (error: any) {
            console.error("Submit error:", error);
            showAlert("Error", error.message || "Network or server error", "error");
        }
        setLoading(false);
    };

    return (
        <Formik<FormValues>
            initialValues={initialValues}
            validationSchema={schema}
            onSubmit={handleSubmit}
        >
            {({ values, setFieldValue, setValues, isValid, errors, touched }) => {
                // Автоматичне оновлення extras для Appearance
                let extras = [...values.extras];
                
                if (values.fontStyle !== "Default" && !extras.includes("customFont")) {
                    extras.push("customFont");
                } else if (values.fontStyle === "Default") {
                    extras = extras.filter((x) => x !== "customFont");
                }

                if (values.themeColor !== "Default" && !extras.includes("customColor")) {
                    extras.push("customColor");
                } else if (values.themeColor === "Default") {
                    extras = extras.filter((x) => x !== "customColor");
                }

                const baseValue = BASE_COST[values.reviewType] ?? 0;
                const extrasSum = extras.reduce((sum: number, name: string) => {
                    const opt = EXTRA_OPTIONS.find((o) => o.name === name);
                    return sum + (opt?.cost || 0);
                }, 0);
                const totalTokens = baseValue + extrasSum;

                return (
                    <Form className={styles.form}>
                        {/* 👤 Personal Info */}
                        <div className={styles.section}>
                            <h3 className={styles.sectionTitle}>👤 Personal Information</h3>
                            
                            <div className={styles.fullWidth}>
                                <label className={styles.label}>Full Name *</label>
                                <Field
                                    name="fullName"
                                    as={Input}
                                    placeholder="John Doe"
                                    className={styles.inputBase}
                                />
                                {errors.fullName && touched.fullName && (
                                    <div className={styles.error}>{errors.fullName}</div>
                                )}
                            </div>

                            <div className={styles.fullWidth}>
                                <label className={styles.label}>Phone Number *</label>
                                <Field
                                    name="phone"
                                    as={Input}
                                    placeholder="+1 234 567 890"
                                    className={styles.inputBase}
                                />
                                {errors.phone && touched.phone && (
                                    <div className={styles.error}>{errors.phone}</div>
                                )}
                            </div>

                            <div className={styles.fullWidth}>
                                <label className={styles.label}>Profile Photo (Optional)</label>
                                <div className={styles.fileInputWrapper}>
                                    <label className={styles.fileInputCustom}>
                                        📷 {values.photo ? "Change photo" : "Select photo"}
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={async (e) => {
                                                const file = e.target.files?.[0];
                                                if (file) {
                                                    setPhotoFile(file);
                                                    const base64 = await toBase64(file);
                                                    setFieldValue("photo", base64);
                                                }
                                            }}
                                            disabled={loading}
                                        />
                                    </label>
                                    {values.photo && (
                                        <>
                                            <img
                                                src={values.photo}
                                                alt="Preview"
                                                className={styles.photoPreview}
                                            />
                                            <span className={styles.fileDisplay}>
                                                Photo selected
                                            </span>
                                            <button
                                                type="button"
                                                className={styles.removePhoto}
                                                onClick={() => {
                                                    setFieldValue("photo", "");
                                                    setPhotoFile(null);
                                                }}
                                            >
                                                Remove
                                            </button>
                                        </>
                                    )}
                                </div>
                                <p className={styles.helperText}>
                                    Recommended: Square photo, max 2MB, JPG or PNG
                                </p>
                            </div>
                        </div>

                        {/* ⚙️ CV Settings */}
                        <div className={styles.section}>
                            <h3 className={styles.sectionTitle}>⚙️ CV Settings</h3>
                            <div className={styles.selectGrid}>
                                <div className={styles.formGroup}>
                                    <label className={styles.label}>CV Style *</label>
                                    <Select
                                        id="cvStyle-select"
                                        value={values.cvStyle}
                                        onChange={(_, v) => setFieldValue("cvStyle", v)}
                                        className={styles.inputBase}
                                        disabled={loading}
                                    >
                                        <Option value="Classic">Classic (Traditional & Professional)</Option>
                                        <Option value="Modern">Modern (Clean & Two-column)</Option>
                                        <Option value="Creative">Creative (Visually Engaging)</Option>
                                    </Select>
                                    {errors.cvStyle && touched.cvStyle && (
                                        <div className={styles.error}>{errors.cvStyle}</div>
                                    )}
                                    <p className={styles.optionDescription}>
                                        {values.cvStyle === "Classic" && "Traditional single-column layout"}
                                        {values.cvStyle === "Modern" && "Clean two-column design with sidebar"}
                                        {values.cvStyle === "Creative" && "Visually engaging with modern elements"}
                                    </p>
                                </div>

                                <div className={styles.formGroup}>
                                    <label className={styles.label}>Industry *</label>
                                    <Select
                                        id="industry-select"
                                        value={values.industry}
                                        onChange={(_, v) => setFieldValue("industry", v)}
                                        className={styles.inputBase}
                                        disabled={loading}
                                    >
                                        <Option value="IT">Information Technology</Option>
                                        <Option value="Finance">Finance & Banking</Option>
                                        <Option value="Marketing">Marketing & Advertising</Option>
                                        <Option value="Healthcare">Healthcare</Option>
                                        <Option value="Education">Education</Option>
                                        <Option value="Engineering">Engineering</Option>
                                        <Option value="Design">Design & Creative</Option>
                                        <Option value="Sales">Sales & Business</Option>
                                        <Option value="Other">Other</Option>
                                    </Select>
                                    {errors.industry && touched.industry && (
                                        <div className={styles.error}>{errors.industry}</div>
                                    )}
                                </div>

                                <div className={styles.formGroup}>
                                    <label className={styles.label}>Experience Level *</label>
                                    <Select
                                        id="experienceLevel-select"
                                        value={values.experienceLevel}
                                        onChange={(_, v) => setFieldValue("experienceLevel", v)}
                                        className={styles.inputBase}
                                        disabled={loading}
                                    >
                                        <Option value="Entry-level">Entry-level (0-2 years)</Option>
                                        <Option value="Mid-level">Mid-level (3-7 years)</Option>
                                        <Option value="Senior">Senior (8-12 years)</Option>
                                        <Option value="Lead">Lead / Manager (13+ years)</Option>
                                        <Option value="Executive">Executive / Director</Option>
                                    </Select>
                                    {errors.experienceLevel && touched.experienceLevel && (
                                        <div className={styles.error}>{errors.experienceLevel}</div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* 📝 CV Content */}
                        <div className={styles.section}>
                            <h3 className={styles.sectionTitle}>📝 CV Content</h3>
                            
                            <div className={styles.fullWidth}>
                                <label className={styles.label}>Professional Summary *</label>
                                <p className={styles.fieldDescription}>
                                    Write a brief overview of your professional background and key skills
                                </p>
                                <Field
                                    name="summary"
                                    as={Textarea}
                                    placeholder="Experienced software developer with 6+ years in building scalable applications. Passionate about AI and user-centric design. Skilled in JavaScript, React, and modern web technologies."
                                    minRows={3}
                                    className={styles.textarea}
                                    disabled={loading}
                                />
                                {errors.summary && touched.summary && (
                                    <div className={styles.error}>{errors.summary}</div>
                                )}
                            </div>

                            <div className={styles.fullWidth}>
                                <label className={styles.label}>Work Experience *</label>
                                <p className={styles.fieldDescription}>
                                    List your work experience with dates, company names, and key achievements
                                </p>
                                <Field
                                    name="workExperience"
                                    as={Textarea}
                                    placeholder="Frontend Developer at TechCorp (2020–2023)
- Built user interfaces in React/Next.js
- Improved application load times by 30%
- Mentored 3 junior developers

Junior Developer at WebStudio (2017–2020)
- Created responsive landing pages
- Implemented SEO and accessibility best practices
- Collaborated with design teams"
                                    minRows={5}
                                    className={styles.textarea}
                                    disabled={loading}
                                />
                                {errors.workExperience && touched.workExperience && (
                                    <div className={styles.error}>{errors.workExperience}</div>
                                )}
                            </div>

                            <div className={styles.fullWidth}>
                                <label className={styles.label}>Education *</label>
                                <p className={styles.fieldDescription}>
                                    Include your degrees, institutions, and graduation years
                                </p>
                                <Field
                                    name="education"
                                    as={Textarea}
                                    placeholder="B.Sc. Computer Science — MIT (2013–2017)
- GPA: 3.8/4.0
- Relevant coursework: Algorithms, Data Structures, Web Development

High School Diploma — Lincoln High School (2009–2013)"
                                    minRows={3}
                                    className={styles.textarea}
                                    disabled={loading}
                                />
                                {errors.education && touched.education && (
                                    <div className={styles.error}>{errors.education}</div>
                                )}
                            </div>

                            <div className={styles.fullWidth}>
                                <label className={styles.label}>Skills *</label>
                                <p className={styles.fieldDescription}>
                                    List your technical and soft skills, separated by commas
                                </p>
                                <Field
                                    name="skills"
                                    as={Textarea}
                                    placeholder="JavaScript, TypeScript, React, Next.js, Node.js, MongoDB, Git, Agile, Scrum, UI/UX Design, Problem Solving, Team Leadership"
                                    minRows={2}
                                    className={styles.textarea}
                                    disabled={loading}
                                />
                                {errors.skills && touched.skills && (
                                    <div className={styles.error}>{errors.skills}</div>
                                )}
                            </div>
                        </div>

                        {/* 🔍 Review Type */}
                        <div className={styles.section}>
                            <h3 className={styles.sectionTitle}>🔍 Review Type</h3>
                            <Select
                                id="reviewType-select"
                                value={values.reviewType}
                                onChange={(_, v) => setFieldValue("reviewType", v as ReviewType)}
                                className={styles.inputBase}
                                disabled={loading}
                            >
                                <Option value="instant">
                                    ⚡ Instant CV — AI Generated (25 tokens)
                                </Option>
                                <Option value="manager">
                                    👔 Manager Review — 24h delivery (60 tokens)
                                </Option>
                                <Option value="hr_plus">
                                    🏆 HR+ Review — 24h + ATS optimization (90 tokens)
                                </Option>
                                <Option value="priority">
                                    ⏰ Priority Review — 6h turnaround (120 tokens)
                                </Option>
                                <Option value="expert">
                                    💎 Expert Package — HR + Design review (180 tokens)
                                </Option>
                            </Select>
                            
                            <div className={styles.reviewDescription}>
                                {values.reviewType === "instant" && (
                                    <>
                                        <p className={styles.descriptionTitle}>⚡ Instant AI Generation</p>
                                        <p className={styles.descriptionText}>
                                            Your CV will be generated instantly using AI. Perfect for quick applications.
                                        </p>
                                    </>
                                )}
                                {values.reviewType === "manager" && (
                                    <>
                                        <p className={styles.descriptionTitle}>👔 Professional Review</p>
                                        <p className={styles.descriptionText}>
                                            A professional manager will review and enhance your CV. Delivery within 24 hours.
                                        </p>
                                    </>
                                )}
                                {values.reviewType === "hr_plus" && (
                                    <>
                                        <p className={styles.descriptionTitle}>🏆 HR Expert Review</p>
                                        <p className={styles.descriptionText}>
                                            HR specialist review with ATS optimization. Best for serious job applications.
                                        </p>
                                    </>
                                )}
                                {values.reviewType === "priority" && (
                                    <>
                                        <p className={styles.descriptionTitle}>⏰ Priority Service</p>
                                        <p className={styles.descriptionText}>
                                            Fast-track service with 6-hour turnaround. Includes premium review.
                                        </p>
                                    </>
                                )}
                                {values.reviewType === "expert" && (
                                    <>
                                        <p className={styles.descriptionTitle}>💎 Expert Package</p>
                                        <p className={styles.descriptionText}>
                                            Comprehensive review by HR and design experts. For executive-level positions.
                                        </p>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* ✨ Additional Services */}
                        <div className={styles.section}>
                            <h3 className={styles.sectionTitle}>✨ Additional Services</h3>
                            <p className={styles.sectionDescription}>
                                Enhance your CV package with these professional add-ons
                            </p>
                            
                            <div className={styles.extrasList}>
                                {EXTRA_OPTIONS.map((opt) => {
                                    const managerOnly = [
                                        "keywords",
                                        "atsCheck",
                                        "jobAdaptation",
                                        "achievements",
                                        "skillsGap",
                                    ].includes(opt.name);

                                    const isDisabled = managerOnly && values.reviewType !== "manager";
                                    const isSelected = values.extras.includes(opt.name);

                                    return (
                                        <label
                                            key={opt.name}
                                            className={`${styles.extraItem} ${isSelected ? styles.selected : ''} ${
                                                isDisabled ? styles.disabled : ""
                                            }`}
                                        >
                                            <div className={styles.extraCheckbox}>
                                                <input
                                                    type="checkbox"
                                                    disabled={isDisabled || loading}
                                                    checked={isSelected}
                                                    onChange={(e) => {
                                                        if (e.target.checked) {
                                                            setFieldValue("extras", [
                                                                ...values.extras,
                                                                opt.name,
                                                            ]);
                                                        } else {
                                                            setFieldValue(
                                                                "extras",
                                                                values.extras.filter((x) => x !== opt.name)
                                                            );
                                                        }
                                                    }}
                                                />
                                            </div>
                                            <div className={styles.extraContent}>
                                                <span className={styles.extraLabel}>{opt.label}</span>
                                                <span className={styles.extraDescription}>
                                                    {opt.name === "coverLetter" && "Professional cover letter tailored to your CV"}
                                                    {opt.name === "linkedin" && "Optimized LinkedIn summary for recruiters"}
                                                    {opt.name === "keywords" && "20+ industry keywords for ATS optimization"}
                                                    {opt.name === "atsCheck" && "Compatibility report for Applicant Tracking Systems"}
                                                    {opt.name === "jobAdaptation" && "CV tailored to specific job descriptions"}
                                                    {opt.name === "achievements" && "5 quantifiable achievements for your CV"}
                                                    {opt.name === "skillsGap" && "Analysis of missing skills and learning paths"}
                                                </span>
                                            </div>
                                            <div className={styles.extraCost}>
                                                <span className={styles.badge}>+{opt.cost} tokens</span>
                                                {isDisabled && (
                                                    <span className={styles.lockHint}>
                                                        🔒 Requires Manager Review
                                                    </span>
                                                )}
                                            </div>
                                        </label>
                                    );
                                })}
                            </div>
                        </div>

                        {/* 🎨 Appearance */}
                        <div className={styles.section}>
                            <div className={styles.premiumNotice}>
                                💎 <strong>Premium Appearance Settings</strong> — Customize the look of your CV
                            </div>
                            <h3 className={styles.sectionTitle}>🎨 Appearance Settings</h3>
                            
                            <div className={styles.selectGrid}>
                                <div className={styles.formGroup}>
                                    <label className={styles.label}>
                                        Font Style
                                        <span className={styles.optional}>(Optional)</span>
                                    </label>
                                    <Select
                                        id="fontStyle-select"
                                        value={values.fontStyle}
                                        onChange={(_, v) => setFieldValue("fontStyle", v)}
                                        className={styles.inputBase}
                                        disabled={loading}
                                    >
                                        <Option value="Default">Default (Helvetica) — Free</Option>
                                        <Option value="Times-Roman">Times New Roman — +5 tokens</Option>
                                        <Option value="Courier">Courier — +5 tokens</Option>
                                    </Select>
                                    <p className={styles.optionDescription}>
                                        {values.fontStyle === "Default" && "Clean, professional sans-serif font"}
                                        {values.fontStyle === "Times-Roman" && "Traditional serif font for formal CVs"}
                                        {values.fontStyle === "Courier" && "Monospace font for technical resumes"}
                                    </p>
                                </div>
                                
                                <div className={styles.formGroup}>
                                    <label className={styles.label}>
                                        Primary Color
                                        <span className={styles.optional}>(Optional)</span>
                                    </label>
                                    <Select
                                        id="themeColor-select"
                                        value={values.themeColor}
                                        onChange={(_, v) => setFieldValue("themeColor", v)}
                                        className={styles.inputBase}
                                        disabled={loading}
                                    >
                                        <Option value="Default">Default Blue — Free</Option>
                                        <Option value="#DC2626">Professional Red — +5 tokens</Option>
                                        <Option value="#059669">Corporate Green — +5 tokens</Option>
                                        <Option value="#7C3AED">Creative Purple — +5 tokens</Option>
                                        <Option value="#F59E0B">Gold Accent — +5 tokens</Option>
                                    </Select>
                                    <div className={styles.colorPreview}>
                                        <div 
                                            className={styles.colorBox}
                                            style={{ 
                                                backgroundColor: values.themeColor === "Default" ? "#2563eb" : values.themeColor 
                                            }}
                                        />
                                        <span className={styles.colorName}>
                                            {values.themeColor === "Default" && "Classic Blue"}
                                            {values.themeColor === "#DC2626" && "Professional Red"}
                                            {values.themeColor === "#059669" && "Corporate Green"}
                                            {values.themeColor === "#7C3AED" && "Creative Purple"}
                                            {values.themeColor === "#F59E0B" && "Gold Accent"}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 💳 Summary & Payment */}
                        <div className={styles.section}>
                            <h3 className={styles.sectionTitle}>💳 Order Summary</h3>
                            
                            <div className={styles.orderSummary}>
                                <div className={styles.summaryRow}>
                                    <span className={styles.summaryLabel}>Base Cost ({values.reviewType}):</span>
                                    <span className={styles.summaryValue}>{baseValue} tokens</span>
                                </div>
                                
                                {extras.length > 0 && (
                                    <div className={styles.summaryRow}>
                                        <span className={styles.summaryLabel}>Additional Services:</span>
                                        <span className={styles.summaryValue}>+{extrasSum} tokens</span>
                                    </div>
                                )}
                                
                                {values.fontStyle !== "Default" && (
                                    <div className={styles.summaryRow}>
                                        <span className={styles.summaryLabel}>Custom Font:</span>
                                        <span className={styles.summaryValue}>+5 tokens</span>
                                    </div>
                                )}
                                
                                {values.themeColor !== "Default" && (
                                    <div className={styles.summaryRow}>
                                        <span className={styles.summaryLabel}>Custom Color:</span>
                                        <span className={styles.summaryValue}>+5 tokens</span>
                                    </div>
                                )}
                                
                                <div className={styles.summaryDivider} />
                                
                                <div className={`${styles.summaryRow} ${styles.totalRow}`}>
                                    <span className={styles.summaryLabel}>Total Cost:</span>
                                    <span className={styles.summaryValue}>{totalTokens} tokens</span>
                                </div>
                                
                                <div className={styles.summaryRow}>
                                    <span className={styles.summaryLabel}>Your Balance:</span>
                                    <span className={`${styles.summaryValue} ${user?.tokens >= totalTokens ? styles.sufficient : styles.insufficient}`}>
                                        {user?.tokens || 0} tokens
                                    </span>
                                </div>
                                
                                {user?.tokens < totalTokens && (
                                    <div className={styles.insufficientWarning}>
                                        ⚠️ Insufficient tokens. You need {totalTokens - (user?.tokens || 0)} more tokens.
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className={styles.actions}>
                            <ButtonUI
                                type="button"
                                color="secondary"
                                textColor="backgroundLight"
                                variant="soft"
                                hoverEffect="shadow"
                                onClick={() => {
                                    const mockData = {
                                        ...mockCVData,
                                        cvStyle: values.cvStyle,
                                        industry: values.industry,
                                        experienceLevel: values.experienceLevel,
                                        fontStyle: values.fontStyle,
                                        themeColor: values.themeColor,
                                        reviewType: values.reviewType,
                                        extras: values.extras,
                                    };
                                    setValues(mockData);
                                    showAlert("Mock Data Loaded", "Form filled with example data. Feel free to edit.", "info");
                                }}
                                disabled={loading}
                            >
                                Fill with Example Data
                            </ButtonUI>

                            <div className={styles.submitContainer}>
                                <ButtonUI
                                    type="submit"
                                    color="primary"
                                    textColor="backgroundLight"
                                    variant="solid"
                                    hoverEffect="glow"
                                    loading={loading}
                                    disabled={!isValid || loading || (user?.tokens || 0) < totalTokens}
                                    className={styles.submitButton}
                                >
                                    {loading ? "Processing..." : "Generate CV Now"}
                                </ButtonUI>
                                
                                <p className={styles.submitNote}>
                                    {!isValid && "Please fill all required fields marked with *"}
                                    {isValid && (user?.tokens || 0) < totalTokens && "Add more tokens to proceed"}
                                    {isValid && (user?.tokens || 0) >= totalTokens && "Click to generate your professional CV"}
                                </p>
                            </div>
                        </div>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default ManualGeneratorCV;