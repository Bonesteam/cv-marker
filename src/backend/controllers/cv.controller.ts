import { connectDB } from "../config/db";
import { cvService } from "../services/cv.service";
import { userController } from "../controllers/user.controller";
import {
    CreateCVOrderRequest,
    CreateCVOrderResponse,
    GetCVOrderResponse,
    GetCVOrdersResponse,
} from "../types/cv.types";

const log = (fn: string, msg: string, data?: any) => {
    const time = new Date().toISOString();
    console.log(`[${time}] 🧭 [cvController.${fn}] ${msg}`, data ?? "");
};

export const cvController = {
    async createOrder(userId: string, email: string, body: CreateCVOrderRequest): Promise<CreateCVOrderResponse> {
        await connectDB();
        log("createOrder", "Start", { userId, email, reviewType: body.reviewType });

        const order = await cvService.createOrder(userId, email, body);

        const plain: any = (order as any)?.toObject ? (order as any).toObject() : order;
        log("createOrder", "Returning FINAL ORDER", {
            _id: plain?._id,
            extrasKeys: Object.keys(plain?.extrasData || {}),
            reviewType: plain?.reviewType,
            cvStyle: plain?.cvStyle,
        });

        return { order: plain };
    },

    async getOrders(userId: string): Promise<GetCVOrdersResponse> {
        await connectDB();
        log("getOrders", "Fetching all orders", { userId });

        const orders = await cvService.getOrders(userId);
        log("getOrders", "Fetched", { count: orders.length });

        return {
            orders: orders.map((o: any) => (o.toObject ? o.toObject() : o)),
        };
    },

    async getOrder(userId: string, orderId: string): Promise<GetCVOrderResponse> {
        await connectDB();
        log("getOrder", "Fetching order", { userId, orderId });

        const order = await cvService.getOrderById(userId, orderId);

        if (!order) {
            log("getOrder", "⚠️ Order not found");
            return { order: null };
        }

        const plain: any = (order as any)?.toObject ? (order as any).toObject() : order;
        log("getOrder", "Returning ORDER", {
            _id: plain._id,
            extrasKeys: Object.keys(plain?.extrasData || {}),
            cvStyle: plain.cvStyle,
            reviewType: plain.reviewType,
        });

        return { order: plain };
    },
};