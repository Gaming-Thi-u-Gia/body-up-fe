import { ImageCard } from "@/components/shared/image-card";
import { Button } from "@/components/ui/button";
import { UserState } from "@/stores/auth-store";
import { useUploadPhotoModal } from "@/stores/use-upload-photo";
import { getAllProgressPhotoByUserId } from "@/utils/user";
import { Plus } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { PhotoProps } from "../my-fitness-journey/progress-photo/page";
import { useAuthStore } from "@/components/providers/auth-provider";

type Props = {
    photoAngle: { type: string; title: string }[];
    angle: string;
    onClick: (angle: string) => void;
    userId: number;
};
export const UserProgressPhoto = ({
    photoAngle,
    angle,
    onClick,
    userId,
}: Props) => {
    const { user } = useAuthStore((state) => state);
    const [photo, setPhotos] = useState([]);
    useEffect(() => {
        getAllProgressPhotoByUserId(userId, angle).then((res) => {
            if (res?.status) {
                res.payload.sort((a: PhotoProps, b: PhotoProps) => {
                    return (
                        new Date(b.date).getTime() - new Date(a.date).getTime()
                    );
                });
                setPhotos(res.payload);
            }
        });
    }, [angle, userId]);
    const { open } = useUploadPhotoModal((state) => state);
    return (
        <>
            <div className='flex gap-3'>
                <div className='flex-1 flex flex-3'>
                    {photoAngle.map((item) => (
                        <Button
                            key={item.type}
                            variant={
                                angle === item.type
                                    ? "active"
                                    : "primaryOutline"
                            }
                            size='sm'
                            className='px-3 mr-3 uppercase font-bold text-xs'
                            onClick={() => onClick(item.type)}
                        >
                            {item.title}
                        </Button>
                    ))}
                </div>
                {user?.id === userId && (
                    <Button
                        variant='primary'
                        size='sm'
                        className='px-3'
                        onClick={() => open()}
                    >
                        <Plus width={14} height={14} className='mr-1' />
                        New Photo
                    </Button>
                )}
            </div>
            <div className='mt-6 w-full bg-[#fafafa] py-[52px] rounded-lg'>
                {photo ? (
                    <div className='flex gap-4 flex-wrap px-4'>
                        {photo.map((photo: PhotoProps) => (
                            <ImageCard
                                key={photo.id}
                                date={photo.date}
                                id={photo.id}
                                imgUrl={photo.imgUrl}
                                photoAngle={photo.photoAngle}
                                visibility={photo.visibility}
                            />
                        ))}
                    </div>
                ) : (
                    <div className='flex flex-col justify-center items-center'>
                        <Image
                            src='/profile-photos-empty.svg'
                            alt='empty'
                            width={125}
                            height={125}
                        />
                        <p className='text-base text-[#868A93]'>
                            Remember to take daily progress photos and add them
                            to your public profile.
                        </p>
                    </div>
                )}
            </div>
        </>
    );
};
