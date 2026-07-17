import { Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Drawer } from "../../../../../../components/Drawer";
import type { Event } from "../../../../../../hooks/useTimeline";
import styles from "./styles.module.css";

interface EventDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    event?: Event | null;
}

export function EventDrawer({ isOpen, onClose, event }: EventDrawerProps) {
    const isEditing = !!event;

    const [subEvents, setSubEvents] = useState<{ event_date: string; description: string }[]>(
        event?.timeline_sub_events || [],
    );

    useEffect(() => {
        if (isOpen) {
            setSubEvents(event?.timeline_sub_events || []);
        }
    }, [isOpen, event]);

    return (
        <Drawer isOpen={isOpen} onClose={onClose} title={isEditing ? "Editar Evento" : "Novo Evento"}>
            <div className={styles.form}>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Título</label>
                    <input
                        type="text"
                        className={styles.input}
                        placeholder="Título do evento"
                        defaultValue={event?.title || ""}
                    />
                </div>

                <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Mês / Ano</label>
                        <input
                            type="text"
                            className={styles.input}
                            placeholder="Jan 2026"
                            defaultValue={event?.month_label || ""}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Imagem (URL)</label>
                        <input
                            type="text"
                            className={styles.input}
                            placeholder="https://..."
                            defaultValue={event?.image_url || ""}
                        />
                    </div>
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label}>Descrição</label>
                    <textarea
                        className={styles.textarea}
                        placeholder="Conte os detalhes desse momento..."
                        defaultValue={event?.description || ""}
                        rows={4}
                    />
                </div>

                <div className={styles.subEventsSection}>
                    <div className={styles.subEventsHeader}>
                        <h4 className={styles.subEventsTitle}>Sub-eventos</h4>
                        <button type="button" className={styles.addSubEventButton}>
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
                                        />
                                    </div>

                                    <div className={styles.formGroup}>
                                        <label className={styles.label}>Descrição</label>
                                        <textarea
                                            className={styles.textarea}
                                            placeholder="Detalhes do sub-evento..."
                                            rows={2}
                                            value={sub.description}
                                        />
                                    </div>

                                    <div className={styles.subEventActions}>
                                        <button
                                            type="button"
                                            className={styles.iconButtonDelete}
                                            title="Remover sub-evento"
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
                    <button type="button" className={styles.cancelButton} onClick={onClose}>
                        Cancelar
                    </button>

                    <button type="button" className={styles.saveButton}>
                        Salvar Evento
                    </button>
                </div>
            </div>
        </Drawer>
    );
}
