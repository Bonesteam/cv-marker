"use client";

import React from "react";
import styles from "./CVOrders.module.scss";
import {downloadCVPDF} from "../../features/pdf-extractor/PDFExtractorCV";

type CVOrder = {
    _id: string;
    email: string;
    fullName: string;
    cvStyle: "Classic" | "Modern" | "Creative" | "Executive" | "Portfolio" | "One-page" | "Infographic" | "Technical";
    readyAt: string;
    createdAt: string;
};

function timeLeft(readyAt: string) {
    const ms = new Date(readyAt).getTime() - Date.now();
    if (ms <= 0) return "Ready";
    const h = Math.floor(ms / 3600000);
    const m = Math.floor((ms % 3600000) / 60000);
    return `${h}h ${m}m left`;
}

const CVOrders: React.FC<{ orders: CVOrder[] }> = ({ orders }) => {
    return (
        <div className={styles.wrapper}>
            <h3 className={styles.title}>Your CV Orders</h3>
            <table className={styles.table}>
                <thead><tr><th>Order</th><th>Name</th><th>Style</th><th>ETA</th><th>Action</th></tr></thead>
                <tbody>
                {orders.map(o => {
                    const ready = new Date(o.readyAt).getTime() <= Date.now();
                    return (
                        <tr key={o._id}>
                            <td>#{o._id.slice(-6)}</td>
                            <td>{o.fullName}</td>
                            <td>{o.cvStyle}</td>
                            <td>{ready ? "Ready" : timeLeft(o.readyAt)}</td>
                            <td>
                                <button
                                    className={ready ? styles.actionButton : `${styles.actionButton} ${styles.actionButtonDisabled}`}
                                    disabled={!ready}
                                    onClick={() => fetch(`/api/cv/get-order?id=${o._id}`, { credentials: "include" }).then(r=>r.json()).then(d=>downloadCVPDF(d.order))}
                                >
                                    Download PDF
                                </button>
                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </div>
    );
};

export default CVOrders;
