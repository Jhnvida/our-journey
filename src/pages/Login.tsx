import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState, type SubmitEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { duration, easing } from "../lib/motion";
import { supabase } from "../lib/supabase";
import styles from "./Login.module.css";

const contentVariants = {
    hidden: { opacity: 0, y: 12, scale: 0.98 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: duration.normal, ease: easing.decelerate } },
};

const errorVariants = {
    hidden: { opacity: 0, y: -4 },
    visible: { opacity: 1, y: 0, transition: { duration: duration.fast } },
    exit: { opacity: 0, y: -4, transition: { duration: duration.fast } },
};

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
            <motion.div className={styles.content} initial="hidden" animate="visible" variants={contentVariants}>
                <p className={styles.subtitle}>Acesso Restrito</p>
                <h1 className={styles.title}>Gerenciar Jornada</h1>

                <AnimatePresence>
                    {error && (
                        <motion.div
                            className="alert-error"
                            variants={errorVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                        >
                            {error}
                        </motion.div>
                    )}
                </AnimatePresence>

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
            </motion.div>
        </main>
    );
}
