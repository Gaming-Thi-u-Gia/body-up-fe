import { create } from "zustand";

export type NotificationModal = {
  notifications: NotificationTYPE[];
  setNotifications: (newNotifications: NotificationTYPE[]) => void;
  totalElements: number;
  setTotalElements: (value: number) => void;
};

export type NotificationTYPE = {
  message: string;
  workoutProgram: WorkoutProgramType;
  createdAt: string;
};
export type WorkoutProgramType = {
  name: string;
  img: string;
};
export const useNotification = create<NotificationModal>((set) => ({
  notifications: [],
  setNotifications: (newNotifications: NotificationTYPE[]) =>
    set({ notifications: newNotifications }),
  totalElements: 0,
  setTotalElements: (value: number) => set({ totalElements: value }),
}));
