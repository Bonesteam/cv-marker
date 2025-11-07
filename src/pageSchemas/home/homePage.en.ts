import {PageSchema} from "@/components/constructor/page-render/types";
import {COMPANY_NAME} from "@/resources/constants";

const schema: PageSchema = {
    meta: {
        title: `${COMPANY_NAME} — Instant CVs or Expert Review`,
        description: `${COMPANY_NAME} lets you instantly create ATS-friendly CVs with our templates, or choose the optional manager review for a perfected CV within 24 hours.`,
        keywords: [
            "cv maker",
            "resume builder",
            "ATS resume",
            "instant cv",
            "professional resume",
            "career success",
            "cv review",
        ],
        canonical: "/",
        ogImage: {
            title: COMPANY_NAME,
            description: `Get your CV instantly — or let our experts polish it within 24 hours.`,
            bg: "#000000ff",
            color: "#ffffff",
        },
    },

    blocks: [
        {
            type: "custom",
            component: "HeroSection",
            title: "Two Ways to Build Your Career",
            highlight: "Instant CV or Expert Review",
            description:
                `Fill in your details and get an ATS-ready CV instantly.  
                 Or choose our Manager Review option and receive a perfected CV crafted by our team within 24 hours.`,
            primaryCta: {text: "Create My CV Now", link: "/get-started"},
           // secondaryCta: {text: "See Templates", link: "/templates"},
            image: "image1",
        },

        {
            type: "custom",
            component: "HighlightStrip",
            messages: [
                "Instant CV in seconds",
                "50+ modern templates",
                "ATS & recruiter-approved",
                "Optional 24h manager review",
            ],
        },

        {
            type: "custom",
            component: "ValuesIcons",
            title: "Why Choose Us?",
            description: `Whether you need a quick CV or expert polish, ${COMPANY_NAME} has you covered.`,
            values: [
                {
                    icon: "⚡",
                    title: "Instant CV",
                    text: "Get a professional ATS-ready CV in seconds."
                },
                {
                    icon: "🕒",
                    title: "24h Review",
                    text: "HR specialists polish your CV within 24 hours."
                },
                {
                    icon: "📑",
                    title: "ATS Approved",
                    text: "Pass recruiter filters with modern templates."
                },
                {
                    icon: "🎨",
                    title: "Templates for every taste",
                    text: "Choose from modern, recruiter-tested designs."
                }
            ]
        },

        {
            type: "custom",
            component: "Timeline",
            title: "How It Works",
            steps: [
                {
                    title: "Fill the Form",
                    description: "Enter your experience, education, and skills.",
                },
                {
                    title: "Instant CV",
                    description: "Download your CV immediately in your chosen template.",
                },
                {
                    title: "Manager Review (Optional)",
                    description: "An HR expert refines your CV for maximum impact.",
                },
                {
                    title: "Delivery in 24h",
                    description: "Get your polished CV in your inbox within 24 hours.",
                },
            ],
        },

        {
            type: "custom",
            component: "VideoDemo",
            title: "See It in Action",
            description:
                "Watch how you can instantly create a CV — and how our expert review option works for extra polish.",
            video: "CVMakerDemo"
        },

        {
            type: "grid",
            columns: 2,
            gap: "3rem",
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
            align: "center",
            left: {
                type: "text",
                title: `Get Your CV — Your Way`,
                description: `Instant download or manager-reviewed within 24h.  
                               Thousands of job seekers already trust ${COMPANY_NAME}.`,
                centerTitle: true,
                centerDescription: true,
            },
        },

        {
            type: "custom",
            component: "TestimonialsSlider",
            testimonials: [
                {
                    name: "Dmytro Koval",
                    role: "UX Designer",
                    image: "review1",
                    text: "Used the instant option and was impressed — clean layout and great structure!",
                },
                {
                    name: "Emma Johansson",
                    role: "HR Consultant",
                    image: "review3",
                    text: "The manager review really elevated my CV. It finally looks like me — just more professional.",
                },
                {
                    name: "Marco Rivera",
                    role: "Business Analyst",
                    image: "review2",
                    text: "Loved how fast and easy it was. Totally worth upgrading to Premium.",
                },
            ],
        },

        {
            type: "faq",
            items: [
                {
                    question: "What’s the main difference between Instant CV and Manager Review?",
                    answer:
                        "Instant CV gives you a polished, ready-to-use document right away. Manager Review adds a human touch — our HR experts refine it to highlight your strengths and make it truly stand out."
                },
                {
                    question: "Are all your templates ATS-friendly?",
                    answer:
                        "Yes. Every template is designed and tested to pass Applicant Tracking Systems, ensuring recruiters actually see your CV."
                },
                {
                    question: "Can I edit or update my CV after downloading?",
                    answer:
                        "Of course. You can re-enter your dashboard anytime to make changes, generate new versions, or try different templates."
                },
                {
                    question: "How secure is my personal data?",
                    answer:
                        "All information you share is stored safely with encryption and full GDPR compliance — your privacy always comes first."
                },
                {
                    question: "Do you offer help with cover letters or LinkedIn profiles?",
                    answer:
                        "Yes. Our Premium users get access to a cover letter builder, and we also offer LinkedIn optimization as an add-on service."
                }
            ]
        },
        {
            type: "custom",
            component: "ContactForm",
            title: "Need Help?",
            description: "Contact our support team for assistance or guidance.",
        },
    ],
};

export default schema;

