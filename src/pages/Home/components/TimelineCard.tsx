import { MasonryCard } from "@/components/ui/MasonryCard";
import type { TimelineEvent } from "@/types";
import { formatDate } from "@/utils/formatDate";
import styles from "./TimelineCard.module.css";

export const TimelineCard = ({ event, index }: { event: TimelineEvent; index: number }) => {
    return (
        <MasonryCard index={index} imageUrl={event.image_url || undefined} imageAlt={event.title}>
            <p className={styles.timeline_masonry_date}>{formatDate(event.date)}</p>
            <h3 className={styles.timeline_masonry_title}>{event.title}</h3>
            <p className={styles.timeline_masonry_text}>{event.description}</p>
        </MasonryCard>
    );
};
