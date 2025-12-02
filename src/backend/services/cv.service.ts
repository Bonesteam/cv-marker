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

// ---------- BASE PROMPTS ----------
const buildSimplePrompt = (b: any, email: string) => `
Create a concise, professional CV in English.
Include sections: Summary, Work Experience, Education, Skills.

Please take into account the user's visual and style preferences when producing the CV.

CV Style: ${b.cvStyle || 'standard'}
Preferred font (for PDF metadata): ${b.customFont || b.fontStyle || 'default'}
Primary color (for PDF metadata / accents): ${b.customColor || b.themeColor || 'default'}
Selected extras: ${Array.isArray(b.extras) && b.extras.length ? b.extras.join(", ") : 'none'}

Name: ${b.fullName}
Email: ${email}
Phone: ${b.phone}
Industry: ${b.industry}
Experience Level: ${b.experienceLevel}

Summary: ${b.summary}
Work Experience: ${b.workExperience}
Education: ${b.education}
Skills: ${b.skills}
`;

const buildDetailedPrompt = (b: any, email: string) => `
Create a detailed recruiter-friendly CV in English.
Include sections: Summary, Key Achievements, Work Experience, Education, Skills, Languages, and Professional Impact.

When creating the CV, respect the user's chosen CV style and appearance preferences.

CV Style: ${b.cvStyle || 'detailed'}
Preferred font (for PDF metadata): ${b.customFont || b.fontStyle || 'default'}
Primary color (for PDF metadata / accents): ${b.customColor || b.themeColor || 'default'}
Selected extras: ${Array.isArray(b.extras) && b.extras.length ? b.extras.join(", ") : 'none'}

Name: ${b.fullName}
Email: ${email}
Phone: ${b.phone}
Industry: ${b.industry}
Experience Level: ${b.experienceLevel}

Summary: ${b.summary}
Work Experience: ${b.workExperience}
Education: ${b.education}
Skills: ${b.skills}
`;

// ---------- EXTRA PROMPTS ----------
const buildExtraPrompts = {
    coverLetter: (b: any) => `
You are a professional HR copywriter. Write a fully finished, one-page cover letter for ${b.fullName}, applying for a ${b.industry} role. 
Use a professional tone and include motivation, key achievements, and career goals. 
Do not ask any questions — output only the final letter.

Summary: ${b.summary}
Experience: ${b.workExperience}
Education: ${b.education}
Skills: ${b.skills}
`,

    linkedin: (b: any) => `
You are a LinkedIn optimization expert. Write a complete and ready-to-publish "About" section for ${b.fullName}, 
a ${b.experienceLevel} professional in ${b.industry}. 
Focus on strengths, leadership, and career achievements. 
Do not ask questions — return only the finished text.
`,

    keywords: (b: any) => `
List exactly 20 high-impact, comma-separated keywords recruiters use for ${b.industry} (${b.experienceLevel}) positions. 
Focus on hard and soft skills, tools, and industry terminology. Return only the list.
`,

    atsCheck: (b: any) => `
Write a brief ATS (Applicant Tracking System) compatibility report for this CV. 
Describe keyword optimization, formatting quality, and recruiter readability in plain English. 
Return a concise, ready-to-read report — no explanations or questions.
`,

    jobAdaptation: (b: any) => `
You are a senior recruiter adapting a CV for a ${b.industry} job. 
Rewrite the Summary and Work Experience sections to align perfectly with recruiter expectations. 
Return only the adapted, finished text — do not request more info or clarification.

Summary: ${b.summary}
Work Experience: ${b.workExperience}
Education: ${b.education}
Skills: ${b.skills}
`,

    achievements: (b: any) => `
Generate exactly 5 measurable and resume-ready achievements for a ${b.experienceLevel} ${b.industry} specialist. 
Each achievement should use a strong action verb and a quantifiable outcome. 
Return only the bullet list, no commentary.
`,

    skillsGap: (b: any) => `
Write a short "Skills Gap Analysis" report for a ${b.experienceLevel} ${b.industry} professional. 
Identify 5 missing but valuable skills and recommend 3 courses or learning paths to close these gaps. 
Output only the report text.
`,
    customFont: (b: any) => `
You are an assistant that prepares a short note describing how to apply a custom font to a CV PDF. The user selected font: ${b.customFont || 'default'}. 
Return a 2-3 sentence instruction or note that can be embedded in the PDF metadata to indicate the chosen font and any fallback recommendations. Output only the note.
`,

    customColor: (b: any) => `
You are an assistant that prepares a short note describing the chosen color scheme for a CV. The user selected color: ${b.customColor || 'default'}. 
Return a 2-3 sentence description of the color usage (heading color, accent, and body text contrast) suitable for inclusion in the PDF metadata. Output only the description.
`,

    portfolioLayout: (b: any) => `
You are a UX-savvy portfolio designer. Produce a short, structured "Portfolio layout guide" for ${b.fullName} (max 6 bullet points) describing which projects to highlight, suggested order, and brief layout hints (use of images, captions, project outcomes). Keep it concise and ready-to-use by a PDF designer.
`,

    personalBranding: (b: any) => `
Write a concise personal branding blurb (2-3 short paragraphs) for ${b.fullName} aimed at a ${b.experienceLevel} ${b.industry} professional. Focus on unique value proposition, tone, and visual/phrasing cues that should appear on the CV or portfolio.
`,

    prioritySupport: (b: any) => `
You are a customer-support assistant. Produce a short confirmation message (1-2 sentences) describing the priority support level the user purchased and the expected SLA (e.g., response within 24 hours). Return only the message.
`,

    multiLocale: (b: any) => `
Translate the complete CV content into the target locale(s). The user requested locales: ${b.locales || 'not specified'}. 
For each locale listed (comma-separated), produce a short translated Summary section suitable for that locale (1-2 paragraphs each). If no locales provided, return a short note explaining that no locales were requested.
`,

    jobMatch: (b: any) => `
You are a senior recruiter creating a job-matching summary. Given the CV content for ${b.fullName}, write a concise (3-5 bullet) "Match summary" that maps the candidate's top strengths to common job requirements in ${b.industry}. Output only the bullet list.
`,
};

