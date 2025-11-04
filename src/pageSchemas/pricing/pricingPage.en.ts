import { PageSchema } from "@/components/constructor/page-render/types";
import { COMPANY_NAME } from "@/resources/constants";

const schema: PageSchema = {
    meta: {
        title: `Pricing — ${COMPANY_NAME}`,
        description:
            `Choose the right plan for your career journey. ${COMPANY_NAME} offers instant CV generation and optional expert HR review.`,
        keywords: [
            `${COMPANY_NAME} pricing`,
            "resume builder plans",
            "AI CV cost",
            "expert HR review pricing",
        ],
        canonical: "/pricing",
        ogImage: {
            title: `${COMPANY_NAME} Pricing`,
            description: "Affordable plans for instant CVs or HR-reviewed resumes",
            bg: "#0a2540",
            color: "#ffffff",
        },
    },
    blocks: [
        {
            type: "custom",
            component: "HeroSection",
            title: "Choose Your Plan",
            highlight: "Flexible Pricing",
            description:
                "Whether you need a quick CV today or a perfected version tomorrow, we’ve got the right plan for you.",
            image: "image10",
        },

        {
            type: "custom",
            component: "InfoBlock",
            title: "Simple & Transparent",
            description:
                "Pick the plan that fits your career goals — no hidden fees, just clear and fair pricing.",
            icon: "💡",
            align: "center",
        },

        {
            type: "grid",
            columns: 2,
            gap: "2rem",
            cards: [
                {
                    type: "pricing",
                    variant: "starter",
                    title: "Starter",
                    price: "€9",
                    tokens: 900,
                    badgeTop: "Starter Plan",
                    description: "Quickly create your first professional CV using our ready-made templates.",
                    features: [
                        "1 instant ATS-ready CV",
                        "Access to up-to-date templates",
                        "Basic formatting options included"
                    ],
                    buttonText: "Get Started",
                    buttonLink: "/checkout?plan=starter",
                },
                {
                    type: "pricing",
                    variant: "pro",
                    title: "Pro",
                    price: "€49",
                    tokens: 4900,
                    badgeTop: "Pro Plan",
                    description: "Ideal for active job seekers who need more flexibility and options.",
                    features: [
                        "Unlimited CV creations per month",
                        "Export in PDF or DOCX",
                        "Customizable design templates",
                        "Priority email support"
                    ],
                    buttonText: "Upgrade to Pro",
                    buttonLink: "/checkout?plan=pro",
                },
                {
                    type: "pricing",
                    variant: "premium",
                    title: "Premium",
                    price: "€99",
                    tokens: 9900,
                    badgeTop: "Most Popular",
                    description: "Stand out with expert-level CVs and personalized guidance.",
                    features: [
                        "Unlimited CVs with all templates",
                        "1-on-1 HR expert review within 24h",
                        "Advanced personalization & styling",
                        "Cover letter builder included",
                        "Dedicated priority support"
                    ],
                    buttonText: "Choose Premium",
                    buttonLink: "/checkout?plan=premium",
                },
                {
                    type: "pricing",
                    variant: "custom",
                    title: "Custom Plan",
                    price: "dynamic",
                    tokens: 0,
                    badgeTop: "Custom Plan",
                    description: "Flexible pay-as-you-go option — only pay for what you need.",
                    features: [
                        "Select your desired CV quantity",
                        "Instant token calculation",
                        "Credits never expire"
                    ],
                    buttonText: "Buy Custom",
                    buttonLink: "/checkout?plan=custom",
                },
            ],
        },

        {
            type: "section",
            left: {
                type: "custom",
                component: "InfoBlock",
                title: "Why Upgrade?",
                description:
                    "An expertly reviewed CV can dramatically improve your chances of landing interviews by showcasing your experience the right way.",
                bullets: [
                    "Instant download in multiple formats",
                    "Reviewed by experienced HR specialists",
                    "Guaranteed ATS optimization",
                ],
            },
            right: {
                type: "media",
                mediaType: "image",
                src: "image4",
                alt: "Professional CV Example",
            },
        },

        {
            type: "faq",
            items: [
                {
                    question: "What’s the difference between Instant CV and Manager Review?",
                    answer:
                        "Instant CV gives you a professional resume right away. Manager Review adds a personalized HR touch — our experts enhance your wording, structure, and formatting for maximum recruiter appeal.",
                },
                {
                    question: "Can I edit or regenerate my CV later?",
                    answer:
                        "Yes. You can always return to your dashboard, update details, or generate new versions using different templates.",
                },
                {
                    question: "Is my personal data protected?",
                    answer:
                        "Absolutely. We follow strict GDPR-compliant standards and use encryption to ensure your data stays private and secure.",
                },
                {
                    question: "Do you offer help with cover letters?",
                    answer:
                        "Yes! Our Premium plan includes a professional cover letter builder so your application looks complete and polished.",
                },
                {
                    question: "Can I start small and upgrade later?",
                    answer:
                        "Of course. You can begin with the Starter plan and switch to Pro or Premium anytime without losing your existing data.",
                },
            ],
        },
    ],
};

export default schema;

