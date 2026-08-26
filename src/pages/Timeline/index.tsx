import { motion } from "motion/react";
import { useState } from "react";
import { DashboardHeader } from "../../components/DashboardHeader";
import { useTimelineEvents } from "../../hooks/useTimelineEvents";
import styles from "../../styles/admin.module.css";
import type { TimelineEvent } from "../../types";
import { TimelineForm } from "./components/TimelineForm";
import { TimelineList } from "./components/TimelineList";

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
        <motion.div
            className={styles.container}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            <div className={styles.header}>
                <DashboardHeader title="A Linha do Tempo" subtitle="Gerencie os eventos da história" />
                {!isFormOpen && (
                    <motion.button
                        className="btn btn-primary"
                        onClick={handleOpenForm}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Novo Evento
                    </motion.button>
                )}
            </div>

            {error && <div className="alert-error">{error}</div>}

            {isFormOpen ? (
                <TimelineForm data={selectedEvent} onSave={handleSave} onCancel={handleCloseForm} loading={loading} />
            ) : (
                <TimelineList events={events} onEdit={handleEdit} onDelete={handleDelete} />
            )}
        </motion.div>
    );
}
