"use client";

import { useState, useEffect } from "react";
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
import { useAuthStore } from "../providers/auth-provider";
import { useUserStore } from "@/stores/use-user";
export const AvatarModal = () => {
    const { updateProfile } = useUserStore((store) => store);
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

    const handleClick = async () => {
        const resultFromSv = await fetch("/api/update-avatar/", {
            method: "POST",
            body: JSON.stringify({ base64Img: preview }),
            headers: {
                "Content-Type": "application/json",
            },
        }).then(async (res) => {
            const payload = await res.json();
            const datas = {
                status: res.status,
                payload,
            };
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            return datas;
        });
        try {
            const res = await fetch("http://localhost:8080/api/v1/avatar", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${sessionToken}`,
                },
                body: JSON.stringify({
                    avatar: resultFromSv.payload.results.secure_url,
                }),
            });

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            const payload = await res.json();
            const data = {
                status: res.status,
                payload,
            };
            return data;
        } catch (error) {
            console.error(error);
        }
        updateProfile(resultFromSv.payload.results.secure_url);
        close();
        return resultFromSv;
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
                    <DialogDescription className='text-center text-base '>
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
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className='mb-4'>
                    <div className='flex flex-col gap-y-4 w-full'>
                        <Button
                            variant='primary'
                            className='w-full'
                            size='lg'
                            onClick={handleClick}
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
