import { Edit2, Image as ImageIcon, ListPlus, Plus, Trash2 } from "lucide-react";
import { useTimeline } from "../../../../hooks";
import styles from "./styles.module.css";

export function TimelineTab() {
    const { events } = useTimeline();

    return (
        <div className={styles.card}>
            <div className={styles.cardHeader}>
                <div className={styles.titleContainer}>
                    <h2 className={styles.cardTitle}>Gerenciar Linha do Tempo</h2>
                    <p className={styles.cardDescription}>Adicione, edite ou remova os momentos marcantes.</p>
                </div>

                <button className={styles.button}>
                    <Plus size={18} />
                    Adicionar Evento
                </button>
            </div>

            <div className={styles.eventList}>
                {events.map((event, idx) => (
                    <div key={idx} className={styles.eventItem}>
                        <div className={styles.eventInfo}>
                            {event.image_url ? (
                                <img src={event.image_url} alt={event.title} className={styles.thumbnail} />
                            ) : (
                                <div className={styles.noThumbnail}>
                                    <ImageIcon size={24} />
                                </div>
                            )}

                            <div className={styles.details}>
                                <div className={styles.eventHeader}>
                                    <h3 className={styles.eventTitle}>{event.title}</h3>
                                    <span className={styles.eventMonth}>{event.month_label}</span>
                                </div>

                                <p className={styles.eventDescription}>{event.description}</p>

                                <div className={styles.metaInfo}>
                                    <ListPlus size={14} />
                                    <span>{event.timeline_sub_events.length} sub-eventos</span>
                                </div>
                            </div>
                        </div>

                        <div className={styles.actions}>
                            <button className={styles.iconButton} title="Editar">
                                <Edit2 size={16} />
                            </button>

                            <button className={`${styles.iconButton} ${styles.iconButtonDelete}`} title="Excluir">
                                <Trash2 size={16} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
