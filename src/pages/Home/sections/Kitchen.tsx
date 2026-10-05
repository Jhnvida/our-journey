import { SectionHeader } from "@/components/ui/SectionHeader";
import { useRecipes } from "@/hooks/useRecipes";
import { KitchenCard } from "@/pages/Home/components/KitchenCard";
import { useMemo } from "react";
import styles from "./Kitchen.module.css";

export const Kitchen = () => {
    const { recipes } = useRecipes();

    const { leftRecipes, rightRecipes } = useMemo(() => {
        if (!recipes) return { leftRecipes: [], rightRecipes: [] };
        return {
            leftRecipes: recipes.filter((_, i) => i % 2 === 0),
            rightRecipes: recipes.filter((_, i) => i % 2 !== 0),
        };
    }, [recipes]);

    if (!recipes || recipes.length === 0) return null;

    return (
        <section className={styles.kitchen_section} id="kitchen">
            <div className={styles.section_inner}>
                <SectionHeader title="Na cozinha" />

                <div className={styles.kitchen_mobile}>
                    {recipes.map((recipe, index) => (
                        <KitchenCard key={`mobile-${recipe.id}`} recipe={recipe} index={index} />
                    ))}
                </div>

                <div className={styles.kitchen_desktop}>
                    <div className={styles.kitchen_column}>
                        {leftRecipes.map((recipe, index) => (
                            <KitchenCard key={`desktop-left-${recipe.id}`} recipe={recipe} index={index * 2} />
                        ))}
                    </div>

                    <div className={`${styles.kitchen_column} ${styles.kitchen_staggered}`}>
                        {rightRecipes.map((recipe, index) => (
                            <KitchenCard key={`desktop-right-${recipe.id}`} recipe={recipe} index={index * 2 + 1} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
