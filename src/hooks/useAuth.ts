import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import type { User } from "@supabase/supabase-js";

export function useAuth() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getSession() {
            const {
                data: { session },
            } = await supabase.auth.getSession();

            setUser(session?.user ?? null);
            setLoading(false);
        }

        getSession();

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
            setLoading(false);
        });

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    async function login(email?: string, password?: string) {
        if (!email || !password) return { error: new Error("Email e senha são obrigatórios") };

        const { data, error } = await supabase.auth.signInWithPassword({ email, password });

        if (error) {
            return { error };
        }

        if (data.session) {
            setUser(data.user);
            setLoading(false);
        }

        return { data };
    }

    return { user, loading, login };
}
