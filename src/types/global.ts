export type Event = {
    id: number;
    title: string;
    date: string;
    description: string;
    image: string;
    subEvents: {
        date: string;
        description: string;
    }[];
};
