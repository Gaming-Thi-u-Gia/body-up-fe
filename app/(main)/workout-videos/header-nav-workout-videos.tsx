'use client'

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { fetchVideoCategoryData } from "@/utils/video/workoutVideoCollection";

interface VideoCategory {
  id: number;
  topic: string;
  name: string;
}

const HeaderNavWorkoutVideos = () => {
  const [titleWorkoutVideos, setTitleWorkoutVideos] = useState<VideoCategory[]>([]);
  const [isCategoriesVisible, setIsCategoriesVisible] = useState(false);

  useEffect(() => {
    const getVideoCategories = async () => {
      const categories = await fetchVideoCategoryData();
      setTitleWorkoutVideos([
        ...titleWorkoutVideos,
        { id: -1, topic: "workout", name: "View All Collections" },
        { id: 0, topic: "workout", name: "Latest Workouts" },
        ...categories,
      ]);
    };
    getVideoCategories();
  }, []);

  function handleOnOrOfCategories() {
    setIsCategoriesVisible(!isCategoriesVisible);
  }

  return (
    <div className="border-b border-[#E3E4EB]">
      <div className="h-full mx-auto flex py-[20px] justify-between items-center">
        <div className="py-[5px] relative">
          <Button
            id="current__cate"
            onClick={handleOnOrOfCategories}
            variant="secondary"
            className="px-5"
            size="default"
          >
            Browse By Collection
            <Image width={15} height={14} src="/more.svg" alt="More" />
          </Button>
          <div
            id="list__cate"
            className={`${isCategoriesVisible ? '' : 'hidden'} mt-2 absolute bg-white z-10 rounded-[15px] w-[220px] py-4`}
          >
            <ul>
              {titleWorkoutVideos.map((category) => (
                <li
                  className="pl-6 py-[5px] hover:text-[gray] hover:bg-slate-400 "
                  key={category.id}
                >
                  {category.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex h-8">
        </div>
      </div>
    </div>
  );
};

export default HeaderNavWorkoutVideos;
