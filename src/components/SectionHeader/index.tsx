import { motion } from "framer-motion";
import { slideRight } from "../../lib/animations";
import styles from "./styles.module.css";

interface SectionHeaderProps {
    title: string;
    subtitle: string;
}

export function SectionHeader({ title, subtitle }: SectionHeaderProps) {
    return (
        <div className={styles.header}>
            <motion.div variants={slideRight} initial="hidden" animate="visible">
                <h2 className={styles.title}>{title}</h2>
                <p className={styles.subtitle}>{subtitle}</p>
            </motion.div>
        </div>
    );
}
