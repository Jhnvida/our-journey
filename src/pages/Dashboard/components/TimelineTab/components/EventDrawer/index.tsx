import { Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Drawer } from "../../../../../../components/Drawer";
import type { Event } from "../../../../../../hooks/useTimeline";
import styles from "./styles.module.css";

interface EventDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    event?: Event | null;
    addEvent: (eventData: any, subEvents: any[]) => Promise<any>;
    updateEvent: (id: string, eventData: any, subEvents: any[]) => Promise<any>;
}

export function EventDrawer({ isOpen, onClose, event, addEvent, updateEvent }: EventDrawerProps) {
    const isEditing = !!event;
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [subEvents, setSubEvents] = useState<{ event_date: string; description: string }[]>(
        event?.timeline_sub_events || [],
    );

    useEffect(() => {
        if (isOpen) {
            setSubEvents(event?.timeline_sub_events || []);
        }
    }, [isOpen, event]);

    const handleAddSubEvent = () => {
        setSubEvents([...subEvents, { event_date: "", description: "" }]);
    };

    const handleRemoveSubEvent = (index: number) => {
        const newSubEvents = [...subEvents];
        newSubEvents.splice(index, 1);
        setSubEvents(newSubEvents);
    };

    const handleSubEventChange = (index: number, field: keyof (typeof subEvents)[0], value: string) => {
        const newSubEvents = [...subEvents];
        newSubEvents[index] = { ...newSubEvents[index], [field]: value };
        setSubEvents(newSubEvents);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const eventData = {
            title: formData.get("title") as string,
            month_label: formData.get("month_label") as string,
            image_url: formData.get("image_url") as string,
            description: formData.get("description") as string,
        };

        setIsSubmitting(true);
        if (isEditing && event) {
            await updateEvent(event.id, eventData, subEvents);
        } else {
            await addEvent(eventData, subEvents);
        }
        setIsSubmitting(false);
        onClose();
    };

    return (
        <Drawer isOpen={isOpen} onClose={onClose} title={isEditing ? "Editar Evento" : "Novo Evento"}>
            <form key={event?.id || "new"} className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Título</label>
                    <input
                        type="text"
                        name="title"
                        className={styles.input}
                        placeholder="Título do evento"
                        defaultValue={event?.title || ""}
                        required
                    />
                </div>

                <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Mês / Ano</label>
                        <input
                            type="text"
                            name="month_label"
                            className={styles.input}
                            placeholder="Jan 2026"
                            defaultValue={event?.month_label || ""}
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Imagem (URL)</label>
                        <input
                            type="url"
                            name="image_url"
                            className={styles.input}
                            placeholder="https://..."
                            defaultValue={event?.image_url || ""}
                            required
                        />
                    </div>
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label}>Descrição</label>
                    <textarea
                        name="description"
                        className={styles.textarea}
                        placeholder="Conte os detalhes desse momento..."
                        defaultValue={event?.description || ""}
                        rows={4}
                        required
                    />
                </div>

                <div className={styles.subEventsSection}>
                    <div className={styles.subEventsHeader}>
                        <h4 className={styles.subEventsTitle}>Sub-eventos</h4>
                        <button type="button" className={styles.addSubEventButton} onClick={handleAddSubEvent}>
                            <Plus size={16} />
                            Adicionar
                        </button>
                    </div>

                    {subEvents.length > 0 && (
                        <div className={styles.subEventList}>
                            {subEvents.map((sub, idx) => (
                                <div key={idx} className={styles.subEventCard}>
                                    <div className={styles.formGroup}>
                                        <label className={styles.label}>Data</label>
                                        <input
                                            type="text"
                                            className={styles.input}
                                            placeholder="Ex: 15 de Jan"
                                            value={sub.event_date}
                                            onChange={(e) => handleSubEventChange(idx, "event_date", e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div className={styles.formGroup}>
                                        <label className={styles.label}>Descrição</label>
                                        <textarea
                                            className={styles.textarea}
                                            placeholder="Detalhes do sub-evento..."
                                            rows={2}
                                            value={sub.description}
                                            onChange={(e) => handleSubEventChange(idx, "description", e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div className={styles.subEventActions}>
                                        <button
                                            type="button"
                                            className={styles.iconButtonDelete}
                                            title="Remover sub-evento"
                                            onClick={() => handleRemoveSubEvent(idx)}
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className={styles.footer}>
                    <button type="button" className={styles.cancelButton} onClick={onClose} disabled={isSubmitting}>
                        Cancelar
                    </button>

                    <button type="submit" className={styles.saveButton} disabled={isSubmitting}>
                        {isSubmitting ? "Salvando..." : "Salvar Evento"}
                    </button>
                </div>
            </form>
        </Drawer>
    );
}
