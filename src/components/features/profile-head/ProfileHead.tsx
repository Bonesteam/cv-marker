"use client";

import { FaUserCircle } from "react-icons/fa";
import styles from "./ProfileHead.module.scss";

const ProfileHead = () => (
  <header className={styles.hero}>
    <FaUserCircle className={styles.hero__icon} />
    <div className={styles.hero__text}>
      <h1 className={styles.hero__title}>My Account</h1>
      <p className={styles.hero__subtitle}>
        Manage your profile, track your balance and view your orders easily.
      </p>
    </div>
  </header>
);

export default ProfileHead;
