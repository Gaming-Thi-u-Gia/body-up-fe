"use client";
import React, { useEffect, useState } from "react";
import PostUser from "../user-post-no-image";
import { fetchPostData } from "@/utils/community";
export type Posts = {
    id: number;
    title: string;
    description: string;
    user: {
        id: number;
        firstName: string;
        lastName: string;
        username: string;
        email: string;
        avatar: string;
        profile_picture: string;
    };
    badge: {
        id: number;
        name: string;
    };
    categoryCommunity: {
        categoryId: number;
        name: string;
    };
    created_at: Date;
};
const FeedbackPage = () => {
    const categoryId = 4;
    const [posts, setPosts] = useState<Posts[]>([]);

    useEffect(() => {
        const getPostsByCategory = async () => {
            try {
                const data = await fetchPostData(categoryId);
                setPosts(data);
                console.log(data);
                console.log("hello");
            } catch (error) {
                console.log(error);
            }
        };
        // if (posts === null) {
        getPostsByCategory();
        //
    }, [categoryId]);

    return (
        <div className="w-[823px] mt-3">
            {posts.map((post) => (
                <div key={post.id}>
                    <PostUser post={post} />
                </div>
            ))}
        </div>
    );
};

export default FeedbackPage;
