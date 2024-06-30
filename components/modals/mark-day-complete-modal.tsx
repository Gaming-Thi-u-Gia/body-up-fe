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
import { useMarkCompleteModal } from "@/stores/user-mark-complete-modal";

export function MarkCompleteModal() {
    const [isPending, startTransition] = useTransition();
    const { isOpen, close } = useMarkCompleteModal((store) => store);
    const [isClient, setIsClient] = useState(false);
    const { sessionToken } = useAuthStore((store) => store);
    useEffect(() => setIsClient(true), []);
    if (!isClient) return null;
    return (
        <AlertDialog open={isOpen} onOpenChange={close}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        This action be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
