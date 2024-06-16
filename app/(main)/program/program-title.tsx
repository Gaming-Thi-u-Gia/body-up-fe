import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

type  WorkoutProgramByTopic = {
    name: string;
    description: string;
}

const ProgramTitle = ({ name, description} : WorkoutProgramByTopic) => {
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
                    <Link href="#">View All</Link>
                </Button>
            </div>
        </div>
    );
};

export default ProgramTitle;
