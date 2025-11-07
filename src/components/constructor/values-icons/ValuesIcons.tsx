"use client";
import React from "react";
import { motion } from "framer-motion";
import styles from "./ValuesIcons.module.scss";

interface ValueItem {
  icon: React.ReactNode;
  title: string;
  description?: string;
  text?: string;
}

interface Props {
  title?: string;
  description?: string;
  values: ValueItem[];
}

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

const ValuesIcons: React.FC<Props> = ({ title, description, values }) => {
  return (
    <section className={styles.section}>
      {(title || description) && (
        <motion.div
          className={styles.head}
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {title && <h2 className={styles.sectionTitle}>{title}</h2>}
          {description && <p className={styles.sectionDesc}>{description}</p>}
        </motion.div>
      )}

      <div className={styles.scrollArea}>
        {values.map((v, i) => (
          <motion.div
            key={i}
            className={styles.card}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={cardVariants}
            whileHover={{ rotateX: 3, rotateY: -3, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 150, damping: 12 }}
          >
            <motion.div
              className={styles.iconWrap}
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className={styles.icon}>{v.icon}</div>
            </motion.div>
            <h3>{v.title}</h3>
            <p>{v.description ?? v.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ValuesIcons;
