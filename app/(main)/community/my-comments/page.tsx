/* eslint-disable react/no-unescaped-entities */
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

const MyCommentPage = () => {
    const [posts, setPosts] = useState<Posts[]>([]);
    const { sessionToken } = useAuthStore((store) => store);
    useEffect(() => {
        const getPostsCommented = async () => {
            try {
                const data = await fetchPostsCommented(sessionToken!);
                setPosts(data);
                console.log(data);
            } catch (error) {
                console.log(error);
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
                            key={post.id}
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
