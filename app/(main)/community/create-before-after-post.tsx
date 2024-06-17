/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useCallback, useEffect, useState, useTransition } from "react";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { BeforeAfterPostSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";
import info_logo from "/public/info-logo.svg";
import { ChevronUp, ChevronDown } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { ImageIcon } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { createBeforeAfterPost, fetchBadgesData } from "@/utils/community";
import { useAuthStore } from "@/components/providers/auth-provider";
import { useRouter } from "next/navigation";
export type Badges = {
    id: number;
    name: string;
};

type CategoryId = {
    categoryId: number;
};
const CreateBeforeAfterPost = () => {
    const [preview, setPreview] = useState<string | null>(null);
    const [preview2, setPreview2] = useState<string | null>(null);
    const [badges, setBadges] = useState<Badges[]>([{ id: 0, name: "" }]);

    const onDrop = useCallback(
        (acceptedFiles: FileList, fileRejections: FileList) => {
            if (fileRejections.length > 0) {
                toast.error("Please upload a valid image file");
                return;
            }
            const file = new FileReader();
            file.onload = () => {
                setPreview(file.result as string);
            };

            file.readAsDataURL(acceptedFiles[0]);
        },
        []
    );
    const onDrop2 = useCallback(
        (acceptedFiles2: FileList, fileRejections2: FileList) => {
            if (fileRejections2.length > 0) {
                toast.error("Please upload a valid image file");
                return;
            }
            const file = new FileReader();
            file.onload = () => {
                setPreview2(file.result as string);
            };

            file.readAsDataURL(acceptedFiles2[0]);
        },
        []
    );

    const { getRootProps, getInputProps, acceptedFiles, fileRejections } =
        useDropzone({
            //@ts-ignore
            onDrop,
            accept: {
                "image/png": [".png"],
                "image/jpeg": [".jpeg"],
            },
            maxSize: 1000000,
        });
    const {
        getRootProps: getRootProps2,
        getInputProps: getInputProps2,
        acceptedFiles: acceptedFiles2,
        fileRejections: fileRejections2,
    } = useDropzone({
        //@ts-ignore
        onDrop: onDrop2,
        accept: {
            "image/png": [".png"],
            "image/jpeg": [".jpeg"],
        },
        maxSize: 1000000,
    });
    const [date, setDate] = React.useState<Date>();
    const [isPending, startTransition] = useTransition();

    const router = useRouter();
    const [isOpenedSecond, setIsOpenSecond] = useState(false);
    const [isOpenedFirst, setIsOpenFirst] = useState(true);
    const { sessionToken } = useAuthStore((store) => store);
    const form = useForm({
        resolver: zodResolver(BeforeAfterPostSchema),
        defaultValues: {
            title: "",
            imgBefore: null,
            imgAfter: null,
            dayBefore: new Date(),
            dayAfter: new Date(),
            moreImage: [],
            description: "",
            badge: {
                id: 0,
                name: "",
            },
            programSelect: "",
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

    const onSubmit = async (data: z.infer<typeof BeforeAfterPostSchema>) => {
        startTransition(async () => {
            try {
                data.imgBefore = acceptedFiles[0];
                data.imgAfter = acceptedFiles2[0];
                const selectedBadge = badges.find(
                    (badge) => badge.name === data.badge.name
                );
                if (!selectedBadge) {
                    throw new Error("Selected badge not found");
                }
                const res = await createBeforeAfterPost(
                    sessionToken!,
                    data,
                    selectedBadge.id,
                    2,
                    preview ?? "",
                    preview2 ?? ""
                );

                toast.success("Create Post Successfully!", {
                    description: `${new Date().toLocaleString()}`,
                    action: {
                        label: "Close",
                        onClick: () => console.log("Close"),
                    },
                });
                router.push("/community/before-after-results");

                console.log(res);
            } catch (error) {
                toast.error("Something went wrong!", {
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
        <div>
            <div className="w-full bg-white rounded-lg p-7">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-5"
                    >
                        <div
                            onClick={() =>
                                setIsOpenFirst((isOpenedFirst) => {
                                    setIsOpenSecond(false);
                                    return !isOpenedFirst;
                                })
                            }
                            className="w-full bg-[#FFECEC] flex justify-between  p-3 h-[52px] items-center rounded-lg mb-4"
                        >
                            <div className="flex items-center">
                                <Image
                                    src={info_logo}
                                    width={16}
                                    height={16}
                                    alt="logo"
                                />
                                <span className="text-[#E26664] text-[14px] font-semibold cursor-pointer ml-2">
                                    Upload Before & After Photos
                                </span>
                            </div>
                            <div className="flex items-center">
                                <span className="text-[#E26664] text-[10px] font-bold cursor-pointer">
                                    Complete All Fields
                                </span>
                                {isOpenedFirst ? (
                                    <ChevronDown className=" w-[15px] h-[12px] cursor-pointer text-black" />
                                ) : (
                                    <ChevronUp className=" w-[15px] h-[12px] cursor-pointer text-black" />
                                )}
                            </div>
                        </div>
                        {isOpenedFirst && (
                            <div>
                                <h1 className="px-5 py-2 text-[20px] font-semibold ">
                                    Create A New Post
                                </h1>
                                <div className="flex items-center justify-center px-8 py-5 w-[95%] bg-[#FAFAFA] mx-auto rounded-lg border border-[#E3E4EB]">
                                    <div className="space-y-2 w-[746px]">
                                        <span className="text-[10px] pt-2 font-bold flex items-center">
                                            Title
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
                                                            placeholder="Write meaningful post title"
                                                            className=" text-[12px] bg-white hover:ring-1 hover:ring-black"
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        ></FormField>
                                        <div className="flex items-center gap-4 w-full">
                                            <div className="flex flex-col w-[50%]">
                                                <span className="text-[10px] pt-2 font-bold flex items-center">
                                                    Before
                                                </span>
                                                <div className=" cursor-pointer overflow-hidden rounded-lg h-[350px] w-[320px] bg-[#edf4fc] flex flex-col justify-center items-center gap-5 border-dashed border-2 border-blue-400">
                                                    {preview ? (
                                                        <Image
                                                            src={preview!}
                                                            width={357}
                                                            height={357}
                                                            alt="preview"
                                                        />
                                                    ) : (
                                                        <FormField
                                                            control={
                                                                form.control
                                                            }
                                                            name="imgBefore"
                                                            render={({
                                                                field,
                                                            }) => (
                                                                <FormItem>
                                                                    <FormControl>
                                                                        <div
                                                                            {...getRootProps()}
                                                                            className="flex flex-col items-center justify-center gap-3 w-[357px] h-[357px]"
                                                                        >
                                                                            <Input
                                                                                {...getInputProps()}
                                                                            />
                                                                            <ImageIcon
                                                                                className="w-[33px] h-[33px]"
                                                                                strokeWidth="1"
                                                                            />
                                                                            <span className="text-[16px] font-semibold">
                                                                                Upload
                                                                                portrait
                                                                                image
                                                                            </span>
                                                                        </div>
                                                                    </FormControl>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        ></FormField>
                                                    )}

                                                    {/* asdasdasdasd todo */}
                                                </div>
                                            </div>
                                            <div className="flex flex-col w-[50%]">
                                                <span className="text-[10px] pt-2 font-bold flex items-center">
                                                    After
                                                </span>
                                                <div className=" cursor-pointer overflow-hidden rounded-lg h-[350px] w-[320px] bg-[#edf4fc] flex flex-col justify-center items-center gap-5 border-dashed border-2 border-blue-400">
                                                    {preview2 ? (
                                                        <Image
                                                            src={preview2!}
                                                            width={357}
                                                            height={357}
                                                            alt="preview"
                                                        />
                                                    ) : (
                                                        <FormField
                                                            control={
                                                                form.control
                                                            }
                                                            name="imgAfter"
                                                            render={({
                                                                field,
                                                            }) => (
                                                                <FormItem>
                                                                    <FormControl>
                                                                        <div
                                                                            {...getRootProps2()}
                                                                            className="flex flex-col items-center justify-center gap-3 w-[357px] h-[357px]"
                                                                        >
                                                                            <Input
                                                                                {...getInputProps2()}
                                                                            />
                                                                            <ImageIcon
                                                                                className="w-[33px] h-[33px]"
                                                                                strokeWidth="1"
                                                                            />
                                                                            <span className="text-[16px] font-semibold">
                                                                                Upload
                                                                                portrait
                                                                                image
                                                                            </span>
                                                                        </div>
                                                                    </FormControl>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        ></FormField>
                                                    )}

                                                    {/* asdasdasdasd todo */}
                                                </div>
                                            </div>
                                        </div>

                                        {/* date picker */}
                                        <div className="flex items-center w-full gap-4">
                                            <div className=" flex flex-col gap-2 w-[50%]">
                                                <span className="text-[10px] pt-2 font-bold flex items-center">
                                                    Date Taken
                                                </span>
                                                <FormField
                                                    control={form.control}
                                                    name="dayBefore"
                                                    render={({ field }) => (
                                                        <FormItem className="flex flex-col">
                                                            <Popover>
                                                                <PopoverTrigger
                                                                    asChild
                                                                >
                                                                    <FormControl>
                                                                        <Button
                                                                            variant="defaultOutline"
                                                                            className={cn(
                                                                                "w-[163px] pl-3 text-left font-normal bg-white rounded-lg",
                                                                                !field.value &&
                                                                                    "text-muted-foreground"
                                                                            )}
                                                                        >
                                                                            {field.value ? (
                                                                                format(
                                                                                    field.value,
                                                                                    "PPP"
                                                                                )
                                                                            ) : (
                                                                                <span>
                                                                                    Pick
                                                                                    a
                                                                                    date
                                                                                </span>
                                                                            )}
                                                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                                        </Button>
                                                                    </FormControl>
                                                                </PopoverTrigger>
                                                                <PopoverContent
                                                                    className="w-auto p-0"
                                                                    align="start"
                                                                >
                                                                    <Calendar
                                                                        mode="single"
                                                                        selected={
                                                                            field.value
                                                                        }
                                                                        onSelect={
                                                                            field.onChange
                                                                        }
                                                                        disabled={(
                                                                            date
                                                                        ) =>
                                                                            date >
                                                                                new Date() ||
                                                                            date <
                                                                                new Date(
                                                                                    "1900-01-01"
                                                                                )
                                                                        }
                                                                        initialFocus
                                                                    />
                                                                </PopoverContent>
                                                            </Popover>

                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                            <div className=" flex flex-col gap-2 w-[50%]">
                                                <span className="text-[10px] pt-2 font-bold flex items-center">
                                                    Date Taken
                                                </span>
                                                <FormField
                                                    control={form.control}
                                                    name="dayAfter"
                                                    render={({ field }) => (
                                                        <FormItem className="flex flex-col">
                                                            <Popover>
                                                                <PopoverTrigger
                                                                    asChild
                                                                >
                                                                    <FormControl>
                                                                        <Button
                                                                            variant="defaultOutline"
                                                                            className={cn(
                                                                                "w-[163px] pl-3 text-left font-normal bg-white rounded-lg",
                                                                                !field.value &&
                                                                                    "text-muted-foreground"
                                                                            )}
                                                                        >
                                                                            {field.value ? (
                                                                                format(
                                                                                    field.value,
                                                                                    "PPP"
                                                                                )
                                                                            ) : (
                                                                                <span>
                                                                                    Pick
                                                                                    a
                                                                                    date
                                                                                </span>
                                                                            )}
                                                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                                        </Button>
                                                                    </FormControl>
                                                                </PopoverTrigger>
                                                                <PopoverContent
                                                                    className="w-auto p-0"
                                                                    align="start"
                                                                >
                                                                    <Calendar
                                                                        mode="single"
                                                                        selected={
                                                                            field.value
                                                                        }
                                                                        onSelect={
                                                                            field.onChange
                                                                        }
                                                                        disabled={(
                                                                            date
                                                                        ) =>
                                                                            date >
                                                                                new Date() ||
                                                                            date <
                                                                                new Date(
                                                                                    "1900-01-01"
                                                                                )
                                                                        }
                                                                        initialFocus
                                                                    />
                                                                </PopoverContent>
                                                            </Popover>

                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-end gap-2 mt-3 mr-5">
                                            <Button
                                                variant="default"
                                                type="button"
                                            >
                                                Cancel
                                            </Button>
                                            <Button
                                                type="button"
                                                variant="primary"
                                                className="px-10 py-2 flex"
                                                onClick={() => {
                                                    setIsOpenSecond(true);
                                                    setIsOpenFirst(false);
                                                }}
                                            >
                                                Next
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div
                            onClick={() =>
                                setIsOpenSecond((isOpenedSecond) => {
                                    setIsOpenFirst(false);
                                    return !isOpenedSecond;
                                })
                            }
                            className="w-full bg-[#FFECEC] flex justify-between  p-3 h-[52px] items-center rounded-lg"
                        >
                            <div className="flex items-center">
                                <Image
                                    src={info_logo}
                                    width={16}
                                    height={16}
                                    alt="logo"
                                />
                                <span className="text-[#E26664] text-[14px] font-semibold cursor-pointer ml-2">
                                    Post Description & Tags
                                </span>
                            </div>
                            <div className="flex items-center">
                                <span className="text-[#E26664] text-[10px] font-bold cursor-pointer">
                                    Complete All Fields
                                </span>
                                {isOpenedSecond ? (
                                    <ChevronDown className=" w-[15px] h-[12px] cursor-pointer text-black" />
                                ) : (
                                    <ChevronUp className=" w-[15px] h-[12px] cursor-pointer text-black" />
                                )}
                            </div>
                        </div>
                        {isOpenedSecond && (
                            <div>
                                <div className="flex items-center justify-center px-8 py-5 w-[95%] bg-[#FAFAFA] mx-auto rounded-lg border border-[#E3E4EB]">
                                    <div className="space-y-2 w-[746px]">
                                        <span className="text-[10px] pt-2 font-bold flex items-center">
                                            Description
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
                                                            onValueChange={(
                                                                value
                                                            ) => {
                                                                const badge =
                                                                    badges.find(
                                                                        (
                                                                            badge
                                                                        ) =>
                                                                            badge.name ===
                                                                            value
                                                                    );
                                                                field.onChange(
                                                                    badge
                                                                );
                                                            }}
                                                            value={
                                                                field.value.name
                                                            }
                                                        >
                                                            <SelectTrigger className="w-full rounded-lg">
                                                                <SelectValue placeholder="Select a tag" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {badges.map(
                                                                    (
                                                                        badge: Badges
                                                                    ) =>
                                                                        badge.name && (
                                                                            <SelectItem
                                                                                key={
                                                                                    badge.id
                                                                                }
                                                                                value={
                                                                                    badge.name
                                                                                }
                                                                            >
                                                                                {
                                                                                    badge.name
                                                                                }
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
                                        <span className="text-[10px] pt-2 font-bold flex items-center">
                                            Select Programs Done During This
                                            Duration
                                        </span>
                                        <FormField
                                            control={form.control}
                                            name="programSelect"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Select
                                                            onValueChange={
                                                                field.onChange
                                                            }
                                                            value={field.value}
                                                        >
                                                            <SelectTrigger className="w-full rounded-lg">
                                                                <SelectValue placeholder="Select a tag" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="Workout">
                                                                    Workout
                                                                </SelectItem>
                                                                <SelectItem value="Food">
                                                                    Food
                                                                </SelectItem>
                                                                <SelectItem value="Chloe's Programs">
                                                                    Chloe's
                                                                    Programs
                                                                </SelectItem>
                                                                <SelectItem value="Misc">
                                                                    Misc
                                                                </SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        ></FormField>
                                        <div className="flex items-center justify-end gap-2 mt-3 mr-5">
                                            <Button
                                                variant="default"
                                                type="button"
                                            >
                                                Cancel
                                            </Button>
                                            <Button
                                                type="submit"
                                                variant="primary"
                                                className="px-10 py-2 flex"
                                                disabled={isPending}
                                            >
                                                Create
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </form>
                </Form>
            </div>
        </div>
    );
};

export default CreateBeforeAfterPost;
