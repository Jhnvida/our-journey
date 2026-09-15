import styles from "@/styles/admin.module.css";
import type { ReactNode } from "react";

interface AdminListCardProps {
    imageUrl?: string | null;
    imageAlt?: string;
    onEdit: () => void;
    onDelete: () => void;
    children: ReactNode;
}

export const AdminListCard = ({ imageUrl, imageAlt, onEdit, onDelete, children }: AdminListCardProps) => {
    return (
        <div className={styles.event_card}>
            {imageUrl && <img src={imageUrl} alt={imageAlt || ""} className={styles.event_image} />}

            <div className={styles.event_card_body}>
                <div className={styles.event_content}>{children}</div>

                <div className={styles.event_actions}>
                    <button className="btn btn-small" onClick={onEdit}>
                        Editar
                    </button>
                    <button className="btn btn-small" onClick={onDelete}>
                        Excluir
                    </button>
                </div>
            </div>
        </div>
    );
};
