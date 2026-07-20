import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import styles from "./styles.module.css";

type TimelineEventProps = {
    index: number;
    title: string;
    description: string | null;
    date: string;
    imageUrl?: string | null;
    isEven: boolean;
};

const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = parseISO(dateString);
    return format(date, "d 'de' MMMM 'de' yyyy", { locale: ptBR });
};

export const TimelineEvent = ({ index, title, description, date, imageUrl, isEven }: TimelineEventProps) => {
    return (
        <div className={`${styles.timeline_event} ${!isEven ? styles.timeline_event_odd : ""} reveal_up`}>
            <div className={`img_zoom_container ${styles.timeline_event_image_container}`}>
                {imageUrl ? (
                    <img src={imageUrl} alt={title} className={`img_zoom ${styles.timeline_event_image}`} />
                ) : (
                    <div className={styles.timeline_event_image_placeholder} />
                )}
            </div>

            <div className={styles.timeline_event_text}>
                <div className={styles.timeline_event_meta}>
                    <span className={styles.timeline_event_index}>{(index + 1).toString().padStart(2, "0")}</span>
                    <div className={styles.timeline_event_line}></div>
                    <span className={styles.timeline_event_date}>{formatDate(date)}</span>
                </div>

                <h3 className={styles.timeline_event_title}>{title}</h3>
                <p className={styles.timeline_event_desc}>{description}</p>
            </div>
        </div>
    );
};
