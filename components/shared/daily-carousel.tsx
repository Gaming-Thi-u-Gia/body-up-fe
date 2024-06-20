import { useEffect } from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "../ui/carousel";
import { CheckCircle, CheckCircle2, Circle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";
export interface DailyExercise {
    id: number;
    status: string;
    dailyExercise: {
        day: string;
        id: number;
    };
}
type Props = {
    day: string;
    title: string;
    onClick: (index: number) => void;
    allDay: DailyExercise[];
    currDay: DailyExercise;
    isLoading: boolean;
};
export const DailyCarousel = ({
    day,
    title,
    onClick,
    allDay,
    currDay,
    isLoading,
}: Props) => {
    if (isLoading) {
        return (
            <div className='w-[88%] mx-auto mb-5 flex gap-4'>
                {Array.from({ length: 7 }).map((_, index) => (
                    <DailyCarouselSkeleton key={index} />
                ))}
            </div>
        );
    }
    return (
        <>
            <Carousel
                opts={{
                    align: "start",
                    startIndex: +currDay.dailyExercise.day - 1,
                }}
                className='w-[88%] mx-auto mb-5'
            >
                <CarouselContent>
                    {allDay?.map((item: any, index: number) => (
                        <CarouselItem
                            key={index}
                            className='basis-1/7 cursor-pointer'
                            onClick={() => onClick(item.dailyExercise.day)}
                        >
                            <div
                                className={cn(
                                    "w-[100px] h-[61px] bg-[#FAFAFA] rounded-[12px] flex flex-col justify-between p-[7px] pr-[10px]",
                                    item.dailyExercise.day ===
                                        currDay.dailyExercise.day &&
                                        "border-[#7065CD] border-2",
                                    item.status === "complete" &&
                                        "bg-[#f1f0ff]",
                                    item.dailyExercise.day === day &&
                                        item.dailyExercise.day !==
                                            currDay.dailyExercise.day &&
                                        "border-black border-2"
                                )}
                            >
                                <div className='flex justify-between items-center'>
                                    <p
                                        className={cn(
                                            "text-xs text-[#868A93]",
                                            item.dailyExercise.day ===
                                                currDay.dailyExercise.day &&
                                                "text-[#7065CD]"
                                        )}
                                    >
                                        Day {item.dailyExercise.day}
                                    </p>

                                    {item.status === "uncomplete" ? (
                                        <Circle
                                            width={17}
                                            height={17}
                                            color={
                                                item.dailyExercise.day ===
                                                currDay.dailyExercise.day
                                                    ? "#7065CD"
                                                    : ""
                                            }
                                        />
                                    ) : (
                                        <CheckCircle2
                                            width={22}
                                            height={22}
                                            fill='#7065CD'
                                            className='text-white'
                                        />
                                    )}
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </>
    );
};

const DailyCarouselSkeleton = () => {
    return (
        <div className=''>
            <div className='basis-1/7 cursor-pointer'>
                <div className='w-[100px] h-[61px] bg-[#FAFAFA] rounded-[12px] flex flex-col justify-between p-[7px] pr-[10px] skeleton-loader'>
                    <div className='flex justify-between items-center'>
                        <Skeleton className='w-1/2 h-3 bg-gray-200 rounded skeleton-loader'></Skeleton>
                        <Skeleton className='w-4 h-4 bg-gray-200 rounded-full skeleton-loader'></Skeleton>
                    </div>
                </div>
            </div>
        </div>
    );
};
