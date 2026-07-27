import { SectionHeader } from "../../components/SectionHeader/SectionHeader";
import { useChapters } from "../../hooks/useChapters";
import styles from "./Chapters.module.css";
import { ChapterCard } from "./components/ChapterCard/ChapterCard";

export const Chapters = () => {
    const { chapters } = useChapters();

    return (
        <section className={`${styles.chapters_section} reveal_up`}>
            <SectionHeader title="Próximos Capítulos" subtitle="Descubra o que o futuro nos reserva." />

            <div className={styles.chapters_grid}>
                {chapters.map((chapter, i) => (
                    <ChapterCard key={chapter.id} index={i} title={chapter.title} status={chapter.status} />
                ))}
            </div>
        </section>
    );
};
