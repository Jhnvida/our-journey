import { SectionHeader } from "@/components/ui/SectionHeader";
import { useChapters } from "@/hooks/useChapters";
import { Check } from "lucide-react";
import styles from "./Chapters.module.css";

export const Chapters = () => {
    const { chapters } = useChapters();
    if (!chapters || chapters.length === 0) return null;

    return (
        <section className={styles.chapters_section} id="chapters">
            <div className={styles.section_inner}>
                <SectionHeader title="Planos" />

                <ul className={styles.chapters_list}>
                    {chapters.map((chapter) => {
                        const isCompleted = chapter.status === "concluido";

                        return (
                            <li key={chapter.id} className={styles.chapter_item}>
                                <div className={isCompleted ? styles.icon_done : styles.icon_pending}>
                                    {isCompleted ? <Check size={14} /> : <span className={styles.pending_dot} />}
                                </div>

                                <span className={isCompleted ? styles.title_done : styles.title}>{chapter.title}</span>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </section>
    );
};
