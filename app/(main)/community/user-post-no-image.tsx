"use client";
import React from "react";
import defaultProfile from "/public/default-iProfile.png";
import Image from "next/image";
import fitness_icon from "/public/fitness-icon.svg";
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
import { usePathname } from "next/navigation";
import { Bookmark } from "lucide-react";
import { Posts } from "./fitness/page";
import { formatDistanceToNow } from "date-fns";

const PostUser = ({ post }: { post: Posts }) => {
    const pathname = usePathname();
    const pathParts = pathname.split("/");
    const title = pathParts[2];
    return (
        <div className="w-full mb-10 flex flex-col p-2 gap-2 bor hover:bg-[#f5f5f5] rounded-lg">
            <div className="w-full flex justify-between items-center ">
                <div className="flex gap-2 items-center ">
                    <Sheet>
                        <SheetTrigger>
                            <Image
                                src={post.user.avatar || defaultProfile}
                                alt="logo"
                                width={32}
                                height={32}
                                className="cursor-pointer rounded-full"
                            />
                        </SheetTrigger>
                        <SheetContent className="w-[350px]">
                            <SheetHeader>
                                <SheetTitle className="text-sm font-medium border-b border-gray-200 pb-4">
                                    {post.user.username}
                                </SheetTitle>
                            </SheetHeader>
                            <div className="flex flex-col">
                                <Image
                                    src={post.user.avatar || defaultProfile}
                                    alt="logo"
                                    width={40}
                                    height={40}
                                    className="cursor-pointer mt-2 rounded-full"
                                />
                                <label
                                    className="text-[16px] font-semibold mt-2"
                                    htmlFor=""
                                >
                                    {post.user.username}
                                </label>
                                <div className="flex flex-col gap-2 mt-1">
                                    <span className="text-sm">
                                        {post.user.email}
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
                    <label
                        className="text-[#303033] text-sm font-bold cursor-pointer"
                        htmlFor=""
                    >
                        {post.user.username}
                    </label>
                    <span className="text-sm">
                        {post.created_at instanceof Date &&
                        !isNaN(post.created_at.getTime())
                            ? formatDistanceToNow(post.created_at) + " ago"
                            : "Invalid date"}
                    </span>
                </div>
                <div className="flex gap-2 items-center">
                    <div className="flex gap-1 rounded-full bg-[#EFF0F4] px-3 py-2 justify-center items-center">
                        <Image
                            src={fitness_icon}
                            alt="logo"
                            width={13}
                            height={12}
                        />
                        <span className="text-[12px]">{post.badge.name}</span>
                    </div>
                </div>
            </div>
            <Link
                href={`/community/${title}/${post.id}`}
                className="text-black text-lg font-medium mt-3"
            >
                {post.title}
            </Link>
            <Link
                href={`/community/${title}/${post.id}`}
                className="text-[#303033] text-[16px] h-[48px] mt-2 line-clamp-2 "
            >
                {post.description}
            </Link>
            <div className="flex gap-2 items-center mt-3">
                <Button
                    variant="secondary"
                    className="flex gap-1 rounded-full bg-[#EFF0F4] p-4 h-7 justify-center items-center"
                >
                    <Image
                        src={message_icon}
                        alt="logo"
                        width={20}
                        height={20}
                    />
                    <Link
                        href={`/community/${title}/${post.id}`}
                        className="text-[12px]"
                    >
                        <span>33</span> Replies
                    </Link>
                </Button>
                <Button
                    variant="secondary"
                    className="flex gap-1 rounded-full bg-[#EFF0F4] p-4 h-7 justify-center items-center"
                >
                    <Bookmark
                        size={20}
                        // className="text-red-500"
                        // fill="red"
                        // strokeWidth="0"
                    />
                    <span className="text-[12px]">Saved</span>
                </Button>
                <Button
                    variant="secondary"
                    className="flex gap-1 rounded-full bg-[#EFF0F4] p-4 h-7 justify-center items-center"
                >
                    <Image src={share_icon} alt="logo" width={20} height={20} />
                    <span className="text-[12px]">Share</span>
                </Button>
            </div>

            <hr className="mt-3" />
        </div>
    );
};

export default PostUser;
