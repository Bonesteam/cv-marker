"use client";

import Link from "next/link";
import { useUser } from "@/context/UserContext";
import { LogoutButton } from "@/components/ui/logout-button/LogoutButton";
import styles from "./BalanceCard.module.scss";

export default function BalanceCard() {
  const user = useUser();

  return (
    <section className={styles.balanceCard}>
      <div className={styles.balanceCard__info}>
        <p>Current Balance</p>
        <h2>
          {user?.tokens ?? 0} <span>Tokens</span>
        </h2>
      </div>

      <div className={styles.balanceCard__actions}>
        <Link href="/pricing" className={styles.balanceCard__topUpBtn}>
          Add Tokens
        </Link>
        <LogoutButton />
      </div>
    </section>
  );
}
