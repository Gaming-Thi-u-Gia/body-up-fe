"use client";
import { useAuthStore } from "@/components/providers/auth-provider";
import { Button } from "@/components/ui/button";
import { useUploadPhotoModal } from "@/stores/use-upload-photo";
import { getAllProgressPhoto } from "@/utils/user";
import { Plus, Upload } from "lucide-react";
import { useEffect, useState } from "react";
import { ImageCard, ImageCardSkeleton } from "@/components/shared/image-card";

export type PhotoProps = {
    id: number;
    imgUrl: string;
    photoAngle: string;
    visibility: boolean;
    date: string;
};
export const ProgressPhoto = () => {
    const [activeTab, setActiveTab] = useState("all");
    const { sessionToken } = useAuthStore((store) => store);
    const { open, update, photos } = useUploadPhotoModal((store) => store);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        const fetchImage = async () => {
            setIsLoading(true);
            const res = await getAllProgressPhoto(
                sessionToken!,
                activeTab
            ).then((res) => {
                //sort by date
                res.payload.sort((a: PhotoProps, b: PhotoProps) => {
                    return (
                        new Date(b.date).getTime() - new Date(a.date).getTime()
                    );
                });
                update(res.payload);
            });
            setIsLoading(false);
        };
        fetchImage();
    }, [activeTab, sessionToken]);
    return (
        <div>
            <h2 className='text-3xl font-bold'>My Progress Photos</h2>
            <div className='flex justify-between items-center mt-4'>
                <div className='space-x-2'>
                    <Button
                        size='smP4'
                        variant={
                            activeTab === "all" ? "active" : "primaryOutline"
                        }
                        onClick={() => setActiveTab("all")}
                    >
                        ALL
                    </Button>
                    <Button
                        size='smP4'
                        variant={
                            activeTab === "front" ? "active" : "primaryOutline"
                        }
                        onClick={() => setActiveTab("front")}
                    >
                        FRONT ANGLE
                    </Button>
                    <Button
                        size='smP4'
                        variant={
                            activeTab === "side" ? "active" : "primaryOutline"
                        }
                        onClick={() => setActiveTab("side")}
                    >
                        SIDE ANGLE
                    </Button>
                    <Button
                        size='smP4'
                        variant={
                            activeTab === "back" ? "active" : "primaryOutline"
                        }
                        onClick={() => setActiveTab("back")}
                    >
                        BACK ANGLE
                    </Button>
                </div>
                <div className='flex'>
                    <Button
                        variant='primary'
                        size='default'
                        onClick={() => open()}
                    >
                        <Plus width={14} height={14} className='mr-2' />
                        New Photo
                    </Button>
                </div>
            </div>
            <div className='flex flex-wrap gap-4 my-4'>
                {/* TODO: Fetch IMAGE */}
                {isLoading
                    ? Array.from({ length: 2 }).map((_, index) => (
                          <div key={index} className='w-[234px] h-[312px]'>
                              <ImageCardSkeleton />
                          </div>
                      ))
                    : photos.map((photo: PhotoProps) => (
                          <ImageCard
                              key={photo.id}
                              id={photo.id}
                              imgUrl={photo.imgUrl}
                              photoAngle={photo.photoAngle}
                              visibility={photo.visibility}
                              date={photo.date}
                          />
                      ))}
                <div
                    className='flex flex-col justify-center items-center w-[234px] h-[312px] py-[37px] px-[21px] border-dashed border-[#D9D9D9] hover:border-[#c1e2ff] border-2 rounded-xl cursor-pointer group '
                    onClick={() => open()}
                >
                    <div className='flex justify-center items-center p-3 border border-black rounded-full w-fit group-hover:border-[#96ceff] group-hover:text-[#4fadff]'>
                        <Upload width={16} height={16} />
                    </div>
                    <p className='text-center mt-2 group-hover:text-[#4fadff]'>
                        Upload your progress photo
                    </p>
                </div>
            </div>
        </div>
    );
};
