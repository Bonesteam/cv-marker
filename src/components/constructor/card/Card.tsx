"use client";
import React from "react";
import Media from "../image/Media";
import styles from "./Card.module.scss";
import {StaticImageData} from "next/image";
import ButtonUI from "@/components/ui/button/ButtonUI";
import {FaArrowRight} from "react-icons/fa6";

interface CardProps {
    image: string | StaticImageData;
    title: string;
    description: string;
    buttonText?: string;
    buttonLink?: string;
    layout?: "vertical" | "horizontal";
}

const Card: React.FC<CardProps> = ({
                                       image,
                                       title,
                                       description,
                                       buttonText,
                                       buttonLink,
                                       layout = "vertical",
                                   }) => (
    <div className={`${styles.card} ${layout === "horizontal" ? styles.horizontal : ""}`}>
        <div className={styles.imageWrapper} data-layout={layout}>
            <Media
                src={image}
                type="image"
                width="100%"
                height={layout === "horizontal" ? "100%" : "220px"}
                alt={title}
                objectFit="cover"
            />
        </div>
        <div className={styles.content}>
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.description}>{description}</p>
            {buttonText && buttonLink && (
                <a href={buttonLink} rel="noopener noreferrer" style={{textDecoration: "none"}}>
                    <ButtonUI
                        variant="solid"
                        shape="rounded"
                        size="md"
                        textColor={"quaternary"}
                        color={"primary"}
                        hoverEffect="shadow"

                    >
                        {buttonText}
                    </ButtonUI>
                </a>
            )}
        </div>
    </div>
);

export default Card;
