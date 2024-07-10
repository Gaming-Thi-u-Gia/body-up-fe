'use client';

import React, { useEffect, useState } from "react";
import { fetchDailyExerciseData, fetchDailyRecipeExerciseData } from "@/utils/video/workoutVideoCollection";

import { VideoDaily } from "./daily-video";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@radix-ui/react-accordion";
import fetchVideos from "@/utils/video/fetchDailyVideo";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { DailyCarousel } from "./daily-carusel-video";
import CommentCourse from "./comment-courses";

interface VideoItem {
    id: string;
    title: string;
    img: string;
    views: string;
    date: string;
    duration: string;
    bookmarked: boolean;
    url: string;
    status: string;
    category: VideoCategories;
}

interface VideoCategories {
    id: number;
    name: string;
    type: string;
}

interface Recipe {
    id: number;
    name: string;
    avgStar: number;
    image: string;
    url: string;
}

interface DailyRecipe {
    id: number;
    part: string;
    recipe: Recipe;
}

interface DailyCoursesProps {
    workoutProgramId: number;
}

const DailyCourses: React.FC<DailyCoursesProps> = ({ workoutProgramId }) => {
    const [dailyExercise, setDailyExercise] = useState<VideoItem[]>([]);
    const [selectedDay, setSelectedDay] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);
    const [dailyRecipe, setDailyRecipe] = useState<DailyRecipe[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            if (workoutProgramId && selectedDay !== null) {
                const fetchedVideos = await fetchVideos(fetchDailyExerciseData(workoutProgramId, selectedDay));
                setDailyExercise(fetchedVideos);
            }
            setLoading(false);
        };

        fetchData();
    }, [workoutProgramId, selectedDay]);

    useEffect(() => {
        const fetchDailyRecipe = async () => {
            setLoading(true);

            if (workoutProgramId && selectedDay !== null) {
                const fetchedRecipe = await fetchDailyRecipeExerciseData(workoutProgramId, selectedDay);
                console.log("Fetched Daily Recipe:", fetchedRecipe);
                setDailyRecipe(fetchedRecipe);
            }
            setLoading(false);
        };

        fetchDailyRecipe();
    }, [workoutProgramId, selectedDay]);

    const handleDayClick = (day: number) => {
        setSelectedDay(day);
    };

    const groupByPart = (recipes: DailyRecipe[]) => {
        return recipes.reduce((groups, item) => {
            const group = groups[item.part] || [];
            group.push(item.recipe);
            groups[item.part] = group;
            return groups;
        }, {} as { [key: string]: Recipe[] });
    };

    const groupedRecipes = groupByPart(dailyRecipe);

    return (
        <div>
            <DailyCarousel
                day={selectedDay?.toString() || "Select a Day"}
                title="Test"
                onClick={handleDayClick}
            />
            {dailyExercise.length > 0 && (
                <div className="w-full py-[30px] px-[18px] bg-white border-[#c4c4c4] border-[1px] rounded-lg items-start my-4">
                    <Accordion type="single" collapsible>
                        <AccordionItem
                            value={`day-${selectedDay}`}
                            className="border-none"
                        >
                            <AccordionTrigger className="flex justify-between w-full text-center items-center">
                                <h4 className="text-[22px] font-semibold">
                                    Day {selectedDay} Workout
                                </h4>
                                <p className="text-[14px] text-[#868A93]">
                                    {dailyExercise.length} Workouts
                                </p>
                            </AccordionTrigger>
                            <AccordionContent>
                                {dailyExercise.map((video, index) => (
                                    <div key={index}>
                                        <VideoDaily
                                            title={video.title}
                                            bannerUrl={video.img}
                                            view={video.views}  
                                            releaseDate={video.date}
                                            duration={video.duration}
                                            url={video.url}
                                            category={video.category}
                                        />
                                    </div>
                                ))}
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            )}
            {Object.keys(groupedRecipes).length > 0 && (
                <div className="w-full py-[30px] px-[18px] bg-white border-[#c4c4c4] border-[1px] rounded-lg items-start my-4">
                    <Accordion type="single" collapsible>
                        {Object.keys(groupedRecipes).map((part) => (
                            <AccordionItem
                                value={`day-${selectedDay}-recipes-${part}`}
                                className="border-none"
                                key={part}
                            >
                                <AccordionTrigger className="flex justify-between w-full text-center items-center">
                                    <h4 className="text-[22px] font-semibold">
                                        {part.charAt(0).toUpperCase() + part.slice(1)} Recipes
                                    </h4>
                                    <p className="text-[14px] text-[#868A93]">
                                        {groupedRecipes[part].length} Recipes
                                    </p>
                                </AccordionTrigger>
                                <AccordionContent>
                                    <div className="grid grid-cols-3 gap-4">
                                        {groupedRecipes[part].map((recipe) => (
                                            <div
                                                key={recipe.id}
                                                className="relative bg-white border-solid border-[1px] border-[#E9E9EF] rounded-[15px] cursor-pointer h-[425px] mb-4"
                                            >
                                                <div className="relative h-full">
                                                    <Link href={`/recipes/${recipe.id}`}>
                                                        <img className="h-[87%] w-full rounded-[15px] object-cover"
                                                            alt={recipe.name}
                                                            src={recipe.img}
                                                        />
                                                    </Link>
                                                    <div className="flex flex-col absolute bottom-[calc(13%+12px)] left-3 flex-wrap-reverse">
                                                        <Button
                                                            className="my-1"
                                                            variant="secondary"
                                                            size="icon"
                                                        >
                                                            <Heart
                                                                className="text-[#000000] cursor-pointer"
                                                                strokeWidth={1}
                                                                width={24}
                                                                height={25}
                                                            />
                                                        </Button>
                                                    </div>
                                                    <Link href={`/recipes/${recipe.id}`}>
                                                        <p className="text-[18px] font-medium leading-[150%] pl-3 h-[13%] text-[#303033] flex items-center ">
                                                            {recipe.name}
                                                        </p>
                                                    </Link>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            )}
            <CommentCourse />
        </div>
    );
};

export default DailyCourses;
