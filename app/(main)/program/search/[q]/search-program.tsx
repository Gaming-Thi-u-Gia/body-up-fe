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

    useEffect(() => {
        const getWorkoutProgram = async () => {
            try {
                const data = await fetchSearchProgramData(query);
                setWorkoutPrograms(data);
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

    return (
        <div className="grid grid-cols-5 gap-4 h-[430px]">
            {loading ? (
                <>
                    <SkeletonProgramCard />
                    <SkeletonProgramCard />
                    <SkeletonProgramCard />
                    <SkeletonProgramCard />
                    <SkeletonProgramCard />
                </>
            ) : (
                workoutPrograms.map((program) => (
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
                ))
            )}
        </div>
    );
};

export default SearchProgram;
