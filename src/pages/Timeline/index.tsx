import { useState } from "react";
import { SectionHeader } from "../../components/SectionHeader";
import { useTimelineEvents } from "../../hooks/useTimelineEvents";
import type { TimelineEvent } from "../../types";
import { TimelineForm } from "./components/TimelineForm";
import { TimelineList } from "./components/TimelineList";
import styles from "./styles.module.css";

export function Timeline() {
    const { events, addEvent, updateEvent, removeEvent, loading, error } = useTimelineEvents();

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

    async function handleSave(data: Omit<TimelineEvent, "id" | "created_at">) {
        if (selectedEvent) {
            await updateEvent(selectedEvent.id, data);
        } else {
            await addEvent(data);
        }
        handleCloseForm();
    }

    async function handleDelete(id: string) {
        if (window.confirm("Tem certeza que deseja excluir este evento?")) {
            await removeEvent(id);
        }
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

            {error && <div className={styles.error_message}>{error}</div>}

            {isFormOpen ? (
                <TimelineForm data={selectedEvent} onSave={handleSave} onCancel={handleCloseForm} loading={loading} />
            ) : (
                <TimelineList events={events} onEdit={handleEdit} onDelete={handleDelete} />
            )}
        </div>
    );
}
