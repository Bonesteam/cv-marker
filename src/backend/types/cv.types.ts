import {Types} from "mongoose";

export interface CVOrderType {
    _id: Types.ObjectId;
    userId: Types.ObjectId;
    email: string;

    fullName: string;
    phone: string;
    photo?: string;
    cvStyle: "Classic" | "Modern" | "Creative" | "Executive" | "Portfolio" | "One-page" | "Infographic" | "Technical";
    fontStyle: string; // 🆕
    themeColor: string; // 🆕
    industry: string;
    experienceLevel: string;

    summary: string;
    workExperience: string;
    education: string;
    skills: string;

    reviewType: "instant" | "manager" | "hr_plus" | "priority" | "expert";
    extras: string[];

    response: string;
    extrasData?: Record<string, string>;

    status: "pending" | "ready";
    readyAt: Date;
    createdAt: Date;
}

export interface CreateCVOrderRequest {
    fullName: string;
    phone: string;
    photo?: string;
    cvStyle: "Classic" | "Modern" | "Creative" | "Executive" | "Portfolio" | "One-page" | "Infographic" | "Technical";
    fontStyle: string; // 🆕
    themeColor: string; // 🆕
    industry: string;
    experienceLevel: string;
    summary: string;
    workExperience: string;
    education: string;
    skills: string;
    reviewType: "instant" | "manager" | "hr_plus" | "priority" | "expert";
    extras: string[];
    email: string;
    totalTokens?: number;
}


export interface CreateCVOrderResponse {
    order: CVOrderType;
}

export interface GetCVOrdersResponse {
    orders: CVOrderType[];
}

export interface GetCVOrderResponse {
    order: CVOrderType | null;
}
