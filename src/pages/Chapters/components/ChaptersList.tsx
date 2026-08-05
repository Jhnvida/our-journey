import type { Chapter } from "../../../types";
import styles from "../styles.module.css";

type ChaptersListProps = {
    chapters: Chapter[];
    onEdit: (chapter: Chapter) => void;
};

export default function ChaptersList({ chapters, onEdit }: ChaptersListProps) {
    if (chapters.length === 0) {
        return <p>Nenhum capítulo cadastrado.</p>;
    }

    return (
        <div className={styles.list_section}>
            <div className={styles.event_list}>
                {chapters.map((chapter) => (
                    <div key={chapter.id} className={styles.event_card}>
                        <div className={styles.event_card_body}>
                            <div className={styles.event_content}>
                                <h4 className={styles.event_title}>{chapter.title}</h4>
                                <span className={styles.event_date}>
                                    Status: {chapter.status === "concluido" ? "Concluído" : "Pendente"}
                                </span>
                            </div>

                            <div className={styles.event_actions}>
                                <button className={styles.button_small} onClick={() => onEdit(chapter)}>
                                    Editar
                                </button>
                                <button className={styles.button_small}>Excluir</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
