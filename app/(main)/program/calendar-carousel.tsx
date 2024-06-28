import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import React from "react";

const CalendarCarousel = () => {
    return (
        <div className="w-full flex py-6 px-[51px] rounded-[200px] border border-[#EFF0F4] bg-white">
            <Carousel
                opts={{
                    align: "start",
                }}
                className="w-full"
            >
                <CarouselContent>
                    {Array.from({ length: 22 }).map((_, index) => (
                        <CarouselItem key={index} className="basis-1/7">
                            <div>
                                <Card className="w-[107px] h-[60px] flex-grow">
                                    <CardContent className="flex aspect-square p-1">
                                        <span className="text-sm font-semibold">
                                            Day {index + 1}
                                        </span>
                                    </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    );
}

export default CalendarCarousel;
