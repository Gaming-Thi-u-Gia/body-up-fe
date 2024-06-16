import { create } from "zustand";

type ShareModel = {
    isOpen: boolean;
    open: () => void;
    close: () => void;
};

export const useSharePostModal = create<ShareModel>((set) => ({
    isOpen: false,
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false }),
}));
