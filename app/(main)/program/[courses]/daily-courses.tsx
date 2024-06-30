'use client';

import React, { useEffect, useState } from "react";
import { fetchDailyExerciseData } from "@/utils/video/workoutVideoCollection";
import { DailyCarousel } from "@/components/shared/daily-carousel";
import { VideoDaily } from "./daily-video";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@radix-ui/react-accordion";
import fetchVideos from "@/utils/video";
import DailyExerciseSkeleton from "./skeleton-video";

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


interface DailyCoursesProps {
    workoutProgramId: number;
}

const DailyCourses: React.FC<DailyCoursesProps> = ({ workoutProgramId }) => {
    const [dailyExercise, setDailyExercise] = useState<VideoItem[]>([]);
    const [selectedDay, setSelectedDay] = useState<number | 1>(1);
    const [loading, setLoading] = useState<boolean>(false);

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

    const handleDayClick = (day: number) => {
        setSelectedDay(day);
    };

    return (
        <div>
            <DailyCarousel
                day={selectedDay?.toString() || "Select a Day"}
                title="Test"
                onClick={handleDayClick}
            />
            {
                dailyExercise && (
                    <div className="w-full py-[30px] px-[18px] bg-white border-[#c4c4c4] border-[1px] rounded-lg items-start my-4">
                        <Accordion type="single" collapsible>
                            <AccordionItem value={`day-${dailyExercise.day}`} className="border-none">
                                <AccordionTrigger className="flex justify-between w-full text-center items-center">
                                    <h4 className="text-[22px] font-semibold">Day {selectedDay} Workout</h4>
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
                                                category={video.categories}
                                            />
                                        </div>
                                    ))}
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                )
            }
        </div>
    );
};

export default DailyCourses;
