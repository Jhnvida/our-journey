import React, { forwardRef } from "react";
import styles from "../../styles.module.css";

export interface PageImageProps extends React.HTMLProps<HTMLDivElement> {
    imageUrl: string | null;
    number: number;
}

export const PageImage = forwardRef<HTMLDivElement, PageImageProps>(({ imageUrl, number, ...props }, ref) => {
    return (
        <div className={styles.book_page_image} ref={ref} {...props}>
            <div className={styles.page_shadow_left}></div>
            {imageUrl && <img src={imageUrl} alt="Recipe" />}
            <div className={styles.page_number}>{number}</div>
        </div>
    );
});
