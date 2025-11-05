"use client";
import React, { useEffect, useRef, useState } from "react";
import Container from "../container/Container";
import Text from "../text/Text";
import Media from "../image/Media";
import { media as mediaMap } from "@/resources/media";
import { StaticImageData } from "next/image";
import styles from "./VideoDemo.module.scss";

interface Props {
    title?: string;
    description?: string;
    video: string;
}

const VideoDemo: React.FC<Props> = ({ title, description, video }) => {
    const resolvedVideo = (mediaMap as Record<string, string | StaticImageData>)[video];
    const ref = useRef<HTMLDivElement | null>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => setIsVisible(entry.isIntersecting),
            { threshold: 0.2 }
        );

        if (ref.current) observer.observe(ref.current);
        return () => {
            if (ref.current) observer.unobserve(ref.current);
        };
    }, []);

    return (
        <Container
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap="0px"
            style={{ width: "100%", maxWidth: "1100px", margin: "0 auto" }}
        >
            <div
                ref={ref}
                className={`${styles.fadeBlock} ${isVisible ? styles.visible : ""}`}
            >
                <div className={styles.videoWrapper}>
                    <Media
                        type="video"
                        src={resolvedVideo}
                        aspectRatio="16/7"
                        autoPlay
                        loop
                        muted
                        controls={false}
                    />
                </div>
                <Text
                    title={title}
                    description={description}
                />
            </div>
        </Container>
    );
};

export default VideoDemo;