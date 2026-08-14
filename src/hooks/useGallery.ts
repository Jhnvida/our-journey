import { useCallback, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export interface GalleryImage {
    name: string;
    url: string;
    created_at: string | null;
}

export function useGallery() {
    const [images, setImages] = useState<GalleryImage[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const bucketName = "journey_images";

    const fetchImages = useCallback(async () => {
        setLoading(true);
        setError(null);

        const { data, error: err } = await supabase.storage.from(bucketName).list("", {
            limit: 100,
            offset: 0,
            sortBy: { column: "created_at", order: "desc" },
        });

        if (err) {
            console.error(err);
            setError("Erro ao carregar imagens da galeria.");
            setLoading(false);
            return;
        }

        if (data) {
            const validFiles = data.filter((file) => file.name !== ".emptyFolderPlaceholder" && file.id);

            const imageObjects = validFiles.map((file) => {
                const { data: publicUrlData } = supabase.storage.from(bucketName).getPublicUrl(file.name);
                return {
                    name: file.name,
                    url: publicUrlData.publicUrl,
                    created_at: file.created_at,
                };
            });
            setImages(imageObjects);
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        fetchImages();
    }, [fetchImages]);

    async function uploadImage(file: File) {
        setLoading(true);
        setError(null);

        const fileExt = file.name.split(".").pop();
        const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;

        const { error: err } = await supabase.storage.from(bucketName).upload(fileName, file);

        if (err) {
            console.error(err);
            setError("Erro ao fazer upload da imagem.");
            setLoading(false);
            throw err;
        }

        await fetchImages();
    }

    async function deleteImage(name: string) {
        setLoading(true);
        setError(null);

        const { error: err } = await supabase.storage.from(bucketName).remove([name]);

        if (err) {
            console.error(err);
            setError("Erro ao excluir a imagem.");
            setLoading(false);
            throw err;
        }

        await fetchImages();
    }

    return { images, loading, error, uploadImage, deleteImage, fetchImages };
}
