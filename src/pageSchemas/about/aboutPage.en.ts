import { PageSchema } from "@/components/constructor/page-render/types";
import { COMPANY_NAME } from "@/resources/constants";

const schema: PageSchema = {
    meta: {
        title: `About Us — ${COMPANY_NAME}`,
        description: `${COMPANY_NAME} merges instant AI-powered CV creation with expert HR review. Craft your resume in seconds or opt for a professional touch-up within 24 hours.`,
        keywords: [
            `${COMPANY_NAME}`,
            "AI resume builder",
            "create professional CV",
            "resume generator",
            "career tools",
            "ATS-friendly resume",
            "HR review",
        ],
        canonical: "/about-us",
        ogImage: {
            title: `${COMPANY_NAME}`,
            description: "AI resumes + expert review within 24h",
            bg: "#0a2540",
            color: "#ffffff",
        },
    },
    blocks: [
        {
            type: "custom",
            component: "HeroSection",
            title: `About ${COMPANY_NAME}`,
            highlight: "Our Mission & Vision",
            description: `At ${COMPANY_NAME}, we aim to make professional resumes accessible to everyone.  
Our technology instantly builds modern, ATS-friendly CVs, and our HR experts refine them to perfection — so every candidate can stand out.`,
            image: "image2",
        },

        {
            type: "section",
            left: {
                type: "media",
                mediaType: "image",
                src: "image5",
                alt: "Example of a professional resume",
            },
            right: {
                type: "custom",
                component: "InfoBlock",
                title: `Why ${COMPANY_NAME}?`,
                description: "We blend automation and expertise — offering speed when you need it, and precision when it counts most.",
                bullets: [
                    "AI-powered resume creation in seconds",
                    "Optional HR review completed within 24 hours",
                    "Tailored CVs for your specific career field",
                ],
            },
        },

        // 🔹 Our Story
        {
            type: "section",
            left: {
                type: "custom",
                component: "StoryTimeline",
                steps: [
                    { year: "2018", title: "Founded", description: "Created by HR professionals" },
                    { year: "2019", title: "Launched CV Generator", description: "Introduced instant AI resume builder" },
                    { year: "2021", title: "Expanded Services", description: "Added personalized HR review" },
                    { year: "2023", title: "Global Reach", description: "100K+ resumes built across the world" },
                ],
            },
            right: {
                type: "custom",
                component: "InfoBlock",
                title: "Our Story",
                image: "image2",
                description: `${COMPANY_NAME} started with one goal:  
to simplify the resume creation process for job seekers everywhere.  
We realized that many talented people were missing opportunities due to poor formatting or non-ATS-friendly resumes.  

By combining AI speed with human precision, we built a platform that empowers everyone to present their skills confidently and get noticed.`,
                bullets: [
                    "Founded by seasoned HR and tech experts",
                    "Built to close the gap between automation and human insight",
                    "Focused on helping professionals worldwide highlight their strengths",
                    "Trusted by thousands across industries — tech, healthcare, finance, and more",
                ],
            },
        },

        // 🔹 Our Vision
        {
            type: "section",
            left: {
                type: "custom",
                component: "InfoBlock",
                title: "Our Vision",
                description: `We believe professional growth tools should be fast, accessible, and reliable.  
Whether you’re applying today or refining for your dream role, ${COMPANY_NAME} helps you present your best self.`,
                bullets: [
                    "Equal access to professional resumes for everyone",
                    "Balance between automation and expert refinement",
                    "Empowering candidates to achieve career success",
                ],
            },
            right: {
                type: "media",
                mediaType: "image",
                src: "image4",
                alt: `Vision of ${COMPANY_NAME}`,
            },
        },

        // 🔹 Our Values
        {
            type: "custom",
            component: "ValuesIcons",
            values: [
                { icon: "⚡", title: "Instant Access", text: "Generate a CV immediately when speed matters most" },
                { icon: "👩‍💼", title: "Expert Touch", text: "Optional HR manager review with 24h delivery" },
                { icon: "📑", title: "ATS-Optimized", text: "Every CV is recruiter-friendly and passes ATS scans" },
                { icon: "🤝", title: "Trust", text: "Thousands of job seekers already rely on us" },
            ],
        },

        // 🔹 What Makes Us Different
        {
            type: "section",
            align: "center",
            left: {
                type: "text",
                title: "What Makes Us Different",
                description: `${COMPANY_NAME} bridges the gap between technology and expertise.  
Choose instant AI generation or let a human professional polish your CV for maximum impact.`,
                centerTitle: true,
                centerDescription: true,
            },
        },

        // 🔹 Meet the Team
        {
            type: "custom",
            component: "TeamGrid",
            title: "Meet Our Team",
            description: `Behind ${COMPANY_NAME} is a dedicated team of developers, HR consultants, and designers working together to redefine modern job application tools.`,
            members: [
                { name: "Anna Kowalski", role: "HR Manager", bio: "Over a decade in recruitment and career guidance.", image: "team1" },
                { name: "John Doe", role: "Lead Developer", bio: "Building the future of automated resume systems.", image: "team2" },
                { name: "Maria Lopez", role: "Designer", bio: "Designing clean, professional, and modern templates.", image: "team3" },
            ],
        },

        // 🔹 How It Works
        {
            type: "custom",
            component: "Timeline",
            steps: [
                { title: "1. Enter Your Details", description: "Add your experience, education, and skills into our smart form." },
                { title: "2. Choose Your Option", description: "Download your instant AI CV or request expert review." },
                { title: "3. HR Review (Optional)", description: "Our experts enhance structure, clarity, and tone for recruiters." },
                { title: "4. Receive Your CV", description: "Get your instant file immediately or a refined PDF within 24 hours." },
            ],
        },

        // 🔹 FAQ
        {
            type: "faq",
            items: [
                { question: "How fast will I get my CV?", answer: "Instantly for AI generation, or within 24 hours for expert review." },
                { question: "Is my CV compatible with ATS?", answer: "Yes, all templates are optimized to pass standard ATS scans." },
                { question: "Can I update my CV later?", answer: "Of course! You can edit and re-download anytime." },
                { question: "Do you provide refunds?", answer: "Yes. We offer a satisfaction guarantee — contact support if needed." },
            ],
        },
    ],
};

export default schema;
