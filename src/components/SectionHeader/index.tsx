import styles from "./styles.module.css";

type SectionHeaderProps = {
    title: string;
    subtitle: string;
    align?: "left" | "center";
};

export const SectionHeader = ({ title, subtitle, align = "left" }: SectionHeaderProps) => {
    return (
        <div className={`${styles.header} ${align === "center" ? styles.align_center : ""}`}>
            <div>
                <h2 className={styles.title}>{title}</h2>
                <p className={styles.subtitle}>{subtitle}</p>
            </div>
        </div>
    );
};
