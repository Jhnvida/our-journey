import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks";
import styles from "./styles.module.css";

export function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const { user, loading, login } = useAuth();

    useEffect(() => {
        if (!loading && user) {
            navigate("/painel");
        }
    }, [user, loading, navigate]);

    async function handleSubmit(e: React.SubmitEvent) {
        e.preventDefault();
        setError("");

        const response = await login(email, password);

        if (response?.error) {
            setError("E-mail ou senha incorretos.");
        } else {
            navigate("/painel");
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.leftPanel}>
                <div className={styles.phraseContainer}>
                    <h1 className={styles.mainPhrase}>Nossa História.</h1>
                    <p className={styles.subPhrase}>Memórias, histórias e momentos que construímos juntos.</p>
                </div>
            </div>

            <div className={styles.rightPanel}>
                <div className={styles.formContainer}>
                    {error && <div className={styles.error}>{error}</div>}

                    <form className={styles.form} onSubmit={handleSubmit}>
                        <div className={styles.inputGroup}>
                            <label htmlFor="email" className={styles.label}>
                                E-mail
                            </label>

                            <input
                                id="email"
                                type="email"
                                required
                                className={styles.input}
                                placeholder="seu@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label htmlFor="password" className={styles.label}>
                                Senha
                            </label>

                            <input
                                id="password"
                                type="password"
                                required
                                className={styles.input}
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <button type="submit" className={styles.button}>
                            Entrar
                        </button>

                        <Link to="/" className={styles.backLink}>
                            Voltar para a página inicial
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
}
