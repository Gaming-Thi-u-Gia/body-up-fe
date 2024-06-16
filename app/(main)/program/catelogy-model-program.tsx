import React, { useEffect, useState } from "react";
import ProgramCard from "./program-card"; // Đảm bảo đường dẫn đúng
import ProgramTitle from "./program-title"; // Đảm bảo đường dẫn đúng
import { fetchWorkoutProgramDataByTopic, fetchWorkoutProgramWithTopicData } from "@/utils/video/workoutVideoCollection";
import Link from "next/link";

type TopicType = [
    {
        id: number;
        name: string;
        description: string;
        workoutPrograms: [
            {
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
            }
        ]
    }
]

const CatelogyModelProgram = () => {
    const [workoutProgramsTopic, setWorkoutProgramsTopic] = useState<TopicType[]>([]);

    useEffect(() => {
        const getWorkoutProgram = async () => {
            const data = await fetchWorkoutProgramWithTopicData();
            if (data && data.length > 0) {
                console.log("Data loaded:", data); 
                setWorkoutProgramsTopic(data);
            }
        };
        getWorkoutProgram();
    }, []); 

    return (
        <div>
            {workoutProgramsTopic.map((programTopic, index) => (
                <div key={index}>
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
                                    type={program.type}
                                    equipment={program.equipment}
                                    detail={program.detail}
                                    day={program.day}
                                    time={program.time}
                                    year={program.year}
                                    img={program.img}
                                    releaseDate={program.releaseDate}
                                />
                            </Link>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CatelogyModelProgram;

