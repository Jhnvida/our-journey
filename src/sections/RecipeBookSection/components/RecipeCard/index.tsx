import styles from "./styles.module.css";

type RecipeCardProps = {
    index: number;
    title: string;
    description: string | null;
    ingredients: string[];
    imageUrl?: string | null;
};

export const RecipeCard = ({ index, title, description, ingredients, imageUrl }: RecipeCardProps) => {
    const isEven = index % 2 === 0;

    return (
        <div className={`${styles.recipe_card} ${!isEven ? styles.reverse : ""} reveal_up`}>
            <div className={styles.recipe_text_block}>
                <div className={styles.recipe_header}>
                    <h3 className={styles.recipe_title}>{title}</h3>
                    <span className={styles.recipe_index}>{(index + 1).toString().padStart(2, "0")}</span>
                </div>

                <p className={styles.recipe_desc}>{description}</p>

                {ingredients && ingredients.length > 0 && (
                    <div className={styles.recipe_ingredients_block}>
                        <h5 className={styles.recipe_ingredients_title}>Ingredientes Principais</h5>
                        <p className={styles.recipe_ingredients_list}>{ingredients.join(" / ")}</p>
                    </div>
                )}
            </div>

            <div className={`img_zoom_container ${styles.recipe_image_container}`}>
                {imageUrl ? (
                    <img src={imageUrl} alt={title} className={`img_zoom ${styles.recipe_image}`} />
                ) : (
                    <div className={styles.recipe_image_fallback} />
                )}
            </div>
        </div>
    );
};
