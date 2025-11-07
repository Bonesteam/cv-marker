import React from "react";
import {useUser} from "@/context/UserContext";
import ButtonUI from "@/components/ui/button/ButtonUI";
import Link from "next/link";
import styles from "./AuthButtons.module.scss";
import {FaUser} from "react-icons/fa";
import { GrMoney } from "react-icons/gr";

const AuthButtons: React.FC = () => {
    const user = useUser();
    if (user) {
        return (

            // <div className={styles.linkContainer}>
            //     <Link href="/profile">
            //         <FaUser className={styles.link}/>
            //     </Link>
            //
            // </div>
            <div className={styles.userContainer}>
                <Link href="/profile" className={styles.userCard}>
                    <div className={styles.userBalance}>
                        <span className={styles.balanceText}><GrMoney/> {user?.tokens ?? 0}</span>
                    </div>
                    <div className={styles.userIconWrapper}>
                        <FaUser className={styles.userIcon} />
                    </div>
                </Link>
                <Link href="/dashboard" className={styles.dashboardButton}>
                    <ButtonUI
                        text="Create CV"
                        shape="rounded"
                        hoverColor="linkHover"
                        hoverEffect="scale"
                        fullWidth={false}
                        textColor="inverse"
                        sx={{
                            background: "linear-gradient(90deg, var(--primary-color), var(--accent-color))",
                            color: "#fff",
                            boxShadow: "0 10px 24px rgba(59,130,246,0.12)",
                        }}
                    />
                </Link>
            </div>
        );
    }

    return (
        <div className={styles.nonAuthedButtons}>
            <Link href="/sign-in">
                <ButtonUI
                    text="Sign In"
                    shape="rounded"
                    variant="outlined"
                    color="primary"
                    hoverEffect="scale"
                    fullWidth={false}
                    textColor="primary"
                />
            </Link>
            <Link href="/sign-up">
                <ButtonUI
                    text="Sign Up"
                    shape="rounded"
                    variant="solid"
                    color="primary"
                    hoverEffect="scale"
                    fullWidth={false}
                    textColor="inverse"
                    sx={{
                        background: "linear-gradient(90deg, var(--primary-color), var(--accent-color))",
                        color: "#fff",
                        boxShadow: "0 10px 24px rgba(59,130,246,0.12)",
                    }}
                />
            </Link>
        </div>
    );
};

export default AuthButtons;