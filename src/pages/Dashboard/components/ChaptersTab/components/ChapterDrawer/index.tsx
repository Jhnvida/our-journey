import { useState } from "react";
import { Drawer } from "../../../../../../components/Drawer";
import type { Chapter } from "../../../../../../hooks/useChapters";
import styles from "./styles.module.css";

interface ChapterDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    chapter?: Chapter | null;
    addChapter: (label: string) => Promise<void>;
    updateChapter: (id: string, label: string) => Promise<void>;
}

export function ChapterDrawer({ isOpen, onClose, chapter, addChapter, updateChapter }: ChapterDrawerProps) {
    const isEditing = !!chapter;
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const label = formData.get("label") as string;

        setIsSubmitting(true);

        if (isEditing && chapter) {
            await updateChapter(chapter.id, label);
        } else {
            await addChapter(label);
        }

        setIsSubmitting(false);
        onClose();
    };

    return (
        <Drawer isOpen={isOpen} onClose={onClose} title={isEditing ? "Editar Capítulo" : "Novo Capítulo"}>
            <form key={chapter?.id || "new"} className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Título do Capítulo</label>
                    <input
                        type="text"
                        name="label"
                        className={styles.input}
                        placeholder="Ex: O Início de Tudo"
                        defaultValue={chapter?.label || ""}
                        required
                    />
                </div>

                <div className={styles.footer}>
                    <button type="button" className={styles.cancelButton} onClick={onClose} disabled={isSubmitting}>
                        Cancelar
                    </button>

                    <button type="submit" className={styles.saveButton} disabled={isSubmitting}>
                        {isSubmitting ? "Salvando..." : "Salvar Capítulo"}
                    </button>
                </div>
            </form>
        </Drawer>
    );
}
