import { ChaptersSection } from "../../sections/ChaptersSection";
import { HeroSection } from "../../sections/HeroSection";
import { RecipeBookSection } from "../../sections/RecipeBookSection";
import { TimelineSection } from "../../sections/TimelineSection";
import styles from "./styles.module.css";

export function HomePage() {
    return (
        <main className={styles.home_main}>
            <HeroSection />
            <TimelineSection />
            <RecipeBookSection />
            <ChaptersSection />
        </main>
    );
}
