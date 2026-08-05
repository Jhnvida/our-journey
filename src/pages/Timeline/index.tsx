import { useState } from "react";
import SectionHeader from "../../components/SectionHeader";
import { useTimelineEvents } from "../../hooks/useTimelineEvents";
import type { TimelineEvent } from "../../types";
import TimelineForm from "./components/TimelineForm";
import TimelineList from "./components/TimelineList";
import styles from "./styles.module.css";

export default function Timeline() {
    const { events } = useTimelineEvents();

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);

    function handleOpenForm() {
        setSelectedEvent(null);
        setIsFormOpen(true);
    }

    function handleEdit(event: TimelineEvent) {
        setSelectedEvent(event);
        setIsFormOpen(true);
    }

    function handleCloseForm() {
        setIsFormOpen(false);
        setSelectedEvent(null);
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <SectionHeader title="A Linha do Tempo" subtitle="Gerencie os eventos da história" />
                {!isFormOpen && (
                    <button className={styles.button} onClick={handleOpenForm}>
                        Novo Evento
                    </button>
                )}
            </div>

            {isFormOpen ? (
                <TimelineForm data={selectedEvent} onCancel={handleCloseForm} />
            ) : (
                <TimelineList events={events} onEdit={handleEdit} />
            )}
        </div>
    );
}
