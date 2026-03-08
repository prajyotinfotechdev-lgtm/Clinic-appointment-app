"use client";

import {
    createContext,
    useContext,
    useState,
    ReactNode,
} from "react";
import {
    AuthUser,
    getToken,
    setToken,
    removeToken,
    decodeToken,
    getDashboardPath,
} from "@/lib/auth";
import { useRouter } from "next/navigation";

interface AuthContextType {
    user: AuthUser | null;
    isLoading: boolean;
    login: (token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    isLoading: true,
    login: () => { },
    logout: () => { },
});

/**
 * Check whether a JWT is expired by reading the `exp` claim.
 */
function isTokenExpired(token: string): boolean {
    try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        if (!payload.exp) return false;
        return payload.exp * 1000 < Date.now();
    } catch {
        return true;
    }
}

/**
 * Read and validate the stored token once on initial load.
 * Returns the decoded user if token is valid, null otherwise.
 */
function initializeUser(): AuthUser | null {
    const token = getToken();
    if (!token) return null;

    if (isTokenExpired(token)) {
        removeToken();
        return null;
    }

    return decodeToken(token);
}

export function AuthProvider({ children }: { children: ReactNode }) {
    // Lazy initializer — runs once, avoids useEffect + setState cascade
    const [user, setUser] = useState<AuthUser | null>(initializeUser);
    const [isLoading] = useState(false);
    const router = useRouter();

    const login = (token: string) => {
        setToken(token);
        const decoded = decodeToken(token);
        setUser(decoded);
        if (decoded) {
            router.push(getDashboardPath(decoded));
        }
    };

    const logout = () => {
        removeToken();
        setUser(null);
        router.push("/login");
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
