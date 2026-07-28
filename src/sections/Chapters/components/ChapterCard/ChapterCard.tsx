import { CheckCircle2, CircleDashed } from "lucide-react";
import styles from "./ChapterCard.module.css";

type ChapterCardProps = {
    index: number;
    title: string;
    status: string;
};

export default function ChapterCard({ index, title, status }: ChapterCardProps) {
    const isDone = status === "concluido";

    return (
        <div className={`${styles.chapter_card} ${isDone ? styles.done : ""}`}>
            <div className={styles.header}>
                <span className={styles.index}>Capítulo {(index + 1).toString().padStart(2, "0")}</span>
                <div className={`${styles.icon_wrapper} ${isDone ? styles.icon_done : styles.icon_pending}`}>
                    {isDone ? <CheckCircle2 size={24} /> : <CircleDashed size={24} />}
                </div>
            </div>

            <div className={styles.content}>
                <h4 className={styles.title}>{title}</h4>
            </div>

            <div className={styles.footer}>
                <div className={`${styles.status_badge} ${isDone ? styles.badge_done : styles.badge_pending}`}>
                    {isDone ? "Concluído" : "Aguardando"}
                </div>
            </div>
        </div>
    );
}
