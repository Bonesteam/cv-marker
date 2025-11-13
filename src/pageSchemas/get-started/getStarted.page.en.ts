import { PageSchema } from "@/components/constructor/page-render/types";
import { COMPANY_NAME } from "@/resources/constants";

const schema: PageSchema = {
  meta: {
    title: `Getting Started — ${COMPANY_NAME}`,
    description: `Discover how ${COMPANY_NAME} helps you craft a polished CV in minutes or receive an expertly reviewed version within just 24 hours.`,
    keywords: [
      `${COMPANY_NAME} onboarding`,
      "cv builder guide",
      "resume creator steps",
      "instant resume generator",
      "expert cv review",
      "professional cv builder",
    ],
    canonical: "/get-started",
    ogImage: {
      title: `Getting Started with ${COMPANY_NAME}`,
      description: "Create your CV instantly or request expert review in 24h.",
      bg: "#0a2540",
      color: "#ffffff",
    },
  },

  blocks: [
    {
      type: "custom",
      component: "HeroSection",
      title: `Start Your Journey with ${COMPANY_NAME}`,
      highlight: "Our Mission & Vision",
      description: `With ${COMPANY_NAME}, you can instantly generate a professional CV using our elegant templates or choose the Manager Review option to receive a refined version prepared by HR professionals within 24 hours.`,
      image: "image5",
    },

    {
      type: "custom",
      component: "HighlightStrip",
      messages: [
        "Instant CV generation",
        "50+ recruiter-approved templates",
        "Optional 24h HR review",
        "ATS-compatible resumes",
        "Trusted globally by job seekers",
      ],
    },

    {
      type: "custom",
      component: "ValuesIcons",
      values: [
        { icon: "⚡", title: "Fast Results", text: "Receive your CV immediately after completing the form" },
        { icon: "👩‍💼", title: "HR Expertise", text: "Request a 24-hour professional CV review" },
        { icon: "📑", title: "ATS Compliance", text: "Designed to pass Applicant Tracking Systems with ease" },
        { icon: "🎨", title: "Modern Design", text: "Select from sleek, visually appealing templates" },
      ],
    },

    {
      type: "grid",
      columns: 2,
      gap: "2rem",
      cards: [
        { image: "image1", title: "1. Create an Account", description: "Sign up and begin crafting your CV.", layout: "horizontal" },
        { image: "image2", title: "2. Pick a Template", description: "Choose a modern, recruiter-endorsed layout.", layout: "horizontal" },
        { image: "image3", title: "3. Enter Your Details", description: "Fill out your experience, education, and skills.", layout: "horizontal" },
        { image: "image4", title: "4a. Get It Instantly", description: "Download your completed CV right away.", layout: "horizontal" },
        { image: "image5", title: "4b. Request Expert Review", description: "Have HR professionals enhance your CV within 24h.", layout: "horizontal" },
        { image: "image6", title: "5. Apply Confidently", description: "Use your optimized CV to impress employers.", layout: "horizontal" },
      ],
    },

    {
      type: "section",
      align: "center",
      left: {
        type: "text",
        title: "Launch Your Career with Confidence",
        description: `Join today, complete your profile, and instantly get your CV — or let our HR team perfect it within 24 hours.`,
        centerTitle: true,
        centerDescription: true,
      },
    },

    {
      type: "faq",
      items: [
        {
          question: "When will I receive my CV?",
          answer: "You can download it instantly with the automatic builder, or within 24 hours if you choose the Manager Review option.",
        },
        {
          question: "Can I preview different templates?",
          answer: "Yes, you can switch between templates anytime before finalizing your download.",
        },
        {
          question: "Do I need to know design?",
          answer: "No design skills required — we handle everything automatically, and HR experts refine both design and text if you choose the review option.",
        },
        {
          question: "Are the CVs ATS-friendly?",
          answer: "Absolutely. All templates are optimized for Applicant Tracking Systems and recruiter standards.",
        },
      ],
    },
  ],
};

export default schema;

