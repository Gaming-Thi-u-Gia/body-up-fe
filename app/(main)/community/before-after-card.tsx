"use client";
import React, { useEffect, useState } from "react";
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
import { Posts } from "./user-post-no-image";
import { fetchPostData } from "@/utils/community";
import { useAuthStore } from "@/components/providers/auth-provider";
import moment from "moment";
import { Skeleton } from "@/components/ui/skeleton";
const BeforAfterPost = () => {
    const pathname = usePathname();
    const pathParts = pathname.split("/");
    const title = pathParts[2];
    const [posts, setPosts] = useState<Posts[]>([]);
    const { sessionToken } = useAuthStore((store) => store);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        const getPostsByCategory = async () => {
            try {
                setIsLoading(true);
                const data = await fetchPostData(2, sessionToken!);
                setPosts(data);
                console.log(data);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        };
        getPostsByCategory();
    }, [sessionToken]);

    if (isLoading) {
        return (
            <div className="flex flex-col istems-center gap-4">
                <div className="flex items-center justify-between gap-4">
                    <BeforeAfterPostSkeleton />
                    <BeforeAfterPostSkeleton />
                </div>
                <div className="flex items-center justify-between gap-4">
                    <BeforeAfterPostSkeleton />
                    <BeforeAfterPostSkeleton />
                </div>
            </div>
        );
    }

    return (
        <>
            {posts.map((post) => (
                <div key={post.id} className=" bg-white rounded-md px-2 py-3">
                    <div className="flex items-center justify-between ">
                        <div className="flex gap-2 items-center">
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
                                            User Profile
                                        </SheetTitle>
                                    </SheetHeader>
                                    <div className="flex flex-col">
                                        <Image
                                            src={
                                                post.user.avatar ||
                                                defaultProfile
                                            }
                                            alt="logo"
                                            width={50}
                                            height={50}
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
                                                <label
                                                    htmlFor=""
                                                    className="text-sm"
                                                >
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
                                                <label
                                                    htmlFor=""
                                                    className="text-sm"
                                                >
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
                                                <span className="text-[18px]">
                                                    752
                                                </span>
                                            </div>
                                            <hr className="bg-[#CDD5DE] mx-2 min-h-7 w-[1px] shrink-0 flex" />
                                            <div className="flex items-center gap-1 flex-col w-[40%]">
                                                <label
                                                    htmlFor=""
                                                    className="text-[#868A93] text-sm"
                                                >
                                                    Posts
                                                </label>
                                                <span className="text-[18px]">
                                                    752
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </SheetContent>
                            </Sheet>
                            <div className="flex flex-col text-sm items-start">
                                <label className="font-bold text-black">
                                    {post.user.username}
                                </label>
                                <span className="font-light text-black ">
                                    {post.createdAt
                                        ? moment(post.createdAt).fromNow()
                                        : "No date provided"}
                                </span>
                            </div>
                        </div>
                        <div className="flex gap-2 items-center">
                            {post.createdAt &&
                            moment().diff(moment(post.createdAt), "days") <
                                1 ? (
                                <div className="flex rounded-full bg-[#E1E6FA] p-3 h-7 justify-center items-center">
                                    <span className="text-[12px] font-medium">
                                        NEW
                                    </span>
                                </div>
                            ) : null}
                        </div>
                    </div>
                    <h1 className="text-[14px] font-bold p-2">{post.title}</h1>

                    <Link
                        href={`/community/${title}/${post.id}`}
                        className="flex gap-2 rounded-md items-center justify-center px-1"
                    >
                        <Image
                            src={post.imgBefore}
                            alt="image_before"
                            className="w-[50%] h-[378px] object-cover rounded-xl"
                            width={0}
                            height={0}
                            sizes="100"
                        />
                        <Image
                            src={post.imgAfter}
                            className="w-[50%] h-[378px] object-cover rounded-xl"
                            alt="image_after"
                            width={0}
                            height={0}
                            sizes="100"
                        />
                    </Link>
                </div>
            ))}
        </>
    );
};

export default BeforAfterPost;

const BeforeAfterPostSkeleton = () => {
    return (
        <div className="bg-white rounded-md px-2 py-3 space-y-4">
            {/* User details and new tag placeholder */}
            <div className="flex items-center justify-between ">
                <div className="flex gap-2 items-center">
                    {/* User avatar skeleton */}
                    <Skeleton className="h-12 w-12 rounded-full" />
                    {/* User name and email skeletons */}
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-[250px]" />
                        <Skeleton className="h-4 w-[200px]" />
                    </div>
                </div>
                {/* New tag skeleton */}
                <Skeleton className="h-7 w-20 rounded-full" />
            </div>
            {/* Post title skeleton */}
            <Skeleton className="h-6 w-[75%]" />
            {/* Images placeholders */}
            <div className="flex gap-4">
                <Skeleton className="w-[49%] h-[378px] rounded-xl" />
                <Skeleton className="w-[49%] h-[378px] rounded-xl" />
            </div>
        </div>
    );
};
