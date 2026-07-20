import type { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./styles.module.css";

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    children: ReactNode;
};

export const IconButton = ({ children, className, ...props }: IconButtonProps) => {
    return (
        <button className={`${styles.icon_btn} ${className || ""}`} {...props}>
            {children}
        </button>
    );
};
