import React from "react";
import styles from "./CVCard.module.scss";

interface CVCardProps {
  title: string;
  description: string;
  pdf: string;
  preview: string;
}

const CVCard: React.FC<CVCardProps> = ({ title, description, pdf, preview }) => {
  return (
    <article className={styles.paper}>
      <a
        href={pdf}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.page}
      >
        <img src={preview} alt={title} />
      </a>

      <div className={styles.content}>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>

      <div className={styles.actions}>
        <a href={pdf} target="_blank" rel="noopener noreferrer">
          View
        </a>
        <a href={pdf} download className={styles.primary}>
          Download PDF
        </a>
      </div>
    </article>
  );
};

export default CVCard;
