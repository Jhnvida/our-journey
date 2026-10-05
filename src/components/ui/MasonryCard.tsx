import type { ReactNode } from "react";
import styles from "./MasonryCard.module.css";

interface MasonryCardProps {
    index: number;
    imageUrl?: string;
    imageAlt?: string;
    children: ReactNode;
}

export const MasonryCard = ({ index, imageUrl, imageAlt, children }: MasonryCardProps) => {
    return (
        <article className={styles.card}>
            {imageUrl && (
                <div className={styles.image_container}>
                    <img
                        src={imageUrl}
                        alt={imageAlt || ""}
                        className={styles.image}
                        loading={index < 4 ? "eager" : "lazy"}
                        decoding="async"
                    />
                </div>
            )}

            <div className={styles.content}>{children}</div>
        </article>
    );
};
