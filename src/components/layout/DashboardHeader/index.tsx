import styles from "./styles.module.css";

interface DashboardHeaderProps {
    title: string;
    subtitle: string;
}

export function DashboardHeader({ title, subtitle }: DashboardHeaderProps) {
    return (
        <div className={styles.container}>
            <h2 className={styles.title}>{title}</h2>
            <p className={styles.subtitle}>{subtitle}</p>
        </div>
    );
}
