"use client";
import {
   AlertDialog,
   AlertDialogAction,
   AlertDialogCancel,
   AlertDialogContent,
   AlertDialogDescription,
   AlertDialogFooter,
   AlertDialogHeader,
   AlertDialogTitle,
   AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useEffect, useState, useTransition } from "react";

import { useBlockUserModal } from "@/stores/block-user-model";
import useChatFireBaseStore from "@/stores/chat-firebase-store";
import useUserFirebaseStore from "@/stores/user-firebase-store";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";

export function BlockUserModal() {
   const { isOpen, open, close } = useBlockUserModal();
   const [isClient, setIsClient] = useState(false);
   const {
      changeBlock,
      isCurrentUserBlocked,
      isReceiverBlocked,
      user,
      chatId,
   } = useChatFireBaseStore((store) => store);
   const { currentUser, updateUserFirebase } = useUserFirebaseStore(
      (store) => store
   );
   useEffect(() => setIsClient(true), []);
   const handleBlock = async () => {
      if (!user || !currentUser?.id || !chatId) return;
      const userDocRef = doc(db, "users", currentUser?.id);

      try {
         await updateDoc(userDocRef, {
            blocked: isReceiverBlocked
               ? arrayRemove(user.id)
               : arrayUnion(user.id),
         });
         //   updateUserFirebase()
         changeBlock();
      } catch (error) {
         console.log(error);
      }
   };
   return (
      <AlertDialog open={isOpen} onOpenChange={close}>
         <AlertDialogContent>
            <AlertDialogHeader>
               <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
               <AlertDialogDescription>
                  This action cannot be undone. This will permanently{" "}
                  {!isReceiverBlocked ? (
                     <span>block</span>
                  ) : (
                     <span>unblock</span>
                  )}{" "}
                  this user.
               </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
               <AlertDialogCancel>Cancel</AlertDialogCancel>
               <AlertDialogAction onClick={handleBlock}>
                  Continue
               </AlertDialogAction>
            </AlertDialogFooter>
         </AlertDialogContent>
      </AlertDialog>
   );
}
