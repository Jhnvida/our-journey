import { supabase } from "@/lib/supabase";
import type { GalleryPhoto } from "@/types";
import { useEffect, useState } from "react";

export interface GalleryImage extends GalleryPhoto {
    name: string;
    url: string;
}

export const useGallery = (enabled = true) => {
    const [images, setImages] = useState<GalleryImage[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const bucketName = "journey_images";

    async function fetchImages() {
        setLoading(true);

        const { data, error: err } = await supabase
            .from("gallery_photos")
            .select("*")
            .order("created_at", { ascending: false });

        if (err) {
            setError("Erro ao carregar imagens da galeria.");
            setLoading(false);
            return;
        }

        if (data) {
            const imageObjects = data.map((photo) => {
                const { data: publicUrlData } = supabase.storage.from(bucketName).getPublicUrl(photo.storage_path);
                return {
                    ...photo,
                    name: photo.storage_path,
                    url: publicUrlData.publicUrl,
                };
            });

            setImages(imageObjects);
        }

        setLoading(false);
    }

    useEffect(() => {
        if (enabled) {
            fetchImages();
        }
    }, [enabled]);

    async function uploadImage(file: File) {
        setLoading(true);
        const fileExt = file.name.split(".").pop();
        const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage.from(bucketName).upload(fileName, file);

        if (uploadError) {
            setError("Erro ao fazer upload da imagem no storage.");
            setLoading(false);
            return;
        }

        const { error: dbError } = await supabase.from("gallery_photos").insert([{ storage_path: fileName }]);

        if (dbError) {
            setError("Erro ao salvar referência da imagem.");
            setLoading(false);
        } else {
            await fetchImages();
        }
    }

    async function deleteImage(name: string) {
        setLoading(true);

        const { error: dbError } = await supabase.from("gallery_photos").delete().eq("storage_path", name);

        if (dbError) {
            setError("Erro ao excluir a referência da imagem.");
            setLoading(false);
            return;
        }

        const { error: storageError } = await supabase.storage.from(bucketName).remove([name]);

        if (storageError) {
            setError("Erro ao excluir o arquivo da imagem.");
            setLoading(false);
        } else {
            await fetchImages();
        }
    }

    return { images, loading, error, uploadImage, deleteImage };
};
