import { create } from "zustand";

type BMIModelState = {
    isOpen: boolean;
    open: () => void;
    close: () => void;
};

export const useBmiModal = create<BMIModelState>((set) => ({
    isOpen: false,
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false }),
}));
