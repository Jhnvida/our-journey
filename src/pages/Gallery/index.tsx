import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";
import { useRef } from "react";
import { SectionHeader } from "../../components/SectionHeader";
import { useGallery } from "../../hooks/useGallery";
import { slideUp, staggerContainer } from "../../lib/animations";
import styles from "./styles.module.css";

export function Gallery() {
    const { images, loading, error, uploadImage, deleteImage } = useGallery();
    const fileInputRef = useRef<HTMLInputElement>(null);

    async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];
        if (file) {
            try {
                await uploadImage(file);
            } catch (err) {
                console.error(err);
            }
        }
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    }

    function handleUploadClick() {
        fileInputRef.current?.click();
    }

    async function handleDelete(name: string) {
        if (window.confirm("Tem certeza que deseja excluir esta imagem?")) {
            await deleteImage(name);
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <SectionHeader title="Galeria de Imagens" subtitle="Gerencie as fotos da jornada" />
                <button className={styles.button} onClick={handleUploadClick} disabled={loading}>
                    {loading ? "Processando..." : "Nova Imagem"}
                </button>
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className={styles.hidden_input}
                />
            </div>

            {error && <div className={styles.error_message}>{error}</div>}

            {images.length === 0 && !loading ? (
                <div className={styles.empty_state}>
                    <p>Nenhuma imagem encontrada na galeria.</p>
                </div>
            ) : (
                <motion.div className={styles.grid} variants={staggerContainer} initial="hidden" animate="visible">
                    {images.map((img) => (
                        <motion.div key={img.name} className={styles.image_card} variants={slideUp}>
                            <div className={styles.image_wrapper}>
                                <img src={img.url} alt={img.name} className={styles.image} />
                            </div>
                            <div className={styles.image_actions}>
                                <span className={styles.image_name}>{img.name.split("_")[0]}...</span>
                                <button
                                    className={`${styles.button_small} ${styles.button_small_danger}`}
                                    onClick={() => handleDelete(img.name)}
                                    disabled={loading}
                                >
                                    <Trash2 size={14} />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            )}
        </div>
    );
}
