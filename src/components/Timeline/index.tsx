import styles from "./styles.module.css";

export function Timeline() {
    return (
        <section className={styles.section}>
            <div className={styles.shell}>
                <div className={styles.card}>
                    <div className={styles.imageColumn}>
                        <div className={styles.media}>
                            <img src="https://picsum.photos/1000/1500" loading="lazy" />
                        </div>
                    </div>

                    <div className={styles.content}>
                        <span className={styles.eyebrow}>Janeiro 2025</span>
                        <h2 className={styles.title}>Lorem ipsum</h2>
                        <p className={styles.copy}>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta distinctio sit nesciunt
                            facilis, voluptate illum assumenda harum corrupti nam numquam quisquam laborum aperiam
                            asperiores maxime, nisi aut voluptatibus repellat minus.
                        </p>

                        <div className={styles.events}>
                            <div className={styles.event}>
                                <span>05/01</span>
                                <span>Saímos pela primeira vez</span>
                            </div>
                            <div className={styles.event}>
                                <span>17/01</span>
                                <span>Pedido oficial de namoro</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={`${styles.card} ${styles.cardReverse}`}>
                    <div className={styles.imageColumn}>
                        <div className={styles.media}>
                            <img src="https://picsum.photos/1000/1500" loading="lazy" />
                        </div>
                    </div>

                    <div className={styles.content}>
                        <span className={styles.eyebrow}>Março 2025</span>
                        <h2 className={styles.title}>Lorem ipsum</h2>
                        <p className={styles.copy}>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi tempora iste voluptates
                            adipisci unde blanditiis, debitis quia atque eos rerum, minus consequatur aliquam maiores
                            excepturi. Facere ratione architecto accusantium quia?
                        </p>

                        <div className={styles.events}>
                            <div className={styles.event}>
                                <span>05/01</span>
                                <span>Saímos pela primeira vez</span>
                            </div>
                            <div className={styles.event}>
                                <span>17/01</span>
                                <span>Pedido oficial de namoro</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
