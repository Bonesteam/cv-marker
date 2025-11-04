import { NextRequest, NextResponse } from "next/server";
import { cvController } from "@/backend/controllers/cv.controller";
import { requireAuth } from "@/backend/middlewares/auth.middleware";
import { authController } from "@/backend/controllers/auth.controller";
import { attachAuthCookies } from "@/backend/utils/cookies";
import { ENV } from "@/backend/config/env";

export async function GET(req: NextRequest) {
    try {
        let user;
        try {
            user = await requireAuth(req);
        } catch (e) {
            const refresh = req.cookies.get(ENV.REFRESH_COOKIE_NAME)?.value;
            if (!refresh) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
            try {
                const ua = req.headers.get("user-agent") || undefined;
                const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || (req as any).ip || undefined;
                const { user: refreshedUser, tokens } = await authController.refresh(refresh, ua, ip);
                user = { ...refreshedUser, sub: refreshedUser._id } as any;
                const placeholder = NextResponse.json({});
                attachAuthCookies(placeholder, tokens.accessToken, tokens.refreshToken, 60 * 60 * 24 * 30);
            } catch (e2) {
                return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
            }
        }

        console.log("📌 AUTH CHECK:", user);
        if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

        const result = await cvController.getOrders(user.sub);
        return NextResponse.json(result);
    } catch (err: any) {
        return NextResponse.json({ message: err.message }, { status: 400 });
    }
}
