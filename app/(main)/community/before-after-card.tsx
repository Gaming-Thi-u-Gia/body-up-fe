"use client";
import React from "react";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import defaultProfile from "/public/default-iProfile.png";
import before_after from "/public/before-after-icon.svg";
import { Button } from "@/components/ui/button";
import challenges_icon from "/public/challenges-icon.svg";
import Link from "next/link";
import { usePathname } from "next/navigation";
const BeforAfterPost = () => {
    const pathname = usePathname();
    const pathParts = pathname.split("/");
    const title = pathParts[2];
    return (
        <div className=" bg-white rounded-md px-2 py-3">
            <div className="flex items-center justify-between ">
                <div className="flex gap-2 items-center">
                    <Sheet>
                        <SheetTrigger>
                            <Image
                                src={defaultProfile}
                                alt="logo"
                                width={32}
                                height={32}
                                className="cursor-pointer"
                            />
                        </SheetTrigger>
                        <SheetContent className="w-[350px]">
                            <SheetHeader>
                                <SheetTitle className="text-sm font-medium border-b border-gray-200 pb-4">
                                    User Profile
                                </SheetTitle>
                            </SheetHeader>
                            <div className="flex flex-col">
                                <Image
                                    src={defaultProfile}
                                    alt="logo"
                                    width={50}
                                    height={50}
                                    className="cursor-pointer py-2"
                                />
                                <label
                                    className="text-[16px] font-semibold mt-2"
                                    htmlFor=""
                                >
                                    Destiny
                                </label>
                                <div className="flex flex-col gap-2 mt-1">
                                    <span className="text-sm">
                                        @destinyguillory2000
                                    </span>

                                    <div className="flex gap-1">
                                        <Image
                                            src={before_after}
                                            width={18}
                                            height={18}
                                            alt="logo"
                                        />
                                        <label htmlFor="" className="text-sm">
                                            0 Challenges Completed
                                        </label>
                                    </div>
                                    <div className="flex gap-1">
                                        <Image
                                            src={challenges_icon}
                                            width={18}
                                            height={18}
                                            alt="logo"
                                        />
                                        <label htmlFor="" className="text-sm">
                                            120 Achievement Points
                                        </label>
                                    </div>
                                </div>
                                <div className="flex gap-2 mt-4">
                                    <Button variant="primary">
                                        View Profile
                                    </Button>
                                    <Button
                                        variant="default"
                                        className="bg-[#EFF0F4]"
                                    >
                                        Send Message
                                    </Button>
                                </div>
                                <div className="mt-7 flex gap-5 justify-center items-center">
                                    <div className="flex items-center gap-1 flex-col w-[40%]">
                                        <label
                                            htmlFor=""
                                            className="text-[#868A93] text-sm "
                                        >
                                            Comments
                                        </label>
                                        <span className="text-[18px]">752</span>
                                    </div>
                                    <hr className="bg-[#CDD5DE] mx-2 min-h-7 w-[1px] shrink-0 flex" />
                                    <div className="flex items-center gap-1 flex-col w-[40%]">
                                        <label
                                            htmlFor=""
                                            className="text-[#868A93] text-sm"
                                        >
                                            Posts
                                        </label>
                                        <span className="text-[18px]">752</span>
                                    </div>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                    <div className="flex flex-col text-sm items-start">
                        <label className="font-bold text-black">
                            cncagnes9237
                        </label>
                        <span className="font-light text-black ">
                            13 hours ago
                        </span>
                    </div>
                </div>
                <div className="flex gap-2 items-center">
                    <div className="flex rounded-full bg-[#E1E6FA] p-3 h-7 justify-center items-center">
                        <span className="text-[12px] font-medium">NEW</span>
                    </div>
                </div>
            </div>
            <h1 className="text-[14px] font-bold p-2">
                Happy with the results
            </h1>
            <Link
                href={`/community/${title}/viewpost`}
                className="flex gap-2 rounded-md items-center justify-center px-1"
            >
                {/* <Link href="/"></Link> */}
                <img
                    src="https://static.chloeting.com/users/66181662ed0fcedc0969bc7e/photos/66412e739810b23039b25727/fa318370-10a2-11ef-95aa-b9f652f19ec5.jpeg"
                    alt=""
                    className="w-[50%] h-[378px] object-cover rounded-xl "
                />
                <img
                    src="https://static.chloeting.com/users/66181662ed0fcedc0969bc7e/photos/6654dcb6b624db48640b02d3/03b54690-1c5e-11ef-a2e9-f78e7e898479.jpeg"
                    className="w-[50%] h-[378px] object-cover rounded-xl"
                />
            </Link>
        </div>
    );
};

export default BeforAfterPost;
