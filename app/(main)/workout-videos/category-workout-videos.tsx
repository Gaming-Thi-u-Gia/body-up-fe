"use client";
import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from "react";
import Image from "next/image";

interface VideoItem {
    id: string;
    title: string;
    img: string;
    views: string;
    date: string;
    duration: string;
}

const CategoryWorkoutVideos = () => {
    const [videos, setVideos] = useState<VideoItem[]>([]);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const playlistId = "UUCgLoMYIyP0U56dEhEL1wXQ";
                const apiKey = "AIzaSyCKQUy2NeFm7Fp8DD9mD5tP8rpnBj48VIs";
                let allVideos: VideoItem[] = [];
                let nextPageToken = "";

                do {
                    const playlistResponse = await fetch(
                        `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistId}&key=${apiKey}&pageToken=${nextPageToken}`
                    );
                    const playlistData = await playlistResponse.json();

                    const videoDetails = await Promise.all(
                        playlistData.items.map(async (item: any) => {
                            const videoId = item.snippet.resourceId.videoId;
                            const videoResponse = await fetch(
                                `https://youtube.googleapis.com/youtube/v3/videos?part=statistics,contentDetails&id=${videoId}&key=${apiKey}`
                            );
                            const videoData = await videoResponse.json();
                            const videoInfo = videoData.items[0];

                            return {
                                id: videoId,
                                title: item.snippet.title,
                                img: item.snippet.thumbnails.high.url,
                                views: formatViews(
                                    videoInfo.statistics.viewCount
                                ),
                                date: new Date(
                                    item.snippet.publishedAt
                                ).toLocaleDateString(),
                                duration: convertDuration(
                                    videoInfo.contentDetails.duration
                                ),
                            };
                        })
                    );

                    allVideos = allVideos.concat(videoDetails);
                    nextPageToken = playlistData.nextPageToken;
                } while (nextPageToken);

                setVideos(allVideos);
            } catch (error) {
                console.error("Error fetching videos:", error);
            }
        };

        fetchVideos();
    }, []);

    const convertDuration = (duration: string) => {
        return duration
            .replace("PT", "")
            .replace("H", "h ")
            .replace("M", "m ")
            .replace("S", "s");
    };

    const formatViews = (views: string) => {
        const num = parseInt(views);
        if (num >= 1000000) {
            return (num / 1000000).toFixed(0) + "M";
        } else if (num >= 1000) {
            return (num / 1000).toFixed(0) + "K";
        } else {
            return num.toString();
        }
    };

    return (
        <div>
            <div className="flex justify-between py-2">
                <div>
                    <h2 className="text-[#303033] text-xl font-semibold">
                        Most Popular
                    </h2>
                    <p className="text-sm font-normal">
                        These are some of the most popular workout videos. Give
                        them a try and see why people love these routines.
                    </p>
                </div>
                <Button variant="primaryOutline" size="default">
                    View All
                </Button>
            </div>

            <div className="grid grid-cols-5 gap-5 my-5">
                {videos.map((video) => (
                    <div
                        key={video.id}
                        className="relative bg-white border border-solid border-[#E9E9EF] rounded-lg cursor-pointer h-60 w-56"
                        style={{ borderRadius: "20px" }}
                    >
                        <img
                            className="rounded-t-lg w-full h-32 object-cover"
                            src={video.img}
                            alt={video.title}
                        />
                        <div className="p-3">
                            <p className="font-medium text-[#303033] text-sm line-clamp-2">
                                {video.title}
                            </p>
                        </div>
                        <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center text-sm text-gray-600">
                            <span>
                                {video.views} views • {video.date}
                            </span>
                            <div className="flex space-x-2">
                                <Button
                                    variant="secondary"
                                    size="icon"
                                    className="p-1"
                                >
                                    <Image
                                        width={16}
                                        height={16}
                                        src="/i.svg"
                                        alt="i"
                                    />
                                </Button>
                                <Button
                                    variant="secondary"
                                    size="icon"
                                    className="p-1"
                                >
                                    <Image
                                        width={18}
                                        height={18}
                                        src="/heart.svg"
                                        alt="heart"
                                    />
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoryWorkoutVideos;
