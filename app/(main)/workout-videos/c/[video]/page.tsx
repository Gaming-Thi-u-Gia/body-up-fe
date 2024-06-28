"use client";

import React, { useEffect, useState } from "react";
import VideoCard from "../../video-card";
import fetchVideos from "@/utils/video";
import { fetchVideoWithTopicByTopicIdData } from "@/utils/video/workoutVideoCollection";
import { useAuthStore } from "@/components/providers/auth-provider";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Modal from "../../video";
import HeaderNavWorkoutVideos from "../../header-nav-workout-videos";
import SkeletonVideoCard from "../../skeleton-video";

type VideoItem = {
    videoId: number;
    id: string;
    title: string;
    img: string;
    views: string;
    date: string;
    duration: string;
    bookmarked: boolean;
    url: string;
};

const VideoCategory = () => {
    const [videos, setVideos] = useState<VideoItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const { sessionToken } = useAuthStore((store) => store);
    const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);
    const [query, setQuery] = useState<string>("");
    const [categoryName, setCategoryName] = useState<string>("Workout Videos");

    const pathname = usePathname();

    useEffect(() => {
        if (pathname) {
            const pathSegments = pathname.split("/");
            const lastSegment = pathSegments[pathSegments.length - 1] ?? "";
            if (!isNaN(parseInt(lastSegment, 10))) {
                setQuery(lastSegment);
            }
        }
    }, [pathname]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const fetchedVideos = await fetchVideos();
            console.log("Fetched Videos:", fetchedVideos);

            if (query) {
                const searchUrls = await fetchVideoWithTopicByTopicIdData(
                    parseInt(query, 10)
                );
                console.log("searchUrls:", searchUrls);
                const filteredVideos = fetchedVideos.filter((video) =>
                    searchUrls.some(
                        (searchVideo: VideoItem) => searchVideo.url === video.id
                    )
                );
                setVideos(filteredVideos);
            } else {
                setVideos([]);
            }
            setLoading(false);
        };
        fetchData();
    }, [query, sessionToken]);

    const closeVideo = () => {
        setSelectedVideoId(null);
    };

    const handleCategoryChange = (name: string) => {
        setCategoryName(name);
    };

    if (loading) {
        return (
            <div className="grid grid-cols-5 gap-5">
                {[1, 2, 3, 4, 5].map((index) => (
                    <SkeletonVideoCard key={index} />
                ))}
            </div>
        );
    }

    return (
        <div className="max-w-7xl h-full mx-auto">
            <HeaderNavWorkoutVideos onCategoryChange={handleCategoryChange} />
            <div>
                <div className="flex justify-between py-2">
                    <div>
                        <h2 className="text-[#303033] text-xl font-semibold">
                            {categoryName}
                        </h2>
                        <p className="text-sm font-normal"></p>
                    </div>
                    <Button variant="primaryOutline" size="default">
                        <Link href={`/workout-videos/c/${query}`}>
                            View All
                        </Link>
                    </Button>
                </div>
                <div className="grid grid-cols-5 gap-5 my-5">
                    {videos.map((video, index) => (
                        <VideoCard video={video} key={index} />
                    ))}
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
};

export default VideoCategory;
