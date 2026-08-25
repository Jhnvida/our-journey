import { motion } from "motion/react";
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
        if (window.confirm("Tem certeza que deseja excluir este capítulo?")) {
            await removeChapter(id);
        }
    }

    return (
        <motion.div
            className={styles.container}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            <div className={styles.header}>
                <SectionHeader title="Próximos Capítulos" subtitle="Gerencie os planos futuros" />

                {!isFormOpen && (
                    <motion.button
                        className={styles.button}
                        onClick={handleOpenForm}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Novo Capítulo
                    </motion.button>
                )}
            </div>

            {error && <div className={styles.error_message}>{error}</div>}

            {isFormOpen ? (
                <ChaptersForm data={selectedChapter} onSave={handleSave} onCancel={handleCloseForm} loading={loading} />
            ) : (
                <ChaptersList chapters={chapters} onEdit={handleEdit} onDelete={handleDelete} />
            )}
        </motion.div>
    );
}
