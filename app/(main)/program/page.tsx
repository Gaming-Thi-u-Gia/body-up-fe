"use client";

import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import CatelogyModelProgram from "./catelogy-model-program";
import ProgramCard from "./program-card";
import Link from "next/link";
import HeaderNavWorkoutPrograms from "./header-nav-workout-program";
import { Calendar, CalendarCheck, Clock4, Ellipsis } from "lucide-react";
import { fetchWorkoutProgramData } from "@/utils/video/workoutVideoCollection";

interface WorkoutProgram {
    id: number;
    name: string;
    type: string;
    equipment: string;
    detail: string;
    day: string;
    time: string;
    year: string;
}

const ProgramPage = () => {

    const [workoutPrograms, setWorkoutPrograms] = useState<WorkoutProgram[]>([]);

    useEffect(() => {
        const getWorkoutProgram = async () => {
            const workoutProgram = await fetchWorkoutProgramData();
            setWorkoutPrograms(workoutProgram);
        };
        getWorkoutProgram();
    }, []);

    return (
        <div className="w-full px-[140px] pb-[47px]">
            <HeaderNavWorkoutPrograms/>
            <div className="flex w-full gap-5 pb-5 pt-8">
                <div className="flex w-[60%] justify-between">
                    <span className="text-[22px] font-semibold leading-7">Latest Challenges</span>
                    <div>
                        <Button variant="primaryOutline" size="default">
                            <Link href="#">View All</Link>
                        </Button>
                    </div>
                </div>
                <div className="flex w-[40%] justify-between">
                    <span className="text-[22px] font-semibold leading-7">Most Popular</span>
                    <div>
                        <Button variant="primaryOutline" size="default">
                            <Link href="#">View All</Link>
                        </Button>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-5 gap-4 h-[430px]">
                <div className="flex w-full bg-white rounded-2xl px-[15px] py-[47px] gap-3 col-span-2 ">
                    <img
                        src="https://chloeting.com/_next/image?url=https%3A%2F%2Fstatic.chloeting.com%2Fprograms%2F661d703c4fa2abb50050cc5c%2Fbanner%2F06267680-fb55-11ee-ae75-d516ffaa27e7.jpeg&w=1920&q=90"
                        alt=""
                        className="w-[52%] h-[100%] rounded-2xl"
                    />
                    <div className="flex flex-col gap-3 relative">
                        <span className="text-[#868A93] font-medium text-[12px] leading-3">
                            MAY 2024
                        </span>
                        <span className="text-[#303033] font-medium text-[18px] leading-6">
                            2024 Summer Shred Challenge
                        </span>
                        <div className="flex gap-1">
                            <div className="flex gap-1 text-center items-center px-1 py-2 rounded-full bg-[#F7F7F7]">
                                <Calendar width={16} height={16} />
                                <span className="text-[12px]">26 days</span>
                            </div>
                            <div className="flex gap-1 text-center items-center px-1 py-1 rounded-full bg-[#F7F7F7]">
                                <Clock4 width={16} height={16} />
                                <span className="text-[12px]">
                                    40-60 min/day
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-col py-2 gap-1">
                            <span className="text-[#868A93] font-normal text-[10px] leading-3">
                                TYPE
                            </span>
                            <span className="text-[#303033] font-normal text-[14px] leading-5">
                                Weight Loss, Full Body, Abs & Core
                            </span>
                        </div>
                        <div className="flex flex-col py-2 gap-1">
                            <span className="text-[#868A93] font-normal text-[10px] leading-3">
                                EQUIPMENT
                            </span>
                            <span className="text-[#303033] font-normal text-[14px] leading-5">
                                Fitness Mat
                            </span>
                        </div>
                        <Button
                            className="absolute bottom-0 text-[#303033] font-normal leading-5"
                            variant="primaryOutline"
                            size="sm"
                        >
                            View Challenge
                        </Button>
                    </div>
                </div>
                {workoutPrograms.slice(0, 3).map((program) => (
                    <Link href={`/program/${program.id}`} key={program.id}>
                        <ProgramCard
                            name={program.name}
                            type={program.type}
                            equipment={program.equipment}
                            detail={program.detail}
                            day={program.day}
                            time={program.time}
                            year={program.year}
                        />
                    </Link>
                ))}
            </div>
            <CatelogyModelProgram />
        </div>
    );
};
export default ProgramPage;
