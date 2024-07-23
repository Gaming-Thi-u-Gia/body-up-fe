import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { use } from "react";

type  WorkoutProgramByTopic = {
    id: number;
    name: string;
    description: string;
}

const ProgramTitle = ({id, name, description} : WorkoutProgramByTopic) => {

    console.log("ProgramTitle", id, name, description);

    return (
        <div className="flex w-full justify-between py-7 items-center">
            <div>
                <span className="leading-loose font-semibold text-2xl text-black">
                    {name}
                </span>
                <p className="max-w-[1000px] text-sm">{description}</p>
            </div>
            <div>
                <Button variant="primaryOutline" size="lg">
                    <Link href={`/program/c/${id}`}>View All</Link>
                </Button>
            </div>
        </div>
    );
};

export default ProgramTitle;
