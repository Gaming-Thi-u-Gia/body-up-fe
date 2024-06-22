"use client";
import React, { useEffect, useState, useTransition } from "react";
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
import { Button } from "@/components/ui/button";
import Image from "next/image";
import defaultProfile from "/public/default-iProfile.png";
import reply_icon from "/public/reply-icon.svg";
import { CornerDownRight } from "lucide-react";
import moment from "moment";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CommentSchema } from "@/schemas";
import { useAuthStore } from "@/components/providers/auth-provider";
import {
    createComment,
    fetchChildCommentData,
    fetchCommentById,
    fetchRootComment,
} from "@/utils/community";
import { usePathname } from "next/navigation";
import { toast } from "sonner";
import { z } from "zod";
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
        username: string;
    };
    createAt: string;
    parentId: number;
    children: Comments[];
};
const Comment = ({ comment }: { comment: Comments }) => {
    const [isOpennedReply, setIsOpennedReply] = useState(false);
    const { sessionToken } = useAuthStore((store) => store);
    const [isPending, startTransition] = useTransition();
    const [childrenComments, setChildrenComments] = useState<Comments[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const pathname = usePathname();
    const pathParts = pathname.split("/");
    const postId = pathParts[3];
    const [parentComment, setParentComment] = useState<Comments>();
    const [rootComment, setRootComment] = useState<Comments>();
    const form = useForm({
        resolver: zodResolver(CommentSchema),
        defaultValues: {
            detail: "",
            parentId: comment.id,
        },
    });

    useEffect(() => {
        if (comment.parentId !== null) {
            const fetchParentComment = async () => {
                try {
                    const parent = await fetchCommentById(comment.parentId);
                    setParentComment(parent);
                } catch (error) {
                    toast.error(
                        "Something went wrong fetching the parent comment!",
                        {
                            description: `${new Date().toLocaleString()}`,
                            action: {
                                label: "Close",
                                onClick: () => console.log("Close"),
                            },
                        }
                    );
                }
            };

            fetchParentComment();
        }
    }, [comment.parentId]);

    useEffect(() => {
        const getChildComments = async () => {
            try {
                const childComment = await fetchChildCommentData(comment.id);
                setChildrenComments(childComment);
                console.log(childComment);
            } catch (error) {
                console.log(error);
                toast.error("Something Went Wrong!", {
                    description: `${new Date().toLocaleString()}`,
                    action: {
                        label: "Close",
                        onClick: () => console.log("Close"),
                    },
                });
            }
        };
        getChildComments();
    }, [comment.id]);

    useEffect(() => {
        const getRootComment = async () => {
            try {
                const rootComment = await fetchRootComment(comment.id);
                setRootComment(rootComment);
            } catch (error) {
                toast.error(
                    "Something went wrong fetching the parent comment!",
                    {
                        description: `${new Date().toLocaleString()}`,
                        action: {
                            label: "Close",
                            onClick: () => console.log("Close"),
                        },
                    }
                );
            }
        };
        getRootComment();
    }, [comment.id]);

    const onSubmit = (data: z.infer<typeof CommentSchema>) => {
        console.log(data);
        startTransition(async () => {
            try {
                setIsLoading(true);
                const res = await createComment(
                    sessionToken!,
                    Number(postId),
                    data
                );
                setIsOpennedReply(false);
                console.log("Data add:", res.payload);
                setChildrenComments((prev) => [...prev, res.payload]);
                form.reset();
                toast.success("Create Comment Successfully!", {
                    description: `${new Date().toLocaleString()}`,
                    action: {
                        label: "Close",
                        onClick: () => console.log("Close"),
                    },
                });
            } catch (error) {
                toast.error("You Need To Sign In To Comment!", {
                    description: `${new Date().toLocaleString()}`,
                    action: {
                        label: "Close",
                        onClick: () => console.log("Close"),
                    },
                });
            } finally {
                setIsLoading(false);
            }
        });
    };

    if (isLoading) {
        return null;
    }

    return (
        <div className="flex flex-col gap-3 items-center ">
            {/* Comment Root */}
            <div className="gap-3 flex flex-col w-full">
                <div className="w-full flex justify-between items-center">
                    <div className="flex gap-2 items-center w-full">
                        <Sheet>
                            <SheetTrigger>
                                <Image
                                    src={comment.user.avatar || defaultProfile}
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
                                            comment.user.avatar ||
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
                                        {comment.user.username || "Anonymous"}
                                    </label>
                                    <div className="flex flex-col gap-2 mt-1">
                                        <span className="text-sm">
                                            {comment.user.email}
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
                            {comment.user.username || "Anonymous"}
                        </label>
                        <span className="text-sm">
                            {" "}
                            {comment?.createAt
                                ? moment(comment?.createAt).fromNow()
                                : "No date provided"}
                        </span>
                    </div>
                    <div className="flex gap-2 items-center">
                        <Button
                            variant="secondary"
                            className="flex gap-1 rounded-full bg-[#EFF0F4] w-[81.64px] p-2 justify-center items-center"
                            onClick={() =>
                                setIsOpennedReply(
                                    (isOpennedReply) => !isOpennedReply
                                )
                            }
                        >
                            <Image
                                src={reply_icon}
                                alt="logo"
                                width={13}
                                height={12}
                            />
                            <span className="text-[12px]">Reply</span>
                        </Button>
                    </div>
                </div>

                {/* Nội dung của bình luận cha khi Reply */}
                {comment.parentId !== null && (
                    <div className="w-full flex flex-col break-all  bg-[#ebf4ff] p-2 border-l-2 border-[#1890ff]">
                        <div className="flex gap-2">
                            <span className="text-[#999898] font-sm text-[12px]">
                                {parentComment?.user?.username || "Anonymous"}
                            </span>
                            <span className="text-[#999898] font-sm text-[12px]">
                                {parentComment?.createAt
                                    ? moment(parentComment?.createAt).fromNow()
                                    : "No date provided"}
                            </span>
                        </div>
                        <div className="w-full line-clamp-2">
                            {parentComment?.detail}
                        </div>
                    </div>
                )}

                <div className="w-full flex justify-between items-center break-all ">
                    <div className="w-full">{comment.detail}</div>
                    <div className=""></div>
                </div>
                <hr className="w-full" />
                {/* Reply Comment Root */}
                {isOpennedReply && (
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-5 mt-2 w-full"
                        >
                            <div className="w-full flex flex-col gap-1">
                                <h1 className="flex items-center p-1 font-semibold">
                                    Reply To Comment
                                </h1>
                                <FormField
                                    control={form.control}
                                    name="detail"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Textarea
                                                    {...field}
                                                    placeholder="Write a reply"
                                                    className="rounded-lg bg-transparent p-3 text-[16px]"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                ></FormField>

                                <div className=" flex items-center justify-end gap-2 mt-3">
                                    <Button
                                        variant="default"
                                        onClick={() => setIsOpennedReply(false)}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        variant="primary"
                                        className="w-[188px] h-9 flex"
                                        disabled={isPending}
                                    >
                                        Reply
                                    </Button>
                                </div>
                                <hr className="mt-3" />
                            </div>
                        </form>
                    </Form>
                )}
            </div>

            <div className="flex flex-row gap-4 w-full">
                {rootComment && rootComment.parentId === null && (
                    <CornerDownRight
                        width={20}
                        height={20}
                        className="flex items-start"
                    />
                )}
                {/* Comment Children */}
                <div className="flex flex-col w-full">
                    {childrenComments.map((child) => (
                        <Comment key={child.id} comment={child} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Comment;
