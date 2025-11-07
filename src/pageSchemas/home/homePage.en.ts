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
      title: "Build Your Career the Smart Way",
      highlight: "Instant CV or Expert Review — You Choose",
      description: `Create a beautiful, ATS-ready CV in minutes or let our experts craft the perfect version for you within 24 hours.`,
      primaryCta: { text: "Start My CV", link: "/get-started" },
      image: "image1",
    },

    // --- NEW SECTION: TRUST & BRANDS ---
    {
      type: "custom",
      component: "HighlightStrip",
      messages: [
        "Trusted by 30,000+ professionals",
        "Built for global job seekers",
        "Secure & GDPR compliant",
        "HR-reviewed templates",
      ],
    },

    // --- WHY CHOOSE US ---
    {
      type: "custom",
      component: "ValuesIcons",
      title: "Why Choose Us?",
      description: `Whether you need an instant CV or expert review — ${COMPANY_NAME} has the right tool for you.`,
      values: [
        { icon: "⚡", title: "Instant CV", text: "Get an ATS-ready CV in seconds." },
        { icon: "🕒", title: "24h Review", text: "HR specialists refine your CV overnight." },
        { icon: "📑", title: "ATS Approved", text: "Guaranteed to pass recruiter filters." },
        { icon: "🎨", title: "Modern Templates", text: "Choose from clean, elegant designs." },
      ],
    },

    // --- NEW SECTION: FEATURE HIGHLIGHT ---
    {
      type: "section",
      align: "center",
      left: {
        type: "text",
        title: "Your CV, Powered by Smart Design",
        description: `Every template is designed with precision and optimized for recruiters and ATS software.`,
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
        { title: "2. Instant CV", description: "Download your CV immediately in your chosen template." },
        { title: "3. Manager Review (Optional)", description: "An HR expert refines your CV for maximum impact." },
        { title: "4. Delivery in 24h", description: "Receive your polished CV in your inbox within 24 hours." },
      ],
    },

    // --- NEW SECTION: VIDEO DEMO ---
    {
      type: "custom",
      component: "VideoDemo",
      title: "See CV Maker in Action",
      description: "Watch how our builder works and how the Manager Review enhances your result.",
      video: "CVMakerDemo",
    },

    // --- NEW SECTION: STATS / PROOF ---
    {
      type: "custom",
      component: "StatsStrip",
      stats: [
        { value: "30K+", label: "CVs Created" },
        { value: "97%", label: "User Satisfaction" },
        { value: "24h", label: "Expert Review Time" },
        { value: "100%", label: "ATS Compatibility" },
      ],
    },

    // --- PRICING CARDS ---
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

    // --- NEW SECTION: CTA ---
    {
      type: "section",
      align: "center",
      left: {
        type: "text",
        title: `Get Your CV — Instantly or Perfected by Experts`,
        description: `Instant download or manager-reviewed within 24 hours.  
                       Thousands of professionals already trust ${COMPANY_NAME}.`,
        centerTitle: true,
        centerDescription: true,
      },
    },

    // --- TESTIMONIALS ---
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

    // --- CONTACT ---
    {
      type: "custom",
      component: "ContactForm",
      title: "Need Help?",
      description: "Contact our support team for assistance or guidance.",
    },
  ],
};

export default schema;


