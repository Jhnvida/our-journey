import styles from "./styles.module.css";
import { CheckIcon, Circle } from "lucide-react";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

type Chapter = {
    label: string;
    completed: boolean;
};

export function Chapters() {
    const [chapters, setChapters] = useState<Chapter[]>([]);

    useEffect(() => {
        async function fetchChapters() {
            const { data } = await supabase.from("chapters").select("label, completed");
            if (data) setChapters(data as Chapter[]);
        }

        fetchChapters();
    }, []);

    return (
        <section className={styles.section}>
            <div className={styles.shell}>
                <div className={styles.header}>
                    <span className={styles.eyebrow}>Continuidade</span>
                    <h2 className={styles.title}>Próximos Capítulos</h2>
                </div>

                <div className={styles.list}>
                    {chapters.map((chapter) => (
                        <div className={styles.item}>
                            <div className={styles.icon}>
                                {chapter.completed ? (
                                    <CheckIcon className={styles.check} />
                                ) : (
                                    <Circle className={styles.circle} />
                                )}
                            </div>
                            <span className={styles.label}>{chapter.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
