import { CircleAlert, Crosshair, Heart } from "lucide-react";
import { Badge } from "../ui/badge";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "../ui/accordion";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Skeleton } from "../ui/skeleton";

type Props = {
    id: number;
    title: string;
    url: string;
    view: string;
    releaseDate: string;
    duration: string;
    img: string;
    initialStatus: "incomplete" | "complete";
    isLoading: boolean;
};
export const VideoDailyCard = ({
    id,
    title,
    url,
    initialStatus,
    view,
    releaseDate,
    img,
    duration,
    isLoading,
}: Props) => {
    const validatedStatus =
        initialStatus === "complete" || initialStatus === "incomplete"
            ? initialStatus
            : "incomplete";
    const [status, setStatus] = useState(validatedStatus);

    const onClick = () => {
        setStatus("complete");
    };
    if (isLoading) {
        return <VideoDailyCardSkeleton />;
    }
    return (
        <>
            {status === "incomplete" ? (
                <div className='flex p-[20px] bg-[#F7F7F7] rounded-lg mt-4'>
                    <div
                        className='pb-[12%] min-w-[180px] bg-cover bg-center rounded-md relative bg-no-repeat cursor-pointer group overflow-hidden'
                        style={{ backgroundImage: `url(${img})` }}
                    >
                        <div onClick={onClick}>
                            <div className='bg-black opacity-0 absolute left-0 bottom-0 right-0 top-0 z-1 group-hover:opacity-20 transition-all duration-300' />
                            <Badge className='absolute right-2 bottom-3'>
                                {duration}
                            </Badge>
                        </div>
                    </div>

                    <div className='flex flex-col justify-between w-full ml-4'>
                        <div className='flex justify-between '>
                            <h4 className='text-lg text-[#303033] font-semibold'>
                                {title}
                            </h4>
                        </div>
                        <div className='flex items-center gap-1'>
                            <Crosshair width={12} height={12} />
                            <p className='text-sm'>Good Practice</p>
                        </div>
                        <div className='flex items-center justify-between'>
                            <p className='text-xs text-[#868A93]'>
                                {view} • {releaseDate}
                            </p>
                            <div className='flex items-center text-[#868A93] gap-2'>
                                <CircleAlert
                                    width={17}
                                    height={18}
                                    cursor='pointer'
                                />
                                <Heart
                                    width={18}
                                    height={18}
                                    cursor='pointer'
                                />
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <Accordion
                    type='single'
                    collapsible
                    className='flex flex-col p-[20px] bg-[#e0eefb] mt-4 rounded-lg'
                >
                    <AccordionItem value='item-1' className='border-none'>
                        <AccordionTrigger className='flex justify-between items-center py-0'>
                            <div className='flex justify-between w-full'>
                                <h4 className='text-base text-[#303033] font-semibold'>
                                    {title}
                                </h4>
                                {validatedStatus === "complete" && (
                                    <Badge
                                        variant='secondary'
                                        className='bg-[#7065cd] text-white hover:text-black hover:bg-[#c3c3c3] font-bold mr-4'
                                    >
                                        WORKOUT COMPLETE
                                    </Badge>
                                )}
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className='flex pb-0'>
                            <div
                                style={{ backgroundImage: `url(${img})` }}
                                className='pb-[12%] min-w-[180px] bg-cover bg-center rounded-md relative bg-no-repeat cursor-pointer group overflow-hidden'
                            >
                                <div className='bg-black opacity-0 absolute left-0 bottom-0 right-0 top-0 z-1 group-hover:opacity-20 transition-all duration-300' />
                                <Badge className='absolute right-2 bottom-3'>
                                    {duration}
                                </Badge>
                            </div>

                            <div className='flex flex-col justify-between w-full ml-4'>
                                <div className='flex justify-between '>
                                    <h4 className='text-lg text-[#303033] font-semibold'>
                                        {title}
                                    </h4>
                                </div>
                                <div className='flex items-center gap-1'>
                                    <Crosshair width={12} height={12} />
                                    <p className='text-sm'>Warm Up</p>
                                </div>
                                <div className='flex items-center justify-between'>
                                    <p className='text-xs text-[#868A93]'>
                                        {view} • {releaseDate}
                                    </p>
                                    <div className='flex items-center text-[#868A93] gap-2'>
                                        <CircleAlert
                                            width={17}
                                            height={18}
                                            cursor='pointer'
                                        />
                                        <Heart
                                            width={18}
                                            height={18}
                                            cursor='pointer'
                                        />
                                    </div>
                                </div>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            )}
        </>
    );
};

const VideoDailyCardSkeleton = () => {
    return (
        <div className='flex p-[20px] bg-[#F7F7F7] rounded-lg mt-4'>
            <Skeleton className='pb-[12%] min-w-[180px] bg-cover bg-center rounded-md relative bg-no-repeat bg-slate-300 overflow-hidden skeleton-loader' />

            <div className='flex flex-col justify-between w-full ml-4'>
                <div className='flex justify-between'>
                    <Skeleton className='w-3/4 h-6 bg-gray-200 rounded skeleton-loader'></Skeleton>
                </div>
                <div className='flex items-center gap-1 mt-2'>
                    <Skeleton className='w-1/4 h-4 bg-gray-200 rounded skeleton-loader'></Skeleton>
                </div>
                <div className='flex items-center justify-between mt-2'>
                    <Skeleton className='w-1/2 h-4 bg-gray-200 rounded skeleton-loader'></Skeleton>
                    <div className='flex items-center text-[#868A93] gap-2'>
                        <Skeleton className='w-6 h-6 bg-gray-200 rounded-full skeleton-loader'></Skeleton>
                        <Skeleton className='w-6 h-6 bg-gray-200 rounded-full skeleton-loader'></Skeleton>
                    </div>
                </div>
            </div>
        </div>
    );
};
