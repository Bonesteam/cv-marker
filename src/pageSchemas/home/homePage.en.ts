import { PageSchema } from "@/components/constructor/page-render/types";
import { COMPANY_NAME } from "@/resources/constants";

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
    // --- HERO SECTION ---
    {
      type: "custom",
      component: "HeroSection",
      title: "Instant CVs, Expertly Crafted for Success",
      highlight: "Build Smart. Apply Confidently.",
      description: `Get your ATS-friendly CV instantly, or choose our HR Manager Review for a personalized, polished result within 24 hours.`,
      primaryCta: { text: "Create My CV", link: "/get-started" },
      image: "image1",
    },

    // --- WHY CHOOSE US --- (moved up for credibility early)
    {
      type: "custom",
      component: "ValuesIcons",
      title: "Why Professionals Choose Us",
      description: `From instant templates to expert review, ${COMPANY_NAME} adapts to your career goals.`,
      values: [
        { icon: "⚡", title: "Instant CV", text: "Get an ATS-ready CV in seconds." },
        { icon: "🕒", title: "24h Review", text: "Our HR experts polish your CV overnight." },
        { icon: "📑", title: "ATS Approved", text: "Pass recruiter filters effortlessly." },
        { icon: "🎨", title: "Modern Templates", text: "Beautiful, professional, and editable." },
      ],
    },

    // --- STATS STRIP (earlier for trust proof) ---
    {
      type: "custom",
      component: "StatsStrip",
      stats: [
        { value: "30K+", label: "CVs Created" },
        { value: "97%", label: "User Satisfaction" },
        { value: "24h", label: "Review Turnaround" },
        { value: "100%", label: "ATS Compatibility" },
      ],
    },

    // --- FEATURE HIGHLIGHT ---
    {
      type: "section",
      align: "center",
      left: {
        type: "text",
        title: "Your CV, Designed to Impress",
        description: `Every layout is built for recruiters — clean, clear, and optimized for ATS scanning.`,
        centerTitle: true,
        centerDescription: true,
      },
    },

    // --- HOW IT WORKS ---
    {
      type: "custom",
      component: "Timeline",
      title: "How It Works",
      steps: [
        { title: "1. Fill the Form", description: "Enter your experience, education, and skills." },
        { title: "2. Instant CV", description: "Download your CV immediately with your chosen template." },
        { title: "3. Manager Review (Optional)", description: "HR experts perfect your CV for maximum impact." },
        { title: "4. Delivery in 24h", description: "Receive your refined version directly to your inbox." },
      ],
    },

    // --- VIDEO DEMO (after process, so user visualizes it) ---
    {
      type: "custom",
      component: "VideoDemo",
      title: "See How It Works in Action",
      description: "Watch how easily you can create your CV and how our experts help refine it.",
      video: "CVMakerDemo",
    },

    // --- HIGHLIGHT STRIP (reused after demo for emphasis) ---
    {
      type: "custom",
      component: "HighlightStrip",
      messages: [
        "50+ Modern Templates",
        "Instant Download in Seconds",
        "GDPR-Compliant Security",
        "Optional Expert Review",
      ],
    },

    // --- PRICING CARDS (mid-page, after trust built) ---
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
            "Basic formatting options included",
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
            "Priority email support",
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
            "Dedicated priority support",
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
            "Credits never expire",
          ],
          buttonText: "Buy Custom",
          buttonLink: "/checkout?plan=custom",
        },
      ],
    },

    // --- TESTIMONIALS (after pricing for social proof) ---
    {
      type: "custom",
      component: "TestimonialsSlider",
      testimonials: [
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
        {
          name: "Dmytro Koval",
          role: "UX Designer",
          image: "review1",
          text: "Used the instant option and was impressed — clean layout and great structure!",
        },
      ],
    },

    // --- CTA (moved below testimonials for conversion) ---
    {
      type: "section",
      align: "center",
      left: {
        type: "text",
        title: `Build Your Perfect CV — Instantly or with Expert Help`,
        description: `Join thousands of professionals who trust ${COMPANY_NAME} to showcase their careers with confidence.`,
        centerTitle: true,
        centerDescription: true,
      },
    },

    // --- FAQ ---
    {
      type: "faq",
      items: [
        {
          question: "What’s the difference between Instant CV and Manager Review?",
          answer:
            "Instant CV gives you a polished document right away. Manager Review adds a human touch — our HR experts refine it to highlight your strengths.",
        },
        {
          question: "Are all your templates ATS-friendly?",
          answer:
            "Yes. Every template is tested to pass Applicant Tracking Systems, ensuring recruiters see your CV.",
        },
        {
          question: "Can I edit or update my CV after downloading?",
          answer:
            "Yes. You can log in anytime to make updates, generate new versions, or try different templates.",
        },
        {
          question: "How secure is my personal data?",
          answer:
            "All data is encrypted and GDPR-compliant. Your privacy is always our top priority.",
        },
        {
          question: "Do you offer help with cover letters or LinkedIn profiles?",
          answer:
            "Yes. Premium users get a cover letter builder, and we also offer LinkedIn optimization as an add-on.",
        },
      ],
    },

    // --- CONTACT (final section) ---
    {
      type: "custom",
      component: "ContactForm",
      title: "Need Help?",
      description: "Contact our support team for assistance or guidance.",
    },
  ],
};

export default schema;



