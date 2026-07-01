import styles from "./styles.module.css";
import { ArrowDown } from "lucide-react";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { intervalToDuration } from "date-fns";

export function Counter() {
    const [time, setTime] = useState({ years: 0, months: 0, days: 0 });

    useEffect(() => {
        async function fetchSettings() {
            const { data } = await supabase.from("settings").select("started_at").single();

            if (data) {
                const duration = intervalToDuration({ start: new Date(data.started_at), end: new Date() });

                setTime({
                    years: duration.years || 0,
                    months: duration.months || 0,
                    days: duration.days || 0,
                });
            }
        }

        fetchSettings();
    }, []);

    return (
        <section className={styles.section}>
            <div className={styles.header}>
                <h1 className={styles.eyebrow}>Nossa Jornada</h1>
            </div>

            <div className={styles.shell}>
                <div className={styles.statBox}>
                    <span className={styles.title}>{time.years}</span>
                    <span className={styles.label}>Ano</span>
                </div>

                <div className={styles.statBox}>
                    <span className={styles.title}>{time.months}</span>
                    <span className={styles.label}>Meses</span>
                </div>

                <div className={styles.statBox}>
                    <span className={styles.title}>{time.days}</span>
                    <span className={styles.label}>Dias</span>
                </div>
            </div>

            <div className={styles.arrowWrapper}>
                <ArrowDown className={styles.icon} />
            </div>
        </section>
    );
}
