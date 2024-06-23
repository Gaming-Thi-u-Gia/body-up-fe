import { useDeletePhotoModal } from "@/stores/use-delete-photo-modal";
import { useUploadPhotoModal } from "@/stores/use-upload-photo";
import { Edit, X } from "lucide-react";
import { use } from "react";
import { Skeleton } from "../ui/skeleton";
type Props = {
    id: number;
    imgUrl: string;
    photoAngle: string;
    visibility: boolean;
    date: string;
};
export const ImageCard = ({
    id,
    imgUrl,
    photoAngle,
    visibility,
    date,
}: Props) => {
    const { open } = useDeletePhotoModal((store) => store);
    const { open: openUpload } = useUploadPhotoModal((store) => store);
    return (
        <div
            className='w-[234px] h-[312px] rounded-xl bg-center bg-cover cursor-pointer relative'
            style={{ backgroundImage: `url(${imgUrl})` }}
        >
            <div className='absolute top-2 right-2 flex gap-2'>
                <div className='w-8 h-8 p-2 bg-orange-400/80 hover:bg-orange-400 rounded-full'>
                    <Edit
                        width={18}
                        height={18}
                        onClick={() => openUpload(id)}
                    />
                </div>
                <div className='w-8 h-8 p-2 bg-orange-400/80 hover:bg-orange-400 rounded-full'>
                    <X width={18} height={18} onClick={() => open(id)} />
                </div>
            </div>
        </div>
    );
};

export const ImageCardSkeleton = () => {
    return (
        <Skeleton className='w-[234px] h-[312px] rounded-xl bg-gray-300 animate-pulse'>
            <div className='absolute top-2 right-2 flex gap-2'>
                <Skeleton className='w-8 h-8 p-2 bg-gray-400 rounded-full animate-pulse'></Skeleton>
                <Skeleton className='w-8 h-8 p-2 bg-gray-400 rounded-full animate-pulse'></Skeleton>
            </div>
        </Skeleton>
    );
};
