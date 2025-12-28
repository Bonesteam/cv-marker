import { CVOrder } from "../models/cvOrder.model";
import { User } from "../models/user.model";
import { ENV } from "../config/env";
import OpenAI from "openai";
import { CVOrderType } from "../types/cv.types";
import mongoose from "mongoose";
import { transactionService } from "../services/transaction.service";

const openai = new OpenAI({ apiKey: ENV.OPENAI_API_KEY });

const log = (fn: string, msg: string, data?: any) => {
    const time = new Date().toISOString();
    console.log(`[${time}] 🧩 [cvService.${fn}] ${msg}`, data ?? "");
};

// ---------- BASE PROMPTS (Тільки для текстового вмісту) ----------
const buildSimplePrompt = (b: any, email: string) => `
Create concise professional content for a CV in English.

USER INFORMATION:
- Name: ${b.fullName}
- Email: ${email}
- Phone: ${b.phone}
- Industry: ${b.industry}
- Experience Level: ${b.experienceLevel}

CONTENT TO GENERATE:
1. SUMMARY SECTION: ${b.summary}
2. WORK EXPERIENCE SECTION: ${b.workExperience}
3. EDUCATION SECTION: ${b.education}
4. SKILLS SECTION: ${b.skills}

OUTPUT FORMAT:
Return the content in this exact format:
SUMMARY: [Your generated summary text]
EXPERIENCE: [Your generated experience text]
EDUCATION: [Your generated education text]
SKILLS: [Your generated skills text]

IMPORTANT:
- Keep it concise and professional
- Use bullet points where appropriate
- Format dates consistently (YYYY–YYYY)
- Quantify achievements with numbers
- Include technologies mentioned
`;

// ---------- EXTRA PROMPTS ----------
const buildExtraPrompts = {
    coverLetter: (b: any) => `
Write a professional cover letter for ${b.fullName}.

PERSONAL INFO:
- Name: ${b.fullName}
- Position: ${b.experienceLevel} ${b.industry} Professional
- Email: ${b.email || 'Provided in CV'}
- Phone: ${b.phone}

BACKGROUND:
- Summary: ${b.summary}
- Key Skills: ${b.skills}
- Experience: ${b.workExperience}

COVER LETTER FORMAT (exactly as in PDF examples):
[Your Address]
[City, State, Zip Code]
[Email Address]
[Phone Number]
[Date]

[Hiring Manager's Name]
[Company's Name]
[Company's Address]
[City, State, Zip Code]

Dear [Hiring Manager's Name],

[Main body paragraphs]

Thank you for considering my application. I look forward to the possibility of discussing how I can contribute...

Sincerely,
${b.fullName}
`,

    linkedin: (b: any) => `
Create a LinkedIn "About" section for ${b.fullName}.

Format exactly like this:

# LINKEDIN SUMMARY

As a seasoned IT professional with over 15 years of experience, I have consistently demonstrated a commitment to driving technological innovation and excellence. My career is marked by a series of leadership roles where I have successfully led teams...

Throughout my journey, I have developed a robust skill set encompassing strategic planning, project management, and cross-functional collaboration. I pride myself on my ability to cultivate a culture of inclusivity and continuous improvement...

Notable achievements include spearheading the migration of legacy systems to cloud-based solutions, resulting in a 30% reduction in operational costs and a marked improvement in system reliability...

I hold a Master's degree in Information Technology and various industry certifications, ensuring that I remain at the forefront of technological advancements...

As I continue to advance in my career, I am excited to explore new challenges and opportunities that allow me to impact the IT landscape significantly. Let's connect and discuss how we can collaborate...
`,

    keywords: (b: any) => `JavaScript, TypeScript, React, Next.js, Node.js, MongoDB, Git, Agile, ${b.industry}, ${b.experienceLevel}, Software Development, Web Development, UI/UX, REST APIs, Cloud Computing`,
    
    atsCheck: (b: any) => `
ATS COMPATIBILITY REPORT

✅ STRENGTHS:
- Clear section structure with standard headings
- Quantifiable achievements included
- Relevant keywords present: ${b.skills}
- Consistent formatting throughout

⚠️ RECOMMENDATIONS:
- Ensure dates follow YYYY–YYYY format
- Include industry-specific terminology
- Add measurable results to all experience points
- Use standard section names

📊 SCORE: 8.5/10
This CV is well-optimized for ATS systems with good keyword density and structure.
`,

    jobAdaptation: (b: any) => `
JOB-TAILORED VERSION FOR ${b.industry} ${b.experienceLevel} ROLE:

SUMMARY:
Experienced ${b.industry} professional with ${b.experienceLevel.toLowerCase()} expertise in ${b.skills.split(',').slice(0, 3).join(', ')}. Proven track record of delivering scalable solutions and improving system performance.

EXPERIENCE HIGHLIGHTS:
- Redesigned ${b.industry} systems resulting in 30% efficiency improvement
- Led cross-functional teams in ${b.industry} project implementations
- Implemented best practices for ${b.industry} development workflows
`,

    achievements: (b: any) => `
• Improved application load times by 30% through performance optimization
• Mentored 3 junior developers, improving team productivity by 25%
• Reduced operational costs by 20% through process automation
• Increased user engagement by 40% with UI/UX improvements
• Led migration to cloud infrastructure, improving scalability
`,

    skillsGap: (b: any) => `
SKILLS GAP ANALYSIS FOR ${b.experienceLevel} ${b.industry} PROFESSIONAL

🔍 CURRENT SKILLS: ${b.skills}

📈 RECOMMENDED SKILLS TO DEVELOP:
1. Cloud Certifications (AWS/Azure)
2. Advanced DevOps practices
3. Machine Learning fundamentals
4. Project management methodologies
5. Advanced security protocols

🎯 LEARNING PATHS:
1. AWS Certified Solutions Architect
2. Kubernetes & Docker mastery
3. Scrum Master certification
4. Cybersecurity fundamentals course
`,
};

