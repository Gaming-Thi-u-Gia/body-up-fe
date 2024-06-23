"use client";
import {
    Calendar,
    CalendarCheck,
    CalendarDays,
    Clock,
    Ellipsis,
    Menu,
    Users,
} from "lucide-react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "../ui/accordion";
import { Progress } from "../ui/progress";
import { Badge } from "../ui/badge";
import { DailyCarousel, DailyExercise } from "./daily-carousel";
import { useEffect, useState } from "react";
import { VideoDailyCard } from "./video-daily-card";
import { Button } from "../ui/button";
import { useAuthStore } from "../providers/auth-provider";
import { getFirstUncompleted, getVideoChallenge } from "@/utils/user";
import fetchVideos, { VideoItem } from "@/utils/dailyVideo";
import { getAllDay, markDailyChallenge } from "@/utils/dailyExercise";
import { toast } from "sonner";
type Props = {
    title: string;
    releaseDate: string;
    days: string;
    time: string;
    type: string;
    equipment: string;
    banner: string;
    challenge: string;
    currDay: DailyExercise;
};
//TODO: fetch API

export const DaySchedule = ({
    title,
    releaseDate,
    days,
    time,
    type,
    equipment,
    banner,
    challenge,
    currDay,
}: Props) => {
    const { sessionToken } = useAuthStore((store) => store);
    const [dailyVideoData, setDailyVideoData] = useState<VideoItem[] | []>([]);
    const [videoData, setVideoData] = useState();
    const [allDay, setAllDay] = useState<DailyExercise[]>([]);
    const [day, setDay] = useState(currDay.dailyExercise.day || "1");
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingDay, setIsLoadingDay] = useState(false);
    const [newCurrDay, setNewCurrDay] = useState<DailyExercise>(currDay);
    //TODO: SET DATA WHEN CLICK ON SCHEDULE
    const onClick = (index: number) => {
        if (isLoading) return;
        setDay("" + index);
    };
    const markComplete = async () => {
        const res = await markDailyChallenge(
            sessionToken!,
            newCurrDay.dailyExercise.id
        );
        if (res?.status === 200) {
            toast.success("Day marked as complete");
            const nextDay = await getFirstUncompleted(sessionToken!);
            // set status day to complete in all day
            const newAllDay = allDay.map((item) => {
                if (item.dailyExercise.day === newCurrDay.dailyExercise.day) {
                    return {
                        ...item,
                        status: "complete",
                    };
                }
                return item;
            });
            setAllDay(newAllDay);
            setDay(nextDay?.dailyExercise.day);
            setNewCurrDay(nextDay!);
        }
    };
    useEffect(() => {
        const getDay = async () => {
            setIsLoadingDay(true);
            const res = await getAllDay(sessionToken!, challenge);
            console.log(res?.payload);
            const sortDay = res?.payload.sort(
                (a: any, b: any) => a.dailyExercise.day - b.dailyExercise.day
            );
            setAllDay(sortDay);
            setIsLoadingDay(false);
        };
        getDay();
    }, [sessionToken, challenge]);
    useEffect(() => {
        const getVideoData = async () => {
            setIsLoading(true);
            const res = await getVideoChallenge(sessionToken!, day);
            const video = await fetchVideos(
                res?.payload.map((item: any) => item.video)
            );
            setVideoData(res?.payload);
            setDailyVideoData(video);
            setIsLoading(false);
        };
        getVideoData();
    }, [day, sessionToken]);
    return (
        <div>
            <div className='flex justify-between items-center'>
                <h2 className='text-3xl font-bold'>My Schedule</h2>
                <div className='flex gap-2 text-gray-600'>
                    <CalendarCheck width={24} height={24} cursor='pointer' />
                    <CalendarDays width={24} height={24} cursor='pointer' />
                    <Users width={24} height={24} cursor='pointer' />
                    <Menu width={24} height={24} cursor='pointer' />
                    <Ellipsis width={24} height={24} cursor='pointer' />
                </div>
            </div>
            <div className='w-full py-2 bg-white border-[#c4c4c4] border-[1px] rounded-lg flex flex-col items-start mt-4'>
                <Accordion
                    type='single'
                    collapsible
                    className='px-[25px] pt-[10px] pb-[20px] w-full'
                >
                    <AccordionItem value='item-1'>
                        <AccordionTrigger>
                            <h3 className='text-[22px] font-semibold w-[60%] text-left'>
                                {title}
                            </h3>
                            <div className='mr-2'>
                                <div className='flex text-[10px] text-[#6C6F78] justify-between mt-1'>
                                    <span>
                                        DAY {day}/{allDay.length}
                                    </span>
                                    <span>
                                        {Math.floor(
                                            (+newCurrDay.dailyExercise.day /
                                                allDay.length) *
                                                100
                                        )}
                                        %
                                    </span>
                                </div>
                                <Progress
                                    value={
                                        (+newCurrDay.dailyExercise.day /
                                            allDay.length) *
                                        100
                                    }
                                    className='w-[350px] h-[6px]'
                                />
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className='flex justify-between'>
                            <div className='w-[60%]'>
                                <p className='font-semibold text-xs'>
                                    TODAY&apos;S WORKOUT
                                </p>
                                <div className='flex gap-2 mt-2'>
                                    <Badge
                                        variant='secondary'
                                        className='text-xs font-thin'
                                    >
                                        Warm Up
                                    </Badge>
                                    <Badge
                                        variant='secondary'
                                        className='text-xs font-thin'
                                    >
                                        Full Body
                                    </Badge>
                                    <Badge
                                        variant='secondary'
                                        className='text-xs font-thin'
                                    >
                                        Abs
                                    </Badge>
                                </div>
                            </div>
                            <div
                                className='pb-[18%] bg-cover w-[40%] -translate-x-6 rounded-2xl relative'
                                style={{ backgroundImage: `url(${banner})` }}
                            >
                                <div className='absolute flex bottom-2 left-2 right-2 gap-2'>
                                    <Badge
                                        variant='secondary'
                                        className='text-[#303033] text-xs space-x-1 py-1 px-2'
                                    >
                                        <Calendar width={16} height={16} />
                                        <p>{days}</p>
                                    </Badge>
                                    <Badge
                                        variant='secondary'
                                        className='text-[#303033] text-xs space-x-1 py-1 px-2'
                                    >
                                        <Clock width={16} height={16} />
                                        <p>{time}</p>
                                    </Badge>
                                </div>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
                <DailyCarousel
                    day={day}
                    title='Test'
                    onClick={onClick}
                    allDay={allDay!}
                    currDay={newCurrDay!}
                    isLoading={isLoadingDay}
                />
            </div>
            <div className='w-full py-[30px] px-[18px] bg-white border-[#c4c4c4] border-[1px] rounded-lg items-start my-4'>
                <Accordion type='single' collapsible>
                    <AccordionItem value='item-1' className='border-none '>
                        <AccordionTrigger className='flex justify-between items-center py-0'>
                            <h4 className='flex-1 text-[22px] font-semibold text-start'>
                                Today&apos;s Workout{" "}
                            </h4>
                            <p className='text-[14px] text-[#868A93]'>
                                4 Workouts | 46 Mins (Excludes Optional Videos)
                            </p>
                        </AccordionTrigger>
                        <AccordionContent>
                            {dailyVideoData.map(
                                (dailyVideo: any, index: number) => (
                                    <VideoDailyCard
                                        // @ts-ignore
                                        id={videoData![index].id}
                                        key={dailyVideo.id}
                                        title={dailyVideo.title}
                                        // @ts-ignore
                                        initialStatus={videoData![index].status}
                                        url={dailyVideo.id}
                                        img={dailyVideo.img}
                                        view={dailyVideo.views}
                                        releaseDate={dailyVideo.date}
                                        duration={dailyVideo.duration}
                                        isLoading={isLoading}
                                        currDay={newCurrDay.dailyExercise.day}
                                        day={day}
                                    />
                                )
                            )}
                            <Button
                                variant='primary'
                                className='my-4 ml-2'
                                onClick={markComplete}
                                disabled={newCurrDay.dailyExercise.day !== day}
                            >
                                Mark day {day} as Complete
                            </Button>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </div>
    );
};
