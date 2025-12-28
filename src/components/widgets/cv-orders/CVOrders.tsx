"use client";

import React, { useState } from "react";
import styles from "./CVOrders.module.scss";
import { downloadCVPDF } from "../../features/pdf-extractor/PDFExtractorCV";

type CVOrder = {
    _id: string;
    email: string;
    fullName: string;
    cvStyle: "Classic" | "Modern" | "Creative";
    reviewType: string;
    readyAt: string;
    createdAt: string;
    status: string;
};

const CVOrders: React.FC<{ orders: CVOrder[] }> = ({ orders }) => {
    const [downloading, setDownloading] = useState<string | null>(null);

    const handleDownload = async (orderId: string) => {
        setDownloading(orderId);
        try {
            const res = await fetch(`/api/cv/get-order?id=${orderId}`, { 
                credentials: "include" 
            });
            
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            
            const data = await res.json();
            
            if (data.order) {
                await downloadCVPDF(data.order);
            } else {
                alert("Order not found or not ready yet");
            }
        } catch (error) {
            console.error("Download error:", error);
            alert("Failed to download CV. Please try again.");
        } finally {
            setDownloading(null);
        }
    };

    const isOrderReady = (readyAt: string, status: string) => {
        const readyTime = new Date(readyAt).getTime();
        const now = Date.now();
        return readyTime <= now && status === "ready";
    };

    const getTimeLeft = (readyAt: string) => {
        const ms = new Date(readyAt).getTime() - Date.now();
        if (ms <= 0) return "Ready";
        
        const hours = Math.floor(ms / (1000 * 60 * 60));
        const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
        
        if (hours > 0) {
            return `${hours}h ${minutes}m`;
        } else {
            return `${minutes}m`;
        }
    };

    return (
        <div className={styles.wrapper}>
            <h3 className={styles.title}>Your CV Orders</h3>
            
            {orders.length === 0 ? (
                <p className={styles.empty}>No CV orders yet.</p>
            ) : (
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Style</th>
                            <th>Type</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => {
                            const ready = isOrderReady(order.readyAt, order.status);
                            
                            return (
                                <tr key={order._id}>
                                    <td className={styles.orderId}>
                                        #{order._id.slice(-6)}
                                    </td>
                                    <td className={styles.name}>
                                        {order.fullName}
                                    </td>
                                    <td>
                                        <span className={`${styles.styleBadge} ${styles[order.cvStyle]}`}>
                                            {order.cvStyle}
                                        </span>
                                    </td>
                                    <td className={styles.type}>
                                        {order.reviewType}
                                    </td>
                                    <td>
                                        <span className={`${styles.status} ${ready ? styles.ready : styles.pending}`}>
                                            {ready ? "Ready" : getTimeLeft(order.readyAt)}
                                        </span>
                                    </td>
                                    <td>
                                        <button
                                            className={`${styles.downloadButton} ${!ready ? styles.disabled : ''}`}
                                            disabled={!ready || downloading === order._id}
                                            onClick={() => handleDownload(order._id)}
                                        >
                                            {downloading === order._id ? (
                                                <span>Downloading...</span>
                                            ) : ready ? (
                                                "Download PDF"
                                            ) : (
                                                "Processing"
                                            )}
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default CVOrders;