import styles from "./styles.module.css";

interface TimelineEventProps {
    index: number;
    title: string;
    description: string | null;
    date: string;
    imageUrl?: string | null;
    isEven: boolean;
}

const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" };
    const date = new Date(dateString + "T00:00:00");
    return date.toLocaleDateString("pt-BR", options);
};

export const TimelineEvent = ({ index, title, description, date, imageUrl, isEven }: TimelineEventProps) => {
    return (
        <div className={`${styles.timeline_event} ${!isEven ? styles.reverse : ""} reveal_up`}>
            <div className={styles.timeline_event_text}>
                <div className={styles.timeline_event_meta}>
                    <span className={styles.timeline_event_index}>{(index + 1).toString().padStart(2, "0")}</span>
                    <div className={styles.timeline_event_line}></div>
                    <span className={styles.timeline_event_date}>{formatDate(date)}</span>
                </div>

                <h3 className={styles.timeline_event_title}>{title}</h3>
                <p className={styles.timeline_event_desc}>{description}</p>
            </div>

            <div className={styles.timeline_event_image_container}>
                {imageUrl ? (
                    <img src={imageUrl} alt={title} className={styles.timeline_event_image} />
                ) : (
                    <div className={styles.timeline_event_image_placeholder} />
                )}
            </div>
        </div>
    );
};
