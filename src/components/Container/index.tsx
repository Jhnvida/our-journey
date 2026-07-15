import type { ReactNode } from "react";
import styles from "./styles.module.css";

type ContainerProps = {
    children: ReactNode;
};

export function Container({ children }: ContainerProps) {
    return <main className={styles.container}>{children}</main>;
}
