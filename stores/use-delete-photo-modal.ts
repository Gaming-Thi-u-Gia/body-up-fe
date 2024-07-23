import { create } from "zustand";

type DeletePhotoModel = {
    isOpen: boolean;
    progressPhotoId: number;
    open: (progressPhotoId: number) => void;
    close: () => void;
};

export const useDeletePhotoModal = create<DeletePhotoModel>((set) => ({
    isOpen: false,
    progressPhotoId: -1,
    open: (progressPhotoId) =>
        set({ isOpen: true, progressPhotoId: progressPhotoId }),
    close: () => set({ isOpen: false }),
}));
