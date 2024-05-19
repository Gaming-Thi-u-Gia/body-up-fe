import { createStore } from "zustand/vanilla";

export type AuthState = {
    isLoggedIn: boolean;
    sessionToken: string;
};

export type AuthActions = {
    login: (token: string) => void;
    logout: () => void;
};

export type AuthStore = AuthState & AuthActions;

export const defaultInitState: AuthState = {
    isLoggedIn: false,
    sessionToken: "",
};

export const createAuthStore = (initState: AuthState = defaultInitState) => {
    return createStore<AuthStore>()((set) => ({
        ...initState,
        login: (token) =>
            set(() => ({ isLoggedIn: true, sessionToken: token })),
        logout: () => set(() => ({ isLoggedIn: false, sessionToken: "" })),
    }));
};
