import { Button } from "@/components/ui/button";
import React from "react";

const CategoryWorkoutVideos = () => {
    return (
        <div className="flex justify-between py-2">
            <div>
                <h2 className="text-[#303033] text-xl font-semibold">
                    Most Popular
                </h2>
                <p className="text-sm font-normal">These are some of the most popular workout videos. Give them a try and see why people love these routines.</p>
            </div>
            <Button variant="primaryOutline" size="default">
                View All
            </Button>
        </div>
    );
};

export default CategoryWorkoutVideos;
