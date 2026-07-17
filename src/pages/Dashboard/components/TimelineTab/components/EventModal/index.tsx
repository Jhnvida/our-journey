import { Plus, Trash2, X } from "lucide-react";
import { Modal } from "../../../../../../components/Modal";
import styles from "./styles.module.css";

interface EventModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function EventModal({ isOpen, onClose }: EventModalProps) {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className={styles.header}>
                <h3 className={styles.title}>Novo Evento</h3>

                <button className={styles.closeButton} onClick={onClose}>
                    <X size={20} />
                </button>
            </div>

            <div className={styles.body}>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Título</label>
                    <input type="text" className={styles.input} placeholder="Título do evento" />
                </div>

                <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Mês / Ano</label>
                        <input type="text" className={styles.input} placeholder="Jan 2026" />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>URL da Imagem</label>
                        <input type="text" className={styles.input} placeholder="https://..." />
                    </div>
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label}>Descrição</label>
                    <textarea className={styles.textarea} rows={3} placeholder="Descrição do momento especial" />
                </div>

                <div className={styles.subEventsSection}>
                    <div className={styles.subEventsHeader}>
                        <h4 className={styles.subEventsTitle}>Sub-eventos</h4>

                        <button type="button" className={styles.addSubEventButton}>
                            <Plus size={14} /> Adicionar
                        </button>
                    </div>

                    <div className={styles.subEventItem}>
                        <div className={styles.dateInputGroup}>
                            <input type="text" className={styles.input} placeholder="01/01" />
                        </div>

                        <div className={styles.descInputGroup}>
                            <input type="text" className={styles.input} placeholder="Descrição do sub-evento" />
                        </div>

                        <button
                            type="button"
                            className={`${styles.iconButton} ${styles.iconButtonDelete}`}
                            title="Remover"
                        >
                            <Trash2 size={16} />
                        </button>
                    </div>
                </div>
            </div>

            <div className={styles.footer}>
                <button className={styles.cancelButton} onClick={onClose}>
                    Cancelar
                </button>

                <button className={styles.saveButton}>Salvar Evento</button>
            </div>
        </Modal>
    );
}
