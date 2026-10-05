import { MasonryCard } from "@/components/ui/MasonryCard";
import type { TimelineEvent } from "@/types";
import { formatDate } from "@/utils/formatDate";
import styles from "./TimelineCard.module.css";

export const TimelineCard = ({ event, index }: { event: TimelineEvent; index: number }) => {
    return (
        <MasonryCard index={index} imageUrl={event.image_url || undefined} imageAlt={event.title}>
            <div className={styles.meta}>
                <span className={styles.date}>{formatDate(event.date)}</span>
                {event.is_milestone && <span className={styles.milestone_mark}>· marco</span>}
            </div>

            <h3 className={styles.title}>{event.title}</h3>
            {event.description && <p className={styles.description}>{event.description}</p>}
        </MasonryCard>
    );
};
