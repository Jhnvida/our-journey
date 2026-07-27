import { useEffect, useState } from "react";
import { useSettings } from "../../hooks/useSettings";
import { calculateTimeDifference } from "../../lib/calculateTimeDifference";
import { HeroCounter } from "./components/HeroCounter/HeroCounter";
import styles from "./Hero.module.css";

export const Hero = () => {
    const { settings } = useSettings();
    const [time, setTime] = useState({ years: 0, months: 0, days: 0 });

    useEffect(() => {
        if (!settings?.relationship_start_date) return;

        const updateTime = () => setTime(calculateTimeDifference(settings.relationship_start_date));
        updateTime();
        const interval = setInterval(updateTime, 1000 * 60 * 60);

        return () => clearInterval(interval);
    }, [settings]);

    return (
        <section className={`${styles.hero_section} reveal_up`}>
            <div className={styles.hero_content}>
                <p className={styles.hero_subtitle}>A Nossa Jornada</p>
                <HeroCounter time={time} />
                <p className={styles.hero_quote}>Cada segundo da nossa história, medido em momentos.</p>
            </div>
        </section>
    );
};
