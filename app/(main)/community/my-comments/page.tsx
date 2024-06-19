"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import fitness_icon from "/public/fitness-icon.svg";
import { Posts } from "../user-post-no-image";
import { fetchPostsCommented } from "@/utils/community";
import { useAuthStore } from "@/components/providers/auth-provider";
import { toast } from "sonner";
import moment from "moment";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

const MyCommentPage = () => {
    const [posts, setPosts] = useState<Posts[]>([]);
    const { sessionToken } = useAuthStore((store) => store);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const getPostsCommented = async () => {
            try {
                setLoading(true);
                const data = await fetchPostsCommented(sessionToken!);
                setLoading(false);
                setPosts(data);
                console.log(data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        getPostsCommented();
    }, [sessionToken]);
    if (!sessionToken) {
        toast.error("You Need To Sign In To View This Page!", {
            description: `${new Date().toLocaleString()}`,
            action: {
                label: "Close",
                onClick: () => console.log("Close"),
            },
        });
    }

    if (loading) {
        return (
            <div className="w-[823px] mt-3">
                <PostSkeleton />
                <PostSkeleton />
                <PostSkeleton />
                <PostSkeleton />
                <PostSkeleton />
            </div>
        );
    }

    return (
        <div className="w-[823px] mt-3">
            {posts.map((post) => (
                <Link
                    href={`/community/${post.categoryCommunity.name}/${post.id}`}
                    key={post.id}
                    className="flex flex-col gap-2 hover:bg-[#f5f5f5] rounded-lg p-3"
                >
                    <div className="flex items-center gap-3">
                        <h1 className="text-lg font-medium">{post.title}</h1>
                        <div className="flex gap-1 rounded-full bg-[#EFF0F4] px-3 py-2 justify-center items-center">
                            <Image
                                src={fitness_icon}
                                alt="logo"
                                width={13}
                                height={12}
                            />
                            <span className="text-[12px]">
                                {post.badge.name}
                            </span>
                        </div>
                    </div>

                    {post.comments.map((comment) => (
                        <div
                            key={comment.id}
                            className="flex flex-col w-full gap-3 mb-1"
                        >
                            <div className="flex flex-col p-2 bg-[#ebf4ff] w-full rounded-lg">
                                <span className="text-[10px] text-gray-500 font-medium">
                                    {comment.createAt
                                        ? moment(comment.createAt).fromNow()
                                        : "No date provided"}
                                </span>
                                <div className="text-sm line-clamp-3">
                                    {comment.detail}
                                </div>
                            </div>
                        </div>
                    ))}
                </Link>
            ))}
        </div>
    );
};

export default MyCommentPage;

const PostSkeleton = () => (
    <div className="animate-pulse flex flex-col gap-2 hover:bg-[#f5f5f5] rounded-lg p-3">
        <div className="flex items-center gap-3">
            <Skeleton className="h-6 bg-gray-300 rounded w-1/2"></Skeleton>
            <div className="flex gap-1 rounded-full bg-gray-200 px-3 py-2 justify-center items-center">
                <Skeleton className="h-4 bg-gray-300 rounded w-4"></Skeleton>
                <Skeleton className="w-16 bg-gray-300 rounded h-4"></Skeleton>
            </div>
        </div>
        <div className="flex flex-col w-full gap-3 mb-1">
            <div className="flex flex-col p-2 bg-gray-200 w-full rounded-lg">
                <Skeleton className="h-2 bg-gray-300 rounded w-1/4 mb-1"></Skeleton>
                <Skeleton className="h-2 bg-gray-300 rounded w-full"></Skeleton>
                <Skeleton className="h-2 bg-gray-300 rounded w-2/3"></Skeleton>
            </div>
        </div>
    </div>
);
