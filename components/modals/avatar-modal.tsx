"use client";

import { useState, useEffect, useTransition } from "react";
import {
   Dialog,
   DialogContent,
   DialogFooter,
   DialogHeader,
   DialogTitle,
} from "@/components/ui/dialog";
import Avatar from "react-avatar-edit";
import { Button } from "@/components/ui/button";
import { useAvatarModal } from "@/stores/use-avatar-model";
import { useAuthStore } from "../providers/auth-provider";
import { handleUpdateAvatar } from "@/utils/user";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { auth, db } from "@/firebase";
import useUserFirebaseStore from "@/stores/user-firebase-store";
import { doc, updateDoc } from "firebase/firestore";
import { updateProfile as updateFirebaseUser } from "firebase/auth";
export const AvatarModal = () => {
   const [isPending, startTransition] = useTransition();
   const { sessionToken, updateProfile, user } = useAuthStore((store) => store);
   const [isClient, setIsClient] = useState(false);
   const { isOpen, close } = useAvatarModal();
   const [src, setSrc] = useState();
   const [preview, setPreview] = useState(null);
   const { updateUserFirebase, currentUser: current } = useUserFirebaseStore(
      (store) => store
   );
   useEffect(() => setIsClient(true), []);
   const onClose = () => {
      setPreview(null);
   };
   const onCrop = (view: any) => {
      setPreview(view);
   };
   const handleClick = () => {
      startTransition(async () => {
         try {
            const result = await handleUpdateAvatar(sessionToken!, preview!);
            if (result.status === 200) {
               updateProfile({ avatar: result.payload.results.secure_url });
               if (current?.id) {
                  const docRef = doc(db, "users", current.id);
                  await updateDoc(docRef, {
                     avatar: result.payload.results.secure_url,
                  });
               }
               await updateFirebaseUser(auth.currentUser!, {
                  photoURL: result.payload.results.secure_url,
               });
               updateUserFirebase({
                  avatar: result.payload.results.secure_url,
                  id: current?.id,
               });
            }
            toast.success("Save Avatar Success!", {
               description: `${new Date().toLocaleString()}`,
               action: {
                  label: "Close",
                  onClick: () => console.log("Close"),
               },
            });

            close();
         } catch (error) {
            toast.error("Save Avatar Failed!", {
               description: `${new Date().toLocaleString()}`,
               action: {
                  label: "Close",
                  onClick: () => console.log("Close"),
               },
            });
            console.log(error);
         }
      });
   };
   if (!isClient) {
      return null;
   }
   return (
      <Dialog open={isOpen} onOpenChange={close}>
         <DialogContent className="max-w-md">
            <DialogHeader>
               <div className="flex items-center w-full justify-center mb-5">
                  Update profile picture
               </div>
               <DialogTitle>Your avatar :</DialogTitle>
            </DialogHeader>
            <Avatar
               width={390}
               height={295}
               imageHeight={295}
               imageWidth={390}
               exportAsSquare={true}
               exportSize={100}
               onCrop={onCrop}
               onClose={onClose}
               src={src}
            />

            <DialogFooter className="mb-4">
               <div className="flex flex-col gap-y-4 w-full">
                  <Button
                     variant="primary"
                     className="w-full"
                     size="lg"
                     onClick={handleClick}
                     disabled={isPending}
                  >
                     Save Image
                  </Button>
                  <Button
                     variant="secondary"
                     className="w-full"
                     size="lg"
                     onClick={close}
                     disabled={isPending}
                  >
                     Cancel
                  </Button>
               </div>
            </DialogFooter>
         </DialogContent>
      </Dialog>
   );
};
