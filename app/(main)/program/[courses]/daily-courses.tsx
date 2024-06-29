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
    category: VideoCategories[];
}

interface VideoCategories {
    id: number;
    name: string;
    type: string;
}

interface DailyExerciseData {
    id: number;
    day: string;
    dailyVideos: VideoItem[];
}

interface DailyCoursesProps {
    workoutProgramId: number;
}

const DailyCourses: React.FC<DailyCoursesProps> = ({ workoutProgramId }) => {
    const [dailyExercise, setDailyExercise] = useState<DailyExerciseData | null>(null);
    const [selectedDay, setSelectedDay] = useState<number | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            if (workoutProgramId && selectedDay !== null) {
                try {
                    const dailyData = await fetchDailyExerciseData(workoutProgramId, selectedDay);
                    console.log("Fetched daily data:", dailyData);
                    const fetchedVideos = await fetchVideos();
                    console.log("Fetched videos:", fetchedVideos);

                    if (dailyData) {
                        const dailyVideos = dailyData.map(dv => {
                            const videoDetails = fetchedVideos.find(video => video.id === dv.video.url);
                            if (videoDetails) {
                                console.log("Mapped video details:", videoDetails);
                            } else {
                                console.warn("Video details not found for video id:", dv.video.url);
                            }
                            return {
                                ...dv.video,
                                ...videoDetails,
                                category: dv.video.videoCategories ? dv.video.videoCategories.map(vc => vc.type).join(", ") : ""
                            };
                        });

                        setDailyExercise({ ...dailyData, dailyVideos });
                    } else {
                        setDailyExercise({ id: -1, day: selectedDay.toString(), dailyVideos: [] });
                    }
                } catch (error) {
                    console.error("Error fetching data:", error);
                    setDailyExercise({ id: -1, day: selectedDay.toString(), dailyVideos: [] });
                }
            } else {
                setDailyExercise({ id: -1, day: (selectedDay ?? 1).toString(), dailyVideos: [] });
            }
            setLoading(false);
        };

        fetchData();
    }, [workoutProgramId, selectedDay]);

    const handleDayClick = (day: number) => {
        setSelectedDay(day);
    };

    console.log("Selected day:", selectedDay);

    return (
        <div>
            <DailyCarousel
                day={selectedDay?.toString() || "Select a Day"}
                title="Test"
                onClick={handleDayClick}
            />
            {loading ? (
                <DailyExerciseSkeleton />
            ) : (
                dailyExercise && (
                    <div className="w-full py-[30px] px-[18px] bg-white border-[#c4c4c4] border-[1px] rounded-lg items-start my-4">
                        <Accordion type="single" collapsible>
                            <AccordionItem value={`day-${dailyExercise.day}`} className="border-none">
                                <AccordionTrigger className="flex justify-between w-full text-center items-center">
                                    <h4 className="text-[22px] font-semibold">Day {dailyExercise.day} Workout</h4>
                                    <p className="text-[14px] text-[#868A93]">
                                        {dailyExercise.dailyVideos.length} Workouts
                                    </p>
                                </AccordionTrigger>
                                <AccordionContent>
                                    {dailyExercise.dailyVideos.map((video, index) => (
                                        <VideoDaily
                                            key={index}
                                            videoId={video.id}
                                            title={video.title}
                                            bannerUrl={video.img}
                                            duration={video.duration}
                                            releaseDate={video.date}
                                            view={video.views}
                                            isOptional={video.bookmarked}
                                            url={video.url}
                                            initialStatus={video.status}
                                            category={video.category}
                                        />
                                    ))}
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                )
            )}
        </div>
    );
};

export default DailyCourses;
