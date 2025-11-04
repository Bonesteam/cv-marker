"use client";
import React from "react";
import styles from "./StoryTimeline.module.scss";

interface TimelineStep {
  year?: string;
  title?: string;
  description: string;
}

const StoryTimeline: React.FC<{ steps: TimelineStep[] }> = ({ steps }) => {
  return (
    <div className={styles.timeline}>
      {steps.map((s, i) => (
        <div key={i} className={styles.step}>
          <span className={styles.dot} />
          {s.year && <div className={styles.year}>{s.year}</div>}
          {s.title && <div className={styles.title}>{s.title}</div>}
          <div className={styles.text}>{s.description}</div>
        </div>
      ))}
    </div>
  );
};

export default StoryTimeline;
