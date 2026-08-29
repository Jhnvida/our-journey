import { type User } from "@supabase/supabase-js";
import { createContext } from "react";

export interface AuthContextValue {
    user: User | null;
    loading: boolean;
    signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue | null>(null);
