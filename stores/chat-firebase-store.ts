import { create } from "zustand";
import useUserFirebaseStore, { User } from "./user-firebase-store";

type ChatFireBaseStore = {
   chatId: string | null;
   user: User | null;
   isCurrentUserBlocked: boolean;
   isReceiverBlocked: boolean;
   changeChat: (chatId: string | null, user: User | null) => void;
   changeBlock: () => void;
};

const useChatFireBaseStore = create<ChatFireBaseStore>((set) => ({
   chatId: null,
   user: null,
   isCurrentUserBlocked: false,
   isReceiverBlocked: false,
   changeChat: (chatId: string | null, user: User | null) => {
      const currentUser = useUserFirebaseStore.getState().currentUser;
      console.log("Firebase:", currentUser);
      console.log("Id, User", chatId, user);
      if (!currentUser || !user) {
         console.error("Current user or user is null or undefined");
         return;
      }
      if (user.blocked?.includes(currentUser.id!)) {
         return set({
            chatId,
            user: null,
            isCurrentUserBlocked: true,
            isReceiverBlocked: false,
         });
      } else if (currentUser.blocked?.includes(user.id!)) {
         return set({
            chatId,
            user: user,
            isCurrentUserBlocked: false,
            isReceiverBlocked: true,
         });
      } else {
         return set({
            chatId,
            user,
            isCurrentUserBlocked: false,
            isReceiverBlocked: false,
         });
      }
   },
   changeBlock: () => {
      set((state) => ({
         ...state,
         isReceiverBlocked: !state.isReceiverBlocked,
      }));
   },
}));

export default useChatFireBaseStore;
