import { useState } from "react";
import SectionHeader from "../../components/SectionHeader";
import { useChapters } from "../../hooks/useChapters";
import type { Chapter } from "../../types";
import ChaptersForm from "./components/ChaptersForm";
import ChaptersList from "./components/ChaptersList";
import styles from "./styles.module.css";

export default function Chapters() {
    const { chapters } = useChapters();

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

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <SectionHeader title="Próximos Capítulos" subtitle="Gerencie os planos futuros" />

                {!isFormOpen && (
                    <button className={styles.button} onClick={handleOpenForm}>
                        Novo Capítulo
                    </button>
                )}
            </div>

            {isFormOpen ? (
                <ChaptersForm data={selectedChapter} onCancel={handleCloseForm} />
            ) : (
                <ChaptersList chapters={chapters} onEdit={handleEdit} />
            )}
        </div>
    );
}
