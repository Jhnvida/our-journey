import styles from "./styles.module.css";
import { ArrowDown } from "lucide-react";

import { useCounter } from "../../hooks";

export function Counter() {
    const time = useCounter();

    return (
        <section className={styles.section}>
            <div className={styles.header}>
                <h1 className={styles.eyebrow}>Nossa Jornada</h1>
            </div>

            <div className={styles.shell}>
                <div className={`${styles.statBox} ${styles.fadeInUp} ${styles.delay1}`}>
                    <span className={styles.title}>{time.years}</span>
                    <span className={styles.label}>Ano</span>
                </div>

                <div className={`${styles.statBox} ${styles.fadeInUp} ${styles.delay2}`}>
                    <span className={styles.title}>{time.months}</span>
                    <span className={styles.label}>Meses</span>
                </div>

                <div className={`${styles.statBox} ${styles.fadeInUp} ${styles.delay3}`}>
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
