import styles from "./styles.module.css";

export function Counter() {
    return (
        <div className={styles.counter}>
            <p className={styles.title}>Desde 2026</p>

            <div className={styles.timeGrid}>
                <div className={styles.timeItem}>
                    <span className={styles.timeValue}>0</span>
                    <span className={styles.timeLabel}>Anos</span>
                </div>

                <div className={styles.timeItem}>
                    <span className={styles.timeValue}>0</span>
                    <span className={styles.timeLabel}>Meses</span>
                </div>

                <div className={styles.timeItem}>
                    <span className={styles.timeValue}>0</span>
                    <span className={styles.timeLabel}>Dias</span>
                </div>

                <div className={styles.timeItem}>
                    <span className={styles.timeValue}>0</span>
                    <span className={styles.timeLabel}>Horas</span>
                </div>

                <div className={styles.timeItem}>
                    <span className={styles.timeValue}>0</span>
                    <span className={styles.timeLabel}>Minutos</span>
                </div>
            </div>
        </div>
    );
}
