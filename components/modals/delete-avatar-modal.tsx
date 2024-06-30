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
} from "@/components/ui/alert-dialog";
import { useDeleteAvatarModal } from "@/stores/use-delete-avatar-model";
import { useEffect, useState, useTransition } from "react";
import { useAuthStore } from "../providers/auth-provider";
import { deleteAvatar } from "@/utils/user";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import useUserFirebaseStore from "@/stores/user-firebase-store";
import { doc, updateDoc } from "firebase/firestore";
import { auth, db } from "@/firebase";
import { updateProfile as updateFirebaseUser } from "firebase/auth";
export function DeleteAvatarModal() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { isOpen, close } = useDeleteAvatarModal((store) => store);
  const [isClient, setIsClient] = useState(false);
  const { sessionToken, updateProfile, user } = useAuthStore((store) => store);
  const { updateUserFirebase, currentUser: current } = useUserFirebaseStore(
    (store) => store
  );
  useEffect(() => setIsClient(true), []);

  const handleDeleteAva = async () => {
    if (!sessionToken) {
      throw new Error("No session token available");
    }
    startTransition(async () => {
      try {
        const result = await deleteAvatar(sessionToken);
        updateProfile(result.payload);
        if (result.status === 200) {
          if (current?.uid) {
            const docRef = doc(db, "users", current.uid);
            await updateDoc(docRef, {
              avatar: "",
            });
          }
          await updateFirebaseUser(auth.currentUser!, {
            photoURL: null,
          });
          updateUserFirebase({
            avatar: "",
            uid: current?.uid,
          });
        }

        toast.success("Delete Avatar Success!", {
          description: `${new Date().toLocaleString()}`,
          action: {
            label: "Close",
            onClick: () => console.log("Close"),
          },
        });
      } catch (error) {
        toast.error("Delete Avatar Failed!", {
          description: `${new Date().toLocaleString()}`,
          action: {
            label: "Close",
            onClick: () => console.log("Close"),
          },
        });
      }
    });
  };
  return (
    <AlertDialog open={isOpen} onOpenChange={close}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This avatar cannot be undone. This will permanently delete your
            avatar and remove your avatar from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteAva}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
