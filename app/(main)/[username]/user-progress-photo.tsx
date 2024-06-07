import { Button } from "@/components/ui/button";
import { useUploadPhotoModal } from "@/stores/use-upload-photo";
import { Plus } from "lucide-react";
import Image from "next/image";

type Props = {
    photoAngle: { type: string; title: string }[];
    angle: string;
    onClick: (angle: string) => void;
};
export const UserProgressPhoto = ({ photoAngle, angle, onClick }: Props) => {
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
                <Button
                    variant='primary'
                    size='sm'
                    className='px-3'
                    onClick={open}
                >
                    <Plus width={14} height={14} className='mr-1' />
                    New Photo
                </Button>
            </div>
            <div className='mt-6 w-full bg-[#fafafa] py-[52px] rounded-lg'>
                <div className='flex flex-col justify-center items-center'>
                    <Image
                        src='/profile-photos-empty.svg'
                        alt='empty'
                        width={125}
                        height={125}
                    />
                    <p className='text-base text-[#868A93]'>
                        Remember to take daily progress photos and add them to
                        your public profile.
                    </p>
                </div>
            </div>
        </>
    );
};
