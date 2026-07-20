import { useEffect, useState } from "react";
import { useSettings } from "../../hooks/useSettings";
import { HeroCounter } from "./components/HeroCounter";
import styles from "./styles.module.css";

const calculateTimeDifference = (startDate: string) => {
    const start = new Date(startDate);
    const now = new Date();
    let years = now.getFullYear() - start.getFullYear();
    let months = now.getMonth() - start.getMonth();
    let days = now.getDate() - start.getDate();

    if (days < 0) {
        months -= 1;
        const previousMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += previousMonth.getDate();
    }
    if (months < 0) {
        years -= 1;
        months += 12;
    }

    return { years, months, days };
};

export const HeroSection = () => {
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

            <div className={`${styles.hero_image_container} reveal_up delay_100`}>
                {settings?.hero_image_url ? (
                    <img src={settings.hero_image_url} alt="Background do casal" />
                ) : (
                    <div className={styles.hero_image_fallback} />
                )}
            </div>
        </section>
    );
};
