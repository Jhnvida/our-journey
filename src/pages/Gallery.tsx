import { Trash2 } from "lucide-react";
import { motion } from "motion/react";
import { useRef, type ChangeEvent } from "react";
import { DashboardHeader } from "../components/DashboardHeader";
import { useGallery } from "../hooks/useGallery";
import { fadeInUp, staggerContainer } from "../lib/motion";
import styles from "./Gallery.module.css";

const gridVariants = staggerContainer(0.04);
const cardVariants = fadeInUp(12, 0.3);

export function Gallery() {
    const { images, loading, error, uploadImage, deleteImage } = useGallery();
    const fileInputRef = useRef<HTMLInputElement>(null);

    async function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
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
                <DashboardHeader title="Galeria de Imagens" subtitle="Gerencie as fotos da jornada" />

                <button className="btn btn-primary" onClick={handleUploadClick} disabled={loading}>
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

            {error && <div className="alert-error">{error}</div>}

            <motion.div className={styles.grid} initial="hidden" animate="visible" variants={gridVariants}>
                {images.map((image) => (
                    <motion.div key={image.name} className={styles.image_card} variants={cardVariants}>
                        <div className={styles.image_wrapper}>
                            <img src={image.url} alt={image.name} className={styles.image} />
                        </div>

                        <div className={styles.image_actions}>
                            <span className={styles.image_name}>{image.name.split("_")[0]}...</span>
                            <button
                                className="btn btn-small btn-danger"
                                onClick={() => handleDelete(image.name)}
                                disabled={loading}
                            >
                                <Trash2 size={14} />
                            </button>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
}
