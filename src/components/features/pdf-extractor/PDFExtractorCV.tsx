"use client";

import {pdf} from "@react-pdf/renderer";
import {
    ClassicCV,
    CreativeCV,
    ModernCV,
    ManagerReviewedCV,
} from "@/components/features/cvTemplates/cvTemplates";
import {CVOrderType} from "@/backend/types/cv.types";

// 🔹 універсальний рендер extras (використовується всередині шаблонів)
const renderExtras = (o: CVOrderType) => {
    if (!o.extrasData || Object.keys(o.extrasData).length === 0) return null;

    const titleMap: Record<string, string> = {
        coverLetter: "Cover Letter",
        linkedin: "LinkedIn Summary",
        keywords: "Keyword Optimization",
        atsCheck: "ATS Compatibility Report",
        jobAdaptation: "Adapted CV for Job Description",
        achievements: "Achievements Booster",
        skillsGap: "Skills Gap Analysis",
        portfolioLayout: "Portfolio Layout Review",
        personalBranding: "Personal Branding Notes",
        prioritySupport: "Priority Support",
        multiLocale: "Multi-language CV",
        jobMatch: "Job Matching & Keywords",
    };

    return Object.entries(o.extrasData).map(([key, value]) => ({
        title: titleMap[key] || key,
        content: value,
    }));
};

// 🧾 Головна функція завантаження PDF
export async function downloadCVPDF(order: CVOrderType) {
    console.log("🧾 [downloadCVPDF] Start for:", order.fullName);
    console.log("📝 Response preview:", order.response?.slice(0, 200));
    console.log("🗂️ Extras data:", order.extrasData);
    let doc;

    // sanitize order: deep-clone to plain JSON to avoid circulars / special types
    let cleanOrder: any;
    try {
        cleanOrder = JSON.parse(JSON.stringify(order));
    } catch (e) {
        console.warn("⚠️ [downloadCVPDF] Order serialization failed, attempting shallow clone", e);
        cleanOrder = { ...(order as any) };
    }

    // ensure ids and simple fields are strings
    cleanOrder._id = String(cleanOrder._id || "unknown");
    cleanOrder.fullName = String(cleanOrder.fullName || "");
    cleanOrder.email = String(cleanOrder.email || "");
    cleanOrder.phone = String(cleanOrder.phone || "");
    cleanOrder.response = cleanOrder.response ? String(cleanOrder.response) : "";

    // coerce extrasData values to strings to avoid object rendering issues
    if (cleanOrder.extrasData && typeof cleanOrder.extrasData === "object") {
        Object.keys(cleanOrder.extrasData).forEach((k) => {
            try {
                cleanOrder.extrasData[k] = String(cleanOrder.extrasData[k] ?? "");
            } catch (err) {
                cleanOrder.extrasData[k] = "";
            }
        });
    }

    if (!cleanOrder.fontStyle || cleanOrder.fontStyle === "Default") {
        cleanOrder.fontStyle = "Helvetica";
    }

    const manualReviewTypes = ["manager", "hr_plus", "priority", "expert"];
    try {
        if (manualReviewTypes.includes(cleanOrder.reviewType as string)) {
            doc = ManagerReviewedCV(cleanOrder);
        } else {
            switch (cleanOrder.cvStyle) {
                case "Modern":
                    doc = ModernCV(cleanOrder);
                    break;
                case "Creative":
                    doc = CreativeCV(cleanOrder);
                    break;
                default:
                    doc = ClassicCV(cleanOrder);
            }
        }
    } catch (err) {
        console.error("❌ [downloadCVPDF] Error while creating PDF doc element:", err);
        // fallback to a minimal ClassicCV using the sanitized order
        doc = ClassicCV(cleanOrder);
    }

    // 🟩 Генерація PDF
    try {
    console.log("🧾 [downloadCVPDF] Generating PDF blob (primary)");
    const blob = await pdf(doc).toBlob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `cv-${String(order.cvStyle || "cv").toLowerCase().replace(/\s+/g, "-")}-${order._id}.pdf`;
        a.click();
        // revoke after a short delay to ensure download starts
        setTimeout(() => URL.revokeObjectURL(url), 1000);
        console.log("🧾 [downloadCVPDF] Success: download started");
    } catch (err: any) {
        console.error("❌ [downloadCVPDF] PDF generation failed:", err);
        // Try fallback: render Classic template and attempt again
        try {
            console.log("ℹ️ [downloadCVPDF] Attempting fallback to ClassicCV");
            const fallbackDoc = ClassicCV(cleanOrder);
            const blob = await pdf(fallbackDoc).toBlob();
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `cv-fallback-${order._id}.pdf`;
            a.click();
            setTimeout(() => URL.revokeObjectURL(url), 1000);
            console.log("🧾 [downloadCVPDF] Fallback download started");
        } catch (err2: any) {
            console.error("❌ [downloadCVPDF] Fallback also failed:", err2);
            // Show user-friendly message
            if (typeof window !== "undefined")
                window.alert("Unable to generate PDF. Please try again later or contact support.");
        }
    }
}