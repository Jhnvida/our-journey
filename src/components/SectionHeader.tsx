import { motion } from "motion/react";
import { fadeInUp, viewportOnce } from "../lib/motion";
import styles from "./SectionHeader.module.css";

interface SectionHeaderProps {
    title: string;
    subtitle: string;
}

const titleVariants = fadeInUp(16);
const subtitleVariants = fadeInUp(12);

export function SectionHeader({ title, subtitle }: SectionHeaderProps) {
    return (
        <div className={styles.header}>
            <motion.h2
                className={styles.title}
                variants={titleVariants}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
            >
                {title}
            </motion.h2>
            <motion.p
                className={styles.subtitle}
                variants={subtitleVariants}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                transition={{ delay: 0.1 }}
            >
                {subtitle}
            </motion.p>
        </div>
    );
}
