'use client';

import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import CatelogyModelProgram from "./catelogy-model-program";
import ProgramCard from "./program-card";
import Link from "next/link";
import HeaderNavWorkoutPrograms from "./header-nav-workout-program";
import { Calendar, Clock4 } from "lucide-react";
import { fetchWorkoutProgramData } from "@/utils/video/workoutVideoCollection";
import { fetchAllTopic } from "@/utils/video/topic";
import SkeletonProgramCard from "./skeleton-program";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

interface WorkoutProgramCategory {
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
    img: string;
    topicName: string;
    topicDescription: string;
    releaseDate: string;
    workoutProgramCategories: WorkoutProgramCategory[];
}

const ProgramPage = () => {
    const [workoutPrograms, setWorkoutPrograms] = useState<WorkoutProgram[]>([]);
    const [topicIds, setTopicIds] = useState<number[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const getWorkoutProgram = async () => {
            const [workoutProgram, topics] = await Promise.all([fetchWorkoutProgramData(), fetchAllTopic()]);
            setWorkoutPrograms(workoutProgram);
            const ids = topics.map((topic: { id: number }) => topic.id);
            setTopicIds(ids);
            setLoading(false);
        };
        getWorkoutProgram();
    }, []);

    function formatDate(dateString: string) {
        const date = new Date(dateString);
        return date.toLocaleString('en-US', { month: 'long', year: 'numeric' }).toUpperCase();
    }

    const firstProgram = workoutPrograms[0];

    return (
        <div className="w-full px-[140px] pb-[47px]">
            <HeaderNavWorkoutPrograms />
            <div className="flex w-full gap-5 pb-5 pt-8">
                <div className="flex w-[60%] justify-between">
                    {loading ? (
                        <>
                            <Skeleton width={150} height={30} />
                            <Skeleton width={100} height={36} />
                        </>
                    ) : (
                        <>
                            <span className="text-[22px] font-semibold leading-7">Latest Challenges</span>
                            <div>
                                <Button variant="primaryOutline" size="default">
                                    <Link href="#">View All</Link>
                                </Button>
                            </div>
                        </>
                    )}
                </div>
                <div className="flex w-[40%] justify-between">
                    {loading ? (
                        <>
                            <Skeleton width={150} height={30} />
                            <Skeleton width={100} height={36} />
                        </>
                    ) : (
                        <>
                            <span className="text-[22px] font-semibold leading-7">Most Popular</span>
                            <div>
                                <Button variant="primaryOutline" size="default">
                                    <Link href="#">View All</Link>
                                </Button>
                            </div>
                        </>
                    )}
                </div>
            </div>
            <div className="grid grid-cols-5 gap-4 h-[430px]">
                {loading ? (
                    <>
                        <SkeletonProgramCard />
                        <SkeletonProgramCard />
                        <SkeletonProgramCard />
                        <SkeletonProgramCard />
                        <SkeletonProgramCard />
                        <SkeletonProgramCard />
                        <SkeletonProgramCard />
                        <SkeletonProgramCard />
                        <SkeletonProgramCard />
                        <SkeletonProgramCard />
                    </>
                ) : (
                    <>
                        {firstProgram && (
                            <Link className="flex w-full bg-white rounded-2xl px-[15px] py-[47px] gap-3 col-span-2" href={`/program/${firstProgram.id}`} key={firstProgram.id}>
                                <img
                                    src={firstProgram.img}
                                    alt={firstProgram.name}
                                    className="w-[52%] h-[100%] rounded-2xl"
                                />
                                <div className="flex flex-col gap-3 relative w-[48%]">
                                    <span className="text-[#868A93] font-medium text-[12px] leading-3">
                                        {firstProgram.releaseDate ? formatDate(firstProgram.releaseDate) : ""}
                                    </span>
                                    <span className="text-[#303033] font-medium text-[18px] leading-6">
                                        {firstProgram.name}
                                    </span>
                                    <div className="flex gap-1">
                                        <div className="flex gap-1 text-center items-center px-1 py-2 rounded-full bg-[#F7F7F7]">
                                            <Calendar width={16} height={16} />
                                            <span className="text-[12px]">{firstProgram.day} days</span>
                                        </div>
                                        <div className="flex gap-1 text-center items-center px-1 py-1 rounded-full bg-[#F7F7F7]">
                                            <Clock4 width={16} height={16} />
                                            <span className="text-[12px]">{firstProgram.time}</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col py-2 gap-1">
                                        <span className="text-[#868A93] font-normal text-[10px] leading-3">
                                            TYPE
                                        </span>
                                        <span className="text-[#303033] font-normal text-[14px] leading-5">
                                            {firstProgram.workoutProgramCategories.find(cat => cat.type === 'FOCUS AREA')?.name || 'No Type'}
                                        </span>
                                    </div>
                                    <div className="flex flex-col py-2 gap-1">
                                        <span className="text-[#868A93] font-normal text-[10px] leading-3">
                                            EQUIPMENT
                                        </span>
                                        <span className="text-[#303033] font-normal text-[14px] leading-5">
                                            {firstProgram.workoutProgramCategories.find(cat => cat.type === 'EQUIPMENT')?.name || 'No Equipment'}
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
                            </Link>
                        )}
                        {workoutPrograms.slice(1, 4).map((program) => (
                            <Link href={`/program/${program.id}`} key={program.id}>
                                <ProgramCard
                                    id={program.id}
                                    key={program.id}
                                    name={program.name}
                                    type={program.workoutProgramCategories.find(cat => cat.type === 'FOCUS AREA')?.name || 'No Type'}
                                    equipment={program.workoutProgramCategories.find(cat => cat.type === 'EQUIPMENT')?.name || 'No Equipment'}
                                    detail={program.detail}
                                    day={program.day}
                                    time={program.time}
                                    year={program.year}
                                    img={program.img}
                                    releaseDate={program.releaseDate ? formatDate(program.releaseDate) : ""}
                                />
                            </Link>
                        ))}
                    </>
                )}
            </div>
            {!loading && <CatelogyModelProgram />}
        </div>
    );
};

export default ProgramPage;
