import { DashboardHeader } from "@/components/layout/DashboardHeader";
import { useEvents } from "@/hooks/useEvents";
import styles from "@/styles/admin.module.css";
import type { TimelineEvent } from "@/types";
import { AnimatePresence, motion, type Variants } from "motion/react";
import { useState } from "react";
import { TimelineForm } from "./components/TimelineForm";
import { TimelineList } from "./components/TimelineList";

const fadeVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
    },
    exit: {
        opacity: 0,
        y: -10,
        transition: { duration: 0.2, ease: "easeIn" },
    },
};

export function Timeline() {
    const { events, addEvent, updateEvent, removeEvent, loading, error } = useEvents();

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
                <DashboardHeader title="A Linha do Tempo" subtitle="Gerencie os eventos da história" />
                {!isFormOpen && (
                    <button className="btn btn-primary" onClick={handleOpenForm}>
                        Novo Evento
                    </button>
                )}
            </div>

            {error && <div className="alert-error">{error}</div>}

            <AnimatePresence mode="wait">
                {isFormOpen ? (
                    <motion.div key="form" variants={fadeVariants} initial="hidden" animate="visible" exit="exit">
                        <TimelineForm
                            data={selectedEvent}
                            onSave={handleSave}
                            onCancel={handleCloseForm}
                            loading={loading}
                        />
                    </motion.div>
                ) : (
                    <motion.div key="list" variants={fadeVariants} initial="hidden" animate="visible" exit="exit">
                        <TimelineList events={events} onEdit={handleEdit} onDelete={handleDelete} />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
