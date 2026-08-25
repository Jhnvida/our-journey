import styles from "./SectionHeader.module.css";

interface SectionHeaderProps {
    title: string;
    subtitle: string;
}

export function SectionHeader({ title, subtitle }: SectionHeaderProps) {
    return (
        <div className={styles.header}>
            <div>
                <h2 className={styles.title}>{title}</h2>
                <p className={styles.subtitle}>{subtitle}</p>
            </div>
        </div>
    );
}
