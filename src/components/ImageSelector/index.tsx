import { Image as ImageIcon, X } from "lucide-react";
import { useState } from "react";
import { useGallery } from "../../hooks/useGallery";
import styles from "./styles.module.css";

interface ImageSelectorProps {
    value: string;
    onChange: (url: string) => void;
}

export function ImageSelector({ value, onChange }: ImageSelectorProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { images, loading } = useGallery();
    const [tempSelected, setTempSelected] = useState<string>(value);

    function handleConfirm() {
        onChange(tempSelected);
        setIsModalOpen(false);
    }

    function handleRemove() {
        onChange("");
        setTempSelected("");
    }

    return (
        <div className={styles.selector_container}>
            {value ? (
                <div className={styles.selected_preview}>
                    <img src={value} alt="Selecionada" />
                    <button type="button" className={styles.remove_preview_btn} onClick={handleRemove} title="Remover Imagem">
                        <X size={14} />
                    </button>
                </div>
            ) : (
                <button type="button" className={styles.open_modal_btn} onClick={() => setIsModalOpen(true)}>
                    <ImageIcon size={16} />
                    Escolher da Galeria
                </button>
            )}

            {value && (
                <button type="button" className={styles.open_modal_btn} onClick={() => setIsModalOpen(true)}>
                    <ImageIcon size={16} />
                    Trocar Imagem
                </button>
            )}

            {isModalOpen && (
                <div className={styles.modal_overlay} onClick={() => setIsModalOpen(false)}>
                    <div className={styles.modal_content} onClick={e => e.stopPropagation()}>
                        <div className={styles.modal_header}>
                            <span className={styles.modal_title}>Selecionar Imagem</span>
                            <button className={styles.close_button} onClick={() => setIsModalOpen(false)}>
                                <X size={20} />
                            </button>
                        </div>
                        <div className={styles.modal_body}>
                            {loading ? (
                                <p>Carregando galeria...</p>
                            ) : images.length === 0 ? (
                                <div className={styles.empty_state}>
                                    <p>Nenhuma imagem disponível. Faça upload na página da Galeria primeiro.</p>
                                </div>
                            ) : (
                                <div className={styles.grid}>
                                    {images.map(img => (
                                        <div 
                                            key={img.name} 
                                            className={`${styles.image_item} ${tempSelected === img.url ? styles.image_item_selected : ''}`}
                                            onClick={() => setTempSelected(img.url)}
                                        >
                                            <div className={styles.image_wrapper}>
                                                <img src={img.url} alt={img.name} className={styles.image} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className={styles.modal_footer}>
                            <button className={styles.button_secondary} onClick={() => setIsModalOpen(false)}>Cancelar</button>
                            <button className={styles.button} onClick={handleConfirm} disabled={!tempSelected}>Confirmar</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
