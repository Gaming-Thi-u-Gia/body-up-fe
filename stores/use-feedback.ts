import { create } from "zustand";

type FeedbackModel = {
    isOpen: boolean;
    workoutProgramId: number | null;
    open: (id: number) => void;
    close: () => void;
};

export const useFeedbackModel = create<FeedbackModel>((set) => ({
    isOpen: false,
    workoutProgramId: null,
    open: (id) => set({ isOpen: true, workoutProgramId: id }),
    close: () => set({ isOpen: false, workoutProgramId: null }),
}));