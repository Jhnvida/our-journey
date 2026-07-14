import { Edit2, Plus, Trash2 } from "lucide-react";
import { useChapters } from "../../../../hooks";
import styles from "./styles.module.css";

export function ChaptersTab() {
    const { chapters } = useChapters();

    return (
        <div className={styles.card}>
            <div className={styles.cardHeader}>
                <h2 className={styles.cardTitle}>Gerenciar Capítulos</h2>
                <p className={styles.cardDescription}>Adicione, edite ou remova os capítulos da linha do tempo.</p>
            </div>

            <div className={styles.formGroup}>
                <input type="text" className={styles.input} placeholder="Nome do novo capítulo..." />

                <button className={styles.button}>
                    <Plus size={18} />
                    Adicionar
                </button>
            </div>

            <div className={styles.chapterList}>
                {chapters.map((chapter, index) => (
                    <div key={index} className={styles.chapterItem}>
                        <div className={styles.chapterInfo}>
                            <input type="checkbox" className={styles.checkbox} checked={chapter.completed} readOnly />

                            <span
                                className={`${styles.chapterLabel} ${chapter.completed ? styles.chapterLabelCompleted : ""}`}
                            >
                                {chapter.label}
                            </span>
                        </div>

                        <div className={styles.actions}>
                            <button className={styles.iconButton} title="Editar">
                                <Edit2 size={16} />
                            </button>

                            <button className={`${styles.iconButton} ${styles.iconButtonDelete}`} title="Excluir">
                                <Trash2 size={16} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
