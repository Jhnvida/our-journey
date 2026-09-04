import { DashboardHeader } from "@/components/layout/DashboardHeader";
import { useChapters } from "@/hooks/useChapters";
import styles from "@/styles/admin.module.css";
import type { Chapter } from "@/types";
import { AnimatePresence, motion, type Variants } from "motion/react";
import { useState } from "react";
import { ChaptersForm } from "./components/ChaptersForm";
import { ChaptersList } from "./components/ChaptersList";

const fadeVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
    },
    exit: {
        opacity: 0,
        y: -10,
        transition: { duration: 0.2, ease: "easeIn" },
    },
};

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
        <div className={styles.container}>
            <div className={styles.header}>
                <DashboardHeader title="Próximos Capítulos" subtitle="Gerencie os planos futuros" />

                {!isFormOpen && (
                    <button className="btn btn-primary" onClick={handleOpenForm}>
                        Novo Capítulo
                    </button>
                )}
            </div>

            {error && <div className="alert-error">{error}</div>}

            <AnimatePresence mode="wait">
                {isFormOpen ? (
                    <motion.div key="form" variants={fadeVariants} initial="hidden" animate="visible" exit="exit">
                        <ChaptersForm
                            data={selectedChapter}
                            onSave={handleSave}
                            onCancel={handleCloseForm}
                            loading={loading}
                        />
                    </motion.div>
                ) : (
                    <motion.div key="list" variants={fadeVariants} initial="hidden" animate="visible" exit="exit">
                        <ChaptersList chapters={chapters} onEdit={handleEdit} onDelete={handleDelete} />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
