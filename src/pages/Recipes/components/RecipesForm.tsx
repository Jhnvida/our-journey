import { useState, type SubmitEvent } from "react";
import { ImageSelector } from "../../../components/ImageSelector";
import type { Recipe } from "../../../types";
import styles from "../../Dashboard/admin.module.css";

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

    function handleSubmit(e: SubmitEvent) {
        e.preventDefault();
        onSave({
            title,
            description: description || null,
            ingredients: ingredients.split("\n").filter((i) => i.trim() !== ""),
            image_url: imageUrl || null,
        });
    }

    return (
        <form className={styles.form_container} onSubmit={handleSubmit}>
            <h3 className={styles.list_title}>{data ? "Editar Receita" : "Nova Receita"}</h3>

            <div className={styles.form_row}>
                <div className={styles.form_group}>
                    <label className={styles.label} htmlFor="title">
                        TÃ­tulo
                    </label>
                    <input
                        className={styles.input}
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Ex: Bolo de Cenoura"
                        disabled={loading}
                        required
                    />
                </div>

                <div className={styles.form_group}>
                    <label className={styles.label}>Imagem (opcional)</label>
                    <ImageSelector value={imageUrl} onChange={setImageUrl} />
                </div>
            </div>

            <div className={styles.form_group_full}>
                <label className={styles.label} htmlFor="description">
                    DescriÃ§Ã£o (opcional)
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
                    placeholder="1 xÃ­cara de aÃ§Ãºcar&#10;2 cenouras..."
                    disabled={loading}
                    required
                />
            </div>

            <div className={styles.form_actions}>
                <button type="submit" className={styles.button} disabled={loading}>
                    {loading ? "Salvando..." : "Salvar"}
                </button>
                <button type="button" className={styles.button_secondary} onClick={onCancel} disabled={loading}>
                    Cancelar
                </button>
            </div>
        </form>
    );
}
