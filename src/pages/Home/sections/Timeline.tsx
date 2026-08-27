import { motion } from "motion/react";
import { SectionHeader } from "../../../components/SectionHeader";
import { useTimelineEvents } from "../../../hooks/useTimelineEvents";
import { formatDate } from "../../../lib/formatDate";
import { fadeInUp, staggerContainer, viewportOnce } from "../../../lib/motion";
import type { TimelineEvent } from "../../../types";
import styles from "./Timeline.module.css";

const containerVariants = staggerContainer(0.08);
const cardVariants = fadeInUp(24);

function TimelineCard({ event }: { event: TimelineEvent }) {
    return (
        <motion.div className={styles.timeline_masonry_item} variants={cardVariants}>
            <img src={event.image_url || undefined} alt={event.title} className={styles.timeline_masonry_image} />

            <div className={styles.timeline_masonry_content}>
                <p className={styles.timeline_masonry_date}>{formatDate(event.date)}</p>
                <h3 className={styles.timeline_masonry_title}>{event.title}</h3>
                <p className={styles.timeline_masonry_text}>{event.description}</p>
            </div>
        </motion.div>
    );
}

export function Timeline() {
    const { events } = useTimelineEvents();

    if (!events || events.length === 0) return null;

    const leftEvents = events.filter((_, i) => i % 2 === 0);
    const rightEvents = events.filter((_, i) => i % 2 !== 0);

    return (
        <section className={styles.timeline_section}>
            <SectionHeader title="A Linha do Tempo" subtitle="Relembre os melhores momentos da nossa história." />

            <motion.div
                className={styles.timeline_mobile}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                variants={containerVariants}
            >
                {events.map((event) => (
                    <TimelineCard key={`mobile-${event.id}`} event={event} />
                ))}
            </motion.div>

            <motion.div
                className={styles.timeline_desktop}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                variants={containerVariants}
            >
                <div className={styles.timeline_column}>
                    {leftEvents.map((event) => (
                        <TimelineCard key={`desktop-left-${event.id}`} event={event} />
                    ))}
                </div>

                <div className={`${styles.timeline_column} ${styles.timeline_staggered}`}>
                    {rightEvents.map((event) => (
                        <TimelineCard key={`desktop-right-${event.id}`} event={event} />
                    ))}
                </div>
            </motion.div>
        </section>
    );
}
