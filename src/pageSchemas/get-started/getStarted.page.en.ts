import {PageSchema} from "@/components/constructor/page-render/types";
import {COMPANY_NAME} from "@/resources/constants";

const schema: PageSchema = {
    meta: {
        title: `Get Started — ${COMPANY_NAME}`,
        description: `Learn how ${COMPANY_NAME} helps you create a professional CV instantly, with an optional expert review delivered within 24 hours.`,
        keywords: [
            `${COMPANY_NAME} get started`,
            "cv maker onboarding",
            "resume builder steps",
            "instant cv",
            "manager review cv",
            "professional cv service",
        ],
        canonical: "/get-started",
        ogImage: {
            title: `Get Started with ${COMPANY_NAME}`,
            description: "Instant CVs + optional expert review in 24h.",
            bg: "#0a2540",
            color: "#ffffff",
        },
    },
    blocks: [

        {
            type: "custom",
            component: "HeroSection",
            title: `Get Started with ${COMPANY_NAME}`,
            highlight: "Our Mission & Vision",
            description: `With ${COMPANY_NAME}, you can either generate your CV instantly using our professional templates, 
    or select the Manager Review option to receive a polished version carefully refined by HR experts within just 24 hours.`,
            image: "image5",
        },

        // 🟣 HighlightStrip
        {
            type: "custom",
            component: "HighlightStrip",
            messages: [
                "Instant CV download",
                "50+ professional templates",
                "Optional HR review (24h)",
                "ATS-optimized resumes",
                "Trusted by job seekers worldwide",
            ],
        },

        // 🟣 ValuesIcons
        {
            type: "custom",
            component: "ValuesIcons",
            values: [
                {icon: "⚡", title: "Instant Results", text: "Get your CV right away after filling the form"},
                {icon: "👩‍💼", title: "Expert Option", text: "Let HR specialists refine your CV in 24h"},
                {icon: "📑", title: "ATS-Friendly", text: "Optimized to pass Applicant Tracking Systems"},
                {icon: "🎨", title: "Modern Templates", text: "Choose sleek, recruiter-approved designs"},
            ],
        },

        // 🟣 Grid — How it works
        {
            type: "grid",
            columns: 3,
            gap: "2rem",
            cards: [
                {
                    image: "image1",
                    title: "1. Sign Up",
                    description: "Create your account to start building your CV.",
                },
                {
                    image: "image2",
                    title: "2. Choose a Template",
                    description: "Select from modern recruiter-approved designs.",
                },
                {
                    image: "image3",
                    title: "3. Fill Out the Form",
                    description: "Provide your skills, education, and experience.",
                },
                {
                    image: "image4",
                    title: "4a. Instant CV",
                    description: "Download your ATS-friendly CV immediately.",
                },
                {
                    image: "image5",
                    title: "4b. Manager Review (Optional)",
                    description: "Our HR experts polish and send your CV within 24h.",
                },
                {
                    image: "image6",
                    title: "5. Apply with Confidence",
                    description: "Use your CV to stand out and land interviews.",
                },
            ],
        },

        // 🟣 Final CTA
        {
            type: "section",
            align: "center",
            left: {
                type: "text",
                title: "Start Your Career the Right Way",
                description:
                    `Sign up today, fill in your details, and either download your CV instantly or let our HR team perfect it within 24 hours.`,
                centerTitle: true,
                centerDescription: true,
            },
        },

        // 🟣 FAQ
        {
            type: "faq",
            items: [
                {
                    question: "How fast will I get my CV?",
                    answer: "Instantly if you use the automatic builder. If you choose Manager Review, you’ll receive the polished CV within 24 hours.",
                },
                {
                    question: "Can I try multiple templates?",
                    answer: "Yes. You can preview and switch templates before downloading.",
                },
                {
                    question: "Do I need design skills?",
                    answer: "Not at all. Everything is handled automatically, and if you choose review, our HR team polishes the design and content.",
                },
                {
                    question: "Is it ATS-friendly?",
                    answer: "Yes. Both instant and reviewed CVs are recruiter-approved and ATS-optimized.",
                },
            ],
        },
    ],
};

export default schema;
