import { motion } from "framer-motion";
import { slideUp, staggerContainer } from "../../../lib/animations";
import { formatDate } from "../../../lib/formatDate";
import type { TimelineEvent } from "../../../types";
import styles from "../styles.module.css";

interface TimelineListProps {
    events: TimelineEvent[];
    onEdit: (event: TimelineEvent) => void;
    onDelete: (id: string) => void;
}

export function TimelineList({ events, onEdit, onDelete }: TimelineListProps) {
    if (events.length === 0) {
        return <p>Nenhum evento cadastrado na linha do tempo.</p>;
    }

    return (
        <div className={styles.list_section}>
            <motion.div className={styles.event_list} variants={staggerContainer} initial="hidden" animate="visible">
                {events.map((event) => (
                    <motion.div key={event.id} className={styles.event_card} variants={slideUp}>
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
                                <button className={styles.button_small} onClick={() => onEdit(event)}>
                                    Editar
                                </button>
                                <button className={styles.button_small} onClick={() => onDelete(event.id)}>
                                    Excluir
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
}
