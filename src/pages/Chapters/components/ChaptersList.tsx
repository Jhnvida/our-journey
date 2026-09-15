import { AdminListCard } from "@/components/ui/AdminListCard";
import styles from "@/styles/admin.module.css";
import type { Chapter } from "@/types";

interface ChaptersListProps {
    chapters: Chapter[];
    onEdit: (chapter: Chapter) => void;
    onDelete: (id: string) => void;
}

export const ChaptersList = ({ chapters, onEdit, onDelete }: ChaptersListProps) => {
    return (
        <div className={styles.list_section}>
            <div className={styles.event_list}>
                {chapters.map((chapter) => (
                    <AdminListCard
                        key={chapter.id}
                        onEdit={() => onEdit(chapter)}
                        onDelete={() => onDelete(chapter.id)}
                    >
                        <h4 className={styles.event_title}>{chapter.title}</h4>
                        <span className={styles.event_date}>
                            Status: {chapter.status === "concluido" ? "Concluído" : "Pendente"}
                        </span>
                    </AdminListCard>
                ))}
            </div>
        </div>
    );
};
