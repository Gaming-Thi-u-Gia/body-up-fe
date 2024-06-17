"use client";

import thunderbolt_icon from "/public/thunderbolt.svg";
import box_icon from "/public/box_icon.svg";
import { Button } from "@/components/ui/button";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Calendar, CalendarCheck, Clock4, Ellipsis } from "lucide-react";
import { VideoDailyCard } from "@/components/shared/video-daily-card";
import { DailyCarousel } from "@/components/shared/daily-carousel";
import { fetchWorkoutProgramDataById } from "@/utils/video/workoutVideoCollection";
import { usePathname } from "next/navigation";

const dailyVideoData = {
    title: "Full Body Warm Up",
    target: "Warm Up",
    view: "1.2M",
    releaseDate: "2021-06-01",
    duration: "05:00",
    bannerUrl:
        "https://s3-alpha-sig.figma.com/img/2b8e/37ca/aa986d36e5fc3e804ad5e502069efb47?Expires=1717977600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=n8pFiICMRBK9zzFtA4ig6y6R0GBdJSHGddCiKEZrUmTDJTghDuuYREdmMv-qQFI85VJiLylMntbgKWmQoegbK9fVqd0eSUZ4H7WyGC9EGcdoRFVnCZshloQpiA~GRmk8D-YBI~fyThe83yH~75F2Eht7EA4g3CG-i1oxGTym3O7zuWw7-Hrn-~FB5DrVfAHFUAqcXi5yK8PvyeujumahKnoi0HRjJsPd1EmhSkXz5V3JBOApCkGrdQ3G5UFAd7JFJwZTKfHKyPt6xIFuZUiprGuxagMKqkgceja7ErYVuhak7xuJCMOh3FVSsNMHt6LM9XrUp9VtsGqK22JTye4CXw__",
    isOptional: true,
    status: "incomplete",
    url: "https://www.youtube.com/watch?v=j5SHMJ6mUoA",
};

interface Category {
    id: number;
    name: string;
    type: string;
}

interface WorkoutProgram {
    id: number;
    name: string;
    type: string;
    equipment: string;
    detail: string;
    day: string;
    time: string;
    year: string;
    banner: string;
    releaseDate: string;
    workoutProgramCategories: Category[]; 
}

