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

const slideVariants = {
  enter: { opacity: 0, x: 40 },
  center: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
  exit: { opacity: 0, x: -40, transition: { duration: 0.4, ease: "easeInOut" } },
};

export default function TestimonialsSlider({ testimonials }: { testimonials: Testimonial[] }) {
  const [current, setCurrent] = useState(0);
  const prev = () => setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));

  return (
    <section className={styles.slider}>
      <button className={styles.navBtn} onClick={prev} aria-label="Previous">
        <MdOutlineKeyboardArrowLeft size={28} />
      </button>

      <div className={styles.content}>
        <AnimatePresence mode="wait">
          {testimonials.map((t, i) =>
            i === current ? (
              <motion.div
                key={i}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className={styles.testimonial}
              >
                {t.image && (
                  <motion.img
                    src={resolveMedia(t.image)}
                    alt={t.name}
                    className={styles.avatar}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  />
                )}
                <motion.p className={styles.text}>{t.text}</motion.p>
                <div className={styles.person}>
                  <motion.h4 className={styles.name}>{t.name}</motion.h4>
                  {t.role && <p className={styles.role}>{t.role}</p>}
                </div>
              </motion.div>
            ) : null
          )}
        </AnimatePresence>
      </div>

      <button className={styles.navBtn} onClick={next} aria-label="Next">
        <MdOutlineKeyboardArrowRight size={28} />
      </button>
    </section>
  );
}
