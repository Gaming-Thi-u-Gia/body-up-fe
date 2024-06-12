"use client";
import React, { useEffect, useState } from "react";

import PostUser from "@/app/(main)/community/user-post-no-image";
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
    created_at: Date | string;
};

const FitnessPage = () => {
    const categoryId = 1;
    const [posts, setPosts] = useState<Posts[]>([]);

    useEffect(() => {
        const getPostsByCategory = async () => {
            try {
                const data = await fetchPostData(categoryId);
                const formattedData = data.map((post: Posts) => ({
                    ...post,
                    created_at: new Date(post.created_at),
                }));

                setPosts(formattedData);
                console.log(data);
                console.log("hello");
            } catch (error) {
                console.log(error);
            }
        };
        getPostsByCategory();
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

export default FitnessPage;
