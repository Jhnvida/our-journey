import React, { forwardRef } from "react";
import styles from "../../styles.module.css";

type PageProps = React.HTMLProps<HTMLDivElement>;

export const PageCover = forwardRef<HTMLDivElement, PageProps>((props, ref) => {
    return (
        <div className={styles.book_page_cover} ref={ref} data-density="hard" {...props}>
            <div className={styles.cover_border}></div>
            <div className={styles.cover_spine}></div>

            <div className={styles.cover_content}>
                <div className={styles.cover_label}>Nossas Receitas</div>

                <h3 className={styles.cover_title}>
                    O Livro de
                    <br />
                    Receitas
                </h3>

                <div className={styles.cover_divider}></div>
            </div>
        </div>
    );
});
