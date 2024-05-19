"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import Avatar from "react-avatar-edit";
import { Button } from "@/components/ui/button";
import { useAvatarModal } from "@/stores/use-avatar-model";
export const AvatarModal = () => {
    const [isClient, setIsClient] = useState(false);
    const { isOpen, close } = useAvatarModal();
    const [src, setSrc] = useState();
    const [preview, setPreview] = useState(null);
    const onClose = () => {
        setPreview(null);
    };
    const onCrop = (view: any) => {
        setPreview(view);
    };
    useEffect(() => setIsClient(true), []);

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
                    <DialogDescription className='text-center text-base '>
                        <Avatar
                            width={390}
                            height={295}
                            onCrop={onCrop}
                            onClose={onClose}
                            src={src}
                        />
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className='mb-4'>
                    <div className='flex flex-col gap-y-4 w-full'>
                        <Button
                            variant='primary'
                            className='w-full'
                            size='lg'
                            onClick={close}
                        >
                            Save Image
                        </Button>
                        <Button
                            variant='secondary'
                            className='w-full'
                            size='lg'
                            onClick={close}
                        >
                            Cancel
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
