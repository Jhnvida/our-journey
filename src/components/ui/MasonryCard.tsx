import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";
import styles from "./MasonryCard.module.css";

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: (index: number) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: Math.min(index * 0.1, 0.5) },
    }),
};

interface MasonryCardProps {
    index: number;
    imageUrl?: string;
    imageAlt?: string;
    children: ReactNode;
}

export const MasonryCard = ({ index, imageUrl, imageAlt, children }: MasonryCardProps) => {
    return (
        <motion.div
            className={styles.masonry_item}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            custom={index}
            viewport={{ once: true, margin: "-50px" }}
        >
            {imageUrl && (
                <img
                    src={imageUrl}
                    alt={imageAlt || ""}
                    className={styles.masonry_image}
                    loading={index < 4 ? "eager" : "lazy"}
                    decoding="async"
                    fetchPriority={index < 2 ? "high" : "auto"}
                />
            )}

            <div className={styles.masonry_content}>{children}</div>
        </motion.div>
    );
};
