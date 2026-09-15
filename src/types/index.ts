export interface Chapter {
    id: string;
    title: string;
    status: "concluido" | "pendente";
    image_url: string | null;
    target_date: string | null;
    created_at: string;
}

export interface Recipe {
    id: string;
    title: string;
    description: string | null;
    ingredients: string[];
    image_url: string | null;
    created_at: string;
}

export interface Setting {
    id: string;
    relationship_start_date: string;
    updated_at: string;
}

export interface TimelineEvent {
    id: string;
    title: string;
    date: string;
    description: string | null;
    image_url: string | null;
    is_milestone: boolean;
    created_at: string;
}

export interface GalleryPhoto {
    id: string;
    storage_path: string;
    description: string | null;
    date_taken: string | null;
    created_at: string | null;
}
