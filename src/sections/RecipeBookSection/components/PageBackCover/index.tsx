import React, { forwardRef } from "react";
import styles from "../../styles.module.css";

type PageProps = React.HTMLProps<HTMLDivElement>;

export const PageBackCover = forwardRef<HTMLDivElement, PageProps>((props, ref) => {
    return (
        <div className={styles.book_page_backcover} ref={ref} data-density="hard" {...props}>
            <div className={styles.backcover_border}></div>
            <div className={styles.backcover_spine}></div>
        </div>
    );
});
