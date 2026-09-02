import { DashboardHeader } from "@/components/layout/DashboardHeader";
import { useGallery } from "@/features/gallery/hooks/useGallery";
import { Trash2 } from "lucide-react";
import { useRef, type ChangeEvent } from "react";
import styles from "./styles.module.css";

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

            <div className={styles.grid}>
                {images.map((image) => (
                    <div key={image.name} className={styles.image_card}>
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
                    </div>
                ))}
            </div>
        </div>
    );
}
