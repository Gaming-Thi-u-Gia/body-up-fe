"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import fetchVideos from "@/utils/video";
import Modal from "./video";
import SkeletonVideoCard from "./skeleton-video";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useAuthStore } from "@/components/providers/auth-provider";
import { fetchVideoWithTopicData } from "@/utils/video/workoutVideoCollection";

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

type TopicType = {
    id: number;
    name: string;
    description: string;
    videos: VideoItem[];
};

const BodyLatestWorkoutVideos = () => {
    const [videosTopic, setVideosTopic] = useState<TopicType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const { sessionToken } = useAuthStore((store) => store);
    const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedVideos = await fetchVideos();
                const fetchedVideosTopic = await fetchVideoWithTopicData(
                    sessionToken!
                );

                if (fetchedVideosTopic && Array.isArray(fetchedVideosTopic)) {
                    const updatedTopics = fetchedVideosTopic.map((topic) => ({
                        ...topic,
                        videos: (Array.isArray(topic.videos)
                            ? topic.videos.map((videoItem: VideoItem) => {
                                  const videoDetails = fetchedVideos.find(
                                      (video) => video.id === videoItem.url
                                  );
                                  return videoDetails
                                      ? {
                                            ...videoItem,
                                            ...videoDetails,
                                        }
                                      : videoItem;
                              })
                            : []
                        ).sort((a: VideoItem, b: VideoItem) => a.title.localeCompare(b.title)),
                    }));

                    setVideosTopic(updatedTopics);
                } else {
                    console.error("Invalid or empty topics data");
                    setVideosTopic([]);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                setVideosTopic([]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [sessionToken]);

    const handleThumbnailClick = (id: string) => {
        setSelectedVideoId(id);
    };

    const closeVideo = () => {
        setSelectedVideoId(null);
    };

    return (
        <div className="max-w-7xl h-full mx-auto">
            <div className="flex justify-between py-[25px]">
                <div>
                    {loading ? (
                        <Skeleton width={200} height={30} />
                    ) : (
                        <h2 className="text-[#303033] text-[22px] font-semibold leading-[30px]">
                            Latest Workouts
                        </h2>
                    )}
                </div>
                {loading ? (
                    <Skeleton width={100} height={36} />
                ) : (
                    <Button variant="primaryOutline" size="default">
                        View All
                    </Button>
                )}
            </div>
            <div className="flex gap-10">
                {loading ? (
                    [1, 2, 3, 4, 5].map((index) => (
                        <SkeletonVideoCard key={index} />
                    ))
                ) : (
                    videosTopic.slice(5, 6).flatMap((topic) =>
                        topic.videos.slice(0, 3).map((video, index) => (
                            <div
                                key={video.id}
                                onClick={() => handleThumbnailClick(video.id)}
                                className={`relative bg-white border border-solid border-[#E9E9EF] rounded-lg cursor-pointer ${
                                    index === 0
                                        ? "flex w-[737px] h-[242.27px] px-4 pt-[24px] pb-[24px]"
                                        : "w-[232px] h-[228px]"
                                }`}
                            >
                                {index === 0 ? (
                                    <>
                                        <div className="flex-1 h-full relative w-[60%]">
                                            <Image
                                                layout="fill"
                                                className="rounded-t-lg object-cover rounded-2xl"
                                                src={video.img}
                                                alt="Video image"
                                            />
                                            <div className="absolute w-10 right-[10px] bottom-[10px] rounded-[4px] bg-[#303033]">
                                                <p className="text-[#FAFAFA] text-[10px] font-bold text-center leading-[14px] py-[2px] px-[6px]">
                                                    {video.duration}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex-1 p-3 w-[40%]">
                                            <p className="text-[18px] font-medium leading-[150%] tracking-wide text-[#303033] line-clamp-2">
                                                {video.title}
                                            </p>
                                            <div className="flex justify-between items-center font-medium text-sm text-[#868A93] mt-auto">
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
                                    </>
                                ) : (
                                    <>
                                        <div className="relative w-full h-[58%]">
                                            <Image
                                                layout="fill"
                                                className="rounded-t-lg object-cover rounded-2xl"
                                                src={video.img}
                                                alt="Video image"
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
                                    </>
                                )}
                            </div>
                        ))
                    )
                )}
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

export default BodyLatestWorkoutVideos;
