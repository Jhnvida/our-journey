import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState, type SubmitEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Login.module.css";

export const Login = () => {
    const [accessKey, setAccessKey] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigate = useNavigate();
    const { isAuthenticated, signInWithKey } = useAuth();

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/dashboard", { replace: true });
        }
    }, [isAuthenticated, navigate]);

    async function handleLogin(e: SubmitEvent) {
        e.preventDefault();
        setError(null);
        setIsSubmitting(true);

        const res = await signInWithKey(accessKey);

        if (res.error) {
            setError(res.error);
            setIsSubmitting(false);
        } else {
            navigate("/dashboard", { replace: true });
        }
    }

    return (
        <main className={styles.container}>
            <div className={styles.content}>
                <header className={styles.header}>
                    <h1 className={styles.brand}>A Nossa Jornada</h1>
                </header>

                {error && <div className="alert-error">{error}</div>}

                <form className={styles.form} onSubmit={handleLogin}>
                    <div className={styles.form_group}>
                        <label htmlFor="accessKey" className={styles.label}>
                            Chave de acesso
                        </label>
                        <input
                            id="accessKey"
                            type="password"
                            value={accessKey}
                            onChange={(e) => setAccessKey(e.target.value)}
                            className="form-input"
                            placeholder="••••••••"
                            autoComplete="current-password"
                            autoFocus
                            required
                        />
                    </div>

                    <div className={styles.button_group}>
                        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                            {isSubmitting ? "Entrando..." : "Entrar"}
                        </button>

                        <Link to="/" className={styles.back_link}>
                            Voltar
                        </Link>
                    </div>
                </form>
            </div>
        </main>
    );
};
