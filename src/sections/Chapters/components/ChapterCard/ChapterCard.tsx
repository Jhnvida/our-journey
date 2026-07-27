import { CheckCircle2, CircleDashed } from "lucide-react";
import styles from "./ChapterCard.module.css";

type ChapterCardProps = {
    index: number;
    title: string;
    status: string;
    isLast: boolean;
};

export const ChapterCard = ({ index, title, status, isLast }: ChapterCardProps) => {
    const isDone = status === "concluido";

    return (
        <div className={`${styles.roadmap_item} ${isDone ? styles.done : ""} reveal_up`}>
            <div className={styles.gutter}>
                <div className={`${styles.icon_wrapper} ${isDone ? styles.icon_done : styles.icon_pending}`}>
                    {isDone ? <CheckCircle2 size={24} /> : <CircleDashed size={24} />}
                </div>

                {!isLast && <div className={`${styles.line} ${isDone ? styles.line_done : ""}`}></div>}
            </div>

            <div className={styles.content}>
                <span className={styles.index}>Capítulo {(index + 1).toString().padStart(2, "0")}</span>
                <h4 className={styles.title}>{title}</h4>

                <div className={`${styles.status_badge} ${isDone ? styles.badge_done : styles.badge_pending}`}>
                    {isDone ? "Concluído" : "Aguardando"}
                </div>
            </div>
        </div>
    );
};
