/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useEffect, useState } from "react";
import { useAuthStore } from "@/components/providers/auth-provider";
import fetchVideos from "@/utils/video";
import { fetchDataBookmarkVideoByUser } from "@/utils/video/workoutVideoCollection";
import VideoCard from "../../video-card";
import HeaderNavWorkoutVideos from "../../header-nav-workout-videos";
import SkeletonVideoCard from "../../skeleton-video";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import TableVideoCategory from "../../filter-workout-video";

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

const FavoriteVideo = () => {
   const [videos, setVideos] = useState<VideoItem[]>([]);
   const [loading, setLoading] = useState(true);
   const [showFilterModal, setShowFilterModal] = useState(false);
   const { sessionToken } = useAuthStore((store) => store);

   useEffect(() => {
      const fetchData = async () => {
         const bookmarkData = await fetchDataBookmarkVideoByUser(sessionToken!);
         setVideos(bookmarkData);
         setLoading(false);
      };

      if (sessionToken) {
         fetchData();
      }
   }, [sessionToken]);

   const handleCategoryChange = (categoryName: string) => {
      console.log("Category Name:", categoryName);
   };

   const toggleFilterModal = () => setShowFilterModal(!showFilterModal);

   return (
      <div className="max-w-7xl h-full mx-auto">
         <HeaderNavWorkoutVideos
            onCategoryChange={handleCategoryChange}
            onFilterClick={toggleFilterModal}
         />
         {showFilterModal && (
            <TableVideoCategory onClose={() => setShowFilterModal(false)} />
         )}
         <div className="gap-2 py-3">
            <Link
               className="flex space-x-2"
               href="http://localhost:3000/workout-videos"
            >
               <ArrowLeft />
               <p>Back To Workout Video Home</p>
            </Link>
         </div>

         {loading ? (
            <div className="grid grid-cols-5 gap-5 my-5">
               {[1, 2, 3, 4, 5].map((index) => (
                  <SkeletonVideoCard key={index} />
               ))}
            </div>
         ) : videos.length > 0 ? (
            <div className="grid grid-cols-5 gap-5 my-5">
               {videos.map(
                  (video: VideoItem, index: number) =>
                     (
                        //@ts-ignore
                        <VideoCard video={video} key={index} />
                     ) as JSX.Element
               )}
            </div>
         ) : (
            <div className="flex flex-col bg-gray-200 items-center justify-center rounded-3xl py-16 gap-3">
               <img
                  src="https://chloeting.com/_next/static/media/no-fav-video-matching.40e0de3c.svg"
                  alt=""
                  className="w-[222px] h-[160px]"
               />
               <h1 className="text-xl font-semibold">
                  No Favorite Videos Found
               </h1>
               <p className="text-lg max-w-xl text-center">
                  It looks like you don't have any saved videos yet. Click the
                  heart button on a video to add it to your favorites!
               </p>
               <Button className="mt-4" variant="primaryOutline" size="lg">
                  <Link href="/workout-videos">
                     Back to Workout Library Home
                  </Link>
               </Button>
            </div>
         )}
      </div>
   );
};

export default FavoriteVideo;
