import { useChapters } from "../../hooks/useChapters";
import { SectionHeader } from "../../components/SectionHeader";
import { ChapterCard } from "./components/ChapterCard";
import styles from "./styles.module.css";

export const ChaptersSection = () => {
    const { chapters } = useChapters();

    return (
        <section className={`${styles.chapters_section} reveal_up`}>
            <SectionHeader 
                title="Próximos Capítulos" 
                subtitle="Descubra o que o futuro nos reserva." 
            />

            <div className={styles.chapters_grid}>
                {chapters.map((chapter, i) => (
                    <ChapterCard 
                        key={chapter.id} 
                        index={i} 
                        title={chapter.title} 
                        status={chapter.status} 
                    />
                ))}
            </div>
        </section>
    );
};
