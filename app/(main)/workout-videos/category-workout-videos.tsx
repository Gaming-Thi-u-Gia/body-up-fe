"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { fetchVideoWithTopicData } from "@/utils/video/workoutVideoCollection";

import SkeletonVideoCard from "./skeleton-video";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Modal from "./video";
import { useAuthStore } from "@/components/providers/auth-provider";
import VideoCard from "./video-card";
import Link from "next/link";
import fetchVideos from "@/utils/video";

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

const CategoryWorkoutVideos = () => {
    const [videosTopic, setVideosTopic] = useState<TopicType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const { sessionToken } = useAuthStore((store) => store);
    const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);

    console.log(sessionToken);

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
                        ).sort((a: VideoItem, b: VideoItem) => a.title.localeCompare(b.title)).slice(0, 5),
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

    const closeVideo = () => {
        setSelectedVideoId(null);
    };

    if (loading) {
        return (
            <>
                {[1].map((index) => (
                    <div key={index}>
                        <div className="flex justify-between py-2">
                            <div>
                                <Skeleton width={200} height={24} />
                                <Skeleton width={400} height={16} />
                            </div>
                            <Skeleton width={100} height={36} />
                        </div>
                        <div className="grid grid-cols-5 gap-5 my-5">
                            {[1, 2, 3, 4, 5].map((skeletonIndex) => (
                                <SkeletonVideoCard key={skeletonIndex} />
                            ))}
                        </div>
                    </div>
                ))}
            </>
        );
    }

    return (
        <div>
            {videosTopic.map((topic) => (
                <div key={topic.id}>
                    <div className="flex justify-between py-2">
                        <div>
                            <h2 className="text-[#303033] text-xl font-semibold">
                                {topic.name}
                            </h2>
                            <p className="text-sm font-normal">
                                {topic.description}
                            </p>
                        </div>
                        <Button variant="primaryOutline" size="default">
                            <Link href={`/workout-videos/c/${topic.id}`}>View All</Link>
                        </Button>
                    </div>
                    <div className="grid grid-cols-5 gap-5 my-5">
                        {topic.videos.map((video, index) => {
                            console.log(video);
                            return <VideoCard video={video} key={index} />;
                        })}
                    </div>
                </div>
            ))}

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

export default CategoryWorkoutVideos;
