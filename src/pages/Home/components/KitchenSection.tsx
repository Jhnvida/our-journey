import { Clock } from "lucide-react";
import { motion } from "motion/react";
import { SectionHeader } from "../../../components/SectionHeader";
import { useRecipes } from "../../../hooks/useRecipes";
import styles from "../styles.module.css";

export function KitchenSection() {
    const { recipes } = useRecipes();

    if (!recipes || recipes.length === 0) return null;

    return (
        <section className={styles.kitchen_section}>
            <SectionHeader
                title="A Nossa Cozinha"
                subtitle="Porque algumas das melhores memórias foram construídas em volta da mesa, entre um tempero e outro."
            />

            <div className={styles.kitchen_container}>
                <div className={styles.kitchen_grid}>
                    {recipes.map((recipe, index) => (
                        <motion.div
                            key={recipe.id}
                            className={styles.kitchen_card}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ scale: 1.02 }}
                        >
                            <img
                                src={recipe.image_url || undefined}
                                alt={recipe.title}
                                className={styles.kitchen_card_img}
                            />
                            <div className={styles.kitchen_card_content}>
                                <h3 className={styles.kitchen_card_title}>{recipe.title}</h3>
                                <p className={styles.kitchen_card_desc}>{recipe.description}</p>

                                {recipe.ingredients && recipe.ingredients.length > 0 && (
                                    <div className={styles.ingredients_header}>
                                        <p className={styles.ingredients_label}>
                                            <Clock size={14} /> Ingredientes
                                        </p>
                                        <div className={styles.ingredients_list}>
                                            {recipe.ingredients.map((ing: string, i: number) => (
                                                <span key={i} className={styles.ingredient_item}>
                                                    {ing}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
