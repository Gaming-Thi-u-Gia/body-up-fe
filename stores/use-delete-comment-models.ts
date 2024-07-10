import { create } from "zustand";

type DeleteCommentModel = {
    isOpen: boolean;
    open: () => void;
    close: () => void;
};

export const useDeleteComment = create<DeleteCommentModel>((set) => ({
    isOpen: false,
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false }),
}));
