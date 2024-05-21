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
import { useUserStore } from "@/stores/use-user";
import { handleUpdateAvatar } from "@/utils/user";
import { redirect, useRouter } from "next/navigation";
export const AvatarModal = () => {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const { updateProfile, firstName } = useUserStore((store) => store);
    const { sessionToken } = useAuthStore((store) => store);
    const [isClient, setIsClient] = useState(false);
    const { isOpen, close } = useAvatarModal();
    const [src, setSrc] = useState();
    const [preview, setPreview] = useState(null);

    useEffect(() => setIsClient(true), []);
    const onClose = () => {
        setPreview(null);
    };
    const onCrop = (view: any) => {
        setPreview(view);
    };

    const handleClick = () => {
        startTransition(async () => {
            const result = await handleUpdateAvatar(sessionToken!, preview!);
            updateProfile(result.payload.results.secure_url);
            close();
            redirect("/settings/preferences");
        });
    };
    if (!isClient) {
        return null;
    }

    return (
        <Dialog open={isOpen} onOpenChange={close}>
            <DialogContent className='max-w-md'>
                <DialogHeader>
                    <div className='flex items-center w-full justify-center mb-5'>
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

                <DialogFooter className='mb-4'>
                    <div className='flex flex-col gap-y-4 w-full'>
                        <Button
                            variant='primary'
                            className='w-full'
                            size='lg'
                            onClick={handleClick}
                            disabled={isPending}
                        >
                            Save Image
                        </Button>
                        <Button
                            variant='secondary'
                            className='w-full'
                            size='lg'
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