const Page = () => {
    const [showDetails, setShowDetails] = useState(false);

    const [data, setData] = useState("");
    const validatedStatus =
        dailyVideoData.status === "complete" ||
        dailyVideoData.status === "incomplete"
            ? dailyVideoData.status
            : "incomplete";

    const onClick = (index: number) => {
        const day = "Day" + index;
        setData(day);
    };

    const [showDiv, setShowDiv] = useState(false);

    const [start, setStart] = useState(0);
    const perPage = 8;

    const toggleDetails = () => {
        setShowDetails(!showDetails);
    };

    const pathName = usePathname(); 

    const [workoutProgramById, setWorkoutProgramById] = useState<WorkoutProgram>([]);

    useEffect(() => {
        const getWorkoutProgramById = async () => {
            const pathParts = pathName.split("/");
            const secondValue = pathParts[2];
            const workoutProgram = await fetchWorkoutProgramDataById(Number(secondValue));
            setWorkoutProgramById(workoutProgram);
        };
        getWorkoutProgramById();
    }, []);

    const getTypes = (categories: Category[] | undefined): string => {
        if (!categories) return '';
        return categories.filter(cat => cat.type === 'FOCUS AREA').map(cat => cat.name).join(', ');
    };
    
    const getEquipment = (categories: Category[] | undefined): string => {
        if (!categories) return '';
        return categories.filter(cat => cat.type === 'EQUIPMENT').map(cat => cat.name).join(', ');
    };

    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleString('en-US', { month: 'long', year: 'numeric' }).toUpperCase();
    }    

    return (
        <div className="max-w-7xl flex items-center justify-center mx-auto my-8">
            <div className="w-full flex">
                <div className="flex-row w-[25%]">
                    <div className="flex-row bg-transparent border-r border-gray-200/50 bg-white rounded-2xl pb-[1px]">
                        <div className="relative">
                            <img
                                src={workoutProgramById.banner}
                                alt=""
                                className="w-full h-auto rounded-2xl"
                            />
                            <div className="absolute bottom-2 left-2 flex gap-2">
                                <div className="flex gap-1 text-center items-center px-2 py-1 rounded-full bg-[#F7F7F7]">
                                    <Calendar width={16} height={16} />
                                    <span className="text-[12px]">{workoutProgramById.day}</span>
                                </div>
                                <div className="flex gap-1 text-center items-center px-2 py-1 rounded-full bg-[#F7F7F7]">
                                    <Clock4 width={16} height={16} />
                                    <span className="text-[12px]">
                                        {workoutProgramById.time}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="flex-row my-4 mx-5">
                            <span className="text-xs font-bold tracking-wider text-[#868A93]">
                                {workoutProgramById.releaseDate ? formatDate(workoutProgramById.releaseDate) : 'N/A'}
                            </span>
                            <div className="flex gap-1 my-2">
                                <Image
                                    src={thunderbolt_icon}
                                    width={16}
                                    height={16}
                                    alt="conflict"
                                />
                                <span className="text-[14px]">
                                    {getTypes(workoutProgramById.workoutProgramCategories)}
                                </span>
                            </div>
                            <div className="flex gap-2 my-2">
                                <div>
                                    <Image
                                        src={box_icon}
                                        width={16}
                                        height={16}
                                        alt="conflict"
                                    />
                                </div>
                                <p className="text-[14px]">
                                    {getEquipment(workoutProgramById.workoutProgramCategories)}
                                </p>
                            </div>

                            <div className="border-t border-gray-300 my-5">
                                <div className="my-4">
                                    <span className="text-xs font-bold tracking-wider text-[#868A93]">
                                        DETAILS
                                    </span>
                                    <p
                                        className={`text-[14px] ${
                                            showDetails ? "" : "line-clamp-2"
                                        }`}
                                    >
                                        {workoutProgramById.detail}
                                    </p>
                                    {!showDetails && (
                                        <div
                                            className="font-bold text-[14px] text-black cursor-pointer"
                                            onClick={toggleDetails}
                                        >
                                            Read More
                                        </div>
                                    )}
                                    {showDetails && (
                                        <div
                                            className="font-bold text-[14px] text-black cursor-pointer"
                                            onClick={toggleDetails}
                                        >
                                            View Less
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="py-4">
                        <div className="bg-[url('/upgrade-account-badge.png')] bg-cover bg-center bg-no-repeat h-[200px] w-full rounded-2xl items-center justify-center py-5 px-5">
                            <span className="text-lg font-bold py-4">
                                Start This Challenge
                            </span>
                            <p className="text-[14px] font-normal pt-2">
                                When you start a challenge your schedule is
                                adapted to your calendar, and you can access
                                more features such as teams
                            </p>
                            <Button
                                className="mt-2 py-2 ml-0"
                                variant="active"
                                size="default"
                            >
                                Start Challenge
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="w-[75%] ml-10">
                    <div className="flex justify-between pb-4">
                        <span className="text-3xl font-bold mb-4 text-center">
                            {workoutProgramById.name}
                        </span>
                        <div className="flex gap-6 items-center">
                            <div className="flex items-center justify-center w-10 h-10 bg-[#d6d1fe] rounded-full">
                                <CalendarCheck />
                            </div>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="25"
                                height="25"
                                viewBox="0 0 25 25"
                                fill="none"
                            >
                                <path
                                    d="M7.00342 7.13281C7.00342 6.71094 6.85889 6.35547 6.56982 6.06641C6.28076 5.77734 5.92529 5.63281 5.50342 5.63281C5.08154 5.63281 4.72217 5.77734 4.42529 6.06641C4.12842 6.35547 3.97998 6.71094 3.97998 7.13281C3.97998 7.55469 4.12842 7.91406 4.42529 8.21094C4.72217 8.50781 5.08154 8.65625 5.50342 8.65625C5.92529 8.65625 6.28076 8.50781 6.56982 8.21094C6.85889 7.91406 7.00342 7.55469 7.00342 7.13281ZM8.76123 8.375H21.98V5.9375H8.76123V8.375ZM7.00342 12.5C7.00342 12.0781 6.85889 11.7188 6.56982 11.4219C6.28076 11.125 5.92529 10.9766 5.50342 10.9766C5.08154 10.9766 4.72217 11.125 4.42529 11.4219C4.12842 11.7188 3.97998 12.0781 3.97998 12.5C3.97998 12.9219 4.12842 13.2773 4.42529 13.5664C4.72217 13.8555 5.08154 14 5.50342 14C5.92529 14 6.28076 13.8555 6.56982 13.5664C6.85889 13.2773 7.00342 12.9219 7.00342 12.5ZM8.76123 13.7188H21.98V11.2812H8.76123V13.7188ZM7.00342 17.8438C7.00342 17.4219 6.85889 17.0664 6.56982 16.7773C6.28076 16.4883 5.92529 16.3438 5.50342 16.3438C5.08154 16.3438 4.72217 16.4883 4.42529 16.7773C4.12842 17.0664 3.97998 17.4219 3.97998 17.8438C3.97998 18.2656 4.12842 18.625 4.42529 18.9219C4.72217 19.2188 5.08154 19.3672 5.50342 19.3672C5.92529 19.3672 6.28076 19.2188 6.56982 18.9219C6.85889 18.625 7.00342 18.2656 7.00342 17.8438ZM8.76123 19.0391H21.98V16.625H8.76123V19.0391Z"
                                    fill="#303033"
                                />
                            </svg>

                            <div className="relative">
                                <Ellipsis />
                                {showDiv && (
                                    <button className="absolute text-center top-8 right-0 bg-white border border-gray-200 p-2 z-10 text-[14px] inline-block w-40 animate-accordion-down">
                                        Start this challenge
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                    
                    <div className="py-[10px] px-[18px] bg-white border-[#c4c4c4] border-[1px] rounded-full items-start">
                        <DailyCarousel day='Mon 23' title='Test' onClick={onClick} />
                    </div>
                    <div className="w-full py-[30px] px-[18px] bg-white border-[#c4c4c4] border-[1px] rounded-lg items-start my-4">
                        <Accordion type="single" collapsible>
                            <AccordionItem
                                value="item-1"
                                className="border-none "
                            >
                                <AccordionTrigger className="flex justify-between py-0">
                                    <h4 className="flex-1 text-[22px] font-semibold text-left">
                                        Today&apos;s Workout
                                    </h4>
                                    <p className="text-[14px] text-[#868A93]">
                                        4 Workouts | 46 Mins (Excludes Optional
                                        Videos)
                                    </p>
                                </AccordionTrigger>
                                <AccordionContent>
                                    {Array.from({ length: 5 }).map(
                                        (_, index) => (
                                            <VideoDailyCard
                                                key={index}
                                                title={
                                                    dailyVideoData.title +
                                                    " " +
                                                    data
                                                }
                                                bannerUrl={
                                                    dailyVideoData.bannerUrl
                                                }
                                                duration={
                                                    dailyVideoData.duration
                                                }
                                                releaseDate={
                                                    dailyVideoData.releaseDate
                                                }
                                                target={dailyVideoData.target}
                                                view={dailyVideoData.view}
                                                isOptional={
                                                    dailyVideoData.isOptional
                                                }
                                                url={dailyVideoData.url}
                                                initialStatus={validatedStatus}
                                            />
                                        )
                                    )}
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
