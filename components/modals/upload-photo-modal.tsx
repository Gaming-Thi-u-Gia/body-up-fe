"use client";
import { useDropzone } from "react-dropzone";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useUploadPhotoModal } from "@/stores/use-upload-photo";
import { UploadPhotoForm } from "@/app/(main)/my-fitness-journey/progress-photo/upload-photo-form";
export const UploadPhotoModal = () => {
    const { isOpen, close } = useUploadPhotoModal((store) => store);
    return (
        <Dialog open={isOpen} onOpenChange={close}>
            <DialogContent className='w-[700px]'>
                <DialogHeader>
                    <DialogTitle className='font-semibold text-[22px]'>
                        Upload New Photo
                    </DialogTitle>
                </DialogHeader>
                <UploadPhotoForm />
            </DialogContent>
        </Dialog>
    );
};
