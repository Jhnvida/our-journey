import { useState } from "react";
import { ImageSelector } from "../../../components/ImageSelector";
import styles from "../../../styles/admin.module.css";
import type { Recipe } from "../../../types";

interface RecipesFormProps {
    data?: Recipe | null;
    onSave: (recipe: Omit<Recipe, "id" | "created_at">) => void;
    onCancel: () => void;
    loading?: boolean;
}

export function RecipesForm({ data, onSave, onCancel, loading }: RecipesFormProps) {
    const [title, setTitle] = useState(data?.title || "");
    const [description, setDescription] = useState(data?.description || "");
    const [ingredients, setIngredients] = useState(data?.ingredients ? data.ingredients.join("\n") : "");
    const [imageUrl, setImageUrl] = useState(data?.image_url || "");
    const [formError, setFormError] = useState<string | null>(null);

    function handleSave() {
        if (!title || !ingredients) {
            setFormError("Título e ingredientes são obrigatórios!");
            return;
        }
        setFormError(null);

        onSave({
            title,
            description: description || null,
            ingredients: ingredients.split("\n").filter((i) => i.trim() !== ""),
            image_url: imageUrl || null,
        });
    }

    return (
        <div className={styles.form_container}>
            <h3 className={styles.list_title}>{data ? "Editar Receita" : "Nova Receita"}</h3>

            {formError && <div className={styles.error_message}>{formError}</div>}

            <div className={styles.form_row}>
                <div className={styles.form_group}>
                    <label className={styles.label} htmlFor="title">
                        Título
                    </label>
                    <input
                        className={styles.input}
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Ex: Bolo de Cenoura"
                        disabled={loading}
                    />
                </div>

                <div className={styles.form_group}>
                    <label className={styles.label}>Imagem (opcional)</label>
                    <ImageSelector value={imageUrl} onChange={setImageUrl} />
                </div>
            </div>

            <div className={styles.form_group_full}>
                <label className={styles.label} htmlFor="description">
                    Descrição (opcional)
                </label>
                <textarea
                    className={styles.textarea}
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Conte um pouco sobre essa receita..."
                    disabled={loading}
                />
            </div>

            <div className={styles.form_group_full}>
                <label className={styles.label} htmlFor="ingredients">
                    Ingredientes (um por linha)
                </label>
                <textarea
                    className={styles.textarea}
                    id="ingredients"
                    value={ingredients}
                    onChange={(e) => setIngredients(e.target.value)}
                    placeholder="1 xícara de açúcar&#10;2 cenouras..."
                    disabled={loading}
                />
            </div>

            <div className={styles.form_actions}>
                <button className={styles.button} onClick={handleSave} disabled={loading}>
                    {loading ? "Salvando..." : "Salvar"}
                </button>
                <button className={styles.button_secondary} onClick={onCancel} disabled={loading}>
                    Cancelar
                </button>
            </div>
        </div>
    );
}
