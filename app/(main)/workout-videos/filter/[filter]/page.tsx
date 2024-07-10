"use client";

import { useAuthStore } from "@/components/providers/auth-provider";
import fetchVideos from "@/utils/video";
import { fetchGetVideoByCategories } from "@/utils/video/category";
import { usePathname } from "next/navigation";
import React, { use, useEffect, useState } from "react";
import VideoCard from "../../video-card";
import HeaderNavWorkoutVideos from "../../header-nav-workout-videos";
import TableVideoCategory from "../../filter-workout-video";
import SkeletonVideoCard from "../../skeleton-video";
import InfiniteScroll from "react-infinite-scroll-component";
import Link from "next/link";

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

const VideoFilter = () => {
    const [videos, setVideos] = useState<VideoItem[]>([]);
    const [loading, setLoading] = useState(true);
    const { sessionToken } = useAuthStore((store) => store);

    const [showFilterModal, setShowFilterModal] = useState(false);
    const toggleFilterModal = () => setShowFilterModal(!showFilterModal);
    const [hasMoreVideo, setHasMoreVideo] = useState(false);
    const [totalSearchResult, setTotalSearchResult] = useState(0);

    const [pageNo, setPageNo] = useState<number>(0);

    const pathname = usePathname();
    const parts = pathname.split("categoryId");

    useEffect(() => {
        getVideos();
    }, [pageNo]);

    const getVideos = async () => {
        const pageSize = 5;
        const allVideos = await fetchVideos();
        try {
            setLoading(true);
            const filterData = await fetchGetVideoByCategories(
                parts.slice(1),
                sessionToken!,
                pageNo,
                pageSize
            );
            if(filterData.totalElements === 0) {
                setHasMoreVideo(false);
                setLoading(false);
            }

            console.log(filterData);
            const filterVideoUrls = filterData.content.map(
                (video: VideoItem) => video.url
            );
    
            const filterVideos = allVideos
                .filter((video) => filterVideoUrls.includes(video.id))
                .map((video) => ({
                    ...video,
                }));
    
            setVideos((prev) => [...prev, ...filterVideos]);
            setPageNo(pageNo + 1);
            setHasMoreVideo(!filterData.last);
            setTotalSearchResult(filterData.totalElements);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCategoryChange = (categoryName: string) => {
        console.log("Category Name:", categoryName);
    };

    return (
        <div className="max-w-7xl h-full mx-auto">
            <HeaderNavWorkoutVideos onCategoryChange={() => {}} onFilterClick={toggleFilterModal} />
            {showFilterModal && <TableVideoCategory onClose={() => setShowFilterModal(false)} />}
            <div className="flex-1 bg-white py-2 my-3 flex justify-between items-center px-5 rounded-2xl">
                <div>
                    Showing <b>{totalSearchResult}</b> matching{" "}
                    <b>Search Criteria</b>
                </div>
                <div>
                    <Link
                        href="http://localhost:3000/workout-videos"
                        className="text-red-500 cursor-pointer"
                    >
                        Clear
                    </Link>
                </div>
            </div>
            {loading && <div className="grid grid-cols-5 gap-5 my-5">
                {[1, 2, 3, 4, 5].map((index) => (
                    <SkeletonVideoCard key={index} />
                ))}
            </div>}
            {!loading && <InfiniteScroll
                dataLength={videos.length}
                next={getVideos}
                hasMore={hasMoreVideo}
                loader={<div className="grid grid-cols-5 gap-5 my-5">
                    {[1, 2, 3, 4, 5].map((index) => <SkeletonVideoCard key={index} />)}
                </div>}
            >
                <div className="grid grid-cols-5 gap-5 my-5">
                    {videos.map((video, index) => <VideoCard video={video} key={index} />)}
                </div>
            </InfiniteScroll>}
        </div>
    );
};

export default VideoFilter;
