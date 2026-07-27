import { LogIn } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { supabase } from "../../lib/supabase";
import styles from "./Login.module.css";

export function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const { user } = useAuth();

    useEffect(() => {
        if (user) {
            navigate("/admin", { replace: true });
        }
    }, [user, navigate]);

    const handleLogin = async (e: React.SubmitEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) throw error;

            navigate("/admin", { replace: true });
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Falha ao fazer login");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className={`${styles.login_section} reveal_up`}>
            <div className={styles.login_content}>
                <p className={styles.login_subtitle}>Acesso Restrito</p>
                <h1 className={styles.login_title}>Gerenciar Jornada</h1>

                {error && <div className={`${styles.error_message} reveal_up`}>{error}</div>}

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

                    <button type="submit" className={styles.login_button} disabled={loading}>
                        {loading ? (
                            "Entrando..."
                        ) : (
                            <>
                                Entrar <LogIn size={18} className={styles.login_icon} />
                            </>
                        )}
                    </button>
                </form>
            </div>
        </section>
    );
}
