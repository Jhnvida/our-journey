import { AdminListCard } from "@/components/ui/AdminListCard";
import styles from "@/styles/admin.module.css";
import type { TimelineEvent } from "@/types";
import { formatDate } from "@/utils/formatDate";

interface TimelineListProps {
    events: TimelineEvent[];
    onEdit: (event: TimelineEvent) => void;
    onDelete: (id: string) => void;
}

export const TimelineList = ({ events, onEdit, onDelete }: TimelineListProps) => {
    return (
        <div className={styles.list_section}>
            <div className={styles.event_list}>
                {events.map((event) => (
                    <AdminListCard
                        key={event.id}
                        imageUrl={event.image_url || undefined}
                        imageAlt={event.title}
                        onEdit={() => onEdit(event)}
                        onDelete={() => onDelete(event.id)}
                    >
                        <h4 className={styles.event_title}>{event.title}</h4>
                        <span className={styles.event_date}>{formatDate(event.date)}</span>
                        {event.description && <p className={styles.event_description}>{event.description}</p>}
                    </AdminListCard>
                ))}
            </div>
        </div>
    );
};
