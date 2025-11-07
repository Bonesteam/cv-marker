"use client";
import React from "react";
import { motion } from "framer-motion";
import styles from "./Timeline.module.scss";

interface Step {
  title: string;
  description: string;
}

interface TimelineProps {
  title?: string;
  steps: Step[];
}

const stepVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  }),
};

const Timeline: React.FC<TimelineProps> = ({ title, steps }) => (
  <section className={styles.wrapper}>
    {title && <h2 className={styles.sectionTitle}>{title}</h2>}

    <div className={styles.timeline}>
      {steps.map((step, idx) => (
        <motion.div
          key={idx}
          className={styles.step}
          custom={idx}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={stepVariants}
        >
          <div className={styles.circle}>{idx + 1}</div>
          <div className={styles.content}>
            <h4>{step.title}</h4>
            <p>{step.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  </section>
);

export default Timeline;
