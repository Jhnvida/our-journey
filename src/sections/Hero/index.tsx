import { useEffect, useState } from "react";
import { useSettings } from "../../hooks/useSettings";
import { calculateTimeDifference } from "../../lib/calculateTimeDifference";
import { HeroCounter } from "./components/HeroCounter";
import styles from "./styles.module.css";

export function Hero() {
    const { settings } = useSettings();
    const [time, setTime] = useState({ years: 0, months: 0, days: 0 });

    useEffect(() => {
        const startDate = settings?.relationship_start_date;
        if (!startDate) return;

        function updateTime() {
            if (startDate) {
                setTime(calculateTimeDifference(startDate));
            }
        }

        updateTime();
        const interval = setInterval(updateTime, 1000 * 60 * 60);

        return () => clearInterval(interval);
    }, [settings]);

    return (
        <section className={styles.section}>
            <div className={styles.content}>
                <p className={styles.subtitle}>A Nossa Jornada</p>
                <HeroCounter time={time} />
                <p className={styles.quote}>Cada segundo da nossa história, medido em momentos.</p>
            </div>
        </section>
    );
}
