import { motion } from "motion/react";
import styles from "./styles.module.css";

export function Preloader() {
    return (
        <motion.div
            className={styles.preloader_container}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
        >
            <div className={styles.preloader_content}>
                <motion.div
                    className={styles.brand_label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    A Nossa Jornada
                </motion.div>

                <div className={styles.progress_bar_container}>
                    <motion.div
                        className={styles.progress_bar}
                        style={{ width: "50%", transformOrigin: "left" }}
                        initial={{ x: "-200%" }}
                        animate={{ x: "200%" }}
                        transition={{
                            duration: 1.5,
                            ease: "easeInOut",
                            repeat: Infinity,
                            repeatType: "loop",
                        }}
                    />
                </div>
            </div>
        </motion.div>
    );
}
