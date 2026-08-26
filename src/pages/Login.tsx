import { motion } from "motion/react";
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
            <motion.div
                className={styles.content}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <p className={styles.subtitle}>Acesso Restrito</p>
                <h1 className={styles.title}>Gerenciar Jornada</h1>

                {error && <div className={styles.error_message}>{error}</div>}

                <form className={styles.form} onSubmit={handleLogin}>
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
                        <motion.button
                            type="submit"
                            className={styles.button}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Entrar
                        </motion.button>

                        <Link to="/" className={styles.back_button}>
                            Voltar
                        </Link>
                    </div>
                </form>
            </motion.div>
        </main>
    );
}
