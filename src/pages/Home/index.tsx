import { motion } from "motion/react";
import { fadeIn, viewportOnce } from "../../lib/motion";
import { Chapters } from "./sections/Chapters";
import { Hero } from "./sections/Hero";
import { Kitchen } from "./sections/Kitchen";
import { Timeline } from "./sections/Timeline";
import styles from "./styles.module.css";

const footerVariants = fadeIn();

export function Home() {
    return (
        <main className={styles.container}>
            <Hero />
            <Timeline />
            <Kitchen />
            <Chapters />

            <motion.footer
                className={styles.footer}
                variants={footerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
            >
                <div className={styles.footer_brand}>A Nossa Jornada</div>
            </motion.footer>
        </main>
    );
}
