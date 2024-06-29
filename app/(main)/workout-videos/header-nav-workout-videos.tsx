"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { fetchVideoCategoryData } from "@/utils/video/workoutVideoCollection";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/components/providers/auth-provider";

interface VideoCategory {
    id: number;
    topic: string;
    name: string;
}

interface HeaderNavWorkoutVideosProps {
    onCategoryChange: (categoryName: string) => void;
    onFilterClick: () => void;
}

const HeaderNavWorkoutVideos: React.FC<HeaderNavWorkoutVideosProps> = ({
    onCategoryChange,
    onFilterClick,
}) => {
    const [titleWorkoutVideos, setTitleWorkoutVideos] = useState<
        VideoCategory[]
    >([]);
    const [isCategoriesVisible, setIsCategoriesVisible] = useState(false);
    const [searchVideo, setSearchProgram] = useState("");
    const [selectedCategory, setSelectedCategory] =
        useState<VideoCategory | null>(null);
    const { sessionToken } = useAuthStore((store) => store);
    const router = useRouter();

    useEffect(() => {
        const getVideoCategories = async () => {
            const categories = await fetchVideoCategoryData();
            setTitleWorkoutVideos([
                { id: -1, topic: "workout", name: "View All Collections" },
                { id: 0, topic: "workout", name: "Latest Workouts" },
                ...categories,
            ]);
        };
        getVideoCategories();
    }, []);

    const handleOnOrOfCategories = () => {
        setIsCategoriesVisible(!isCategoriesVisible);
    };

    const handleSearchKeyDown = (
        event: React.KeyboardEvent<HTMLInputElement>
    ) => {
        if (event.key === "Enter") {
            router.push(`/workout-videos/search/${searchVideo}`);
        }
    };

    const handleCategoryClick = (category: VideoCategory) => {
        setSelectedCategory(category);
        setIsCategoriesVisible(false);
        router.push(`/workout-videos/c/${category.id}`);
    };

    const handleFavoriteClick = () => {
        if (sessionToken) {
            router.push(`/workout-videos/favorite/isFavorite`);
        }
    };

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
                        {selectedCategory
                            ? selectedCategory.name
                            : "Browse By Collection"}
                        <Image
                            width={15}
                            height={14}
                            src="/more.svg"
                            alt="More"
                        />
                    </Button>
                    <div
                        id="list__cate"
                        className={`${isCategoriesVisible ? "" : "hidden"} mt-2 absolute bg-white z-10 rounded-[15px] w-[220px] py-4`}
                    >
                        <ul>
                            {titleWorkoutVideos.map((category) => (
                                <li
                                    className="pl-6 py-[5px] hover:text-[gray] hover:bg-slate-400 cursor-pointer"
                                    key={category.id}
                                    onClick={() =>
                                        handleCategoryClick(category)
                                    }
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
                            <Image
                                width={20}
                                height={20}
                                src="/search.svg"
                                alt="Search"
                            />{" "}
                            Search
                        </Button>
                        <input
                            className="absolute top-0 right-0 group-hover:w-[240px] group-hover:opacity-100 opacity-0 w-[0px] transition-all duration-500 ease-in-out rounded-[15px] border-solid border-[1px] border-[#E9E9EF] px-3 py-2"
                            placeholder="Search"
                            onChange={(e) => setSearchProgram(e.target.value)}
                            onKeyDown={handleSearchKeyDown}
                        />
                    </div>

                    <div>
                        <Button
                            className={`bg-transparent mr-1 ${sessionToken ? "bg-transparent cursor-pointer" : "cursor-not-allowed"}`}
                            variant={sessionToken ? "default" : "disabled"}
                            size="default"
                            onClick={handleFavoriteClick}
                        >
                            <Image
                                width={20}
                                height={20}
                                src="/heart.svg"
                                alt="Favorites"
                            />
                            Favorites
                        </Button>
                    </div>
                    <div>
                        <Button
                            variant="default"
                            size="default"
                            onClick={onFilterClick}
                        >
                            <Image
                                width={20}
                                height={20}
                                src="/filter.svg"
                                alt="Filter"
                            />{" "}
                            Filter
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeaderNavWorkoutVideos;
