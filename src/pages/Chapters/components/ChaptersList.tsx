import { motion } from "motion/react";
import type { Chapter } from "../../../types";
import styles from "../../Dashboard/admin.module.css";

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
                    <motion.div key={chapter.id} className={styles.event_card} whileHover={{ y: -5 }}>
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
                                <button className={styles.button_small} onClick={() => onDelete(chapter.id)}>
                                    Excluir
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
