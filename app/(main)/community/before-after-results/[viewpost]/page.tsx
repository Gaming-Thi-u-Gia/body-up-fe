"use client";
import React from "react";
import defaultProfile from "/public/default-iProfile.png";
import Image from "next/image";
import message_icon from "/public/message-icon.svg";
import saved_icon from "/public/saved-posts-icon.svg";
import share_icon from "/public/share-icon.svg";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import before_after from "/public/before-after-icon.svg";
import challenges_icon from "/public/challenges-icon.svg";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import back_Icon from "/public/back-icon.svg";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Comment from "../../comment";
const BeforeAfterPost = () => {
    const pathname = usePathname();
    const pathParts = pathname.split("/");
    const title = pathParts[2];
    return (
        <div className="w-[823px] mt-[5%]">
            <Link
                href={`/community/${title}`}
                className="flex gap-2 items-center justify-start mb-4"
            >
                <Image src={back_Icon} width={24} height={24} alt="back" />
                <span className="text-[15px] text-black flex gap-2 ">
                    Back to <span>#{title}</span>
                </span>
            </Link>

            <div className="w-full flex flex-col p-2 gap-2 hover:bg-[#f5f5f5] rounded-lg">
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
                <Link
                    href={`/community/${title}`}
                    className="text-black text-lg font-medium mt-3"
                >
                    How Was Your Workout Today? | Weekly Thread
                </Link>
                <div className="w-full flex items-center gap-4">
                    <div className="flex flex-col gap-1 w-[50%]">
                        <span className="text-[12px] font-bold">Before</span>
                        <img
                            src="https://static.chloeting.com/users/66181662ed0fcedc0969bc7e/photos/66412e739810b23039b25727/fa318370-10a2-11ef-95aa-b9f652f19ec5.jpeg"
                            alt=""
                            className="w-[100%] h-[100%] object-cover rounded-xl "
                        />
                        <span className="text-[12px] font-semibold flex items-stretch bg-[#EFF0F4] rounded-full p-2 mt-2">
                            Date Taken: 17th Dec 2022
                        </span>
                    </div>
                    <div className="flex flex-col gap-1 w-[50%]">
                        <span className="text-[12px] font-bold">After</span>
                        <img
                            src="https://static.chloeting.com/users/66181662ed0fcedc0969bc7e/photos/6654dcb6b624db48640b02d3/03b54690-1c5e-11ef-a2e9-f78e7e898479.jpeg"
                            alt=""
                            className="w-[100%] h-[100%] object-cover rounded-xl "
                        />
                        <span className="text-[12px] font-semibold flex items-stretch bg-[#EFF0F4] rounded-full p-2 mt-2">
                            Date Taken: 17th Dec 2022
                        </span>
                    </div>
                </div>
                <div className="flex gap-2 items-center mt-6">
                    <Button
                        variant="secondary"
                        className="flex gap-1 rounded-full bg-[#EFF0F4] p-4 justify-center items-center"
                    >
                        <Image
                            src={message_icon}
                            alt="logo"
                            width={20}
                            height={20}
                        />
                        <span className="text-[12px]">
                            <span>33</span> Replies
                        </span>
                    </Button>
                    <Button
                        variant="secondary"
                        className="flex gap-1 rounded-full bg-[#EFF0F4] p-4 justify-center items-center"
                    >
                        <Image
                            src={saved_icon}
                            alt="logo"
                            width={20}
                            height={20}
                        />
                        <span className="text-[12px]">Saved</span>
                    </Button>
                    <Button
                        variant="secondary"
                        className="flex gap-1 rounded-full bg-[#EFF0F4] p-4 justify-center items-center"
                    >
                        <Image
                            src={share_icon}
                            alt="logo"
                            width={20}
                            height={20}
                        />
                        <span className="text-[12px]">Share</span>
                    </Button>
                </div>

                <hr className="mt-3" />
            </div>
            <div className="w-full px-2 flex flex-col gap-1">
                <h1 className="flex items-center p-1 font-bold">
                    Post A Reply
                </h1>
                <Textarea
                    placeholder="Write a response for this post"
                    className="rounded-lg bg-transparent p-3 text-[16px]"
                />
                <div className=" flex items-center justify-end mt-3">
                    <Button variant="primary" className="w-[188px] h-9 flex">
                        Reply
                    </Button>
                </div>
                <hr className="mt-3" />
            </div>

            {/* comment section */}
            <div className="flex items-center mt-10 gap-2">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <div className="flex items-center cursor-pointer ">
                            <span className="text-sm">Latest</span>
                            <ChevronDown className="text-sm w-[18.72px]" />
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-35 absolute mt-5 "
                        side="left"
                    >
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <span>Latest</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <span>Upvotes</span>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <Comment />
            <Comment />
            <Comment />
            <Comment />
        </div>
    );
};

export default BeforeAfterPost;
