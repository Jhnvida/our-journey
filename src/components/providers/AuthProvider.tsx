import { useEffect, useState, type ReactNode } from "react";
import { supabase } from "../../lib/supabase";
import { AuthContext } from "./AuthContext";

const SHARED_ACCESS_IDENTITY = "acesso@ourjourney.internal";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setIsAuthenticated(Boolean(session));
            setLoading(false);
        });

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setIsAuthenticated(Boolean(session));
            setLoading(false);
        });

        return () => subscription.unsubscribe();
    }, []);

    async function signInWithKey(key: string): Promise<{ error?: string }> {
        if (!key.trim()) {
            return { error: "Informe a chave de acesso." };
        }

        const { error: err } = await supabase.auth.signInWithPassword({
            email: SHARED_ACCESS_IDENTITY,
            password: key.trim(),
        });

        if (err) {
            return { error: "Chave de acesso incorreta." };
        }

        return {};
    }

    async function updateKey(newKey: string): Promise<{ error?: string }> {
        if (!newKey.trim()) {
            return { error: "Informe a nova chave de acesso." };
        }

        const { error: err } = await supabase.auth.updateUser({
            password: newKey.trim(),
        });

        if (err) {
            return { error: "Erro ao atualizar a chave de acesso." };
        }

        return {};
    }

    async function signOut() {
        await supabase.auth.signOut();
    }

    return (
        <AuthContext value={{ isAuthenticated, loading, signInWithKey, signOut, updateKey }}>{children}</AuthContext>
    );
};
