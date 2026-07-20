import { ArrowLeft, ArrowRight } from "lucide-react";
import { IconButton } from "../../../../components/IconButton";
import styles from "./styles.module.css";

interface RecipeNavProps {
    onPrev: () => void;
    onNext: () => void;
}

export const RecipeNav = ({ onPrev, onNext }: RecipeNavProps) => {
    return (
        <div className={styles.recipe_nav}>
            <IconButton onClick={onPrev} aria-label="Página Anterior">
                <ArrowLeft />
            </IconButton>

            <span className={styles.recipe_nav_label}>VIRAR PÁGINA</span>

            <IconButton onClick={onNext} aria-label="Próxima Página">
                <ArrowRight />
            </IconButton>
        </div>
    );
};
