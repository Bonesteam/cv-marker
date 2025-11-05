import { PageSchema } from "@/components/constructor/page-render/types";
import { COMPANY_NAME, COMPANY_EMAIL } from "@/resources/constants";

const faqSchema: PageSchema = {
    meta: {
        title: `FAQ — ${COMPANY_NAME}`,
        description: `Common questions about ${COMPANY_NAME}: quick CV generation, optional 24h expert review, revisions, and personalized career help.`,
        keywords: [
            `${COMPANY_NAME} help`,
            "ai cv builder",
            "instant resume",
            "ats optimized",
            "career service",
            "hr professionals",
        ],
        canonical: "/faq",
        ogImage: {
            title: `${COMPANY_NAME} — FAQ`,
            description: `Find clear answers about how ${COMPANY_NAME} helps you build a professional, job-ready CV in minutes.`,
            bg: "#0a2540",
            color: "#ffffff",
        },
    },
    blocks: [
        {
            type: "faq",
            items: [
                {
                    question: `What does ${COMPANY_NAME} do?`,
                    answer: `${COMPANY_NAME} is an AI-powered platform for creating professional, ATS-friendly resumes in seconds. You can also choose the optional Manager Review — where certified HR experts enhance your CV and deliver it within 24 hours.`,
                },
                {
                    question: "How fast will I get my CV?",
                    answer: `Instantly — if you use our automated builder. If you select the Manager Review upgrade, your refined and finalized version will be ready within one business day.`,
                },
                {
                    question: "Who works on the resumes?",
                    answer: `Instant resumes are generated automatically using optimized templates. Reviewed CVs are carefully edited by experienced HR professionals and career advisors.`,
                },
                {
                    question: "Can I ask for edits after delivery?",
                    answer: `Yes, absolutely. The Manager Review option includes follow-up revisions to ensure your CV fully reflects your background and goals.`,
                },
                {
                    question: "Do you customize resumes for specific roles?",
                    answer: `Yes. The instant version provides a strong general CV, while our reviewed CVs are fine-tuned for your target position, industry, and skill set.`,
                },
                {
                    question: "Is the design also handled by you?",
                    answer: `Yes. Every CV uses a modern and professional design. With the Manager Review, layouts are also refined for maximum readability and impact.`,
                },
                {
                    question: "Is my personal information secure?",
                    answer: `Completely. All data is processed with strict confidentiality and never shared outside our platform.`,
                },
                {
                    question: "Can you assist with career changes?",
                    answer: `Definitely. Our HR experts know how to emphasize transferable skills to make your transition into a new field smooth and confident.`,
                },
                {
                    question: "Do you also write cover letters?",
                    answer: `Yes. Alongside resumes, our team can create tailored cover letters designed to complement and strengthen your CV.`,
                },
                {
                    question: "How can I reach your support team?",
                    answer: `You can contact us anytime at ${COMPANY_EMAIL}. We're happy to help.`,
                },
            ],
        },
    ],
};

export default faqSchema;

