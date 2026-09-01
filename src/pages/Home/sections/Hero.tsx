import { motion, type Variants } from "motion/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSettings } from "../../../hooks/useSettings";
import { calculateTime } from "../../../lib/calculateTime";
import styles from "./Hero.module.css";

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

function formatNumber(num: number) {
    return num.toString().padStart(2, "0");
}

export function Hero({ isReady }: { isReady: boolean }) {
    const { settings } = useSettings();
    const [timePassed, setTimePassed] = useState({ years: 0, months: 0, days: 0 });

    useEffect(() => {
        if (!settings?.relationship_start_date) return;

        function updateTime() {
            if (settings?.relationship_start_date) {
                setTimePassed(calculateTime(settings.relationship_start_date));
            }
        }

        updateTime();
        const interval = setInterval(updateTime, 1000 * 60 * 60);

        return () => clearInterval(interval);
    }, [settings?.relationship_start_date]);

    return (
        <section className={styles.hero_section}>
            <motion.div
                className={styles.hero_bg}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={isReady ? { opacity: 1, scale: 1 } : undefined}
                transition={{ duration: 1.5, ease: "easeOut" }}
            />

            <motion.header
                className={styles.header}
                initial={{ opacity: 0, y: -20 }}
                animate={isReady ? { opacity: 1, y: 0 } : undefined}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
            >
                <div className={styles.brand_label}>A Nossa Jornada</div>

                <div className={styles.header_actions}>
                    <div className={styles.nav_links}>
                        <a
                            href="https://github.com/Jhnvida/our-journey"
                            target="_blank"
                            rel="noreferrer"
                            className={styles.nav_link}
                        >
                            Código no GitHub
                        </a>
                        <Link to="/dashboard" className={styles.nav_link}>
                            Painel Administrativo
                        </Link>
                    </div>
                </div>
            </motion.header>

            <div className={styles.hero_content}>
                <motion.div
                    className={styles.hero_content_inner}
                    variants={containerVariants}
                    initial="hidden"
                    animate={isReady ? "visible" : "hidden"}
                >
                    <div className={styles.counter_container}>
                        <motion.div className={styles.counter_item} variants={itemVariants}>
                            <span className={styles.counter_value}>{formatNumber(timePassed.years)}</span>
                            <span className={styles.counter_label}>Anos</span>
                        </motion.div>

                        <motion.div className={styles.counter_item} variants={itemVariants}>
                            <span className={styles.counter_value}>{formatNumber(timePassed.months)}</span>
                            <span className={styles.counter_label}>Meses</span>
                        </motion.div>

                        <motion.div className={styles.counter_item} variants={itemVariants}>
                            <span className={styles.counter_value}>{formatNumber(timePassed.days)}</span>
                            <span className={styles.counter_label}>Dias</span>
                        </motion.div>
                    </div>

                    <motion.div className={styles.hero_subtitle_container} variants={itemVariants}>
                        <p className={styles.hero_subtitle}>
                            Cada segundo da nossa história, medido em momentos preciosos.
                        </p>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
