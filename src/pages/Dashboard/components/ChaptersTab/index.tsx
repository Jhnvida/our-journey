import { Edit2, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { useChapters } from "../../../../hooks";
import type { Chapter } from "../../../../hooks/useChapters";
import { ChapterDrawer } from "./components/ChapterDrawer";
import styles from "./styles.module.css";

export function ChaptersTab() {
    const { chapters, addChapter, checkChapter, updateChapter, deleteChapter } = useChapters();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);

    const handleOpenDrawer = (chapter?: Chapter) => {
        setSelectedChapter(chapter || null);
        setIsDrawerOpen(true);
    };

    const handleCloseDrawer = () => {
        setIsDrawerOpen(false);
        setSelectedChapter(null);
    };

    return (
        <div className={styles.card}>
            <div className={styles.cardHeader}>
                <div className={styles.titleContainer}>
                    <h2 className={styles.cardTitle}>Gerenciar Capítulos</h2>
                    <p className={styles.cardDescription}>Adicione, edite ou remova os capítulos da linha do tempo.</p>
                </div>

                <button className={styles.button} onClick={() => handleOpenDrawer()}>
                    <Plus size={18} />
                    Adicionar Capítulo
                </button>
            </div>

            <div className={styles.chapterList}>
                {chapters.map((chapter, index) => (
                    <div key={index} className={styles.chapterItem}>
                        <div className={styles.chapterInfo}>
                            <input
                                type="checkbox"
                                className={styles.checkbox}
                                checked={chapter.completed}
                                readOnly
                                onClick={() => checkChapter(chapter.id, !chapter.completed)}
                            />

                            <span
                                className={`${styles.chapterLabel} ${chapter.completed ? styles.chapterLabelCompleted : ""}`}
                            >
                                {chapter.label}
                            </span>
                        </div>

                        <div className={styles.actions}>
                            <button
                                className={styles.iconButton}
                                title="Editar"
                                onClick={() => handleOpenDrawer(chapter)}
                            >
                                <Edit2 size={16} />
                            </button>

                            <button
                                className={`${styles.iconButton} ${styles.iconButtonDelete}`}
                                title="Excluir"
                                onClick={() => deleteChapter(chapter.id)}
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <ChapterDrawer
                isOpen={isDrawerOpen}
                onClose={handleCloseDrawer}
                chapter={selectedChapter}
                addChapter={addChapter}
                updateChapter={updateChapter}
            />
        </div>
    );
}
