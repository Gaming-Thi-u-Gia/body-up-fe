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
import { getAllWorkoutProgram, getUncompletedChallenge } from "@/utils/user";
const MySchedulePage = async () => {
    const userCookie = cookies().get("sessionToken");
    const challenge = await getUncompletedChallenge(userCookie?.value!);
    let allChallenge;
    if (!challenge) {
        allChallenge = await getAllWorkoutProgram(userCookie?.value!);
    }
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
                                {allChallenge?.payload?.map((program: any) => (
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
                    days={challenge?.payload?.workoutProgram.day}
                    title={challenge?.payload?.workoutProgram.name}
                    releaseDate={challenge?.payload?.workoutProgram.releaseDate}
                    time={challenge?.payload?.workoutProgram.time}
                    type={challenge?.payload?.workoutProgram.type}
                    equipment={challenge?.payload?.workoutProgram.equipment}
                    banner={challenge?.payload?.workoutProgram.banner}
                />
            )}
        </>
    );
};

export default MySchedulePage;
