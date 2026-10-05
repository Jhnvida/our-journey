import styles from "./SectionHeader.module.css";

interface SectionHeaderProps {
    title: string;
    subtitle?: string;
    id?: string;
}

export const SectionHeader = ({ title, subtitle, id }: SectionHeaderProps) => {
    return (
        <header className={styles.header} id={id}>
            <h2 className={styles.title}>{title}</h2>
            {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </header>
    );
};
