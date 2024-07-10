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
import { toast } from "sonner";
import { useDeleteComment } from "@/stores/use-delete-comment-models";

export function DeleteCommentModal() {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const { isOpen, close } = useDeleteComment((store) => store);
    const [isClient, setIsClient] = useState(false);
    const { sessionToken, updateProfile, user } = useAuthStore(
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
