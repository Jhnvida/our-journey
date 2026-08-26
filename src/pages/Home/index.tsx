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

            <section className={styles.split_section}>
                <div className={styles.split_grid}>
                    <KitchenSection />
                    <ChaptersSection />
                </div>
            </section>

            <footer className={styles.footer}>
                <div className={styles.footer_brand}>A NOSSA JORNADA</div>
            </footer>
        </main>
    );
}
