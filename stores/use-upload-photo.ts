import { PhotoProps } from "@/app/(main)/my-fitness-journey/progress-photo/progress-photo";
import { create } from "zustand";

type UploadPhotoModal = {
    isOpen: boolean;
    progressPhotoId: number;
    photos: PhotoProps[];
    open: (progressPhotoId?: number) => void;
    close: () => void;
    update: (photo: PhotoProps[]) => void;
};

export const useUploadPhotoModal = create<UploadPhotoModal>((set) => ({
    isOpen: false,
    progressPhotoId: -1,
    photos: [],
    open: (progressPhotoId?) =>
        set({ isOpen: true, progressPhotoId: progressPhotoId }),
    close: () => set({ isOpen: false, progressPhotoId: -1 }),
    update: (photo) => set((state) => ({ photos: photo })),
}));
