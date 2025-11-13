"use client";
import React from "react";
import { motion } from "framer-motion";
import styles from "./Section.module.scss";

interface SectionProps {
    left?: React.ReactNode;
    right?: React.ReactNode;
    reverse?: boolean;
    gap?: string;
    align?: "center" | "start" | "end";
    justify?: "center" | "space-between" | "start" | "end";
}

const Section: React.FC<SectionProps> = ({
                                             left,
                                             right,
                                             reverse = false,
                                             gap = "2rem",
                                             align = "center",
                                             justify = "center",
                                         }) => {
    const isSingle = !left || !right;

    return (
        <motion.div
            className={`${styles.section} ${isSingle ? styles.single : ""}`}
            style={{
                flexDirection: reverse ? "row-reverse" : "row",
                gap,
                alignItems: align,
                justifyContent: isSingle ? "center" : justify,
            }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            {left && (
                <motion.div
                    className={styles.left}
                    initial={{ opacity: 0, x: reverse ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    {left}
                </motion.div>
            )}
            {right && (
                <motion.div
                    className={styles.right}
                    initial={{ opacity: 0, x: reverse ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    {right}
                </motion.div>
            )}
        </motion.div>
    );
};

export default Section;
