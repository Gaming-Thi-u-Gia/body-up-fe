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
import InfiniteScroll from "react-infinite-scroll-component";

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
  const [hasMoreVideos, setHasMoreVideos] = useState<boolean>(true);
  const { sessionToken } = useAuthStore((store) => store);
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);
  const [pageNo, setPageNo] = useState<number>(0);

  console.log(sessionToken);

  useEffect(() => {
    fetchVideos();
  }, [sessionToken]);

  const fetchVideos = async () => {
    if (!sessionToken) return;

    setLoading(true);
    try {
      const fetchedVideosTopic = await fetchVideoWithTopicData(sessionToken, pageNo, 1);
      console.log("fetchedVideosTopic", fetchedVideosTopic);
      if (fetchedVideosTopic.length === 0) {
        setHasMoreVideos(false);
      } else {
        setVideosTopic((prev) => [...prev, ...fetchedVideosTopic]);
        setPageNo((prevPageNo) => prevPageNo + 1);
      }
    } catch (error) {
      console.error("Error fetching video category data:", error);
    } finally {
      setLoading(false);
    }
  };

  const closeVideo = () => {
    setSelectedVideoId(null);
  };

  if (loading && videosTopic.length === 0) {
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
      <InfiniteScroll
        dataLength={videosTopic.length}
        next={fetchVideos}
        hasMore={hasMoreVideos}
        loader={<ListSkeleton />}
      >
        {videosTopic.map((topic) => (
          <div key={topic.id}>
            <div className="flex justify-between py-2">
              <div>
                <h2 className="text-[#303033] text-xl font-semibold">
                  {topic.name}
                </h2>
                <p className="text-sm font-normal">{topic.description}</p>
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
      </InfiniteScroll>

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

export const ListSkeleton = () => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-5 gap-4 h-[430px]">
        <SkeletonVideoCard />
        <SkeletonVideoCard />
        <SkeletonVideoCard />
        <SkeletonVideoCard />
        <SkeletonVideoCard />
      </div>
    </div>
  );
};
