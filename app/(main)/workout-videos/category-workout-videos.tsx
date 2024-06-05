"use client";
import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

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
                const apiKey = "AIzaSyBLpxTlWLMfDrjC_zetIMvsomjccoLren0";
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
                                date: formatDate(
                                    new Date(item.snippet.publishedAt)
                                ),
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
        const regex = /PT(\d+H)?(\d+M)?(\d+S)?/;
        const matches = duration.match(regex);

        if (!matches) {
            return "00:00"; // Default value if the duration string is invalid
        }

        const hours = matches[1] ? parseInt(matches[1].slice(0, -1)) : 0;
        const minutes = matches[2] ? parseInt(matches[2].slice(0, -1)) : 0;
        const seconds = matches[3] ? parseInt(matches[3].slice(0, -1)) : 0;

        const totalMinutes = hours * 60 + minutes;
        const formattedMinutes = totalMinutes.toString().padStart(2, '0');
        const formattedSeconds = seconds.toString().padStart(2, '0');

        return `${formattedMinutes}:${formattedSeconds}`;
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

    const formatDate = (date: Date) => {
        const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
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
                    <Link href={`https://www.youtube.com/watch?v=${video.id}`}
                        key={video.id}
                        className="relative bg-white border border-solid border-[#E9E9EF] rounded-lg cursor-pointer h-60 w-56"
                    >
                        <div className="relative">
                            <img
                                className="rounded-t-lg w-full h-[126px] object-cover rounded-2xl"
                                src={video.img}
                                alt={video.title}
                            />
                            <div className="absolute w-10 right-[10px] bottom-[10px] rounded-[4px] bg-[#303033]">
                                <p className="text-[#FAFAFA] text-[10px] font-bold text-center leading-[14px] py-[2px] px-[6px]">{video.duration}</p>
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
                                    alt="i"
                                />
                                <Image
                                    width={20}
                                    height={20}
                                    src="/heart.svg"
                                    alt="heart"
                                />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default CategoryWorkoutVideos;
