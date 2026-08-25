import { motion } from "framer-motion";
import { slideUp, staggerContainer } from "../../../lib/animations";
import styles from "../styles.module.css";
import type { Chapter } from "../../../types";

interface ChaptersListProps {
    chapters: Chapter[];
    onEdit: (chapter: Chapter) => void;
    onDelete: (id: string) => void;
}

export function ChaptersList({ chapters, onEdit, onDelete }: ChaptersListProps) {
    if (chapters.length === 0) {
        return <p>Nenhum capítulo cadastrado.</p>;
    }

    return (
        <div className={styles.list_section}>
            <motion.div className={styles.event_list} variants={staggerContainer} initial="hidden" animate="visible">
                {chapters.map((chapter) => (
                    <motion.div key={chapter.id} className={styles.event_card} variants={slideUp}>
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
            </motion.div>
        </div>
    );
}
