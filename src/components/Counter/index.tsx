import styles from "./styles.module.css";

import { Time } from "../Time";
import { useEffect, useState } from "react";

function updateCounter(start: Date) {
    const now = new Date();

    let years = now.getFullYear() - start.getFullYear();
    let months = now.getMonth() - start.getMonth();
    let days = now.getDate() - start.getDate();
    let hours = now.getHours() - start.getHours();
    let minutes = now.getMinutes() - start.getMinutes();

    if (minutes < 0) {
        minutes += 60;
        hours--;
    }

    if (hours < 0) {
        hours += 24;
        days--;
    }

    if (days < 0) {
        const prev = new Date(now.getFullYear(), now.getMonth(), 0);
        days += prev.getDate();
        months--;
    }

    if (months < 0) {
        months += 12;
        years--;
    }

    return { years, months, days, hours, minutes };
}

export function Counter() {
    const [time, setTime] = useState({
        years: 0,
        months: 0,
        days: 0,
        hours: 0,
        minutes: 0,
    });

    useEffect(() => {
        const start = new Date("2026-01-17T00:00:00");

        setTime(updateCounter(start));

        const interval = setInterval(() => {
            setTime(updateCounter(start));
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className={styles.counter}>
            <p className={styles.title}>Desde 2026</p>

            <div className={styles.timeGrid}>
                <Time value={time.years} label="Anos" />
                <Time value={time.months} label="Meses" />
                <Time value={time.days} label="Dias" />
                <Time value={time.hours} label="Horas" />
                <Time value={time.minutes} label="Minutos" />
            </div>
        </div>
    );
}
