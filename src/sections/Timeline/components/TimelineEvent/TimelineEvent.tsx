import { Calendar } from "lucide-react";
import { formatDate } from "../../../../lib/formatDate";
import styles from "./TimelineEvent.module.css";

type TimelineEventProps = {
    index: number;
    title: string;
    description: string | null;
    date: string;
    imageUrl?: string | null;
    isFeatured: boolean;
};

export const TimelineEvent = ({ title, description, date, imageUrl, isFeatured }: TimelineEventProps) => {
    return (
        <div className={`${styles.timeline_card} ${isFeatured ? styles.featured : ""} reveal_up`}>
            {imageUrl && (
                <div className={`img_zoom_container ${styles.image_wrapper}`}>
                    <img src={imageUrl} alt={title} className={`img_zoom ${styles.image}`} />
                </div>
            )}
            
            <div className={styles.content}>
                <div className={styles.badge_container}>
                    <div className={`${styles.date_badge} glass_panel`}>
                        <Calendar size={14} className={styles.badge_icon} />
                        <span>{formatDate(date)}</span>
                    </div>
                </div>

                <div className={styles.text_content}>
                    <h3 className={styles.title}>{title}</h3>
                    {description && <p className={styles.description}>{description}</p>}
                </div>
            </div>
        </div>
    );
};
