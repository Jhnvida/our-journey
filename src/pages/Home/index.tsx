import { Chapters } from "./sections/Chapters";
import { Hero } from "./sections/Hero";
import { Kitchen } from "./sections/Kitchen";
import { Timeline } from "./sections/Timeline";
import styles from "./styles.module.css";

export function Home() {
    return (
        <main className={styles.container}>
            <Hero />
            <Timeline />
            <Kitchen />
            <Chapters />

            <footer className={styles.footer}>
                <div className={styles.footer_brand}>A Nossa Jornada</div>
            </footer>
        </main>
    );
}
