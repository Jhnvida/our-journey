import { useEffect, useState, type SubmitEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { supabase } from "../lib/supabase";
import styles from "./Login.module.css";

export function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();
    const { user } = useAuth();

    useEffect(() => {
        if (user) {
            navigate("/dashboard", { replace: true });
        }
    }, [user, navigate]);

    async function handleLogin(e: SubmitEvent) {
        e.preventDefault();
        setError(null);

        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) throw error;
            navigate("/dashboard", { replace: true });
        } catch {
            setError("Email ou senha inválidos!");
        }
    }

    return (
        <main className={styles.container}>
            <div className={styles.content}>
                <p className={styles.subtitle}>Acesso Restrito</p>
                <h1 className={styles.title}>Gerenciar Jornada</h1>

                {error && <div className="alert-error">{error}</div>}

                <form className={styles.form} onSubmit={handleLogin}>
                    <div className={styles.form_group}>
                        <label htmlFor="email" className="form-label">
                            E-mail
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-input"
                            placeholder="seu@email.com"
                            required
                        />
                    </div>

                    <div className={styles.form_group}>
                        <label htmlFor="password" className="form-label">
                            Senha
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-input"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <div className={styles.button_group}>
                        <button type="submit" className="btn btn-primary">
                            Entrar
                        </button>

                        <Link to="/" className="btn btn-secondary">
                            Voltar
                        </Link>
                    </div>
                </form>
            </div>
        </main>
    );
}
