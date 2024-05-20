import { create } from "zustand";

type UserState = {
    firstName: string;
    lastName: string;
    email: string;
    avatar: string;
};
type UserActions = {
    updateProfile: (profile: Partial<UserState>) => void;
};
export const useUserStore = create<UserState & UserActions>((set) => ({
    firstName: "",
    lastName: "",
    email: "",
    avatar: "",
    updateProfile: (profile: Partial<UserState>) =>
        set((state: UserState) => ({ ...state, ...profile })),
}));
