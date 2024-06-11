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
import { deleteAvatar, deletePhoto } from "@/utils/user";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useDeletePhotoModal } from "@/stores/use-delete-photo-modal";

export function DeletePhotoModal() {
    const [isPending, startTransition] = useTransition();
    const { isOpen, close, progressPhotoId } = useDeletePhotoModal(
        (store) => store
    );
    const [isClient, setIsClient] = useState(false);
    const { sessionToken } = useAuthStore((store) => store);
    useEffect(() => setIsClient(true), []);
    if (!isClient) return null;
    const handleDeletePhoto = async () => {
        if (!sessionToken) {
            throw new Error("No session token available");
        }
        startTransition(async () => {
            const result = await deletePhoto(sessionToken, progressPhotoId);
            toast.success("Delete Photo Success!", {
                description: `${new Date().toLocaleString()}`,
                action: {
                    label: "Close",
                    onClick: () => console.log("Close"),
                },
            });
            close();
            window.location.reload();
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
                        This photo cannot be undone. This will permanently
                        delete your photo and remove your photo from our
                        servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDeletePhoto}>
                        Continue
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
