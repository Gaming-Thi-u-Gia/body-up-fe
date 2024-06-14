import { CommentSchema, PostSchema } from "@/schemas";
import { z } from "zod";

export const fetchBadgesData = async () => {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1}/badges`
        );
        console.log(process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1);

        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error("Error while fetching badges");
    }
};

export const createPostNoImage = async (
    data: z.infer<typeof PostSchema>,
    sessionToken: string,
    badgeId: number,
    categoryId: number
) => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1}/posts/create?&badgeId=${badgeId}&categoryId=${categoryId}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${sessionToken}`,
                    credentials: "include",
                },
                body: JSON.stringify(data),
            }
        ).then(async (res) => {
            const payload = await res.json();
            const data = {
                status: res.status,
                payload,
            };
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            return data;
        });
    } catch (error) {
        throw new Error("Something went wrong");
    }
};

export const fetchPostData = async (categoryId: number) => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1}/posts/getAllPostByCategory?categoryId=${categoryId}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        ).then(async (res) => {
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            const data = res.json();
            console.log(data);
            return data;
        });

        return res;
    } catch (error) {
        throw new Error("Error while fetching posts");
    }
};

export const fetchPostById = async (postId: number) => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1}/posts/getPostById?postId=${postId}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        ).then(async (res) => {
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            const data = res.json();
            return data;
        });
        return res;
    } catch (error) {
        throw new Error("Error while fetching post");
    }
};
export const createComment = async (
    sessionToken: string,
    postId: number,
    data: z.infer<typeof CommentSchema>
) => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1}/comments/create?postId=${postId}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${sessionToken}`,
                    credentials: "include",
                },
                body: JSON.stringify(data),
            }
        ).then(async (res) => {
            const payload = await res.json();
            const data = {
                status: res.status,
                payload,
            };
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            return data;
        });
        return res;
    } catch (error) {
        throw new Error("Something went wrong");
    }
};

export const fetchCommentData = async (postId: number) => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1}/comments/getAllComments?postId=${postId}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        ).then(async (res) => {
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            const data = res.json();
            return data;
        });
        return res;
    } catch (error) {
        throw new Error("Error while fetching comments");
    }
};

export const fetchUpvote = async (commentId: number, upVote: number) => {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1}/comments/upvoteComment?commentId=${commentId}&upVote=${upVote}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        ).then(async (res) => {
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            const data = res.json();
            return data;
        });
        return response;
    } catch (error) {
        throw new Error("Error while fetching upvote");
    }
};

export const fetchBookmarkPost = async (
    postId: number,
    sessionToken: string
) => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1}/posts/bookmarkPosts?postId=${postId}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${sessionToken}`,
                    credentials: "include",
                },
            }
        ).then(async (res) => {
            const data = await res.json();
            return data;
        });
        return res;
    } catch (error) {
        throw new Error("Error while fetching bookmark post");
    }
};
