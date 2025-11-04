import { NextRequest, NextResponse } from "next/server";
import { cvController } from "@/backend/controllers/cv.controller";
import { requireAuth } from "@/backend/middlewares/auth.middleware";
import { authController } from "@/backend/controllers/auth.controller";
import { attachAuthCookies } from "@/backend/utils/cookies";
import { ENV } from "@/backend/config/env";

export async function POST(req: NextRequest) {
    try {
        let payload;
        try {
            payload = await requireAuth(req); // ✅ Try normal auth first
        } catch (err) {
            // If access token is invalid/expired, try refresh flow server-side
            const refresh = req.cookies.get(ENV.REFRESH_COOKIE_NAME)?.value;
            if (!refresh) {
                return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
            }

            try {
                const ua = req.headers.get("user-agent") || undefined;
                const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || (req as any).ip || undefined;
                const { user, tokens } = await authController.refresh(refresh, ua, ip);

                // attach new cookies to response and set payload from refreshed user
                const body = await req.json();
                const res = NextResponse.json({});
                attachAuthCookies(res, tokens.accessToken, tokens.refreshToken, 60 * 60 * 24 * 30);

                // proceed using refreshed user
                payload = { ...user, sub: user._id } as any;

                const userId = payload.sub;
                const email = payload.email;
                const result = await cvController.createOrder(userId, email, body);

                // return result with refreshed cookies attached
                const final = NextResponse.json(result);
                attachAuthCookies(final, tokens.accessToken, tokens.refreshToken, 60 * 60 * 24 * 30);
                return final;
            } catch (e) {
                return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
            }
        }

        const body = await req.json();

        // ✅ Використовуємо дані з токена
        const userId = payload.sub;
        const email = payload.email;

        const result = await cvController.createOrder(userId, email, body);
        return NextResponse.json(result);
    } catch (err: any) {
        console.error("❌ Error creating CV order:", err);
        return NextResponse.json({ message: err.message }, { status: 400 });
    }
}
