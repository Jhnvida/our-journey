import { Edit2, Image as ImageIcon, ListPlus, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { useTimeline } from "../../../../hooks";
import { EventModal } from "./components/EventModal";
import styles from "./styles.module.css";

export function TimelineTab() {
    const { events } = useTimeline();
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className={styles.card}>
            <div className={styles.cardHeader}>
                <div className={styles.titleContainer}>
                    <h2 className={styles.cardTitle}>Gerenciar Linha do Tempo</h2>
                    <p className={styles.cardDescription}>Adicione, edite ou remova os momentos marcantes.</p>
                </div>

                <button className={styles.button} onClick={() => setIsModalOpen(true)}>
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
                                <span className={styles.eventMonth}>{event.month_label}</span>
                                <h3 className={styles.eventTitle}>{event.title}</h3>
                                <p className={styles.eventDescription}>{event.description}</p>

                                <div className={styles.metaInfo}>
                                    <ListPlus size={14} />
                                    <span>{event.timeline_sub_events.length} sub-eventos</span>
                                </div>
                            </div>
                        </div>

                        <div className={styles.actions}>
                            <button className={styles.iconButton} title="Editar" onClick={() => setIsModalOpen(true)}>
                                <Edit2 size={16} />
                            </button>

                            <button className={`${styles.iconButton} ${styles.iconButtonDelete}`} title="Excluir">
                                <Trash2 size={16} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <EventModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
}
