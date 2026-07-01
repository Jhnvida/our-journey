import { CheckIcon, Circle } from "lucide-react";
import styles from "./styles.module.css";

export function Chapters() {
    return (
        <section className={styles.section}>
            <div className={styles.shell}>
                <div className={styles.header}>
                    <span className={styles.eyebrow}>Continuidade</span>
                    <h2 className={styles.title}>Próximos Capítulos</h2>
                </div>

                <div className={styles.list}>
                    <div className={styles.item}>
                        <div className={styles.icon}>
                            <CheckIcon size={18} />
                        </div>
                        <span className={styles.label}>Morar juntos</span>
                    </div>

                    <div className={styles.item}>
                        <div className={styles.icon}>
                            <CheckIcon size={18} />
                        </div>
                        <span className={styles.label}>Fazer uma viagem internacional</span>
                    </div>

                    <div className={`${styles.item} ${styles.pending}`}>
                        <div className={`${styles.icon} ${styles.pendingIcon}`}>
                            <Circle size={18} />
                        </div>
                        <span className={styles.label}>Conhecer um novo país</span>
                    </div>

                    <div className={`${styles.item} ${styles.pending}`}>
                        <div className={`${styles.icon} ${styles.pendingIcon}`}>
                            <Circle size={18} />
                        </div>
                        <span className={styles.label}>Adotar um cachorro</span>
                    </div>

                    <div className={`${styles.item} ${styles.pending}`}>
                        <div className={`${styles.icon} ${styles.pendingIcon}`}>
                            <Circle size={18} />
                        </div>
                        <span className={styles.label}>Construir nosso próprio refúgio</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
