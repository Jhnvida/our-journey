import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/utils/supabase";
import { AnimatePresence, motion, type Variants } from "motion/react";
import { useEffect, useState, type SubmitEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

const containerVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
    },
};

const errorVariants: Variants = {
    hidden: { opacity: 0, height: 0, y: -10 },
    visible: {
        opacity: 1,
        height: "auto",
        y: 0,
        transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
    },
    exit: {
        opacity: 0,
        height: 0,
        y: -10,
        transition: { duration: 0.2, ease: "easeIn" },
    },
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
            const { error: err } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (err) throw err;
            navigate("/dashboard", { replace: true });
        } catch {
            setError("Email ou senha inválidos!");
        }
    }

    return (
        <main className={styles.container}>
            <motion.div className={styles.content} variants={containerVariants} initial="hidden" animate="visible">
                <div className={styles.header}>
                    <p className={styles.subtitle}>Acesso Restrito</p>
                    <h1 className={styles.title}>Gerenciar Jornada</h1>
                </div>

                <AnimatePresence mode="wait">
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
                        <motion.button
                            type="submit"
                            className="btn btn-primary"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Entrar
                        </motion.button>

                        <Link to="/" className="btn btn-secondary">
                            Voltar
                        </Link>
                    </div>
                </form>
            </motion.div>
        </main>
    );
}
