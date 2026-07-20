import styles from "./styles.module.css";

interface HeroCounterProps {
    time: { years: number; months: number; days: number };
}

export const HeroCounter = ({ time }: HeroCounterProps) => {
    return (
        <div className={styles.hero_counters}>
            <div className={styles.hero_counter_item}>
                <span className={styles.hero_counter_number}>{time.years.toString().padStart(2, "0")}</span>
                <span className={styles.hero_counter_label}>Anos</span>
            </div>

            <div className={styles.hero_counter_item}>
                <span className={styles.hero_counter_number}>{time.months.toString().padStart(2, "0")}</span>
                <span className={styles.hero_counter_label}>Meses</span>
            </div>

            <div className={styles.hero_counter_item}>
                <span className={styles.hero_counter_number}>{time.days.toString().padStart(2, "0")}</span>
                <span className={styles.hero_counter_label}>Dias</span>
            </div>
        </div>
    );
};
