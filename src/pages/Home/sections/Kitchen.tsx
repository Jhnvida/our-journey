import { Clock } from "lucide-react";
import { motion } from "motion/react";

import { SectionHeader } from "../../../components/SectionHeader";
import { useRecipes } from "../../../hooks/useRecipes";
import { fadeInUp, staggerContainer, viewportOnce } from "../../../lib/motion";
import type { Recipe } from "../../../types";
import styles from "./Kitchen.module.css";

const containerVariants = staggerContainer(0.08);
const cardVariants = fadeInUp(24);

function KitchenCard({ recipe }: { recipe: Recipe }) {
    return (
        <motion.div className={styles.kitchen_masonry_item} variants={cardVariants}>
            <img src={recipe.image_url || undefined} alt={recipe.title} className={styles.kitchen_masonry_image} />

            <div className={styles.kitchen_masonry_content}>
                <h3 className={styles.kitchen_masonry_title}>{recipe.title}</h3>
                <p className={styles.kitchen_masonry_desc}>{recipe.description}</p>

                {recipe.ingredients && recipe.ingredients.length > 0 && (
                    <div className={styles.ingredients_header}>
                        <p className={styles.ingredients_label}>
                            <Clock size={14} /> Ingredientes
                        </p>

                        <div className={styles.ingredients_list}>
                            {recipe.ingredients.map((ingredient, index) => (
                                <span key={index} className={styles.ingredient_item}>
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

export function Kitchen() {
    const { recipes } = useRecipes();

    if (!recipes || recipes.length === 0) return null;

    const leftRecipes = recipes.filter((_, i) => i % 2 === 0);
    const rightRecipes = recipes.filter((_, i) => i % 2 !== 0);

    return (
        <section className={styles.kitchen_section}>
            <SectionHeader
                title="A Nossa Cozinha"
                subtitle="Porque algumas das melhores memórias foram construídas em volta da mesa, entre um tempero e outro."
            />

            <div className={styles.kitchen_container}>
                <motion.div
                    className={styles.kitchen_mobile}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    variants={containerVariants}
                >
                    {recipes.map((recipe) => (
                        <KitchenCard key={`mobile-${recipe.id}`} recipe={recipe} />
                    ))}
                </motion.div>

                <motion.div
                    className={styles.kitchen_desktop}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    variants={containerVariants}
                >
                    <div className={styles.kitchen_column}>
                        {leftRecipes.map((recipe) => (
                            <KitchenCard key={`desktop-left-${recipe.id}`} recipe={recipe} />
                        ))}
                    </div>

                    <div className={`${styles.kitchen_column} ${styles.kitchen_staggered}`}>
                        {rightRecipes.map((recipe) => (
                            <KitchenCard key={`desktop-right-${recipe.id}`} recipe={recipe} />
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
