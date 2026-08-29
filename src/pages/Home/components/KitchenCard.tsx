import { Clock } from "lucide-react";
import { motion } from "motion/react";
import type { Recipe } from "../../../types";
import styles from "../sections/Kitchen.module.css";

export function KitchenCard({ recipe, index }: { recipe: Recipe; index: number }) {
    return (
        <motion.div
            className={styles.kitchen_masonry_item}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -2, boxShadow: "0 14px 34px rgb(0 0 0 / 0.12)" }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: index * 0.1 }}
        >
            <img
                src={recipe.image_url || undefined}
                alt={recipe.title}
                className={styles.kitchen_masonry_image}
                loading="lazy"
                decoding="async"
            />

            <div className={styles.kitchen_masonry_content}>
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
            </div>
        </motion.div>
    );
}
