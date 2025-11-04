"use client";
import React from "react";
import Grid from "../grid/Grid";
import styles from "./ValuesIcons.module.scss";
import { motion } from "framer-motion";

interface ValueItem {
  icon: string;
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
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
};

const iconVariants = {
  hidden: { scale: 0, rotate: -180 },
  visible: {
    scale: 1,
    rotate: 0,
    transition: { type: "spring", stiffness: 200, damping: 20 },
  },
};

const ValuesIcons: React.FC<Props> = ({ title, description, values }) => {
  return (
    <section className={styles.section}>
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

      <Grid columns={values.length > 3 ? 4 : values.length} gap="2rem">
        {values.map((v, i) => (
          <motion.div
            key={i}
            className={styles.valueCard}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={cardVariants}
            transition={{ delay: i * 0.15 }}
          >
            <motion.div
              className={styles.icon}
              variants={iconVariants}
              transition={{ delay: i * 0.15 + 0.2 }}
            >
              {v.icon}
            </motion.div>
            <h3>{v.title}</h3>
            <p>{v.description ?? v.text}</p>
          </motion.div>
        ))}
      </Grid>
    </section>
  );
};

export default ValuesIcons;
