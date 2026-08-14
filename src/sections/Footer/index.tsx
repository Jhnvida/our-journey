import { Link } from "react-router-dom";
import styles from "./styles.module.css";

export function Footer() {
    return (
        <footer className={styles.footer}>
            <p className={styles.title}>A Nossa Jornada</p>

            <div className={styles.links}>
                <a
                    href="https://github.com/Jhnvida/our-journey"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.link}
                >
                    Código no GitHub
                </a>
                <Link to="/login" className={styles.link}>
                    Painel Administrativo
                </Link>
            </div>
        </footer>
    );
}
