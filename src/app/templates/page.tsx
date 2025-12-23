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
  return (mediaMap as Record<string, unknown>)[key] as any;
}

const TemplatesPage = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>

        {/* HERO / INTRO */}
        <section className={`${styles.section} ${styles.intro}`}>
          <Text
            title="Professional CV Templates"
            description="Modern CV examples designed like real documents. Clean, readable, and optimized for recruiters and ATS systems."
            titleLevel={1}
          />
        </section>

        <div className={styles.divider} />

        {/* CV EXAMPLES */}
        <section className={styles.section}>
          <ExamplesGrid />
        </section>

        <div className={styles.divider} />

        {/* HIGHLIGHTS */}
        <section className={styles.section}>
          <HighlightStrip
            messages={[
              "Paper-style CV layouts 📄",
              "ATS-friendly structure 🚀",
              "Reviewed by HR experts 👩‍💼",
            ]}
          />
        </section>

        {/* WHY */}
        <section className={styles.section}>
          <div className={styles.aligned}>
            <InfoBlock
              title="Why These CV Templates Work"
              description="Each template follows real CV structure — no flashy design, only what recruiters expect."
              bullets={[
                "Clean document-style layout",
                "Readable typography hierarchy",
                "Safe formatting for ATS systems",
              ]}
              align="center"
              image={resolveMedia("image2")}
            />
          </div>
        </section>

        {/* KEY BENEFITS */}
        <section className={styles.section}>
          <ValuesIcons
            title="Key Benefits"
            description="What you get with every template:"
            values={[
              { icon: "📄", title: "Real CV Look", text: "Feels like a professional document" },
              { icon: "⚡", title: "Fast Editing", text: "Easy to customize and export" },
              { icon: "🤖", title: "ATS Safe", text: "Optimized for applicant tracking systems" },
            ]}
          />
        </section>

        {/* OPTIONAL EXTRAS */}
        <section className={styles.section}>
          <ValuesIcons
            title="Optional Extras"
            description="Boost your application even more"
            values={[
              { icon: "✉️", title: "Cover Letter", text: "Perfectly matched to your CV" },
              { icon: "🔍", title: "Keyword Optimization", text: "Beat automated filters" },
              { icon: "🏆", title: "Achievements Boost", text: "Stronger, measurable results" },
            ]}
          />
        </section>

        <div className={styles.divider} />

        {/* FAQ */}
        <section className={styles.section}>
          <FAQ
            items={[
              {
                question: "Can I download the CV templates?",
                answer: "Yes, every example can be downloaded as a PDF with sample data.",
              },
              {
                question: "Are the templates ATS-friendly?",
                answer: "Yes. Layouts are optimized to pass applicant tracking systems.",
              },
              {
                question: "Can I customize the CV?",
                answer: "Absolutely. You can edit text, structure, and styling.",
              },
            ]}
          />
        </section>

      </div>
    </div>
  );
};

export default TemplatesPage;
