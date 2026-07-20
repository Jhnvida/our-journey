import { Edit2, Image as ImageIcon, ListPlus, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { useTimeline } from "../../../../hooks";
import type { Event } from "../../../../hooks/useTimeline";
import { EventDrawer } from "./components/EventDrawer";
import styles from "./styles.module.css";

export function TimelineTab() {
    const { events, removeEvent, addEvent, updateEvent } = useTimeline();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

    const handleOpenDrawer = (event?: Event) => {
        setSelectedEvent(event || null);
        setIsDrawerOpen(true);
    };

    const handleCloseDrawer = () => {
        setIsDrawerOpen(false);
        setSelectedEvent(null);
    };

    const handleDeleteEvent = async (id: string) => {
        await removeEvent(id);
    };

    return (
        <div className={styles.card}>
            <div className={styles.cardHeader}>
                <div className={styles.titleContainer}>
                    <h2 className={styles.cardTitle}>Gerenciar Linha do Tempo</h2>
                    <p className={styles.cardDescription}>Adicione, edite ou remova os momentos marcantes.</p>
                </div>

                <button className={styles.button} onClick={() => handleOpenDrawer()}>
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
                            <button
                                className={styles.iconButton}
                                title="Editar"
                                onClick={() => handleOpenDrawer(event)}
                            >
                                <Edit2 size={16} />
                            </button>

                            <button
                                className={`${styles.iconButton} ${styles.iconButtonDelete}`}
                                title="Excluir"
                                onClick={() => handleDeleteEvent(event.id)}
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <EventDrawer
                isOpen={isDrawerOpen}
                onClose={handleCloseDrawer}
                event={selectedEvent}
                addEvent={addEvent}
                updateEvent={updateEvent}
            />
        </div>
    );
}
