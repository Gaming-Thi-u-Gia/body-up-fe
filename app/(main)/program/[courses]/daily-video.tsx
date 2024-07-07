"use client";
import { CircleAlert, Crosshair, Heart } from "lucide-react";
import { useState } from "react";
import Modal from "@/app/(main)/workout-videos/video";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

type Props = {
    videoId: string;
    title: string;
    target: string;
    view: string;
    releaseDate: string;
    duration: string;
    bannerUrl: string;
    isOptional: boolean;
    url: string;
    initialStatus: string;
    category: string;
};

export const VideoDaily = ({
    title,
    view,
    releaseDate,
    duration,
    bannerUrl,
    isOptional,
    url,
    category,
}: Props) => {
    const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);

    const handleThumbnailClick = (videoId: string) => {
        setSelectedVideoId(videoId);
    };

    const closeVideo = () => {
        setSelectedVideoId(null);
    };

    return (
        <>
            <div className="flex p-[20px] bg-[#F7F7F7] rounded-lg mt-4">
                <div className="relative w-[30%] h-[110px] cursor-pointer">
                    <Image
                        layout="fill"
                        className="rounded-t-lg object-cover rounded-2xl"
                        src={bannerUrl || "/placeholder-image.png"}
                        alt={title || "Video thumbnail"}
                        onClick={() => handleThumbnailClick(url)}
                    />
                    <div className="absolute w-10 right-[10px] bottom-[10px] rounded-[4px] bg-[#303033]">
                        <p className="text-[#FAFAFA] text-[10px] font-bold text-center leading-[14px] py-[2px] px-[6px]">
                            {duration}
                        </p>
                    </div>
                </div>

                {selectedVideoId && (
                    <Modal
                        isOpen={Boolean(selectedVideoId)}
                        onClose={closeVideo}
                        videoId={selectedVideoId}
                    />
                )}

                <div className="flex flex-col justify-between w-full ml-4">
                    <div className="flex justify-between">
                        <h4 className="text-lg text-[#303033] font-semibold">
                            {title}
                        </h4>
                        {isOptional && (
                            <Badge
                                variant="secondary"
                                className="bg-[#B9B9B9] text-white hover:text-black hover:bg-[#c3c3c3]"
                            >
                                OPTIONAL
                            </Badge>
                        )}
                    </div>
                    <div className="flex items-center gap-1">
                        <Crosshair width={12} height={12} />
                        <p className="text-sm">{category}</p>
                    </div>
                    <div className="flex items-center justify-between">
                        <p className="text-xs text-[#868A93]">
                            {view} • {releaseDate}
                        </p>
                        <div className="flex items-center text-[#868A93] gap-2">
                            <CircleAlert
                                width={17}
                                height={18}
                                cursor="pointer"
                            />
                            <Heart width={18} height={18} cursor="pointer" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};