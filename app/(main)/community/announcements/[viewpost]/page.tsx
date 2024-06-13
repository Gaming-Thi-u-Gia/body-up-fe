"use client";
import React, { useEffect, useState, useTransition } from "react";
import defaultProfile from "/public/default-iProfile.png";
import Image from "next/image";
import fitness_icon from "/public/fitness-icon.svg";
import message_icon from "/public/message-icon.svg";
import saved_icon from "/public/saved-posts-icon.svg";
import share_icon from "/public/share-icon.svg";
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
import { ChevronDown } from "lucide-react";

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
    fetchCommentData,
    fetchPostById,
} from "@/utils/community";
import { toast } from "sonner";
import { CommentSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { useAuthStore } from "@/components/providers/auth-provider";
import { Posts } from "../../user-post-no-image";

export type Comments = {
    id: number;
    detail: string;
    upVote: number;
    user: {
        avatar: string;
        firstName: string;
        email: string;
        lastName: string;
        id: number;
    };
};

const AnnoucementPost = () => {
    const pathname = usePathname();
    const pathParts = pathname.split("/");
    const title = pathParts[2];
    const postId = pathParts[3];
    const [posts, setPosts] = useState<Posts>();
    const { sessionToken } = useAuthStore((store) => store);
    const [isPending, startTransition] = useTransition();
    const [comments, setComments] = useState<Comments[]>([]);
    const form = useForm({
        resolver: zodResolver(CommentSchema),
        defaultValues: {
            detail: "",
        },
    });

    useEffect(() => {
        const fetchComments = async () => {
            try {
                console.log("render");
                const res = await fetchCommentData(Number(postId));
                console.log(res);
                setComments(res);
            } catch (error) {
                console.log(error);
            }
        };
        fetchComments();
    }, [postId]);

    useEffect(() => {
        const fetchFullPost = async () => {
            try {
                const data = await fetchPostById(Number(postId));
                console.log(data);
                setPosts(data);
            } catch (error) {
                toast.error("Something went wrong");
            }
        };
        fetchFullPost();
    }, [postId]);
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

    return (
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
                <div className="w-full flex justify-between items-center ">
                    <div className="flex gap-2 items-center ">
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
                                        className="cursor-pointer py-2 rounded-full"
                                    />
                                    <label
                                        className="text-[16px] font-semibold mt-2"
                                        htmlFor=""
                                    >
                                        {posts?.user.firstName}
                                    </label>
                                    <div className="flex flex-col gap-2 mt-1">
                                        <span className="text-sm">
                                            {posts?.user.email}
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
                        <label
                            className="text-[#303033] text-sm font-bold cursor-pointer"
                            htmlFor=""
                        >
                            {posts?.user.firstName}
                        </label>
                        <span className="text-sm">5 days ago</span>
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
                                {posts?.badge.name}
                            </span>
                        </div>
                    </div>
                </div>
                <Link
                    href="/community/fitness"
                    className="text-black text-lg font-medium mt-3"
                >
                    {posts?.title}
                </Link>
                <div className="text-[#303033] text-[16px] mt-2">
                    {posts?.description}
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
                    >
                        <Image
                            src={saved_icon}
                            alt="logo"
                            width={20}
                            height={20}
                        />
                        <span className="text-[12px]">Saved</span>
                    </Button>
                    <Button
                        variant="secondary"
                        className="flex gap-1 rounded-full bg-[#EFF0F4] p-4 justify-center items-center"
                    >
                        <Image
                            src={share_icon}
                            alt="logo"
                            width={20}
                            height={20}
                        />
                        <span className="text-[12px]">Share</span>
                    </Button>
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
            {/* <Comment />
            <Comment />
            <Comment />
            <Comment /> */}
        </div>
    );
};

export default AnnoucementPost;
