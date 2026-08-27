import styles from "../../../styles/admin.module.css";
import type { Chapter } from "../../../types";

interface ChaptersListProps {
    chapters: Chapter[];
    onEdit: (chapter: Chapter) => void;
    onDelete: (id: string) => void;
}

export function ChaptersList({ chapters, onEdit, onDelete }: ChaptersListProps) {
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
                                <button className="btn btn-small" onClick={() => onEdit(chapter)}>
                                    Editar
                                </button>
                                <button className="btn btn-small" onClick={() => onDelete(chapter.id)}>
                                    Excluir
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
