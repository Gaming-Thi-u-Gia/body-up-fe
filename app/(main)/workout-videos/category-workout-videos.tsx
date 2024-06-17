'use client'

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Modal from "./video";
import { fetchVideoWithTopicData } from "@/utils/video/workoutVideoCollection";
import fetchVideos from "@/utils/video";

type VideoItem = {
    id: string;
    title: string;
    img: string;
    views: string;
    date: string;
    duration: string;
}

type TopicType = {
    id: number;
    name: string;
    description: string;
    videos: VideoItem[];
};

const CategoryWorkoutVideos = () => {
    const [videosTopic, setVideosTopic] = useState<TopicType[]>([]);
    const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedVideos = await fetchVideos();
                const fetchedVideosTopic = await fetchVideoWithTopicData();
    
                if (fetchedVideosTopic && Array.isArray(fetchedVideosTopic)) {
                    const updatedTopics = fetchedVideosTopic.map(topic => ({
                        ...topic,
                        videos: (
                            Array.isArray(topic.videos) ? topic.videos.map(videoItem => {
                                const videoDetails = fetchedVideos.find(video => video.id === videoItem.url);
                                return videoDetails ? {
                                    ...videoItem,
                                    ...videoDetails,
                                } : videoItem;
                            }) : [] ).slice(0, 5)
                    }));
    
                    setVideosTopic(updatedTopics);
                } else {
                    console.error("Invalid or empty topics data");
                    setVideosTopic([]);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                setVideosTopic([]);
            }
        };
    
        fetchData();
    }, []);

    const handleThumbnailClick = (id: string) => {
        setSelectedVideoId(id);
    };

    const closeVideo = () => {
        setSelectedVideoId(null);
    };

    return (
        <div>
            {videosTopic.map(topic => (
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
                            View All
                        </Button>
                    </div>
                    <div className="grid grid-cols-5 gap-5 my-5">
                        {topic.videos.map((video) => (
                            <div
                                key={video.id}
                                onClick={() => handleThumbnailClick(video.id)}
                                className="relative bg-white border border-solid border-[#E9E9EF] rounded-lg cursor-pointer h-60 w-56"
                            >
                                <div className="relative w-full h-[126px]">
                                    <Image
                                        layout="fill"
                                        className="rounded-t-lg object-cover rounded-2xl"
                                        src={video.img || '/placeholder-image.png'} // Provide a placeholder image if src is missing
                                        alt={video.title || 'Video thumbnail'} // Provide a generic alt if title is missing
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
                        ))}
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
