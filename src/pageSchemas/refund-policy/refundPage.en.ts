import { PageSchema } from "@/components/constructor/page-render/types";
import {
    COMPANY_NAME,
    COMPANY_LEGAL_NAME,
    COMPANY_NUMBER,
    COMPANY_ADDRESS,
    COMPANY_EMAIL,
} from "@/resources/constants";

const refundPolicySchema: PageSchema = {
    meta: {
        title: `Refund & Cancellation Policy – ${COMPANY_NAME}`,
        description: `Learn how ${COMPANY_NAME} handles refunds and cancellations for token packages, used and unused credits, defective outputs, and promotional offers.`,
        keywords: [
            "refund policy",
            "cancellation terms",
            "refund conditions",
            "unused tokens",
            "defective resume",
            "consumer rights",
        ],
        canonical: "/refund-policy",
        ogImage: {
            title: `${COMPANY_NAME} – Refund & Cancellation Policy`,
            description: "Clear and transparent refund rules for resume services.",
            bg: "#ffffff",
            color: "#000000",
        },
    },
    blocks: [
        {
            type: "text",
            title: "Refund & Cancellation Policy",
            description: "Effective from: 10 September 2025",
        },
        {
            type: "text",
            title: "1. Customer Overview",
            bullets: [
                "Refunds are issued according to this Policy and relevant consumer laws.",
                "Once approved, refunds are usually processed within 5–10 business days. Bank or payment provider processing times may vary.",
                "Refunds cannot exceed the amount originally paid (excluding non-refundable processing fees).",
                "Tokens already used for Services such as generation, export, or review are typically non-refundable.",
                "Unused token packages may qualify for a refund if no tokens were spent.",
                "Bonus tokens, discounts, and promotional credits are generally non-refundable unless otherwise required by law.",
                `To request a refund, please email ${COMPANY_EMAIL} with your order details.`,
                "This Policy may be updated periodically. Significant changes will be communicated as outlined in Section 8.",
                "By using Services immediately (e.g., generating or downloading a CV), you acknowledge that your statutory cancellation rights may no longer apply — see Section 4.6.",
            ],
        },
        {
            type: "text",
            title: "2. Scope & Legal Disclaimer",
            description: `This Policy governs all refunds and cancellations related to CV/resume generation, export, AI enhancement, and related features provided by ${COMPANY_LEGAL_NAME}. It does not restrict your legal rights under the Consumer Contracts Regulations 2013 or the Consumer Rights Act 2015 (where applicable).`,
        },
        {
            type: "text",
            title: "3. Key Definitions",
            bullets: [
                "Order / Service Fee — the total payment made for token packages.",
                "Token Package — prepaid credits granting access to Services.",
                "Used Tokens — tokens deducted for generating drafts, downloads, or HR reviews.",
                "Unused Tokens — credits remaining in your account.",
                "Promotional Credits — complimentary tokens or discounts from special offers.",
            ],
        },
        {
            type: "text",
            title: "4. Refund Conditions",
            description:
                "4.1 Refund limit — Refunds cannot exceed the amount originally paid (less payment provider fees). Refunds are made in the same currency when possible.\n\n" +
                "4.2 Used tokens — Tokens spent on Services are non-refundable unless the Service output was faulty and could not be corrected.\n\n" +
                "4.3 Cancellation before use — If you cancel before using any tokens, your unused balance may be refunded after deducting reasonable administrative costs.\n\n" +
                "4.4 Defective outputs — If a generated CV/resume contains significant errors, we will first attempt to fix or regenerate it. If the issue persists, a partial or full refund may be provided.\n\n" +
                "4.5 Promotional items — Free credits or bonus tokens are typically non-refundable unless required by applicable law.\n\n" +
                "4.6 Immediate access waiver — Once you request instant use of Services (e.g., by generating or downloading a file), your right to cancel may no longer apply.\n\n" +
                "4.7 Custom HR services — For personalized HR or manager reviews, refunds are unavailable once work has begun unless agreed otherwise in writing.",
        },
        {
            type: "text",
            title: "5. How to Request a Refund",
            description: `Please send your request via email to ${COMPANY_EMAIL} and include:`,
            bullets: [
                "Your order reference number.",
                "The account email used for the purchase.",
                "Whether the request concerns unused tokens, cancellation, or defective outputs.",
                "If defective: a short description of the issue and supporting evidence (screenshots, filenames, timestamps).",
                "Preferred refund method (typically the original payment method).",
                "We will acknowledge your request within 5 business days, investigate if needed, and issue a decision. Approved refunds are processed within 5–10 business days after confirmation (bank posting times may vary).",
            ],
        },
        {
            type: "text",
            title: "6. Review & Decision Process",
            description:
                "6.1 We examine payment records, token usage, and file generation logs to verify claims.\n\n" +
                "6.2 Approved refunds are returned to the original payment method. If unavailable, we may propose an alternative (e.g., bank transfer).\n\n" +
                "6.3 If a refund request is denied, you will receive a clear explanation and details on how to appeal.",
        },
        {
            type: "text",
            title: "7. Chargebacks, Fraud & Misuse",
            description:
                "If a chargeback is initiated while a refund request is under review, it will be treated as a dispute. ${COMPANY_NAME} will provide full transaction evidence to the payment processor. Repeated or fraudulent chargebacks may lead to account suspension or refusal of future refunds.",
        },
        {
            type: "text",
            title: "8. Policy Updates",
            description:
                "We may revise this Policy periodically. Major changes will be announced on our website or via email. Updates apply prospectively and do not affect previous transactions.",
        },
        {
            type: "text",
            title: "9. Data & Record Retention",
            description:
                "We retain order, payment, and token usage records for at least 24 months, or up to 6 years in cases involving disputes, in line with our Privacy Policy and legal obligations.",
        },
        {
            type: "text",
            title: "10. Disputes & Escalation",
            description: `If you disagree with our decision, please email your full appeal to ${COMPANY_EMAIL}. Appeals are typically reviewed within 10 business days. This does not affect your legal rights to pursue external resolution or other remedies.`,
        },
        {
            type: "text",
            title: "11. Practical Examples",
            bullets: [
                "Unused tokens — Purchase £20 = 2000 tokens, use 300 → 1700 remain → refund possible for 1700 tokens (minus processing fees).",
                "Used tokens — Refunds only possible if generated output was materially defective.",
                "Promotional tokens — Free or bonus credits cannot be refunded.",
            ],
        },
        {
            type: "text",
            title: "12. Contact Information",
            bullets: [
                `📧 ${COMPANY_EMAIL}`,
                `📍 ${COMPANY_LEGAL_NAME}`,
                COMPANY_ADDRESS ?? "Address not specified",
            ],
        },
    ],
};

export default refundPolicySchema;

