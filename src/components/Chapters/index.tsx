import styles from "./styles.module.css";
import { Check } from "lucide-react";

type Chapter = {
    text: string;
    done: boolean;
};

const chapters: Chapter[] = [
    { text: "Descobrir um novo lugar juntos na nossa cidade.", done: true },
    { text: "Fazer uma viagem de fim de semana juntos.", done: false },
    { text: "Assistir ao nascer do sol de mãos dadas.", done: false },
    { text: "Preparar um jantar especial a dois.", done: false },
];

export function Chapters() {
    return (
        <section className={styles.chapters}>
            <h2 className={styles.sectionTitle}>Próximos Capítulos</h2>
            <p className={styles.sectionSubtitle}>O que o futuro nos reserva</p>

            <ul className={styles.chapterList}>
                {chapters.map((chapter, index) => (
                    <li key={index} className={styles.chapterItem}>
                        <div className={`${styles.checkbox} ${chapter.done ? styles.checked : ""}`}>
                            {chapter.done && <Check size={14} strokeWidth={3} />}
                        </div>
                        <span className={styles.chapterText}>{chapter.text}</span>
                    </li>
                ))}
            </ul>
        </section>
    );
}
