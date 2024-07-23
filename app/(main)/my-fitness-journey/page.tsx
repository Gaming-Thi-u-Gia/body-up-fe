import Image from "next/image";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { CardProgram } from "./card-program";
import Link from "next/link";
import { DaySchedule } from "@/components/shared/day-schedule";
import { cookies } from "next/headers";
import {
    getAllWorkoutProgram,
    getFirstUncompleted,
    getUncompletedChallenge,
} from "@/utils/user";
import { DailyExercise } from "@/components/shared/daily-carousel";
import { Challenge } from "./challenge";
const MySchedulePage = async () => {
    const userCookie = cookies().get("sessionToken");
    const currDay: DailyExercise = await getFirstUncompleted(
        userCookie?.value!
    );
    let allChallenge = await getAllWorkoutProgram(userCookie?.value!);

    return (
        <>
            <Challenge
                initAllChallenge={allChallenge?.payload}
                currDay={currDay}
                userCookie={userCookie?.value!}
            />
        </>
    );
};

export default MySchedulePage;
