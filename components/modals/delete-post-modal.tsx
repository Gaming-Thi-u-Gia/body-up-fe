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
import { useDeletePost } from "@/stores/use-delete-post-model";
import { fetchDeletePost } from "@/utils/community";
import { Posts } from "@/app/(main)/community/user-post-no-image";

export function DeletePostModal({}: {}) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const { isOpen, close, postId, posts, setPosts } = useDeletePost(
        (store) => store
    );
    const [isClient, setIsClient] = useState(false);
    const { sessionToken } = useAuthStore((store) => store);
    useEffect(() => setIsClient(true), []);
    const handleDeletePost = async () => {
        startTransition(() => {
            try {
                const res = fetchDeletePost(postId, sessionToken!);
                toast.success("Post deleted successfully!", {
                    description: `${new Date().toLocaleString()}`,
                    action: {
                        label: "Close",
                        onClick: () => console.log("Close"),
                    },
                });
                setPosts(posts.filter((post) => post.id !== postId));
            } catch (error) {
                toast.error("Failed to delete post!", {
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
                        This post cannot be undone. This will permanently delete
                        your post and remove your post from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDeletePost}>
                        Continue
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
