import { DashboardHeader } from "@/components/layout/DashboardHeader";
import { useAuth } from "@/hooks/useAuth";
import { useSettings } from "@/hooks/useSettings";
import styles from "@/styles/admin.module.css";
import { useEffect, useState } from "react";

export const Settings = () => {
    const { settings, loading, error, updateDate } = useSettings();
    const { updateKey } = useAuth();

    const [date, setDate] = useState<string>("");
    const [newKey, setNewKey] = useState<string>("");
    const [keySuccess, setKeySuccess] = useState<string | null>(null);
    const [keyError, setKeyError] = useState<string | null>(null);
    const [isUpdatingKey, setIsUpdatingKey] = useState(false);

    useEffect(() => {
        if (settings) {
            setDate(settings.relationship_start_date);
        }
    }, [settings]);

    async function handleSaveDate() {
        if (!date) {
            alert("A data é obrigatória!");
            return;
        }

        try {
            await updateDate(date);
            alert("Configurações salvas com sucesso!");
        } catch (err) {
            console.error(err);
        }
    }

    async function handleUpdateKey() {
        setKeyError(null);
        setKeySuccess(null);

        if (!newKey.trim()) {
            setKeyError("Digite uma nova chave de acesso.");
            return;
        }

        setIsUpdatingKey(true);
        const res = await updateKey(newKey);
        setIsUpdatingKey(false);

        if (res.error) {
            setKeyError(res.error);
        } else {
            setKeySuccess("Chave de acesso atualizada com sucesso!");
            setNewKey("");
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <DashboardHeader title="Configurações" subtitle="Gerencie as configurações gerais da jornada" />
            </div>

            {error && <div className="alert-error">{error}</div>}

            <div className={styles.form_container}>
                <h3 className={styles.list_title}>Início do Relacionamento</h3>

                <div className={styles.form_row}>
                    <div className={styles.form_group}>
                        <label className="form-label" htmlFor="date">
                            Data de início
                        </label>
                        <input
                            className="form-input"
                            type="date"
                            id="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            disabled={loading}
                        />
                    </div>
                </div>

                <div className={styles.form_actions}>
                    <button className="btn btn-primary" onClick={handleSaveDate} disabled={loading}>
                        {loading ? "Salvando..." : "Salvar Data"}
                    </button>
                </div>
            </div>

            <div className={styles.form_container}>
                <h3 className={styles.list_title}>Chave de Acesso</h3>

                {keyError && <div className="alert-error">{keyError}</div>}
                {keySuccess && (
                    <div
                        style={{
                            padding: "12px 16px",
                            backgroundColor: "var(--lp-success-container)",
                            color: "var(--lp-success)",
                            borderRadius: "var(--lp-radius-sm)",
                            fontSize: "14px",
                            fontWeight: 500,
                        }}
                    >
                        {keySuccess}
                    </div>
                )}

                <div className={styles.form_row}>
                    <div className={styles.form_group}>
                        <label className="form-label" htmlFor="access-key">
                            Nova chave compartilhada
                        </label>
                        <input
                            className="form-input"
                            type="password"
                            id="access-key"
                            value={newKey}
                            onChange={(e) => setNewKey(e.target.value)}
                            placeholder="Digite a nova chave de acesso..."
                            disabled={isUpdatingKey}
                        />
                    </div>
                </div>

                <div className={styles.form_actions}>
                    <button className="btn btn-primary" onClick={handleUpdateKey} disabled={isUpdatingKey}>
                        {isUpdatingKey ? "Atualizando..." : "Atualizar Chave"}
                    </button>
                </div>
            </div>
        </div>
    );
};
