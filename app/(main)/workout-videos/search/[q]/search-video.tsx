import React, { useEffect, useState } from "react";
import Image from "next/image";
import fetchVideos from "@/utils/video";
import { fetchSearchVideoData } from "@/utils/video/workoutVideoCollection";
import Modal from "../../video";
import HeaderNavWorkoutVideos from "../../header-nav-workout-videos";
import SkeletonVideoCard from "../../skeleton-video";

type VideoItem = {
    id: string;
    title: string;
    img: string;
    views: string;
    date: string;
    duration: string;
};

interface SearchVideosProps {
    query: string;
}

const SearchVideo = ({ query }: SearchVideosProps) => {
    const [videos, setVideos] = useState<VideoItem[]>([]);
    const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const handleThumbnailClick = (id: string) => {
        setSelectedVideoId(id);
    };

    const closeVideo = () => {
        setSelectedVideoId(null);
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const fetchedVideos = await fetchVideos();

            if (query) {
                const searchUrls = await fetchSearchVideoData(query);
                const filteredVideos = fetchedVideos.filter((video) =>
                    searchUrls.some(
                        (searchVideo: { url: string }) => searchVideo.url === video.id
                    )
                );
                setVideos(filteredVideos);
            } else {
                setVideos(fetchedVideos);
            }
            setLoading(false);
        };
        fetchData();
    }, [query]);

    const handleCategoryChange = (categoryName: string) => {
        console.log("Category Name:", categoryName);
    };

    return (
        <div>
            <HeaderNavWorkoutVideos onCategoryChange={handleCategoryChange} />
            <div className="grid grid-cols-5 gap-5 my-5">
                {loading ? (
                    [1, 2, 3, 4, 5].map((index) => (
                        <SkeletonVideoCard key={index} />
                    ))
                ) : (
                    videos.map((video) => (
                        <div
                            key={video.id}
                            onClick={() => handleThumbnailClick(video.id)}
                            className="relative bg-white border border-solid border-[#E9E9EF] rounded-lg cursor-pointer h-60 w-56"
                        >
                            <div className="relative w-full h-[126px]">
                                <Image
                                    layout="fill"
                                    className="rounded-t-lg object-cover rounded-2xl"
                                    src={video.img || "/placeholder-image.png"}
                                    alt={video.title || "Video thumbnail"}
                                />
                                <div className="absolute w-10 right-[10px] bottom-[10px] rounded-[4px] bg-[#303033]">
                                    <p className="text-[#FAFAFA] text-[10px] font-bold text-center leading-[14px] py-[2px] px-[6px]">
                                        {video.duration}
                                    </p>
                                </div>
                            </div>
                            <div className="p-3">
                                <p className="text-[16px] font-normal leading-[20px] text-[#303033] line-clamp-2">
                                    {video.title}
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
                                    <Image
                                        width={20}
                                        height={20}
                                        src="/heart.svg"
                                        alt="Heart icon"
                                    />
                                </div>
                            </div>
                        </div>
                    ))
                )}

                {selectedVideoId && (
                    <Modal
                        isOpen={Boolean(selectedVideoId)}
                        onClose={closeVideo}
                        videoId={selectedVideoId}
                    />
                )}
            </div>
        </div>
    );
};

export default SearchVideo;
