"use client";
import { DailyExercise } from "@/components/shared/daily-carousel";
import { Button } from "@/components/ui/button";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";
import { CardProgram } from "./card-program";
import { DaySchedule } from "@/components/shared/day-schedule";
import { useEffect, useState } from "react";
import { getUncompletedChallenge } from "@/utils/user";
import { useFeedbackModel } from "@/stores/use-feedback";
import ReviewProgramModel from "@/components/modals/review-program-modal";
type Props = {
    initAllChallenge: any;
    currDay: DailyExercise;
    userCookie: string;
};
export const Challenge = ({ initAllChallenge, currDay, userCookie }: Props) => {
    const [challenge, setChallenge] = useState(null);
    useEffect(() => {
        const fetchChallenge = async () => {
            let unCompleteChallenge = await getUncompletedChallenge(userCookie);
            if (unCompleteChallenge?.status !== 200) {
                setChallenge(null);
            }
            setChallenge(unCompleteChallenge?.payload.workoutProgram);
        };
        fetchChallenge();
    });
    const {open, isOpen} = useFeedbackModel();
    return (
        <>
            {!challenge ? (
                <div>
                    <h2 className='text-3xl font-bold'>My Schedule</h2>
                    <div className='w-full p-[30px] bg-white border-[#c4c4c4] border-[1px] rounded-lg flex items-start mt-4'>
                        <div className='flex-1'>
                            <h4 className='text-[22px] font-semibold mb-2'>
                                You are not currently on a Challenge
                            </h4>
                            <p>
                                Browse and select a suitable program to begin
                                your <br />
                                fitness journey
                            </p>
                        </div>
                        <Image
                            src='/no-active-program.png'
                            alt='no active program'
                            width={145}
                            height={0}
                        />
                    </div>
                    <div className='w-full py-[30px] bg-white border-[#c4c4c4] border-[1px] rounded-lg items-start my-4'>
                        <Carousel
                            className='w-full mt-4'
                            opts={{
                                align: "start",
                                loop: true,
                            }}
                        >
                            <div className='flex px-[18px]'>
                                <h4 className='flex-1 text-[22px] font-semibold'>
                                    Latest Programs
                                </h4>
                                <div className='flex'>
                                    <Button variant='primaryOutline' asChild>
                                        <Link href='/program'>View All</Link>
                                    </Button>
                                </div>
                            </div>
                            <CarouselNext
                                className='top-[18px] right-[110px]'
                                variant='default'
                            />
                            <CarouselPrevious
                                className='top-[18px] left-[740px]'
                                variant='default'
                            />
                            <CarouselContent>
                                {initAllChallenge?.map((program: any) => (
                                    <CarouselItem
                                        key={program.title}
                                        className='ml-4 basis-1/4'
                                    >
                                        <div className='p-4'>
                                            <CardProgram
                                                days={program.day}
                                                title={program.name}
                                                releaseDate={
                                                    program.releaseDate
                                                }
                                                time={program.time}
                                                type={program.type}
                                                equipment={program.equipment}
                                                imgUrl={program.img}
                                            />
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                        </Carousel>
                    </div>
                </div>
            ) : (
                <DaySchedule
                    days={challenge.day}
                    title={challenge.name}
                    releaseDate={challenge.releaseDate}
                    time={challenge.time}
                    type={challenge.type}
                    equipment={challenge.equipment}
                    banner={challenge.banner}
                    challenge={challenge.id}
                    currDay={currDay}
                    setChallenge={setChallenge}
                />
            )}
            {isOpen && <ReviewProgramModel />}
        </>
    );
};
