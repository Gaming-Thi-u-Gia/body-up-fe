import { Star } from "lucide-react";
import Image from "next/image";
import React from "react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@radix-ui/react-accordion";

function CommentCourse() {
    return (
        <div className="w-full py-[30px] px-[18px] bg-white border-[#c4c4c4] border-[1px] rounded-lg items-start my-4">
            <Accordion type="single" collapsible>
                <AccordionItem value="comment" className="border-none">
                    <AccordionTrigger className="flex justify-between w-full text-center items-center">
                        <h4 className="text-[22px] font-semibold">Comments</h4>
                        <p className="text-[14px] text-[#868A93]">
                            1 Comments
                        </p>
                    </AccordionTrigger>
                    <AccordionContent>
                        <div className="flex items-start bg-gray-100 py-2 px-2 my-4 rounded-lg">
                            <Image
                                src="https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/anh-den-ngau.jpeg"
                                alt="Avatar"
                                className="rounded-full mr-4"
                                width={50}
                                height={50}
                            />
                            <div className="flex-1">
                                <div className="flex justify-between">
                                    <h3 className="text-lg font-semibold">
                                        TienZe
                                    </h3>
                                    <span className="cursor-pointer flex">
                                        {[...Array(5)].map((_, index) => (
                                            <span
                                                key={index}
                                                className="star-label"
                                            >
                                                <Star
                                                    fill={"#FEE58E"}
                                                    strokeWidth={0}
                                                    width={34}
                                                />
                                            </span>
                                        ))}
                                    </span>
                                </div>
                                <p className="text-gray-700">
                                    Program is so good , I lost 5kg in just 1
                                    month after following it.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start bg-gray-100 py-2 px-2 my-4 rounded-lg">
                            <Image
                                src="https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/anh-den-ngau.jpeg"
                                alt="Avatar"
                                className="rounded-full mr-4"
                                width={50}
                                height={50}
                            />
                            <div className="flex-1">
                                <div className="flex justify-between">
                                    <h3 className="text-lg font-semibold">
                                        TienZe
                                    </h3>
                                    <span className="cursor-pointer flex">
                                        {[...Array(5)].map((_, index) => (
                                            <span
                                                key={index}
                                                className="star-label"
                                            >
                                                <Star
                                                    fill={"#FEE58E"}
                                                    strokeWidth={0}
                                                    width={34}
                                                />
                                            </span>
                                        ))}
                                    </span>
                                </div>
                                <p className="text-gray-700">
                                    Program is so good , I lost 5kg in just 1
                                    month after following it.
                                </p>
                            </div>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    );
}

export default CommentCourse;
