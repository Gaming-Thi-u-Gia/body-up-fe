/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useEffect, useState, useTransition } from "react";
import defaultProfile from "/public/default-iProfile.png";
import Image from "next/image";
import message_icon from "/public/message-icon.svg";
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
import { Textarea } from "@/components/ui/textarea";
import back_Icon from "/public/back-icon.svg";
import { usePathname } from "next/navigation";
import { Bookmark, ChevronDown } from "lucide-react";
import { Gallery, Item } from "react-photoswipe-gallery";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Comment from "../../comment";
import {
    createComment,
    fetchBookmarkPost,
    fetchCommentData,
    fetchPostById,
} from "@/utils/community";
import { useAuthStore } from "@/components/providers/auth-provider";
import { Posts } from "../../user-post-no-image";
import { toast } from "sonner";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CommentSchema } from "@/schemas";
import { z } from "zod";
import { SharePostModal } from "@/components/modals/share-modal";
import { Comments } from "../../view-post";
import moment from "moment";
import { Skeleton } from "@/components/ui/skeleton";
const BeforeAfterPost = () => {
    const pathname = usePathname();
    const pathParts = pathname.split("/");
    const postId = pathParts[3];
    const title = pathParts[2];
    const { sessionToken } = useAuthStore((store) => store);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [comments, setComments] = useState<Comments[]>([]);
    const [isPending, startTransition] = useTransition();
    const [isLoading, setIsLoading] = useState(false);
    const form = useForm({
        resolver: zodResolver(CommentSchema),
        defaultValues: {
            detail: "",
        },
    });
    const [posts, setPosts] = useState<Posts>();
    useEffect(() => {
        const fetchComments = async () => {
            try {
                console.log("render");
                setIsLoading(true);
                const res = await fetchCommentData(Number(postId));
                console.log(res);
                setComments(res);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchComments();
    }, [postId]);
    useEffect(() => {
        const fetchFullPost = async () => {
            try {
                setIsLoading(true);
                const data = await fetchPostById(Number(postId), sessionToken!);
                console.log(data);
                setIsBookmarked(data.bookmarked);
                setPosts(data);
                setIsLoading(false);
            } catch (error) {
                toast.error("Something went wrong");
            } finally {
                setIsLoading(false);
            }
        };
        fetchFullPost();
    }, [sessionToken, postId]);
    const handleBookmark = async () => {
        try {
            if (!sessionToken)
                return toast.error("You Need To Sign In To Bookmark!", {
                    description: `${new Date().toLocaleString()}`,
                    action: {
                        label: "Close",
                        onClick: () => console.log("Close"),
                    },
                });

            const data = await fetchBookmarkPost(Number(postId), sessionToken!);
            console.log(data);
            setIsBookmarked(data.bookmarked);
            console.log(data.bookmarked);
            if (data.bookmarked === true) {
                toast.success("Post Bookmarked Successfully!", {
                    description: `${new Date().toLocaleString()}`,
                    action: {
                        label: "Close",
                        onClick: () => console.log("Close"),
                    },
                });
            } else {
                toast.success("Post Removed Bookmark Successfully!", {
                    description: `${new Date().toLocaleString()}`,
                    action: {
                        label: "Close",
                        onClick: () => console.log("Close"),
                    },
                });
            }
        } catch (error) {
            console.error("Error during API call:", error);
            toast.error("Something Went Wrong!.", {
                description: `${new Date().toLocaleString()}`,
                action: {
                    label: "Close",
                    onClick: () => console.log("Close"),
                },
            });
        }
    };
    const onSubmit = (data: z.infer<typeof CommentSchema>) => {
        console.log(data);

        startTransition(async () => {
            try {
                const res = await createComment(
                    sessionToken!,
                    Number(postId),
                    data
                );
                toast.success("Create Comment Successfully!", {
                    description: `${new Date().toLocaleString()}`,
                    action: {
                        label: "Close",
                        onClick: () => console.log("Close"),
                    },
                });
                setComments((prev) => [...prev, res.payload]);
                window.location.reload();
            } catch (error) {
                toast.error("You Need To Sign In To Comment!", {
                    description: `${new Date().toLocaleString()}`,
                    action: {
                        label: "Close",
                        onClick: () => console.log("Close"),
                    },
                });
            }
        });
    };
    if (isLoading)
        return (
            <div className="w-[823px] mt-[5%]">
                <BeforeAfterPostSkeleton />
            </div>
        );

    return (
        <Gallery>
            <div className="w-[823px] mt-[5%]">
                <Link
                    href={`/community/${title}`}
                    className="flex gap-2 items-center justify-start mb-4"
                >
                    <Image src={back_Icon} width={24} height={24} alt="back" />
                    <span className="text-[15px] text-black flex gap-2 ">
                        Back to <span>#{title}</span>
                    </span>
                </Link>

                <div className="w-full flex flex-col p-2 gap-2 hover:bg-[#f5f5f5] rounded-lg">
                    <div className="flex gap-2 items-center">
                        <Sheet>
                            <SheetTrigger>
                                <Image
                                    src={posts?.user.avatar || defaultProfile}
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
                                            posts?.user.avatar || defaultProfile
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
                                        {posts?.user.username}
                                    </label>
                                    <div className="flex flex-col gap-2 mt-1">
                                        <span className="text-sm">
                                            {posts?.user.username}
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
                                {posts?.user.username}
                            </label>
                            <span className="font-light text-black ">
                                {posts?.createdAt
                                    ? moment(posts?.createdAt).fromNow()
                                    : "No date provided"}
                            </span>
                        </div>
                    </div>
                    <div className="text-black text-lg font-medium mt-3">
                        {posts?.title}
                    </div>
                    <div className="text-[#303033] text-[16px] mt-2">
                        {posts?.description}
                    </div>
                    <div className="w-full flex items-center gap-4">
                        <div className="flex flex-col gap-1 w-[50%]">
                            <span className="text-[12px] font-bold">
                                Before
                            </span>
                            <Item
                                original={posts?.imgBefore}
                                thumbnail={posts?.imgBefore}
                                width={1000}
                                height={800}
                            >
                                {({ ref, open }) => (
                                    <Image
                                        ref={ref}
                                        onClick={open}
                                        src={posts?.imgBefore!}
                                        alt=""
                                        width={0}
                                        height={0}
                                        sizes="100"
                                        className="w-[100%] h-[100%] object-cover rounded-xl "
                                        // priority={true}
                                    />
                                )}
                            </Item>
                            <span className="text-[12px] font-semibold flex items-stretch bg-[#EFF0F4] rounded-full p-2 mt-2">
                                Date Taken:{" "}
                                {posts?.dayBefore &&
                                    new Date(
                                        posts.dayBefore
                                    ).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })}
                            </span>
                        </div>
                        <div className="flex flex-col gap-1 w-[50%]">
                            <span className="text-[12px] font-bold">After</span>
                            <Item
                                original={posts?.imgAfter}
                                thumbnail={posts?.imgAfter}
                                width={1000}
                                height={800}
                            >
                                {({ ref, open }) => (
                                    <Image
                                        ref={ref}
                                        onClick={open}
                                        src={posts?.imgAfter!}
                                        width={0}
                                        height={0}
                                        sizes="100"
                                        alt=""
                                        className="w-[100%] h-[100%] object-cover rounded-xl "
                                        // priority={true}
                                    />
                                )}
                            </Item>

                            <span className="text-[12px] font-semibold flex items-stretch bg-[#EFF0F4] rounded-full p-2 mt-2">
                                Date Taken:{" "}
                                {posts?.dayAfter &&
                                    new Date(posts.dayAfter).toLocaleDateString(
                                        "en-US",
                                        {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        }
                                    )}
                            </span>
                        </div>
                    </div>
                    <div className="flex gap-2 items-center mt-6">
                        <Button
                            variant="secondary"
                            className="flex gap-1 rounded-full bg-[#EFF0F4] p-4 justify-center items-center"
                        >
                            <Image
                                src={message_icon}
                                alt="logo"
                                width={20}
                                height={20}
                            />
                            <span className="text-[12px]">
                                <span>33</span> Replies
                            </span>
                        </Button>
                        <Button
                            variant="secondary"
                            className="flex gap-1 rounded-full bg-[#EFF0F4] p-4 justify-center items-center"
                            onClick={() => handleBookmark()}
                        >
                            <Bookmark
                                size={20}
                                fill={isBookmarked ? "#7065cd" : "transparent"}
                                strokeWidth={1}
                            />
                            <span className="text-[12px]">Saved</span>
                        </Button>
                        {posts && <SharePostModal post={posts} />}
                    </div>

                    <hr className="mt-3" />
                </div>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-5 mt-2"
                    >
                        <div className="w-full px-2 flex flex-col gap-1">
                            <h1 className="flex items-center p-1 font-bold">
                                Post A Reply
                            </h1>
                            <FormField
                                control={form.control}
                                name="detail"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Textarea
                                                {...field}
                                                placeholder="Write a response for this post"
                                                className="rounded-lg bg-transparent p-3 text-[16px]"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            ></FormField>

                            <div className=" flex items-center justify-end mt-3">
                                <Button
                                    type="submit"
                                    variant="primary"
                                    className="w-[188px] h-9 flex"
                                >
                                    Reply
                                </Button>
                            </div>
                            <hr className="mt-3" />
                        </div>
                    </form>
                </Form>

                {/* comment section */}
                <div className="flex items-center mt-10 gap-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <div className="flex items-center cursor-pointer ">
                                <span className="text-sm">Latest</span>
                                <ChevronDown className="text-sm w-[18.72px]" />
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            className="w-35 absolute mt-5 "
                            side="left"
                        >
                            <DropdownMenuGroup>
                                <DropdownMenuItem>
                                    <span>Latest</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <span>Upvotes</span>
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                {comments.map((comment: Comments) => (
                    <div key={comment.id}>
                        <Comment comment={comment} />
                    </div>
                ))}
            </div>
        </Gallery>
    );
};

