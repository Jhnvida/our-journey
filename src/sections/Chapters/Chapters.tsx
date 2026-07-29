import SectionHeader from "../../components/SectionHeader/SectionHeader";
import { useChapters } from "../../hooks/useChapters";
import styles from "./Chapters.module.css";
import ChapterCard from "./components/ChapterCard/ChapterCard";

export default function Chapters() {
    const { chapters } = useChapters();

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <SectionHeader title="Próximos Capítulos" subtitle="Acompanhe a nossa jornada passo a passo." />

                <div className={styles.roadmap_list}>
                    {chapters.map((chapter, i) => (
                        <ChapterCard key={chapter.id} index={i} title={chapter.title} status={chapter.status} />
                    ))}
                </div>
            </div>
        </section>
    );
}
