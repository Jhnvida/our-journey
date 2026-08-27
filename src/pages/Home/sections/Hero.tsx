import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSettings } from "../../../hooks/useSettings";
import { calculateTime } from "../../../lib/calculateTime";
import { duration, fadeIn, fadeInUp, staggerContainer } from "../../../lib/motion";
import styles from "./Hero.module.css";

const heroContainerVariants = staggerContainer(0.1, 0.1);
const counterContainerVariants = staggerContainer(0.12, 0);
const counterItemVariants = fadeInUp(20, duration.slow);

export function Hero() {
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

    function formatNumber(num: number) {
        return num.toString().padStart(2, "0");
    }

    return (
        <section className={styles.hero_section}>
            <div className={styles.hero_bg}></div>

            <motion.header
                className={styles.header}
                initial="hidden"
                animate="visible"
                variants={staggerContainer(0.08)}
            >
                <motion.div className={styles.brand_label} variants={fadeInUp(8, duration.normal)}>
                    A Nossa Jornada
                </motion.div>

                <motion.div className={styles.header_actions} variants={fadeIn(duration.normal)}>
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
                </motion.div>
            </motion.header>

            <div className={styles.hero_content}>
                <motion.div
                    className={styles.hero_content_inner}
                    initial="hidden"
                    animate="visible"
                    variants={heroContainerVariants}
                >
                    <motion.div className={styles.counter_container} variants={counterContainerVariants}>
                        <motion.div className={styles.counter_item} variants={counterItemVariants}>
                            <span className={styles.counter_value}>{formatNumber(timePassed.years)}</span>
                            <span className={styles.counter_label}>Anos</span>
                        </motion.div>

                        <motion.div className={styles.counter_item} variants={counterItemVariants}>
                            <span className={styles.counter_value}>{formatNumber(timePassed.months)}</span>
                            <span className={styles.counter_label}>Meses</span>
                        </motion.div>

                        <motion.div className={styles.counter_item} variants={counterItemVariants}>
                            <span className={styles.counter_value}>{formatNumber(timePassed.days)}</span>
                            <span className={styles.counter_label}>Dias</span>
                        </motion.div>
                    </motion.div>

                    <motion.div className={styles.hero_subtitle_container} variants={fadeInUp(12, duration.normal)}>
                        <p className={styles.hero_subtitle}>
                            Cada segundo da nossa história, medido em momentos preciosos.
                        </p>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
