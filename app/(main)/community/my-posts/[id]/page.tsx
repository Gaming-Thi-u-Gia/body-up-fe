"use client";
import React, { useEffect, useState } from "react";
import EditPost from "../../edit-post";
import { Posts } from "../../user-post-no-image";
import { fetchPostById } from "@/utils/community";
import { useParams } from "next/navigation";
import { useAuthStore } from "@/components/providers/auth-provider";

const EditPage = () => {
    const [post, setPost] = useState<Posts>();
    const param = useParams();
    const { sessionToken } = useAuthStore((store) => store);
    const [isLoading, setIsLoading] = useState(false);
    const { id } = param;
    useEffect(() => {
        const getPostById = async () => {
            try {
                setIsLoading(true);
                const res = await fetchPostById(Number(id), sessionToken!);
                console.log("Post data: ", res);
                setPost(res);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        };
        getPostById();
    }, [id, sessionToken]);
    if (isLoading) {
        return <div>Loading...</div>;
    }
    return (
        <div className="w-[828px] mt-[5%]">
            {post ? (
                <EditPost post={post} />
            ) : (
                <div>Loading post...</div> // Hoặc spinner loading
            )}
        </div>
    );
};

export default EditPage;
