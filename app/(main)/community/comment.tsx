"use client";
import React, { useEffect, useState } from "react";
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
import { Button } from "@/components/ui/button";
import Image from "next/image";
import defaultProfile from "/public/default-iProfile.png";
import reply_icon from "/public/reply-icon.svg";
import { ArrowBigUp, ArrowBigDown } from "lucide-react";
import { Comments } from "./view-post";
import moment from "moment";
// import { ArrowBigUp } from 'lucide-react';
const Comment = ({ comment }: { comment: Comments }) => {
    const [isOpennedReply, setIsOpennedReply] = useState(false);
    const [countUpvoted, setCountUpvoted] = useState<number>(
        comment.upVote || 0
    );
    const [isUpvoted, setIsUpvoted] = useState(false);
    const [isDownvoted, setIsDownvoted] = useState(false);

    // const upvoteCommentData = async (newCount: number) => {
    //     try {
    //         const upvoteData = await fetchUpvote(comment.id, newCount);
    //         setCountUpvoted(upvoteData);
    //         console.log("Upvote data returned:", upvoteData);
    //     } catch (error) {
    //         console.error("Error fetching upvote:", error);
    //     }
    // };
    const handleUpvoteClick = () => {
        if (isUpvoted) {
            setCountUpvoted(countUpvoted - 1);
            setIsUpvoted(false);
        } else {
            if (isDownvoted) {
                setCountUpvoted(countUpvoted + 2);
                setIsDownvoted(false);
            } else {
                setCountUpvoted(countUpvoted + 1);
            }
            setIsUpvoted(true);
        }
    };
    const handleDownvoteClick = () => {
        if (isDownvoted) {
            setCountUpvoted(countUpvoted + 1);
            setIsDownvoted(false);
        } else {
            if (isUpvoted) {
                setCountUpvoted(countUpvoted - 2);
                setIsUpvoted(false);
            } else {
                setCountUpvoted(countUpvoted - 1);
            }
            setIsDownvoted(true);
        }
    };

    return (
        <div className="flex flex-col gap-3 items-center mt-7 p-3">
            <div className="w-full flex justify-between items-center">
                <div className="flex gap-2 items-center w-full">
                    <Sheet>
                        <SheetTrigger>
                            <Image
                                src={comment.user.avatar || defaultProfile}
                                alt="logo"
                                width={32}
                                height={32}
                                className="cursor-pointer rounded-full"
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
                                    src={comment.user.avatar || defaultProfile}
                                    alt="logo"
                                    width={50}
                                    height={50}
                                    className="cursor-pointer mt-2 rounded-full"
                                />
                                <label
                                    className="text-[16px] font-semibold mt-2"
                                    htmlFor=""
                                >
                                    Destiny
                                </label>
                                <div className="flex flex-col gap-2 mt-1">
                                    <span className="text-sm">
                                        {comment.user.email}
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
                        {comment.user.username || "Anonymous"}
                    </label>
                    <span className="text-sm">
                        {" "}
                        {comment?.createAt
                            ? moment(comment?.createAt).fromNow()
                            : "No date provided"}
                    </span>
                </div>
                <div className="flex gap-2 items-center">
                    <Button
                        variant="secondary"
                        className="flex gap-1 rounded-full bg-[#EFF0F4] w-[81.64px] p-2 justify-center items-center"
                        onClick={() =>
                            setIsOpennedReply(
                                (isOpennedReply) => !isOpennedReply
                            )
                        }
                    >
                        <Image
                            src={reply_icon}
                            alt="logo"
                            width={13}
                            height={12}
                        />
                        <span className="text-[12px]">Reply</span>
                    </Button>
                    <div className="flex gap-1 rounded-full bg-[#EFF0F4] w-[81.64px] px-2 py-2  justify-between items-center">
                        <ArrowBigUp
                            size={25}
                            strokeWidth={1}
                            fill={`${isUpvoted ? "#7065cd" : " transparent"} `}
                            className="cursor-pointer"
                            onClick={handleUpvoteClick}
                        />

                        <span className="text-[14px]">{countUpvoted}</span>

                        <ArrowBigDown
                            size={25}
                            strokeWidth={1}
                            fill={`${
                                isDownvoted ? "#7065cd" : " transparent"
                            } `}
                            className="cursor-pointer"
                            onClick={handleDownvoteClick}
                        />
                    </div>
                </div>
            </div>
            <div className="w-full flex justify-between items-center break-all ">
                <div className="w-full">{comment.detail}</div>
                <div className=""></div>
            </div>
            {isOpennedReply && (
                <div className="w-full flex flex-col gap-1">
                    <h1 className="flex items-center p-1 font-semibold">
                        Reply To Comment
                    </h1>
                    <Textarea
                        placeholder="Write a reply"
                        className="rounded-lg bg-transparent p-3 text-[16px]"
                    />
                    <div className=" flex items-center justify-end gap-2 mt-3">
                        <Button
                            variant="default"
                            onClick={() => setIsOpennedReply(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="primary"
                            className="w-[188px] h-9 flex"
                        >
                            Reply
                        </Button>
                    </div>
                    <hr className="mt-3" />
                </div>
            )}

            <hr className="mt-3 w-full" />
        </div>
    );
};

export default Comment;
