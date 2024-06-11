"use client";
import React, { useEffect, useState, useTransition } from "react";

import { Input } from "@/components/ui/input";
import { PostSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { createPostNoImage, fetchBadgesData } from "@/utils/community";
import { useAuthStore } from "@/components/providers/auth-provider";

type Badges = {
    id: number;
    name: string;
};

type CategoryId = {
    categoryId: number;
};

const CreatePost = ({ categoryId }: CategoryId) => {
    const { sessionToken } = useAuthStore((store) => store);
    const [badges, setBadges] = useState<Badges[]>([{ id: 0, name: "" }]);
    const [isPending, startTransition] = useTransition();

    const form = useForm({
        resolver: zodResolver(PostSchema),
        defaultValues: {
            title: "",
            description: "",
            badge: {
                id: 0,
                name: "",
            },
        },
    });

    useEffect(() => {
        const fetchBadge = async () => {
            try {
                const data = await fetchBadgesData();
                console.log(data);
                setBadges(data);
            } catch (error) {
                toast.error("Failed to fetch tags");
                console.log(error);
            }
        };

        fetchBadge();
    }, []);
    useEffect(() => {
        console.log("Updated badges:", badges);
        console.log("Updated categoryId:", categoryId);
    }, [badges]);

    const onSubmit = (data: z.infer<typeof PostSchema>) => {
        startTransition(async () => {
            try {
                const selectedBadge = badges.find(
                    (badge) => badge.name === data.badge.name
                );
                if (!selectedBadge) {
                    throw new Error("Selected badge not found");
                }
                const response = await createPostNoImage(
                    data,
                    sessionToken!,
                    selectedBadge.id,
                    categoryId
                );
                toast.success("Create Post Successfully!", {
                    description: `${new Date().toLocaleString()}`,
                    action: {
                        label: "Close",
                        onClick: () => console.log("Close"),
                    },
                });
            } catch (error) {
                toast.error("Something Went Wrong!", {
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
        <div className="w-full bg-white rounded-lg py-7">
            <h1 className="px-5 py-2 text-[20px] font-semibold ">
                Create A New Post
            </h1>

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-5 mt-2"
                >
                    <div className="flex items-center justify-center px-8 py-5 w-[95%] bg-[#FAFAFA] mx-auto rounded-lg border border-[#E3E4EB]">
                        <div className="space-y-2 w-[746px]">
                            <span className="text-[10px] pt-2 font-bold flex items-center">
                                Post title
                            </span>
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type="input"
                                                placeholder="Write meaningfull post title"
                                                className=" text-[12px] bg-white hover:ring-1 hover:ring-black"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            ></FormField>
                            <span className="text-[10px] pt-2 font-bold flex items-center">
                                Post details
                            </span>

                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Textarea
                                                {...field}
                                                placeholder="Write a detailed post"
                                                className="rounded-lg bg-white p-3 text-[12px] h-[146px]"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            ></FormField>
                            <span className="text-[10px] pt-2 font-bold flex items-center">
                                Select A Tag
                            </span>

                            <FormField
                                control={form.control}
                                name="badge"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Select
                                                onValueChange={(value) => {
                                                    const badge = badges.find(
                                                        (badge) =>
                                                            badge.name === value
                                                    );
                                                    field.onChange(badge);
                                                }}
                                                value={field.value.name}
                                            >
                                                <SelectTrigger className="w-full rounded-lg">
                                                    <SelectValue placeholder="Select a tag" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {badges.map(
                                                        (badge: Badges) =>
                                                            badge.name && (
                                                                <SelectItem
                                                                    key={
                                                                        badge.id
                                                                    }
                                                                    value={
                                                                        badge.name
                                                                    }
                                                                >
                                                                    {badge.name}
                                                                </SelectItem>
                                                            )
                                                    )}
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            ></FormField>
                        </div>
                    </div>
                    <div className=" flex items-center justify-end gap-2 mt-3 mr-5">
                        <Button variant="default" type="button">
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="primary"
                            className="px-10 py-2 flex"
                        >
                            Create
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default CreatePost;
