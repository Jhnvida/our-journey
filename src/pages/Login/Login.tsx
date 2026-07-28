import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { supabase } from "../../lib/supabase";
import styles from "./Login.module.css";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();
    const { user } = useAuth();

    useEffect(() => {
        if (user) {
            navigate("/admin", { replace: true });
        }
    }, [user, navigate]);

    const handleLogin = async (e: React.SubmitEvent) => {
        e.preventDefault();
        setError(null);

        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) throw error;

            navigate("/admin", { replace: true });
        } catch {
            setError("Email ou senha inválidos!");
        }
    };

    return (
        <section className={`${styles.login_section} `}>
            <div className={styles.login_content}>
                <p className={styles.login_subtitle}>Acesso Restrito</p>
                <h1 className={styles.login_title}>Gerenciar Jornada</h1>

                {error && <div className={`${styles.error_message} `}>{error}</div>}

                <form className={styles.login_form} onSubmit={handleLogin}>
                    <div className={styles.form_group}>
                        <label htmlFor="email" className={styles.form_label}>
                            E-mail
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={styles.form_input}
                            placeholder="seu@email.com"
                            required
                        />
                    </div>

                    <div className={styles.form_group}>
                        <label htmlFor="password" className={styles.form_label}>
                            Senha
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={styles.form_input}
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <div className={styles.button_group}>
                        <button type="submit" className={styles.login_button}>
                            Entrar
                        </button>
                        <Link to="/" className={styles.back_button}>
                            Voltar
                        </Link>
                    </div>
                </form>
            </div>
        </section>
    );
}
