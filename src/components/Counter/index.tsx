import styles from "./styles.module.css";

import { Time } from "../Time";
import { useEffect, useState } from "react";
import { supabase } from "../../utils/supabase";

function updateCounter(start: Date) {
    const now = new Date();

    let years = now.getFullYear() - start.getFullYear();
    let months = now.getMonth() - start.getMonth();
    let days = now.getDate() - start.getDate();
    let hours = now.getHours() - start.getHours();
    let minutes = now.getMinutes() - start.getMinutes();
    let seconds = now.getSeconds() - start.getSeconds();

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

    return { years, months, days, hours, minutes, seconds };
}

export function Counter() {
    const [date, setDate] = useState<Date | null>(null);
    const [time, setTime] = useState({ years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        async function getDate() {
            const { data: settings } = await supabase.from("settings").select("relationship_start_date").single();
            if (settings?.relationship_start_date) setDate(new Date(settings.relationship_start_date));
        }

        getDate();
    }, []);

    useEffect(() => {
        if (!date) return;

        setTime(updateCounter(date));
        const interval = setInterval(() => {
            setTime(updateCounter(date));
        }, 1000);

        return () => clearInterval(interval);
    }, [date]);

    return (
        <div className={styles.counter}>
            <p className={styles.title}>Desde 2026</p>

            <div className={styles.timeGrid}>
                <Time value={time.years} label="Anos" />
                <Time value={time.months} label="Meses" />
                <Time value={time.days} label="Dias" />
                <Time value={time.hours} label="Horas" />
                <Time value={time.minutes} label="Minutos" />
                <Time value={time.seconds} label="Segundos" />
            </div>
        </div>
    );
}
