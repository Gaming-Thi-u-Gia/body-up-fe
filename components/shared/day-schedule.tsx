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
import Image from "next/image";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "../ui/accordion";
import { Progress } from "../ui/progress";
import { Badge } from "../ui/badge";
import { DailyCarousel } from "./daily-carousel";
import { useState } from "react";
import { VideoDailyCard } from "./video-daily-card";
type Props = {
    title: string;
    releaseDate: string;
    days: string;
    time: string;
    type: string;
    equipment: string;
};
//TODO: fetch API
const dailyVideoData = {
    title: "Full Body Warm Up",
    target: "Warm Up",
    view: "1.2M",
    releaseDate: "2021-06-01",
    duration: "05:00",
    bannerUrl:
        "https://s3-alpha-sig.figma.com/img/2b8e/37ca/aa986d36e5fc3e804ad5e502069efb47?Expires=1717977600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=n8pFiICMRBK9zzFtA4ig6y6R0GBdJSHGddCiKEZrUmTDJTghDuuYREdmMv-qQFI85VJiLylMntbgKWmQoegbK9fVqd0eSUZ4H7WyGC9EGcdoRFVnCZshloQpiA~GRmk8D-YBI~fyThe83yH~75F2Eht7EA4g3CG-i1oxGTym3O7zuWw7-Hrn-~FB5DrVfAHFUAqcXi5yK8PvyeujumahKnoi0HRjJsPd1EmhSkXz5V3JBOApCkGrdQ3G5UFAd7JFJwZTKfHKyPt6xIFuZUiprGuxagMKqkgceja7ErYVuhak7xuJCMOh3FVSsNMHt6LM9XrUp9VtsGqK22JTye4CXw__",
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
}: Props) => {
    const [data, setData] = useState("");
    const validatedStatus =
        dailyVideoData.status === "complete" ||
        dailyVideoData.status === "incomplete"
            ? dailyVideoData.status
            : "incomplete";
    //TODO: SET DATA WHEN CLICK ON SCHEDULE
    const onClick = (index: number) => {
        const day = "Day" + index;
        setData(day);
    };
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
                                2021 Flat Stomach Challenge
                            </h3>
                            <div className='mr-2'>
                                <div className='flex text-[10px] text-[#6C6F78] justify-between mt-1'>
                                    <span>DAY 3/28</span>
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
                            <div className='bg-[url("https://static.chloeting.com/programs/61bd418558da74df97000d5c/be3502c0-86d3-11ed-be97-e54de3bdbeba.jpeg")] pb-[18%] bg-cover w-[40%] -translate-x-6 rounded-2xl relative'>
                                <div className='absolute flex bottom-2 left-2 right-2 gap-2'>
                                    <Badge
                                        variant='secondary'
                                        className='text-[#303033] text-xs space-x-1 py-1 px-2'
                                    >
                                        <Calendar width={16} height={16} />
                                        <p>{days} days</p>
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
                            {Array.from({ length: 5 }).map((_, index) => (
                                <VideoDailyCard
                                    key={index}
                                    title={dailyVideoData.title + " " + data}
                                    bannerUrl={dailyVideoData.bannerUrl}
                                    duration={dailyVideoData.duration}
                                    releaseDate={dailyVideoData.releaseDate}
                                    target={dailyVideoData.target}
                                    view={dailyVideoData.view}
                                    isOptional={dailyVideoData.isOptional}
                                    url={dailyVideoData.url}
                                    initialStatus={validatedStatus}
                                />
                            ))}
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </div>
    );
};
