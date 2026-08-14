import type { ReactNode } from "react";
import styles from "./styles.module.css";

interface ChapterCardProps {
    index?: number;
    title: string;
    status: string;
    children?: ReactNode;
}

export function ChapterCard({ title, status, children }: ChapterCardProps) {
    const isDone = status === "concluido";

    return (
        <div className={styles.chapter_card}>
            <div className={styles.chapter_header}>
                <h4 className={styles.title}>{title}</h4>
            </div>

            <div className={styles.chapter_footer}>
                {children && <div className={styles.actions}>{children}</div>}

                <span className={`${styles.chapter_status} ${isDone ? styles.chapter_status_done : ""}`}>
                    {isDone ? "Concluído" : "Pendente"}
                </span>
            </div>
        </div>
    );
}
