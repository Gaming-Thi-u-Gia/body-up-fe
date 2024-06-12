"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ProgramCard from "./program-card";
import ProgramTitle from "./program-title";
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

const CatelogyModelProgram = () => {
    const [workoutPrograms, setWorkoutPrograms] = useState<WorkoutProgram[]>([]);

    useEffect(() => {
        const getWorkoutProgram = async () => {
            const workoutProgram = await fetchWorkoutProgramData();
            setWorkoutPrograms(workoutProgram);
        };
        getWorkoutProgram();
    }, []);

    return (
        <div>
            <ProgramTitle />
            <div className="grid grid-cols-5 gap-4 h-[430px]">
                {workoutPrograms.map((program) => (
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
        </div>
    );
};

export default CatelogyModelProgram;
