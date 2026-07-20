import { CheckCircle, Circle } from "lucide-react";
import { Badge } from "../../../../components/Badge";
import styles from "./styles.module.css";

type ChapterCardProps = {
    index: number;
    title: string;
    status: string;
};

export const ChapterCard = ({ index, title, status }: ChapterCardProps) => {
    const isDone = status === "concluido";

    return (
        <div className={`${styles.chapter_card} group`}>
            <div className={styles.chapter_card_header}>
                <Badge variant={isDone ? "done" : "pending"}>{isDone ? "Concluído" : "Pendente"}</Badge>

                <div className={`${styles.chapter_icon} ${isDone ? styles.icon_done : styles.icon_pending}`}>
                    {isDone ? <CheckCircle /> : <Circle />}
                </div>
            </div>

            <div>
                <p className={styles.chapter_index}>{(index + 1).toString().padStart(2, "0")}</p>
                <h4
                    className={`${styles.chapter_title} ${isDone ? styles.chapter_title_done : styles.chapter_title_pending}`}
                >
                    {title}
                </h4>
            </div>
        </div>
    );
};
