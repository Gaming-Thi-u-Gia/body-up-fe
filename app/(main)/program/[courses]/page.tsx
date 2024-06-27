"use client";

import thunderbolt_icon from "/public/thunderbolt.svg";
import box_icon from "/public/box_icon.svg";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { AlignJustify, Calendar, CalendarCheck, Clock4, Ellipsis } from "lucide-react";
import { fetchWorkoutProgramDataById } from "@/utils/video/workoutVideoCollection";
import { usePathname } from "next/navigation";
import DailyCourses from "./daily-courses";

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

    const [showDiv, setShowDiv] = useState(false);

    const toggleDetails = () => {
        setShowDetails(!showDetails);
    };

    const pathName = usePathname(); 
    const workoutProgramId = pathName.split('/')[2];

    const [workoutProgramById, setWorkoutProgramById] = useState<WorkoutProgram>([]);

    useEffect(() => {
        const getWorkoutProgramById = async () => {
            const workoutProgram = await fetchWorkoutProgramDataById(Number(workoutProgramId));
            setWorkoutProgramById(workoutProgram);
        };
        getWorkoutProgramById();
    }, [pathName]);

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
                            <AlignJustify />

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
                    
                    <DailyCourses workoutProgramId={Number(workoutProgramId)}/>
                </div>
            </div>
        </div>
    );
};

export default Page;
