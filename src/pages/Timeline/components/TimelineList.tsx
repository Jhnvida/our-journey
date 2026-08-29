import { formatDate } from "../../../lib/formatDate";
import styles from "../../../styles/admin.module.css";
import type { TimelineEvent } from "../../../types";

interface TimelineListProps {
    events: TimelineEvent[];
    onEdit: (event: TimelineEvent) => void;
    onDelete: (id: string) => void;
}

export function TimelineList({ events, onEdit, onDelete }: TimelineListProps) {
    return (
        <div className={styles.list_section}>
            <div className={styles.event_list}>
                {events.map((event) => (
                    <div key={event.id} className={styles.event_card}>
                        {event.image_url && (
                            <img src={event.image_url} alt={event.title} className={styles.event_image} />
                        )}

                        <div className={styles.event_card_body}>
                            <div className={styles.event_content}>
                                <h4 className={styles.event_title}>{event.title}</h4>
                                <span className={styles.event_date}>{formatDate(event.date)}</span>
                                {event.description && <p className={styles.event_description}>{event.description}</p>}
                            </div>

                            <div className={styles.event_actions}>
                                <button className="btn btn-small" onClick={() => onEdit(event)}>
                                    Editar
                                </button>
                                <button className="btn btn-small" onClick={() => onDelete(event.id)}>
                                    Excluir
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
