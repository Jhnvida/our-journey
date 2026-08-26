import { Menu, X } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSettings } from "../../../hooks/useSettings";
import { calculateTime } from "../../../lib/calculateTime";
import styles from "../styles.module.css";

export function HeroSection() {
    const { settings } = useSettings();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
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
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <div className={styles.brand_label}>A Nossa Jornada</div>
                <div className={styles.header_actions}>
                    {isMenuOpen && (
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
                    )}

                    <motion.button
                        className={styles.menu_button}
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </motion.button>
                </div>
            </motion.header>

            <motion.div
                className={styles.hero_content}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                <div className={styles.hero_content_inner}>
                    <div className={styles.counter_container}>
                        <div className={styles.counter_item}>
                            <span className={styles.counter_value}>{formatNumber(timePassed.years)}</span>
                            <span className={styles.counter_label}>Anos</span>
                        </div>
                        <div className={styles.counter_item}>
                            <span className={styles.counter_value}>{formatNumber(timePassed.months)}</span>
                            <span className={styles.counter_label}>Meses</span>
                        </div>
                        <div className={styles.counter_item}>
                            <span className={styles.counter_value}>{formatNumber(timePassed.days)}</span>
                            <span className={styles.counter_label}>Dias</span>
                        </div>
                    </div>

                    <div className={styles.hero_subtitle_container}>
                        <p className={styles.hero_subtitle}>
                            Cada segundo da nossa história, medido em momentos preciosos.
                        </p>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
