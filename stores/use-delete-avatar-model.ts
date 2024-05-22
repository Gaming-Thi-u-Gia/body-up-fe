import { create } from "zustand";

type DeleteAvatarModel = {
    isOpen: boolean;
    open: () => void;
    close: () => void;
};

export const useDeleteAvatarModal = create<DeleteAvatarModel>((set) => ({
    isOpen: false,
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false }),
}));
