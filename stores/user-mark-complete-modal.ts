import { create } from "zustand";

type MarkCompleteModalState = {
    isOpen: boolean;
    open: () => void;
    close: () => void;
};

export const useMarkCompleteModal = create<MarkCompleteModalState>((set) => ({
    isOpen: false,
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false }),
}));