export default BeforeAfterPost;

const BeforeAfterPostSkeleton = () => {
    return (
        <div className="w-[823px] mt-[5%] animate-pulse">
            <div className="flex items-center space-x-4">
                {/* Skeleton for back link */}
                <Skeleton className="h-6 w-6 rounded-full" />
                <Skeleton className="h-6 w-64" />
            </div>

            <div className="w-full flex flex-col p-2 gap-2 rounded-lg">
                {/* Skeleton for user avatar and info */}
                <div className="flex gap-2 items-center">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <Skeleton className="h-6 w-40" />
                </div>

                {/* Skeleton for title */}
                <Skeleton className="h-8 w-full mt-3" />

                {/* Skeleton for description */}
                <Skeleton className="h-6 w-[90%] mt-2" />
                <Skeleton className="h-6 w-[80%]" />

                {/* Skeleton for images 'Before' and 'After' */}
                <div className="w-full flex items-center gap-4">
                    <div className="flex flex-col gap-1 w-[50%]">
                        <Skeleton className="h-4 w-[30%]" />
                        <Skeleton className="h-60 w-full rounded-xl" />
                        <Skeleton className="h-4 w-[90%] mt-2" />
                    </div>
                    <div className="flex flex-col gap-1 w-[50%]">
                        <Skeleton className="h-4 w-[30%]" />
                        <Skeleton className="h-60 w-full rounded-xl" />
                        <Skeleton className="h-4 w-[90%] mt-2" />
                    </div>
                </div>

                {/* Skeleton for buttons at the bottom */}
                <div className="flex gap-2 items-center mt-6">
                    <Skeleton className="h-10 w-36 rounded-full" />
                    <Skeleton className="h-10 w-36 rounded-full" />
                </div>
            </div>

            {/* Skeleton for comment form */}
            <div className="flex flex-col mt-10 gap-2 w-full">
                <Skeleton className="h-10 w-[20%]" />
                <Skeleton className="h-12 w-full rounded-lg" />
                <Skeleton className="h-10 w-48 self-end mt-3" />
            </div>
        </div>
    );
};
