import { create } from "zustand";

type UploadPhotoModal = {
    isOpen: boolean;
    progressPhotoId: number;
    open: (progressPhotoId?: number) => void;
    close: () => void;
};

export const useUploadPhotoModal = create<UploadPhotoModal>((set) => ({
    isOpen: false,
    progressPhotoId: -1,
    open: (progressPhotoId?) =>
        set({ isOpen: true, progressPhotoId: progressPhotoId }),
    close: () => set({ isOpen: false, progressPhotoId: -1 }),
}));
