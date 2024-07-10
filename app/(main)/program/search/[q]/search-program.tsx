'use client';

import React, { useEffect, useState } from "react";
import { fetchSearchProgramData } from "@/utils/video/workoutVideoCollection";
import Link from "next/link";
import ProgramCard from "../../program-card";
import SkeletonProgramCard from "../../skeleton-program";

type WorkoutProgramCategory = {
    id: number;
    name: string;
    type: string;
};

type WorkoutProgram = {
    id: number;
    name: string;
    type: string;
    equipment: string;
    detail: string;
    day: string;
    time: string;
    year: string;
    img: string;
    releaseDate: string;
    workoutProgramCategories: WorkoutProgramCategory[];
};

interface SearchProgramProps {
    query: string;
}

const SearchProgram = ({ query }: SearchProgramProps) => {
    const [workoutPrograms, setWorkoutPrograms] = useState<WorkoutProgram[]>([]);
    const [loading, setLoading] = useState(true);
    const [totalSearchResult, setTotalSearchResult] = useState(0);

    useEffect(() => {
        const getWorkoutProgram = async () => {
            try {
                const data = await fetchSearchProgramData(query);
                setWorkoutPrograms(data);
                setTotalSearchResult(data.length);
            } catch (error) {
                console.error("Failed to fetch data:", error);
            } finally {
                setLoading(false);
            }
        };
        if (query) {
            setLoading(true);
            getWorkoutProgram();
        }
    }, [query]);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date
            .toLocaleString("en-US", { month: "long", year: "numeric" })
            .toUpperCase();
    };

    const clearSearch = () => {
        setWorkoutPrograms([]);
        setTotalSearchResult(0);
        
    };

    return (
        <div className="space-y-4">
            <div className="flex-1  bg-white py-2 my-3 flex justify-between items-center px-5 rounded-2xl">
                <div>
                    Showing <b>{totalSearchResult}</b> matching <b>Search Criteria</b>
                </div>
                <div>
                    <Link href="http://localhost:3000/program" className="text-red-500 cursor-pointer" onClick={clearSearch}>Clear</Link>
                </div>
            </div>
            <div className=" py-2 my-3 flex justify-between items-center px-5 rounded-2xl">
                {loading ? (
                    <div className="w-full grid grid-cols-5 gap-4">
                        <SkeletonProgramCard />
                        <SkeletonProgramCard />
                        <SkeletonProgramCard />
                        <SkeletonProgramCard />
                        <SkeletonProgramCard />
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-5 gap-4">
                            {workoutPrograms.map((program) => (
                                <Link href={`/program/${program.id}`} key={program.id}>
                                    <ProgramCard
                                        id={program.id}
                                        key={program.id}
                                        name={program.name}
                                        type={program.workoutProgramCategories
                                            .filter((cat) => cat.type === "FOCUS AREA")
                                            .map((cat) => cat.name)
                                            .join(", ")}
                                        equipment={program.workoutProgramCategories
                                            .filter((cat) => cat.type === "EQUIPMENT")
                                            .map((cat) => cat.name)
                                            .join(", ")}
                                        detail={program.detail}
                                        day={program.day}
                                        time={program.time}
                                        year={program.year}
                                        img={program.img}
                                        releaseDate={
                                            program.releaseDate
                                                ? formatDate(program.releaseDate)
                                                : ""
                                        }
                                    />
                                </Link>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default SearchProgram;
