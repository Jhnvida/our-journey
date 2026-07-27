export type Chapter = {
    id: number;
    title: string;
    status: string;
    created_at: string;
};

export type Recipe = {
    id: number;
    title: string;
    description: string | null;
    ingredients: string[];
    image_url: string | null;
    created_at: string;
};

export type Setting = {
    id: number;
    relationship_start_date: string;
    hero_image_url: string | null;
    updated_at: string;
};

export type TimelineEvent = {
    id: number;
    title: string;
    date: string;
    description: string | null;
    image_url: string | null;
    created_at: string;
};
