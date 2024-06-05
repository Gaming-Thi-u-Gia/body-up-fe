import { create } from "zustand";

type AvatarModalState = {
    isOpen: boolean;
    open: () => void;
    close: () => void;
};

export const useAvatarModal = create<AvatarModalState>((set) => ({
    isOpen: false,
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false }),
}));
