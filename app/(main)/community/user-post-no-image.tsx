"use client";
import React, { useEffect, useState } from "react";
import defaultProfile from "/public/default-iProfile.png";
import Image from "next/image";
import fitness_icon from "/public/fitness-icon.svg";
import message_icon from "/public/message-icon.svg";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import before_after from "/public/before-after-icon.svg";
import challenges_icon from "/public/challenges-icon.svg";
import share_icon from "/public/share-icon.svg";

import moment from "moment";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import { Bookmark } from "lucide-react";
import {
    fetchBookmarkPost,
    fetchFilterPost,
    fetchPostData,
    fetchSearchPost,
} from "@/utils/community";
import { useAuthStore } from "@/components/providers/auth-provider";
import { toast } from "sonner";
import { useSharePostModal } from "@/stores/use-share-model";
import { SharePostModal } from "@/components/modals/share-modal";
import { Skeleton } from "@/components/ui/skeleton";
import { Comments } from "./comment";
import InfiniteScroll from "react-infinite-scroll-component";
import { useFilterStore } from "@/stores/use-filter-community";
import useSearchStore from "@/stores/use-search-post";
export type Posts = {
    id: number;
    title: string;
    description: string;
    bookmarked: boolean;
    imgBefore: string;
    imgAfter: string;
    dayBefore: string;
    dayAfter: string;
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
    comments: Comments[];
    createdAt: string;
};
type CategoryId = {
    categoryId: number;
};
export type BookmarkStatus = {
    [key: number]: boolean;
};

