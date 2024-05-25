import { create } from "zustand";

type VerifyCodeModel = {
    isOpen: boolean;
    open: () => void;
    close: () => void;
};

export const useVerifyCode = create<VerifyCodeModel>((set) => ({
    isOpen: false,
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false }),
}));
