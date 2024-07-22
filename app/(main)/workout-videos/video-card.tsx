'use client'

import { useAuthStore } from "@/components/providers/auth-provider";
import { fetchBookmarkVideo } from "@/utils/video/workoutVideoCollection";
import { Heart } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import Modal from "./video";
import { toast } from "sonner";

type VideoItem = {
    id: number;
    title: string;
    img: string;
    views: string;
    date: string;
    duration: string;
    bookmarked: boolean;
    name: string;
}

const VideoCard = ({ video }: { video: VideoItem }) => {
    const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);
    const [bookmarkedVideos, setBookmarkedVideos] = useState<boolean>(video.bookmarked);
    const { user, sessionToken } = useAuthStore((store) => store);

    const handleThumbnailClick = (id: string) => {
        setSelectedVideoId(id);
    };

    const handleBookmarkClick = async () => {
        try {
            const data = await fetchBookmarkVideo(video?.id!, sessionToken!);
            setBookmarkedVideos(data.bookmarked);
            if (data.bookmarked) {
                toast.success('Video bookmarked successfully!');
            } else {
                toast.info('Video removed from bookmarks.');
            }
        } catch (error) {
            console.error("Error while bookmarking video:", error);
            toast.error('Error while bookmarking video.');
        }
    }

    const closeVideo = () => {
        setSelectedVideoId(null);
    };

    return (
        <div>
            <div
                key={video.id}
                className="relative bg-white border border-solid border-[#E9E9EF] rounded-lg cursor-pointer h-60 w-56"
            >
                <div className="relative w-full h-[126px]">
                    <Image
                        layout="fill"
                        className="rounded-t-lg object-cover rounded-2xl"
                        src={video.img || "/placeholder-image.png"}
                        alt={video.title || "Video thumbnail"}
                        //@ts-ignore
                        onClick={() => handleThumbnailClick(video.id)}
                    />
                    <div className="absolute w-10 right-[10px] bottom-[10px] rounded-[4px] bg-[#303033]">
                        <p className="text-[#FAFAFA] text-[10px] font-bold text-center leading-[14px] py-[2px] px-[6px]">
                            {video.duration}
                        </p>
                    </div>
                </div>
                <div className="p-3">
                    <p className="text-[16px] font-normal leading-[20px] text-[#303033] line-clamp-2">
                        {video.name}
                    </p>
                </div>
                <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center font-medium text-sm text-[#868A93]">
                    <span className="truncate">
                        {video.views} views • {video.date}
                    </span>
                    <div className="flex space-x-2">
                        <Image
                            width={18}
                            height={19}
                            src="/i.svg"
                            alt="Information icon"
                        />
                        <Heart
                            width={20}
                            height={20}
                            fill={bookmarkedVideos ? "#FF0000" : "#868A93"}
                            onClick={() => handleBookmarkClick()}
                        />
                    </div>
                </div>
            </div>

            {selectedVideoId && (
                <Modal
                    isOpen={Boolean(selectedVideoId)}
                    onClose={closeVideo}
                    videoId={selectedVideoId}
                />
            )}
        </div>
    );
}

export default VideoCard;
