import { create } from "zustand";

type ChangePassword = {
    isOpen: boolean;
    open: () => void;
    close: () => void;
};

export const useVerifyResetCode = create<ChangePassword>((set) => ({
    isOpen: false,
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false }),
}));
