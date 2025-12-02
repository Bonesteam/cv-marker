"use client";

import React from "react";
import Text from "@/components/constructor/text/Text";
import ExamplesGrid from "@/components/ui/example-grid/ExamplesGrid";
import InfoBlock from "@/components/constructor/Info-block/InfoBlock";
import ValuesIcons from "@/components/constructor/values-icons/ValuesIcons";
import HighlightStrip from "@/components/constructor/highlight-strip/HighlightStrip";
import FAQ from "@/components/constructor/faq/FAQ";
import styles from "./TemplatesPage.module.scss";
import { media as mediaMap } from "@/resources/media";

function resolveMedia(key?: string) {
    if (!key) return undefined;
    const v = (mediaMap as Record<string, unknown>)[key];
    if (!v && process.env.NODE_ENV !== "production") {
        console.warn(`⚠️ Media not found: ${key}`);
    }
    return v as any;
}

const Page = () => {
    return (
        <div className={styles.container}>
            <div className={styles.headerRow}>
                <div className={styles.intro}>
                    <Text
                        title="Examples of CV"
                        description={`Check out our CV templates. Each example can be viewed directly on the website in PDF format with test data or downloaded for your own use.`}
                        titleLevel={1}
                        centerTitle={false}
                        centerDescription={false}
                    />
                </div>
            </div>

            <div className={styles.section}>
                <div className={styles.aligned}>
                    <HighlightStrip
                        messages={["ATS-friendly CVs 🚀", "Polished by HR experts 👩‍💼", "Templates for every industry 📑"]}
                    />
                </div>
            </div>

            <div className={styles.section}>
                <ExamplesGrid />
            </div>

            <div className={styles.section}>
                <div className={styles.aligned}>
                    <InfoBlock
                        title="Why Use Our CV Templates?"
                        description="Designed by HR experts to help you stand out. Each template is ATS-optimized and ready to use or customize."
                        bullets={["Recruiter-approved layouts", "ATS-optimized formatting", "Easy to edit and customize"]}
                        align="center"
                        image={resolveMedia("image2")}
                    />
                </div>
            </div>

            <div className={styles.section}>
                <div className={styles.aligned}>
                    <ValuesIcons
                        title="Optional Extras"
                        description="Add a cover letter, LinkedIn summary or optimization report to boost your application."
                        values={[
                            { icon: "✉️", title: "Cover Letter", text: "Personalized letter for the role." },
                            { icon: "🔍", title: "Keyword Optimization", text: "Match ATS and job descriptions." },
                            { icon: "🏆", title: "Achievements Boost", text: "Rewrite achievements with measurable impact." },
                        ]}
                    />
                </div>
            </div>

            <div className={styles.section}>
                <div className={styles.aligned}>
                    <ValuesIcons
                        title="Key Benefits"
                        description="When using our CV templates you get:"
                        values={[
                            { icon: "⚡", title: "Speed", text: "Generate a CV in minutes" },
                            { icon: "📑", title: "ATS Safe", text: "Pass recruiter filters" },
                            { icon: "🎨", title: "Designs", text: "Modern templates for many industries" },
                        ]}
                    />
                </div>
            </div>

            <div className={styles.section}>
                <div className={styles.aligned}>
                    <FAQ
                        items={[
                            { question: "Can I download the CV examples?", answer: "Yes, each template is available as PDF with sample data." },
                            { question: "Are the CVs ATS-friendly?", answer: "Yes — designed to pass applicant tracking systems." },
                            { question: "Can I customize the CV?", answer: "Yes — edit text, layout, and design as needed." },
                        ]}
                    />
                </div>
            </div>
        </div>
    );
};

export default Page;
