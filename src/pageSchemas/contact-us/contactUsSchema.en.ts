import { PageSchema } from "@/components/constructor/page-render/types";
import { COMPANY_NAME, COMPANY_EMAIL, COMPANY_ADDRESS, COMPANY_NUMBER } from "@/resources/constants";

const contactPage: PageSchema = {
    meta: {
        title: `Contact — ${COMPANY_NAME}`,
        description: `Connect with ${COMPANY_NAME}. Have a question, need help, or want to discuss collaboration? Our team is always ready to assist.`,
        keywords: [
            `${COMPANY_NAME} contact`,
            "support center",
            "get in touch",
            "help desk",
            "customer service",
        ],
        canonical: "/contact-us",
        ogImage: {
            title: `Contact ${COMPANY_NAME}`,
            description: "Let’s connect — we’re here for you.",
            bg: "#f9fafb",
            color: "#111827",
        },
    },
    blocks: [
        // 🔹 Hero Intro
        {
            type: "custom",
            component: "HeroSection",
            title: "Contact Us",
            highlight: "We’re Here to Help",
            description: `Got questions about ${COMPANY_NAME}? Whether it’s support, partnerships, or general inquiries — we’d love to hear from you.`,
            image: "image9",
        },

        // 🔹 Contact Form
        {
            type: "custom",
            component: "ContactForm",
        },

        // 🔹 FAQ Section for Trust
        {
            type: "faq",
            items: [
                {
                    question: "When can I expect a response?",
                    answer:
                        "Our team usually replies within 24 hours during business days.",
                },
                {
                    question: "Is it possible to arrange a meeting?",
                    answer:
                        "Yes, simply send us a message through the contact form, and we’ll schedule a convenient time for a call.",
                },
                {
                    question: "Do you offer support over the weekend?",
                    answer:
                        "Our support team is available Monday through Friday. If you reach out on the weekend, we’ll get back to you as soon as possible on the next business day.",
                },
            ],
        },
    ],
};

export default contactPage;

