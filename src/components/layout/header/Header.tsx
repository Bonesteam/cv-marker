"use client";

import React, { useEffect, useState } from "react";
import { headerContent } from "@/resources/content";
import styles from "./Header.module.scss";
import { IconButton } from "@mui/material";
import { FaBars } from "react-icons/fa";
import { useUser } from "@/context/UserContext";
import Image from "next/image";
import AuthButtons from "@/components/widgets/auth-buttons/AuthButtons";
import { headerStyles } from "@/resources/styles-config";
import DrawerMenu from "@/components/ui/drawer/Drawer";
import { useCurrency, Currency } from "@/context/CurrencyContext";
import { motion } from "framer-motion";

const Header: React.FC = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const user = useUser();
    const { currency, setCurrency } = useCurrency();

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 10);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // формуємо динамічні стилі при скролі
    const scrolledStyle: React.CSSProperties = {};
    if (isScrolled && headerStyles.type !== "default") {
        switch (headerStyles.scrollMode) {
            case "solid":
                scrolledStyle.backgroundColor = headerStyles.scrollBackground;
                break;
            case "blur":
                scrolledStyle.backdropFilter = `blur(${headerStyles.scrollBlur})`;
                scrolledStyle.backgroundColor = "rgba(255,255,255,0.05)";
                break;
        }
    }

    return (
        <>
            <motion.header
                className={[
                    headerStyles.type === "default" && styles.header,
                    headerStyles.type === "sticky" && styles.sticky,
                    headerStyles.type === "sticky-rounded" && styles.stickyRounded,
                    headerStyles.type === "sticky-rounded" && isScrolled ? styles.scrolled : "",
                ]
                    .filter(Boolean)
                    .join(" ")}
                style={scrolledStyle}
                initial={{ opacity: 0, y: -40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                <div className={styles.headerInner}>
                    <a href={headerContent.logo.href} className={styles.logo}>
                        <Image
                            width={240}
                            height={70}
                            src={headerContent.logo.src}
                            alt={headerContent.logo.alt}
                        />
                    </a>

                    <div className={styles.actions}>
                        <nav className={styles.nav}>
                            {headerContent.links.map((link) => (
                                <a key={link.label} href={link.href} className={styles.link}>
                                    {link.label}
                                </a>
                            ))}
                        </nav>

                        <div className={styles.actionsNav}>
                            <AuthButtons />
                            <div className={styles.currencySwitch}>
                                <select
                                    value={currency}
                                    onChange={(e) => setCurrency(e.target.value as Currency)}
                                    className={styles.currencySelect}
                                >
                                    <option value="GBP">£ GBP</option>
                                    <option value="EUR">€ EUR</option>
                                    <option value="USD">$ USD</option>
                                </select>
                            </div>

                        </div>
                    </div>

                    <div className={styles.menuButton}>
                        <IconButton
                            onClick={() => setDrawerOpen(true)}
                            aria-label="Open navigation"
                            className={styles.button}
                        >
                            <FaBars className={styles.button} />
                        </IconButton>
                    </div>
                </div>
            </motion.header>

            <DrawerMenu open={drawerOpen} onClose={() => setDrawerOpen(false)} />
        </>
    );
};

export default Header;