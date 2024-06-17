import React, { useEffect, useState } from "react";
import ProgramCard from "./program-card";
import ProgramTitle from "./program-title";
import { fetchWorkoutProgramWithTopicData } from "@/utils/video/workoutVideoCollection";
import Link from "next/link";

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


type TopicType = {
    id: number;
    name: string;
    description: string;
    workoutPrograms: WorkoutProgram[];
};

const CategoryModelProgram = () => {
    const [workoutProgramsTopic, setWorkoutProgramsTopic] = useState<TopicType[]>([]);

    useEffect(() => {
        const getWorkoutProgram = async () => {
            try {
                const data = await fetchWorkoutProgramWithTopicData();
                if (data && data.length > 0) {
                    console.log("Data loaded:", data);
                    setWorkoutProgramsTopic(data);
                }
            } catch (error) {
                console.error("Failed to fetch data:", error);
            }
        };

        getWorkoutProgram();
    }, []);

    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleString('en-US', { month: 'long', year: 'numeric' }).toUpperCase();
    }    

    return (
        <div>
            {workoutProgramsTopic.map((programTopic) => (
                <div key={programTopic.id}>
                    <ProgramTitle
                        name={programTopic.name}
                        description={programTopic.description}
                    />
                    <div className="grid grid-cols-5 gap-4 h-[430px]">
                        {programTopic.workoutPrograms.map((program) => (
                            <Link href={`/program/${program.id}`} key={program.id}>
                                <ProgramCard
                                    id={program.id}
                                    name={program.name}
                                    type={program.workoutProgramCategories.filter(cat => cat.type === 'FOCUS AREA').map(cat => cat.name).join(',')}
                                    equipment={program.workoutProgramCategories.filter(cat => cat.type === 'EQUIPMENT').map(cat => cat.name).join(',')}
                                    detail={program.detail}
                                    day={program.day}
                                    time={program.time}
                                    year={program.year}
                                    img={program.img}
                                    releaseDate={program.releaseDate ? formatDate(program.releaseDate) : ""}
                                />
                            </Link>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CategoryModelProgram;
