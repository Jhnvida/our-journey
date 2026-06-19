export type Event = {
    id: string;
    title: string;
    date: string;
    description: string;
    image: string;
    subEvents: {
        date: string;
        description: string;
    }[];
};
