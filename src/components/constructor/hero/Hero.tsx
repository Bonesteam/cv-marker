"use client";

import React from "react";
import styles from "./Hero.module.scss";
import ButtonUI from "@/components/ui/button/ButtonUI";
import { media } from "@/resources/media";
import type { StaticImageData } from "next/image";
import { motion } from "framer-motion";

interface HeroSectionProps {
  title: string;
  highlight?: string;
  description: string;
  primaryCta?: { text: string; link: string };
  secondaryCta?: { text: string; link: string };
  image?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  highlight,
  description,
  primaryCta,
  secondaryCta,
  image,
}) => {
  const bgImage = image
    ? (media as Record<string, string | StaticImageData>)[image]
    : undefined;

  const bgUrl = bgImage
    ? typeof bgImage === "string"
      ? bgImage
      : (bgImage as StaticImageData).src
    : "";

  return (
    <section className={styles.hero}>
      <motion.div
        className={styles.imageContainer}
        style={{ backgroundImage: bgUrl ? `url(${bgUrl})` : "none" }}
        initial={{ opacity: 0, x: -80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      />

      <motion.div
        className={styles.content}
        initial={{ opacity: 0, x: 80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <motion.h1
          className={styles.title}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          {title}{" "}
          {highlight && (
            <span className={styles.highlight}>{highlight}</span>
          )}
        </motion.h1>

        <motion.p
          className={styles.description}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          {description}
        </motion.p>

        <motion.div
          className={styles.ctaRow}
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.25 } },
          }}
        >
          {primaryCta && (
            <motion.a
              href={primaryCta.link}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.6 }}
            >
              <ButtonUI
                variant="solid"
                size="lg"
                color="quaternary"
                shape="rounded"
                textColor="primary"
                hoverEffect="scale"
                hoverColor="quaternary"
              >
                {primaryCta.text}
              </ButtonUI>
            </motion.a>
          )}

          {secondaryCta && (
            <motion.a
              href={secondaryCta.link}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.6 }}
            >
              <ButtonUI
                variant="outlined"
                size="lg"
                color="quaternary"
                textColor="quaternary"
                shape="rounded"
                hoverEffect="scale"
                hoverColor="quaternary"
                hoverTextColor="primary"
              >
                {secondaryCta.text}
              </ButtonUI>
            </motion.a>
          )}
        </motion.div>
      </motion.div>
    </section>
  );
};
export default HeroSection;
