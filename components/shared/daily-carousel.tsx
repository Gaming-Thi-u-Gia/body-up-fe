import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "../ui/carousel";

export const DailyCarousel = () => {
    return (
        <>
            <Carousel
                opts={{
                    align: "start",
                }}
                className='w-[88%] mx-auto mb-5'
            >
                <CarouselContent>
                    {Array.from({ length: 10 }).map((_, index) => (
                        <CarouselItem key={index} className='basis-1/7'>
                            <div className='w-[100px] h-[61px] bg-[#FAFAFA] rounded-[12px] flex flex-col justify-between p-[7px] pr-[10px]'>
                                <h2 className='text-sm text-[#868A93]'>
                                    Mon 13
                                </h2>
                                <p className='text-xs text-[#868A93]'>Day 4</p>
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
