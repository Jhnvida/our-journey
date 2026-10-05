import { useSettings } from "@/hooks/useSettings";
import { formatDate } from "@/utils/formatDate";
import { timeDiff } from "@/utils/timeDiff";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Hero.module.css";

export const Hero = ({ isReady }: { isReady: boolean }) => {
    const { settings } = useSettings();
    const [time, setTime] = useState({ years: 0, months: 0, days: 0, totalDays: 0 });

    useEffect(() => {
        if (!settings?.relationship_start_date) return;

        function updateTime() {
            if (settings?.relationship_start_date) {
                setTime(timeDiff(settings.relationship_start_date));
            }
        }

        updateTime();
        const interval = setInterval(updateTime, 1000 * 60 * 60);

        return () => clearInterval(interval);
    }, [settings?.relationship_start_date]);

    const formattedStartDate = settings?.relationship_start_date ? formatDate(settings.relationship_start_date) : "";

    return (
        <section className={styles.hero}>
            <header className={styles.header}>
                <span className={styles.brand}>A Nossa Jornada</span>
                <Link to="/dashboard" className={styles.admin_link}>
                    Painel
                </Link>
            </header>

            <motion.div
                className={styles.hero_content}
                initial={{ opacity: 0, y: 16 }}
                animate={isReady ? { opacity: 1, y: 0 } : undefined}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
                <div className={styles.counter_group}>
                    <div className={styles.counter_block}>
                        <span className={styles.number}>{time.years}</span>
                        <span className={styles.unit}>{time.years === 1 ? "ano" : "anos"}</span>
                    </div>

                    <span className={styles.divider} aria-hidden="true">
                        ·
                    </span>

                    <div className={styles.counter_block}>
                        <span className={styles.number}>{time.months}</span>
                        <span className={styles.unit}>{time.months === 1 ? "mês" : "meses"}</span>
                    </div>

                    <span className={styles.divider} aria-hidden="true">
                        ·
                    </span>

                    <div className={styles.counter_block}>
                        <span className={styles.number}>{time.days}</span>
                        <span className={styles.unit}>{time.days === 1 ? "dia" : "dias"}</span>
                    </div>
                </div>

                {formattedStartDate && (
                    <p className={styles.context}>
                        desde {formattedStartDate}
                        {time.totalDays > 0 && (
                            <span className={styles.total_days}> · {time.totalDays.toLocaleString("pt-BR")} dias</span>
                        )}
                    </p>
                )}
            </motion.div>
        </section>
    );
};
