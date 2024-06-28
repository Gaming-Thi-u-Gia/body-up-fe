import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "../ui/carousel";
type Props = {
    day: string;
    title: string;
    onClick: (index: number) => void;
};
export const DailyCarousel = ({ day, title, onClick }: Props) => {
    return (
        <>
            <Carousel
                opts={{
                    align: "start",
                }}
                className='w-[88%] mx-auto mb-5'
            >
                <CarouselContent>
                    {Array.from({ length: 30 }).map((_, index) => (
                        <CarouselItem
                            key={index}
                            className='basis-1/7 cursor-pointer'
                            onClick={() => onClick(index + 1)}
                        >
                            <div className='w-[100px] h-[61px] bg-[#FAFAFA] rounded-[12px] flex flex-col justify-between p-[7px] pr-[10px]'>
                                <p className='text-xs text-[#868A93]'>
                                    Day {index + 1}
                                </p>
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
