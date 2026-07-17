import { X } from "lucide-react";
import { useEffect } from "react";
import styles from "./styles.module.css";

interface DrawerProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

export function Drawer({ isOpen, onClose, title, children }: DrawerProps) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className={styles.overlay}>
            <div className={styles.backdrop} onClick={onClose} />

            <div className={`${styles.drawer} ${isOpen ? styles.open : ""}`}>
                <div className={styles.header}>
                    <h2 className={styles.title}>{title}</h2>

                    <button className={styles.closeButton} onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>

                <div className={styles.content}>{children}</div>
            </div>
        </div>
    );
}
