import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

export const Footer = () => {
    return (
        <footer className={styles.site_footer}>
            <p className={styles.footer_title}>A Nossa Jornada</p>

            <div className={styles.footer_links}>
                <a
                    href="https://github.com/Jhnvida/our-journey"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.footer_link}
                >
                    Código no GitHub
                </a>
                <Link to="/login" className={styles.footer_link}>
                    Painel Administrativo
                </Link>
            </div>
        </footer>
    );
};
