import styles from "./styles.module.css";

type TimeProps = {
    value: number;
    label: string;
};

export function Time({ label, value }: TimeProps) {
    return (
        <div className={styles.timeItem}>
            <span className={styles.timeValue}>{value}</span>
            <span className={styles.timeLabel}>{label}</span>
        </div>
    );
}
