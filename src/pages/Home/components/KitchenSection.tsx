import { Clock } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { SectionHeader } from "../../../components/SectionHeader";
import { useRecipes } from "../../../hooks/useRecipes";
import styles from "../styles.module.css";

export function KitchenSection() {
    const { recipes } = useRecipes();
    const [activeRecipeIndex, setActiveRecipeIndex] = useState(0);

    useEffect(() => {
        if (!recipes || recipes.length <= 1) return;
        const interval = setInterval(() => {
            setActiveRecipeIndex((prev) => (prev + 1) % recipes.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [recipes]);

    if (!recipes || recipes.length === 0) return null;

    return (
        <motion.div
            className={styles.timeline_carousel_inner}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
        >
            <SectionHeader
                title="A NOSSA COZINHA"
                subtitle="Porque algumas das melhores memórias foram construídas em volta da mesa, entre um tempero e outro."
            />

            <div className={styles.kitchen_cards_container}>
                {recipes.map((recipe, index) => {
                    const isMain = index === activeRecipeIndex;
                    const isBg = recipes.length > 1 && index === (activeRecipeIndex + 1) % recipes.length;

                    if (!isMain && !isBg) return null;

                    return (
                        <div
                            key={recipe.id}
                            className={styles.kitchen_card}
                            style={{
                                opacity: isMain ? 1 : 0.4,
                                transform: isMain ? "scale(1) translateY(0)" : "scale(0.9) translateY(40px)",
                                zIndex: isMain ? 10 : 0,
                                transition: "all 0.5s ease-in-out",
                                pointerEvents: isMain ? "auto" : "none",
                            }}
                        >
                            <img
                                src={recipe.image_url || undefined}
                                alt={recipe.title}
                                className={styles.kitchen_card_img}
                            />
                            <h3 className={styles.kitchen_card_title}>{recipe.title}</h3>
                            <p className={styles.kitchen_card_desc}>{recipe.description}</p>

                            {isMain && recipe.ingredients && recipe.ingredients.length > 0 && (
                                <div className={styles.ingredients_header}>
                                    <p className={styles.ingredients_label}>
                                        <Clock size={14} /> INGREDIENTES
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
                    );
                })}
            </div>
        </motion.div>
    );
}
