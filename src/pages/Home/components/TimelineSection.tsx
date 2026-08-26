import { motion } from "motion/react";
import { SectionHeader } from "../../../components/SectionHeader";
import { useTimelineEvents } from "../../../hooks/useTimelineEvents";
import { formatDate } from "../../../lib/formatDate";
import styles from "../styles.module.css";

export function TimelineSection() {
    const { events } = useTimelineEvents();

    if (!events || events.length === 0) return null;

    return (
        <section className={styles.timeline_section}>
            <SectionHeader title="A LINHA DO TEMPO" subtitle="Relembre os melhores momentos da nossa história." />
            <div className={styles.timeline_masonry}>
                {events.map((event, index) => (
                    <motion.div
                        key={event.id}
                        className={styles.timeline_masonry_item}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                    >
                        <img
                            src={event.image_url || undefined}
                            alt={event.title}
                            className={styles.timeline_masonry_image}
                        />
                        <div className={styles.timeline_masonry_content}>
                            <p className={styles.timeline_masonry_date}>{formatDate(event.date)}</p>
                            <h3 className={styles.timeline_masonry_title}>{event.title}</h3>
                            <p className={styles.timeline_masonry_text}>{event.description}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
