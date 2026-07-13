import { Link } from "react-router-dom";
import styles from "./styles.module.css";

export function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.content}>
                <p className={styles.text}>Para sempre escrevendo novos capítulos ao seu lado.</p>

                <Link to="/login" className={styles.loginLink}>
                    Painel Administrativo
                </Link>
            </div>
        </footer>
    );
}
