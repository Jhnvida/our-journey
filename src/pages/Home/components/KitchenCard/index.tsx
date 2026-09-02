import type { Recipe } from "@/types";
import { Clock } from "lucide-react";
import { motion } from "motion/react";
import styles from "./styles.module.css";

export function KitchenCard({ recipe, index }: { recipe: Recipe; index: number }) {
    return (
        <motion.div
            className={styles.kitchen_masonry_item}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: Math.min(index * 0.1, 0.5) }}
        >
            <img
                src={recipe.image_url || undefined}
                alt={recipe.title}
                className={styles.kitchen_masonry_image}
                loading={index < 4 ? "eager" : "lazy"}
                decoding="async"
                fetchPriority={index < 2 ? "high" : "auto"}
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
