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
import { useDeleteAvatarModal } from "@/stores/use-delete-avatar-model";
import { useEffect, useState, useTransition } from "react";
import { useAuthStore } from "../providers/auth-provider";
import { deleteAvatar } from "@/utils/user";
import { useRouter } from "next/navigation";

export function DeleteAvatarModal() {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const { isOpen, close } = useDeleteAvatarModal((store) => store);
    const [isClient, setIsClient] = useState(false);
    const { sessionToken, updateProfile } = useAuthStore((store) => store);
    useEffect(() => setIsClient(true), []);
    const handleDeleteAva = async () => {
        if (!sessionToken) {
            throw new Error("No session token available");
        }
        startTransition(async () => {
            const result = await deleteAvatar(sessionToken);
            updateProfile(result.payload);
        });
    };
    return (
        <AlertDialog open={isOpen} onOpenChange={close}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        This avatar cannot be undone. This will permanently
                        delete your avatar and remove your avatar from our
                        servers.
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
