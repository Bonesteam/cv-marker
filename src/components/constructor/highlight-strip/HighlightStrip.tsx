"use client";
import React from "react";
import styles from "./HighlightStrip.module.scss";
import { motion } from "framer-motion";

interface HighlightStripProps {
  messages: string[];
}

const HighlightStrip: React.FC<HighlightStripProps> = ({ messages }) => {
  // Дублюємо масив для безперервного скролу
  const doubledMessages = messages.concat(messages);

  return (
    <div className={styles.strip}>
      <div className={styles.track}>
        {doubledMessages.map((msg, i) => (
          <motion.span
            key={i}
            className={`${styles.item} ${
              i % 2 === 0 ? styles["item-left"] : styles["item-right"]
            }`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.4,
              delay: i * 0.05,
              ease: "easeOut",
            }}
          >
            {msg}
          </motion.span>
        ))}
      </div>
    </div>
  );
};

export default HighlightStrip;
