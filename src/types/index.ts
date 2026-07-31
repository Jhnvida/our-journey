export type Chapter = {
    id: string;
    title: string;
    status: string;
    created_at: string;
};

export type Recipe = {
    id: string;
    title: string;
    description: string | null;
    ingredients: string[];
    image_url: string | null;
    created_at: string;
};

export type Setting = {
    id: string;
    relationship_start_date: string;
    updated_at: string;
};

export type TimelineEvent = {
    id: string;
    title: string;
    date: string;
    description: string | null;
    image_url: string | null;
    created_at: string;
};
