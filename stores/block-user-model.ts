import { create } from "zustand";

type BlockUserModel = {
   isOpen: boolean;
   open: () => void;
   close: () => void;
};

export const useBlockUserModal = create<BlockUserModel>((set) => ({
   isOpen: false,
   open: () => set({ isOpen: true }),
   close: () => set({ isOpen: false }),
}));
