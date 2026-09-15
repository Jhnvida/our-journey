import { MasonryCard } from "@/components/ui/MasonryCard";
import type { Recipe } from "@/types";
import { Clock } from "lucide-react";
import styles from "./KitchenCard.module.css";

export const KitchenCard = ({ recipe, index }: { recipe: Recipe; index: number }) => {
    return (
        <MasonryCard index={index} imageUrl={recipe.image_url || undefined} imageAlt={recipe.title}>
            <h3 className={styles.kitchen_masonry_title}>{recipe.title}</h3>
            <p className={styles.kitchen_masonry_desc}>{recipe.description}</p>

            {recipe.ingredients && recipe.ingredients.length > 0 && (
                <div className={styles.ingredients_header}>
                    <p className={styles.ingredients_label}>
                        <Clock size={14} /> Ingredientes
                    </p>

                    <div className={styles.ingredients_list}>
                        {recipe.ingredients.map((ingredient: string, i: number) => (
                            <span key={i} className={styles.ingredient_item}>
                                {ingredient}
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </MasonryCard>
    );
};
