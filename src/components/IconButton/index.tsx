import type { ReactNode, ButtonHTMLAttributes } from "react";
import styles from "./styles.module.css";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
}

export const IconButton = ({ children, className, ...props }: IconButtonProps) => {
    return (
        <button className={`${styles.icon_btn} ${className || ""}`} {...props}>
            {children}
        </button>
    );
};
