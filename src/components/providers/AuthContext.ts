import { createContext } from "react";

export interface AuthContextValue {
    isAuthenticated: boolean;
    loading: boolean;
    signInWithKey: (key: string) => Promise<{ error?: string }>;
    signOut: () => Promise<void>;
    updateKey: (newKey: string) => Promise<{ error?: string }>;
}

export const AuthContext = createContext<AuthContextValue | null>(null);
