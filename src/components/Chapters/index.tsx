import styles from "./styles.module.css";
import { Check } from "lucide-react";

import { useEffect, useState } from "react";
import { supabase } from "../../utils/supabase";

type Chapter = {
    id: string;
    text: string;
    done: boolean;
};

export function Chapters() {
    const [chapters, setChapters] = useState<Chapter[]>([]);

    useEffect(() => {
        async function getChapters() {
            const { data: chapters } = await supabase
                .from("chapters")
                .select(`text, done`)
                .order("order_index", { ascending: true });

            if (chapters) setChapters(chapters as unknown as Chapter[]);
        }

        getChapters();
    }, []);

    return (
        <div className={styles.chapters}>
            <h2 className={styles.sectionTitle}>Próximos Capítulos</h2>
            <p className={styles.sectionSubtitle}>O que o futuro nos reserva</p>

            <ul className={styles.chapterList}>
                {chapters.map((chapter) => (
                    <li key={chapter.id} className={styles.chapterItem}>
                        <div className={`${styles.checkbox} ${chapter.done ? styles.checked : ""}`}>
                            {chapter.done && <Check size={14} strokeWidth={3} />}
                        </div>
                        <span className={styles.chapterText}>{chapter.text}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