// ---------- SERVICE ----------
export const cvService = {
    async createOrder(userId: string, email: string, body: any): Promise<CVOrderType> {
        log("createOrder", "Start", { userId, email, reviewType: body.reviewType });

        const user = await User.findById(userId);
        if (!user) throw new Error("UserNotFound");

        const BASE_COST: Record<string, number> = { 
            instant: 25, 
            manager: 60, 
            hr_plus: 90, 
            priority: 120, 
            expert: 180 
        };
        
        const EXTRA_COST: Record<string, number> = {
            coverLetter: 10,
            linkedin: 15,
            keywords: 12,
            atsCheck: 12,
            jobAdaptation: 20,
            achievements: 10,
            skillsGap: 15,
            customFont: 5,
            customColor: 5,
        };

        const baseCost = BASE_COST[body.reviewType] ?? 30;
        const extrasCost = (body.extras || []).reduce(
            (sum: number, key: string) => sum + (EXTRA_COST[key] || 0),
            0
        );
        const totalCost = baseCost + extrasCost;

        if (user.tokens < totalCost) throw new Error("InsufficientTokens");

        user.tokens -= totalCost;
        await user.save();

        await transactionService.record(
            user._id,
            user.email,
            totalCost,
            "spend",
            user.tokens
        );

        // 🧠 Генерація основного тексту CV (без дизайну)
        let mainText = "";
        try {
            const mainRes = await openai.chat.completions.create({
                model: "gpt-4o-mini",
                messages: [
                    {
                        role: "system",
                        content: "You are a professional CV writer. Generate concise, professional CV content. Use bullet points and quantify achievements.",
                    },
                    { role: "user", content: buildSimplePrompt(body, email) },
                ],
                temperature: 0.7,
                max_tokens: 1500,
            });
            mainText = mainRes.choices[0].message?.content || "";
        } catch (error) {
            console.error("OpenAI CV generation error:", error);
            // Fallback content
            mainText = `SUMMARY: ${body.summary}\n\nEXPERIENCE: ${body.workExperience}\n\nEDUCATION: ${body.education}\n\nSKILLS: ${body.skills}`;
        }

        // ✨ Генерація extras
        const extrasData: Record<string, string> = {};
        const requested = (body.extras || []) as string[];

        for (const extra of requested) {
            const generator = buildExtraPrompts[extra as keyof typeof buildExtraPrompts];
            if (generator) {
                try {
                    const extraRes = await openai.chat.completions.create({
                        model: "gpt-4o-mini",
                        messages: [
                            {
                                role: "system",
                                content: "You are a professional HR assistant. Provide complete, polished content.",
                            },
                            { role: "user", content: generator(body) },
                        ],
                        temperature: 0.7,
                        max_tokens: 1000,
                    });
                    extrasData[extra] = extraRes.choices[0].message?.content || "";
                } catch (error) {
                    console.error(`Error generating ${extra}:`, error);
                    extrasData[extra] = `[${extra} content would be generated here]`;
                }
            }
        }

        const requiresManualReview = ["manager", "hr_plus", "priority", "expert"];
        const isManager = requiresManualReview.includes(body.reviewType);
        
        const readyAt = isManager
            ? new Date(Date.now() + 24 * 60 * 60 * 1000)
            : new Date();

        // 💾 Створюємо замовлення
        const orderDoc = await CVOrder.create({
            userId: new mongoose.Types.ObjectId(userId),
            email,
            ...body,
            totalTokens: totalCost,
            response: mainText,  // Текстовий контент
            extrasData,
            status: isManager ? "pending" : "ready",
            readyAt,
        });

        const order = orderDoc.toObject() as CVOrderType;
        log("createOrder", "✅ Completed", { 
            id: order._id, 
            cvStyle: order.cvStyle,
            reviewType: order.reviewType 
        });

        return order;
    },

    async getOrders(userId: string): Promise<CVOrderType[]> {
        const docs = await CVOrder.find({ userId }).sort({ createdAt: -1 });
        return docs.map((d) => d.toObject() as CVOrderType);
    },

    async getOrderById(userId: string, orderId: string): Promise<CVOrderType | null> {
        const doc = await CVOrder.findOne({ _id: orderId, userId });
        return doc ? (doc.toObject() as CVOrderType) : null;
    },
};