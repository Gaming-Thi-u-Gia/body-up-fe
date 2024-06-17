"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { fetchWorkoutCategoryData } from "@/utils/video/workoutVideoCollection";

interface VideoCategory {
  id: number;
  topic: string;
  name: string;
}

const HeaderNavWorkoutPrograms = () => {
  const [titleWorkoutVideos, setTitleWorkoutVideos] = useState<VideoCategory[]>([]);
  const [isCategoriesVisible, setIsCategoriesVisible] = useState(false);

  useEffect(() => {
    const getVideoCategories = async () => {
      const categories = await fetchWorkoutCategoryData();
      setTitleWorkoutVideos([
        { id: -2, topic: "workout-program", name: "View All Collections" },
        { id: -1, topic: "workout-program", name: "Latest Workouts" },
        { id: 0, topic: "workout-program", name: "Most Popular" },

        ...categories,
      ]);
    };
    getVideoCategories();
  }, []);

  function handleOnOrOffCategories() {
    setIsCategoriesVisible(!isCategoriesVisible);
  }

  return (
    <div className="border-b border-[#E3E4EB]">
      <div className="h-full mx-auto flex py-[20px] justify-between items-center">
        <div className="py-[5px] relative">
          <Button
            id="current__cate"
            onClick={handleOnOrOffCategories}
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
                  className="pl-6 py-[5px] hover:text-gray-700 hover:bg-slate-200"
                  key={category.id}
                >
                  {category.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex h-8 space-x-2">
          <div className="group relative">
            <Button
              className="group-hover:opacity-0 group-hover:invisible transition-opacity duration-500 ease-in-out"
              variant="defaultOutline"
              size="default"
            >
              <Image width={20} height={20} src="/search.svg" alt="More" />
              Search
            </Button>
            <input
              className="absolute top-0 left-0 group-hover:w-[240px] group-hover:opacity-100 opacity-0 w-[0px] transition-all duration-500 ease-in-out rounded-[15px] border-solid border-[1px] border-[#E9E9EF] px-3 py-2"
              placeholder="Search"
            />
          </div>
          <div>
            <Button
              className="bg-transparent mr-1 cursor-not-allowed"
              variant="disabled"
              size="default"
            >
              <Image width={20} height={20} src="/heart.svg" alt="More" />
              Favorites
            </Button>
          </div>
          <div>
            <Button variant="default" size="default">
              <Image width={20} height={20} src="/filter.svg" alt="More" /> Filter
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderNavWorkoutPrograms;
