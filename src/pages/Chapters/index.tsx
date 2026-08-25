import { useState } from "react";
import { SectionHeader } from "../../components/SectionHeader";
import { useChapters } from "../../hooks/useChapters";
import type { Chapter } from "../../types";
import styles from "../Dashboard/admin.module.css";
import { ChaptersForm } from "./components/ChaptersForm";
import { ChaptersList } from "./components/ChaptersList";

export function Chapters() {
    const { chapters, addChapter, updateChapter, removeChapter, loading, error } = useChapters();

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);

    function handleOpenForm() {
        setSelectedChapter(null);
        setIsFormOpen(true);
    }

    function handleEdit(chapter: Chapter) {
        setSelectedChapter(chapter);
        setIsFormOpen(true);
    }

    function handleCloseForm() {
        setIsFormOpen(false);
        setSelectedChapter(null);
    }

    async function handleSave(data: Omit<Chapter, "id" | "created_at">) {
        if (selectedChapter) {
            await updateChapter(selectedChapter.id, data);
        } else {
            await addChapter(data);
        }
        handleCloseForm();
    }

    async function handleDelete(id: string) {
        if (window.confirm("Tem certeza que deseja excluir este capÃ­tulo?")) {
            await removeChapter(id);
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <SectionHeader title="PrÃ³ximos CapÃ­tulos" subtitle="Gerencie os planos futuros" />

                {!isFormOpen && (
                    <button className={styles.button} onClick={handleOpenForm}>
                        Novo CapÃ­tulo
                    </button>
                )}
            </div>

            {error && <div className={styles.error_message}>{error}</div>}

            {isFormOpen ? (
                <ChaptersForm data={selectedChapter} onSave={handleSave} onCancel={handleCloseForm} loading={loading} />
            ) : (
                <ChaptersList chapters={chapters} onEdit={handleEdit} onDelete={handleDelete} />
            )}
        </div>
    );
}
