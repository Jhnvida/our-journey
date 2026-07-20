import React, { forwardRef } from "react";
import { type Recipe } from "../../../../hooks/useRecipes";
import styles from "../../styles.module.css";

export interface PageTextProps extends React.HTMLProps<HTMLDivElement> {
    recipe: Recipe;
    number: number;
}

export const PageText = forwardRef<HTMLDivElement, PageTextProps>(({ recipe, number, ...props }, ref) => {
    return (
        <div className={styles.book_page_text} ref={ref} {...props}>
            <div className={styles.page_shadow_right}></div>

            <div className={styles.recipe_page_content}>
                <h4 className={styles.recipe_page_title}>{recipe.title}</h4>
                <p className={styles.recipe_page_desc}>{recipe.description}</p>

                <div className={styles.ingredients_title}>Ingredientes</div>

                <ul className={styles.ingredients_list}>
                    {recipe.ingredients?.map((ingredient: string, idx: number) => (
                        <li key={idx} className={styles.ingredient_item}>
                            <div className={styles.ingredient_dash}></div>
                            {ingredient}
                        </li>
                    ))}
                </ul>
            </div>

            <div className={styles.page_number}>{number}</div>
        </div>
    );
});
