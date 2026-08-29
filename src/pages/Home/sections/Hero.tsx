import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSettings } from "../../../hooks/useSettings";
import { calculateTime } from "../../../lib/calculateTime";
import styles from "./Hero.module.css";

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

            <header className={styles.header}>
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
            </header>

            <div className={styles.hero_content}>
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
            </div>
        </section>
    );
}
