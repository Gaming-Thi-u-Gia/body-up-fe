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
import { DailyCarousel } from "./daily-carousel";
import { useEffect, useState } from "react";
import { VideoDailyCard } from "./video-daily-card";
import { Button } from "../ui/button";
import { date } from "zod";
import { useAuthStore } from "../providers/auth-provider";
import { getVideoChallenge } from "@/utils/user";
import fetchVideos, { VideoItem } from "@/utils/dailyVideo";
type Props = {
    title: string;
    releaseDate: string;
    days: string;
    time: string;
    type: string;
    equipment: string;
    banner: string;
};
//TODO: fetch API
const dailyVideoData = {
    title: "Full Body Warm Up",
    target: "Warm Up",
    view: "1.2M",
    releaseDate: "2021-06-01",
    duration: "05:00",
    bannerUrl:
        "https://static.chloeting.com/videos/61bc1877dff295b571b03e08/af196bc0-5ef5-11ec-b4e8-6545cdfc138f.jpeg",
    isOptional: true,
    status: "incomplete",
    url: "https://www.youtube.com/watch?v=j5SHMJ6mUoA",
};

export const DaySchedule = ({
    title,
    releaseDate,
    days,
    time,
    type,
    equipment,
    banner,
}: Props) => {
    const { sessionToken } = useAuthStore((store) => store);
    const [dailyVideoData, setDailyVideoData] = useState<VideoItem[] | []>([]);
    const [day, setDay] = useState("1");
    //TODO: SET DATA WHEN CLICK ON SCHEDULE
    const onClick = (index: number) => {
        setDay("" + index);
    };
    useEffect(() => {
        const getVideoData = async () => {
            const res = await getVideoChallenge(sessionToken!, day);
            const video = await fetchVideos(
                res?.payload.map((item: any) => item.video)
            );
            console.log(video);
            setDailyVideoData(video);
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
                                    <span>DAY {day}/28</span>
                                    <span>25%</span>
                                </div>
                                <Progress
                                    value={25}
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
                <DailyCarousel day='Mon 23' title='Test' onClick={onClick} />
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
                            {/* {Array.from({ length: 5 }).map((_, index) => (
                                // <VideoDailyCard
                                //     key={index}
                                //     title={dailyVideoData.title}
                                //     bannerUrl={dailyVideoData.bannerUrl}
                                //     duration={dailyVideoData.duration}
                                //     releaseDate={dailyVideoData.releaseDate}
                                //     target={dailyVideoData.target}
                                //     view={dailyVideoData.view}
                                //     isOptional={dailyVideoData.isOptional}
                                //     url={dailyVideoData.url}
                                //     initialStatus={validatedStatus}
                                // />
                            ))} */}
                            {dailyVideoData.map((dailyVideo: any) => (
                                <VideoDailyCard
                                    id={dailyVideo.id}
                                    key={dailyVideo.id}
                                    title={dailyVideo.name}
                                    initialStatus={dailyVideo.status}
                                    url={dailyVideo.url}
                                />
                            ))}
                            <Button variant='primary' className='my-4 ml-2'>
                                Mark day {day} as Complete
                            </Button>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </div>
    );
};
