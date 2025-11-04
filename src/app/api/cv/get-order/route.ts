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
                // attach refreshed cookies to response
                const placeholder = NextResponse.json({});
                attachAuthCookies(placeholder, tokens.accessToken, tokens.refreshToken, 60 * 60 * 24 * 30);
            } catch (e2) {
                return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
            }
        }

        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");
        if (!id) {
            return NextResponse.json({ message: "Missing order id" }, { status: 400 });
        }

        const result = await cvController.getOrder(user.sub, id);
        if (!result.order) {
            return NextResponse.json({ message: "Order not found" }, { status: 404 });
        }

        return NextResponse.json(result);
    } catch (err: any) {
        return NextResponse.json({ message: err.message }, { status: 400 });
    }
}