const PostUser = ({ categoryId }: CategoryId) => {
    const [posts, setPosts] = useState<Posts[]>([]);
    const { sessionToken } = useAuthStore((store) => store);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isBookmarked, setIsBookmarked] = useState<{
        [key: number]: boolean;
    }>({});
    const [page, setPage] = useState(0);
    const [hasMorePosts, setHasMorePosts] = useState(false);
    const { open, setPosts: setPostsZustand } = useSharePostModal(
        (store) => store
    );
    const { selectedFilter, setSelectedFilter } = useFilterStore();
    const { searchText } = useSearchStore();
    console.log("Search:", searchText);

    useEffect(() => {
        setPosts([]);
        setPage(0);
    }, [selectedFilter, searchText]);

    useEffect(() => {
        if (page === 0) {
            getPostsByCategory();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, selectedFilter, categoryId, searchText]);

    const getPostsByCategory = async () => {
        try {
            setIsLoading(true);
            const size = 4;
            let data: Posts[] = [];
            if (searchText === "") {
                if (selectedFilter === "All") {
                    data = await fetchPostData(
                        categoryId,
                        sessionToken!,
                        page,
                        size
                    );
                } else {
                    data = await fetchFilterPost(
                        sessionToken!,
                        selectedFilter,
                        categoryId,
                        page,
                        size
                    );
                }
            } else {
                data = await fetchSearchPost(
                    sessionToken!,
                    searchText,
                    categoryId,
                    page,
                    size
                );
                setSelectedFilter("All");
            }

            if (data.length === 0) {
                setHasMorePosts(false);
                setIsLoading(false);
            }

            //* Filter out duplicate posts
            setPosts((prevPosts) => {
                const newPosts = [...prevPosts, ...data];
                const uniquePosts = newPosts.filter(
                    (post, index, self) =>
                        index === self.findIndex((p) => p.id === post.id)
                );
                const bookmarkStatus: BookmarkStatus = {};
                uniquePosts.forEach((post: Posts) => {
                    bookmarkStatus[post.id] = post.bookmarked;
                    setIsBookmarked(bookmarkStatus);
                });
                setPostsZustand(uniquePosts);
                return uniquePosts;
            });
            setHasMorePosts(data.length > 0);
            setPage((prevPage) => prevPage + 1);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleBookmark = async (id: number) => {
        try {
            if (!sessionToken) {
                toast.error("You Need To Sign In To Bookmark!", {
                    description: `${new Date().toLocaleString()}`,
                    action: {
                        label: "Close",
                        onClick: () => console.log("Close"),
                    },
                });
                return;
            }

            const response = await fetchBookmarkPost(id, sessionToken!);
            console.log(response);
            if (response && response.bookmarked !== undefined) {
                const updatedPosts = posts.map((post) =>
                    post.id === id
                        ? { ...post, bookmarked: response.bookmarked }
                        : post
                );
                setPostsZustand(updatedPosts);
                setPosts(updatedPosts);
                setIsBookmarked({
                    ...isBookmarked,
                    [id]: response.bookmarked,
                });
                console.log(isBookmarked);
                if (response.bookmarked) {
                    toast.success("Post Bookmarked!", {
                        description: `${new Date().toLocaleString()}`,
                        action: {
                            label: "Close",
                            onClick: () => console.log("Close"),
                        },
                    });
                } else {
                    toast.success("Post Unbookmarked!", {
                        description: `${new Date().toLocaleString()}`,
                        action: {
                            label: "Close",
                            onClick: () => console.log("Close"),
                        },
                    });
                }
            } else {
                throw new Error("Invalid response structure from backend");
            }
        } catch (error) {
            toast.error("Error while bookmarking post!");
        }
    };

    const pathname = usePathname();
    const pathParts = pathname.split("/");
    const title = pathParts[2];
    return (
        <>
            <div>
                {isLoading && posts.length === 0 ? (
                    <div>
                        <PostSkeleton />
                        <PostSkeleton />
                        <PostSkeleton />
                    </div>
                ) : (
                    <InfiniteScroll
                        dataLength={posts.length}
                        next={getPostsByCategory}
                        hasMore={hasMorePosts}
                        loader={
                            <div>
                                <PostSkeleton />
                            </div>
                        }
                        endMessage={
                            <p style={{ textAlign: "center" }}>
                                <b>Yay! You have seen it all</b>
                            </p>
                        }
                    >
                        {posts.map((post) => (
                            <div
                                key={post.id}
                                className="w-full mb-10 flex flex-col p-2 gap-2 bor hover:bg-[#f5f5f5] rounded-lg"
                            >
                                <div className="w-full flex justify-between items-center ">
                                    <div className="flex gap-2 items-center ">
                                        <Sheet>
                                            <SheetTrigger>
                                                <Image
                                                    src={
                                                        post.user.avatar ||
                                                        defaultProfile
                                                    }
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
                                                        src={
                                                            post.user.avatar ||
                                                            defaultProfile
                                                        }
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
                                                                src={
                                                                    before_after
                                                                }
                                                                width={18}
                                                                height={18}
                                                                alt="logo"
                                                            />
                                                            <label
                                                                htmlFor=""
                                                                className="text-sm"
                                                            >
                                                                0 Challenges
                                                                Completed
                                                            </label>
                                                        </div>
                                                        <div className="flex gap-1">
                                                            <Image
                                                                src={
                                                                    challenges_icon
                                                                }
                                                                width={18}
                                                                height={18}
                                                                alt="logo"
                                                            />
                                                            <label
                                                                htmlFor=""
                                                                className="text-sm"
                                                            >
                                                                120 Achievement
                                                                Points
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
                                            {post.createdAt
                                                ? moment(
                                                      post.createdAt
                                                  ).fromNow()
                                                : "No date provided"}
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
                                            <span className="text-[12px]">
                                                {post.badge.name}
                                            </span>
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
                                    className="text-[#303033] text-[16px] mt-2  "
                                >
                                    <span className="line-clamp-2 break-all">
                                        {post.description}
                                    </span>
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
                                            <span>{post.comments.length}</span>{" "}
                                            Replies
                                        </Link>
                                    </Button>
                                    <Button
                                        variant="secondary"
                                        className="flex gap-1 rounded-full bg-[#EFF0F4] p-4 h-7 justify-center items-center"
                                        onClick={() => handleBookmark(post.id)}
                                    >
                                        <Bookmark
                                            size={20}
                                            fill={
                                                isBookmarked[post.id]
                                                    ? "#7065cd"
                                                    : "transparent"
                                            }
                                            strokeWidth={1}
                                        />
                                        <span className="text-[12px]">
                                            Saved
                                        </span>
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="secondary"
                                        size="default"
                                        className="flex gap-1 rounded-full bg-[#EFF0F4] p-4 h-7 justify-center items-center"
                                        onClick={() => open(post.id)}
                                    >
                                        <Image
                                            src={share_icon}
                                            alt="logo"
                                            width={20}
                                            height={20}
                                        />
                                        <span className="text-[12px]">
                                            Share
                                        </span>
                                    </Button>
                                </div>

                                <hr className="mt-3" />
                            </div>
                        ))}
                    </InfiniteScroll>
                )}
            </div>
        </>
    );
};

export default PostUser;

const PostSkeleton = () => (
    <div className="w-full mb-10 flex flex-col p-2 gap-2 rounded-lg">
        <div className="w-full flex justify-between items-center ">
            <div className="flex gap-2 items-center">
                {/* User avatar and username */}
                <Skeleton className="h-8 w-8 bg-gray-200 rounded-full" />
                <Skeleton className="h-6 bg-gray-200 w-40" />
                {/* Timestamp skeleton */}
                <Skeleton className="h-4 w-20 bg-gray-200" />
            </div>
            {/* Badge area */}
            <Skeleton className="h-6 w-24 bg-gray-200 rounded-full" />
        </div>
        {/* Title skeleton */}
        <Skeleton className="h-6 w-full mt-3 bg-gray-200" />
        {/* Description skeleton */}
        <Skeleton className="h-4 w-full mt-2 bg-gray-200" />
        <Skeleton className="h-4 w-[90%] bg-gray-200" />
        {/* Buttons for replies and save */}
        <div className="flex gap-2 mt-3">
            <Skeleton className="h-7 w-32 rounded-full bg-gray-200" />
            <Skeleton className="h-7 w-32 rounded-full bg-gray-200" />
        </div>
        {/* Bottom separator */}
        <Skeleton className="h-1 w-full mt-3 bg-gray-200" />
    </div>
);
