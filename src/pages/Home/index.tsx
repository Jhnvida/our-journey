import { ChaptersSection } from "./components/ChaptersSection";
import { HeroSection } from "./components/HeroSection";
import { KitchenSection } from "./components/KitchenSection";
import { TimelineSection } from "./components/TimelineSection";
import styles from "./styles.module.css";

export function Home() {
    return (
        <main className={styles.container}>
            <HeroSection />
            <TimelineSection />

            <KitchenSection />
            <ChaptersSection />

            <footer className={styles.footer}>
                <div className={styles.footer_brand}>A Nossa Jornada</div>
            </footer>
        </main>
    );
}
