import type { ReactNode } from "react";
import styles from "./styles.module.css";

interface BadgeProps {
    variant: "done" | "pending";
    children: ReactNode;
}

export const Badge = ({ variant, children }: BadgeProps) => {
    return (
        <span className={`${styles.badge} ${variant === "done" ? styles.badge_done : styles.badge_pending}`}>
            {children}
        </span>
    );
};
