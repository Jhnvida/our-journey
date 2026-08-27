import { Check, CircleDashed } from "lucide-react";
import { motion } from "motion/react";
import { SectionHeader } from "../../../components/SectionHeader";
import { useChapters } from "../../../hooks/useChapters";
import { duration, easing, fadeInLeft, staggerContainer, viewportOnce } from "../../../lib/motion";
import styles from "./Chapters.module.css";

const containerVariants = staggerContainer(0.06);
const itemVariants = fadeInLeft(-16);

const progressFillVariants = {
    hidden: { width: "0%" },
    visible: { width: "100%", transition: { duration: duration.slow, ease: easing.gentle, delay: 0.3 } },
};

export function Chapters() {
    const { chapters } = useChapters();
    if (!chapters || chapters.length === 0) return null;

    return (
        <section className={styles.chapters_section}>
            <SectionHeader title="Próximos Capítulos" subtitle="Acompanhe a nossa jornada passo a passo." />

            <div className={styles.chapters_container}>
                <motion.div
                    className={styles.chapters_list}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    variants={containerVariants}
                >
                    {chapters.map((chapter) => {
                        const isCompleted = chapter.status === "concluido";

                        return (
                            <motion.div key={chapter.id} className={styles.chapter_item} variants={itemVariants}>
                                <div className={styles.chapter_info}>
                                    <div
                                        className={isCompleted ? styles.chapter_icon_done : styles.chapter_icon_pending}
                                    >
                                        {isCompleted ? <Check size={24} /> : <CircleDashed size={24} />}
                                    </div>
                                    <h4 className={styles.chapter_title}>{chapter.title}</h4>
                                </div>

                                <div className={styles.chapter_status}>
                                    <span
                                        className={isCompleted ? styles.status_label_done : styles.status_label_pending}
                                    >
                                        {isCompleted ? "Concluído" : "Pendente"}
                                    </span>

                                    <div
                                        className={`${styles.progress_bar} ${isCompleted ? styles.progress_bar_done : styles.progress_bar_pending}`}
                                    >
                                        {isCompleted ? (
                                            <motion.div
                                                className={styles.progress_bar_done_fill}
                                                variants={progressFillVariants}
                                                initial="hidden"
                                                whileInView="visible"
                                                viewport={viewportOnce}
                                            />
                                        ) : (
                                            <div className={styles.progress_bar_pending_fill}></div>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}
