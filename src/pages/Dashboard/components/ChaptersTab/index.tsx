import { Check, Edit2, Plus, Trash2, X } from "lucide-react";
import { useState } from "react";
import { useChapters } from "../../../../hooks";
import styles from "./styles.module.css";

export function ChaptersTab() {
    const { chapters, addChapter, checkChapter, updateChapter, deleteChapter } = useChapters();
    const [chapter, setChapter] = useState("");
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editLabel, setEditLabel] = useState("");

    const handleEdit = (id: string, label: string) => {
        setEditingId(id);
        setEditLabel(label);
    };

    const handleSaveEdit = (id: string) => {
        if (editLabel.trim()) {
            updateChapter(id, editLabel.trim());
        }

        setEditingId(null);
    };

    return (
        <div className={styles.card}>
            <div className={styles.cardHeader}>
                <h2 className={styles.cardTitle}>Gerenciar Capítulos</h2>
                <p className={styles.cardDescription}>Adicione, edite ou remova os capítulos da linha do tempo.</p>
            </div>

            <div className={styles.formGroup}>
                <input
                    type="text"
                    className={styles.input}
                    placeholder="Nome do novo capítulo"
                    value={chapter}
                    onChange={(e) => setChapter(e.target.value)}
                />

                <button className={styles.button} onClick={() => addChapter(chapter)}>
                    <Plus size={18} />
                    Adicionar
                </button>
            </div>

            <div className={styles.chapterList}>
                {chapters.map((chapter, index) => (
                    <div key={index} className={styles.chapterItem}>
                        <div className={styles.chapterInfo}>
                            {editingId === chapter.id ? (
                                <input
                                    type="text"
                                    className={styles.input}
                                    style={{ padding: "0.5rem", flex: 1, margin: 0 }}
                                    value={editLabel}
                                    onChange={(e) => setEditLabel(e.target.value)}
                                    autoFocus
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") handleSaveEdit(chapter.id);
                                        if (e.key === "Escape") setEditingId(null);
                                    }}
                                />
                            ) : (
                                <>
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
                                </>
                            )}
                        </div>

                        <div className={styles.actions}>
                            {editingId === chapter.id ? (
                                <>
                                    <button
                                        className={styles.iconButton}
                                        title="Salvar"
                                        onClick={() => handleSaveEdit(chapter.id)}
                                    >
                                        <Check size={16} />
                                    </button>
                                    <button
                                        className={styles.iconButton}
                                        title="Cancelar"
                                        onClick={() => setEditingId(null)}
                                    >
                                        <X size={16} />
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button
                                        className={styles.iconButton}
                                        title="Editar"
                                        onClick={() => handleEdit(chapter.id, chapter.label)}
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
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
