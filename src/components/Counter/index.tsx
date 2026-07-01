import { ArrowDown } from "lucide-react";
import styles from "./styles.module.css";

export function Counter() {
    return (
        <section className={styles.section}>
            <div className={styles.header}>
                <h1 className={styles.eyebrow}>Nossa Jornada</h1>
            </div>

            <div className={styles.shell}>
                <div className={styles.statBox}>
                    <span className={styles.title}>0</span>
                    <span className={styles.label}>Ano</span>
                </div>

                <div className={styles.statBox}>
                    <span className={styles.title}>0</span>
                    <span className={styles.label}>Meses</span>
                </div>

                <div className={styles.statBox}>
                    <span className={styles.title}>0</span>
                    <span className={styles.label}>Dias</span>
                </div>
            </div>

            <div className={styles.arrowWrapper}>
                <ArrowDown className={styles.icon} />
            </div>
        </section>
    );
}
