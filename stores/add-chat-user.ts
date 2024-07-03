import { create } from "zustand";

type AddUserChatModel = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

export const useAddChatModel = create<AddUserChatModel>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));