// ---------- SERVICE ----------
export const cvService = {
    async createOrder(userId: string, email: string, body: any): Promise<CVOrderType> {
        log("createOrder", "Start", { userId, email, reviewType: body.reviewType });

        const user = await User.findById(userId);
        if (!user) throw new Error("UserNotFound");

        const BASE_COST: Record<string, number> = { instant: 25, manager: 60, hr_plus: 90, priority: 120, expert: 180 };
        const EXTRA_COST: Record<string, number> = {
            coverLetter: 12,
            linkedin: 18,
            keywords: 15,
            atsCheck: 14,
            jobAdaptation: 25,
            achievements: 12,
            skillsGap: 16,
            customFont: 5,
            customColor: 5,
            portfolioLayout: 20,
            personalBranding: 10,
            prioritySupport: 8,
            multiLocale: 30,
            jobMatch: 22,
        };

        const baseCost = BASE_COST[body.reviewType] ?? 30;
        const extrasCost = (body.extras || []).reduce(
            (sum: number, key: string) => sum + (EXTRA_COST[key] || 0),
            0
        );
        const totalCost = baseCost + extrasCost;

        // 🧾 Перевірка балансу
        if (user.tokens < totalCost) throw new Error("InsufficientTokens");

        // 💳 Списуємо токени та записуємо транзакцію
        user.tokens -= totalCost;
        await user.save();

        await transactionService.record(
            user._id,
            user.email,
            totalCost,
            "spend",
            user.tokens
        );

        log("createOrder", `💸 Tokens spent & transaction recorded`, {
            totalCost,
            balanceAfter: user.tokens,
        });

        // 🧠 Генерація CV
        const requiresManualReview = ["manager", "hr_plus", "priority", "expert"];
        const isManager = requiresManualReview.includes(body.reviewType);
        const mainPrompt = isManager ? buildDetailedPrompt(body, email) : buildSimplePrompt(body, email);

        const mainRes = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "system",
                    content:
                        "You are a professional HR CV generator. Always return a finished, well-formatted CV text. Never ask clarifying questions.",
                },
                { role: "user", content: mainPrompt },
            ],
        });
        const mainText = mainRes.choices[0].message?.content || "";

        // ✨ Генерація extras
        const extrasData: Record<string, string> = {};
        // Robust extras handling: canonicalize incoming extras and try to match available extra prompts
        const availableKeys = Object.keys(buildExtraPrompts);
        const normalize = (s: string) => String(s || "").toLowerCase().replace(/[^a-z0-9]+/g, "");

        const requested = (body.extras || []) as string[];
        log("createOrder", "Requested extras", { requested });

        const mappedExtras: string[] = [];
        const unmatched: string[] = [];

        for (const ex of requested) {
            if (!ex) continue;
            if (availableKeys.includes(ex)) {
                mappedExtras.push(ex);
                continue;
            }

            const norm = normalize(ex);
            const found = availableKeys.find((k) => normalize(k) === norm);
            if (found) mappedExtras.push(found);
            else unmatched.push(ex);
        }

        if (unmatched.length) log("createOrder", "Unmatched extras (ignored)", { unmatched });

        for (const extra of mappedExtras) {
            const fn = buildExtraPrompts[extra as keyof typeof buildExtraPrompts];
            if (!fn) {
                log("createOrder", "No generator fn for extra (skipping)", { extra });
                continue;
            }
            try {
                const extraRes = await openai.chat.completions.create({
                    model: "gpt-4o-mini",
                    messages: [
                        {
                            role: "system",
                            content:
                                "You are a professional HR assistant. Always provide the final polished text, without asking for more details or context.",
                        },
                        { role: "user", content: fn(body) },
                    ],
                });
                extrasData[extra] = extraRes.choices[0].message?.content || "";
                log("createOrder", `✅ Extra generated: ${extra}`);
            } catch (err: any) {
                log("createOrder", `❌ Error generating extra: ${extra}`, err.message);
            }
        }

        const readyAt = isManager
            ? new Date(Date.now() + 60 * 1000) // simulate manual review delay (1 min for test)
            : new Date();

        // 💾 Створюємо CVOrder
        const orderDoc = await CVOrder.create({
            userId: new mongoose.Types.ObjectId(userId),
            email,
            ...body,
            // persist server-calculated total to avoid frontend/server mismatch
            totalTokens: totalCost,
            response: mainText,
            extrasData,
            status: isManager ? "pending" : "ready",
            readyAt,
        });

        const order = orderDoc.toObject() as CVOrderType;
        log("createOrder", "✅ Completed", { id: order._id, extrasKeys: Object.keys(extrasData) });

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
