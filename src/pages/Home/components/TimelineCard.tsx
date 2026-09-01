import { motion } from "motion/react";
import { formatDate } from "../../../lib/formatDate";
import type { TimelineEvent } from "../../../types";
import styles from "../sections/Timeline.module.css";

export function TimelineCard({ event, index }: { event: TimelineEvent; index: number }) {
    return (
        <motion.div
            className={styles.timeline_masonry_item}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: Math.min(index * 0.1, 0.5) }}
        >
            <img
                src={event.image_url || undefined}
                alt={event.title}
                className={styles.timeline_masonry_image}
                loading={index < 4 ? "eager" : "lazy"}
                decoding="async"
                fetchPriority={index < 2 ? "high" : "auto"}
            />

            <div className={styles.timeline_masonry_content}>
                <p className={styles.timeline_masonry_date}>{formatDate(event.date)}</p>
                <h3 className={styles.timeline_masonry_title}>{event.title}</h3>
                <p className={styles.timeline_masonry_text}>{event.description}</p>
            </div>
        </motion.div>
    );
}
