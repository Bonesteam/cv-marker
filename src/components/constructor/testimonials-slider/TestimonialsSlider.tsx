"use client";

import React, { useState } from "react";
import styles from "./TestimonialsSlider.module.scss";
import { media as mediaMap } from "@/resources/media";
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";

interface Testimonial {
  name: string;
  role?: string;
  image?: string;
  text: string;
}

function resolveMedia(key?: string): string | undefined {
  if (!key) return undefined;
  const val = (mediaMap as Record<string, any>)[key];
  if (!val) return undefined;
  if (typeof val === "string") return val;
  if (typeof val === "object" && val.src) return val.src;
  return undefined;
}

// 👉 нова motion-анімація
const cardVariants = {
  enter: {
    opacity: 0,
    scale: 0.8,
    filter: "blur(8px)",
  },
  center: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.65,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: {
    opacity: 0,
    scale: 1.15,
    filter: "blur(10px)",
    transition: {
      duration: 0.45,
      ease: "easeInOut",
    },
  },
};

export default function TestimonialsSlider({ testimonials }: { testimonials: Testimonial[] }) {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));

  return (
    <motion.div
      className={styles.slider}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      {/* Prev Button */}
      <button className={styles.navBtn} onClick={prev} aria-label="Previous">
        <MdOutlineKeyboardArrowLeft size={28} />
      </button>

      {/* Slide */}
      <div className={styles.slideWrapper}>
        <AnimatePresence mode="wait">
          {testimonials.map((t, i) =>
            i === current ? (
              <motion.div
                key={i}
                className={styles.card}
                variants={cardVariants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                {t.image && (
                  <motion.img
                    src={resolveMedia(t.image)}
                    alt={t.name}
                    className={styles.avatar}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                  />
                )}
                <motion.p
                  className={styles.text}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  “{t.text}”
                </motion.p>
                <motion.h4
                  className={styles.name}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  {t.name}
                </motion.h4>
                {t.role && (
                  <motion.p
                    className={styles.role}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    {t.role}
                  </motion.p>
                )}
              </motion.div>
            ) : null
          )}
        </AnimatePresence>
      </div>

      {/* Next Button */}
      <button className={styles.navBtn} onClick={next} aria-label="Next">
        <MdOutlineKeyboardArrowRight size={28} />
      </button>
    </motion.div>
  );
}
