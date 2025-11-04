"use client";

import React from "react";
import { useAllOrders } from "@/context/AllOrdersContext";
import styles from "./AllOrders.module.scss";
import { FaFileDownload } from "react-icons/fa";
import ButtonUI from "@/components/ui/button/ButtonUI";
import Link from "next/link";
import { downloadCVPDF } from "@/components/features/pdf-extractor/PDFExtractorCV";
import { CVOrderType } from "@/backend/types/cv.types";

const OrdersSection: React.FC = () => {
    const { cvOrders } = useAllOrders();
    const orders = cvOrders;

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return (
            date.toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
                year: "numeric",
            }) +
            " " +
            date.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
            })
        );
    };

    const formatId = (id: string) => id.slice(-6);

    const handleDownload = async (order: CVOrderType) => {
        console.log("📦 [OrdersSection] Downloading order:", order._id);
        try {
            // 🟢 Якщо extrasData вже є — не треба фетчити
            if (order.extrasData && Object.keys(order.extrasData).length > 0) {
                await downloadCVPDF(order);
                return;
            }

            // 🔹 Інакше підвантажимо повну версію
            const res = await fetch(`/api/cv/get-order?id=${order._id}`, {
                method: "GET",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
            });
            const data = await res.json();

            if (!data?.order) {
                console.warn("⚠️ No order found for ID:", order._id);
                return;
            }

            const fullOrder = data.order as CVOrderType;
            console.log("✅ [OrdersSection] Full order fetched:", fullOrder._id);
            await downloadCVPDF(fullOrder);
        } catch (err: any) {
            console.error("❌ [OrdersSection] Error fetching order:", err.message);
        }
    };

    return (
        <div className={styles.ordersSection}>
            <h3 className={styles.title}>Your CV Orders</h3>

            {orders.length === 0 ? (
                <div className={styles.emptyState}>
                    <span className={styles.emptyIcon}>📭</span>
                    <p>No orders yet.</p>
                    <Link href="/dashboard">
                        <ButtonUI
                            color="primary"
                            size="md"
                            shape="rounded"
                            textColor="quaternary"
                            hoverEffect="shadow"
                            fullWidth
                        >
                            Generate your first CV
                        </ButtonUI>
                    </Link>
                </div>
            ) : (
                <div className={styles.ordersList}>
                    {orders.map((order) => (
                        <div key={order._id.toString()} className={styles.orderCard}>
                            <div className={styles.orderHeader}>
                                <span className={styles.orderId}>#{formatId(order._id.toString())}</span>
                                <span className={styles.charge}>
                                    {(() => {
                                        const mapping: Record<string, number> = {
                                            instant: 25,
                                            manager: 60,
                                            hr_plus: 90,
                                            priority: 120,
                                            expert: 180,
                                        };
                                        const cost = mapping[order.reviewType as string] ?? 30;
                                        return `-${cost} tokens`;
                                    })()}
                                </span>
                            </div>
                            <p className={styles.email}>{order.email}</p>
                            <p className={styles.date}>{formatDate(order.createdAt.toString())}</p>
                            <button
                                className={styles.downloadBtn}
                                onClick={() => handleDownload(order)}
                            >
                                <FaFileDownload /> Download
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default OrdersSection;
